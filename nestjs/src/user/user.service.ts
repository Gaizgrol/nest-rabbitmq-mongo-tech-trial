import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import AbstractUserRepository from './repository/user.repository.abstract';

import CreateUserRequestDto from './dto/request/createUser.dto';
import GetUserResponseDto from './dto/response/getUser.dto';
import { randomUUID } from 'crypto';
import AbstractStorage from 'src/storage/storage.abstract';
import AbstractHttpClient from 'src/http/client.abstract';
import AbstractMessaging from 'src/messaging/messaging.abstract';
import AbstractMailer from 'src/mail/mailer.abstract';

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

  async getUser(userId: string): Promise<GetUserResponseDto> {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new HttpException(
        `User ${userId} not found!`,
        HttpStatus.NOT_FOUND,
      );
    }
    const { id, email, first_name: firstName, last_name: lastName } = user;
    return { id, email, firstName, lastName };
  }

  async getAvatar(userId: string): Promise<string> {
    const avatar = await this.userRepository.getUserAvatar(userId);
    if (avatar) {
      return avatar.content;
    }

    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new HttpException(
        `User ${userId} not found!`,
        HttpStatus.NOT_FOUND,
      );
    }

    const { success, content } = await this.httpClient.file(user.avatar);
    if (!success) {
      throw new HttpException(
        `Could not find user's ${userId} avatar!`,
        HttpStatus.NOT_FOUND,
      );
    }

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
      throw new HttpException(
        `Could not find user ${userId}'s avatar!`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.userRepository.removeAvatar(userId);
    await this.fileSystem.delete(avatar.hash);
  }
}
