import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { randomUUID } from 'crypto';

import AbstractUserRepository from './repository/user.repository.abstract';

import CreateUserRequestDto from './dto/request/createUser.dto';
import GetUserResponseDto from './dto/response/getUser.dto';

import AbstractStorage from 'src/storage/storage.abstract';
import AbstractHttpClient from 'src/http/client.abstract';
import AbstractMessaging from 'src/messaging/messaging.abstract';
import AbstractMailer from 'src/mail/mailer.abstract';
import ReqResUserDto from './dto/response/reqResUser.dto';

@Injectable()
export class UserService {
  constructor(
    private userRepository: AbstractUserRepository,
    private fileSystem: AbstractStorage,
    private httpClient: AbstractHttpClient,
    private messaging: AbstractMessaging,
    private mailer: AbstractMailer,
  ) {}

  async createUser(
    createUserDto: CreateUserRequestDto,
  ): Promise<GetUserResponseDto> {
    const { email } = createUserDto;
    const existingUser = await this.userRepository.getUserByEmail(email);
    if (existingUser) {
      throw new ConflictException(`This email was already registered!`);
    }

    const storedUser = await this.userRepository.createUser(createUserDto);
    await Promise.all([
      this.messaging.sendTo('MESSAGES', `Created user ${storedUser.id}`),
      this.mailer.send({
        from: 'me@dummy.sender',
        to: storedUser.email,
        content: 'Your account has been created!',
      }),
    ]);

    return storedUser;
  }

  async getUser(userId: string): Promise<ReqResUserDto> {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new NotFoundException(`User ${userId} not found!`);
    }

    return user;
  }

  async getAvatar(userId: string): Promise<string> {
    const avatar = await this.userRepository.getUserAvatar(userId);
    if (avatar) {
      return avatar.content;
    }

    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new NotFoundException({ toJSON: () => undefined });
    }

    const { content } = await this.httpClient.file(user.avatar);

    const buffer = Buffer.from(content);
    const contentBase64 = `data:image/jpeg;base64,${buffer.toString('base64')}`;

    const path = `${randomUUID()}.jpeg`;

    await this.userRepository.createAvatar(userId, path, contentBase64);
    await this.fileSystem.write(path, buffer);

    return contentBase64;
  }

  async removeAvatar(userId: string): Promise<void> {
    const avatar = await this.userRepository.getUserAvatar(userId);
    if (!avatar) {
      throw new NotFoundException(`Could not find user ${userId}'s avatar!`);
    }

    await this.userRepository.removeAvatar(userId);
    await this.fileSystem.delete(avatar.hash);
  }
}
