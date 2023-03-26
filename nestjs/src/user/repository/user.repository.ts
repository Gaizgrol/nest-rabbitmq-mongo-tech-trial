import { Injectable } from '@nestjs/common';
import IHttpClient from 'src/providers/http/HttpClient.interface';
import { DataSource, MongoEntityManager } from 'typeorm';
import { Avatar } from '../entities/avatar.entity';
import { User } from '../entities/user.entity';
import IUserRepository from './user.repository.interface';

import CreateUserRequestDto from '../dto/request/createUser.dto';
import ReqResUserDto from '../dto/response/reqResUser.dto';

@Injectable()
export default class UserRepository implements IUserRepository {
  private readonly manager: MongoEntityManager;

  constructor(private dataSource: DataSource, private httpClient: IHttpClient) {
    this.manager = this.dataSource.mongoManager;
  }

  async createUser(createUserDto: CreateUserRequestDto): Promise<User> {
    const newUser = this.manager.create(User, { ...createUserDto });
    await this.manager.save(newUser);
    return newUser;
  }

  async getUserById(userId: string): Promise<ReqResUserDto | null> {
    const { success, data } = await this.httpClient.get<{
      data: ReqResUserDto;
    }>(`https://reqres.in/api/users/${userId}`);
    const { data: user } = data;
    return success ? user : null;
  }

  async getUserAvatar(userId: string): Promise<Avatar | null> {
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
