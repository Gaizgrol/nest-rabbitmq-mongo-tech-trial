import { Injectable } from '@nestjs/common';
import AbstractHttpClient from 'src/http/client.abstract';
import { DataSource, MongoEntityManager } from 'typeorm';
import { Avatar } from '../entities/avatar.entity';
import { User } from '../entities/user.entity';
import AbstractUserRepository from './user.repository.abstract';

import CreateUserRequestDto from '../dto/request/createUser.dto';
import ReqResUserDto from '../dto/response/reqResUser.dto';

@Injectable()
export default class UserRepository implements AbstractUserRepository {
  private readonly manager: MongoEntityManager;

  constructor(
    private dataSource: DataSource,
    private httpClient: AbstractHttpClient,
  ) {
    this.manager = this.dataSource.mongoManager;
  }

  private makeId() {
    return Math.round(Math.random() * Number.MAX_SAFE_INTEGER);
  }

  async createUser(createUserDto: CreateUserRequestDto): Promise<User> {
    const newUser = this.manager.create(User, {
      ...createUserDto,
      id: `${this.makeId()}`,
    });
    await this.manager.save(newUser);
    return newUser;
  }

  getUserByEmail(email: string): Promise<User | null> {
    return this.manager.findOne(User, {
      where: { email },
    });
  }

  async getUserById(userId: string): Promise<ReqResUserDto | null> {
    const { success, data } = await this.httpClient.get<{
      data: ReqResUserDto;
    }>(`https://reqres.in/api/users/${userId}`);
    const { data: user } = data;
    return success ? user : null;
  }

  getUserAvatar(userId: string): Promise<Avatar | null> {
    return this.manager.findOne(Avatar, {
      where: { userId },
    });
  }

  async createAvatar(
    userId: string,
    path: string,
    content: string,
  ): Promise<void> {
    const avatar = this.manager.create(Avatar, { userId, content, hash: path });
    await this.manager.save(avatar);
  }

  async removeAvatar(userId: string): Promise<void> {
    this.manager.delete(Avatar, {
      userId,
    });
  }
}
