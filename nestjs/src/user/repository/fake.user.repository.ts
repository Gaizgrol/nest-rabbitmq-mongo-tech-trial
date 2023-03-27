import { Injectable } from '@nestjs/common';
import { ObjectID } from 'mongodb';
import { Avatar } from '../entities/avatar.entity';
import { User } from '../entities/user.entity';
import AbstractUserRepository from './user.repository.abstract';

import CreateUserRequestDto from '../dto/request/createUser.dto';
import ReqResUserDto from '../dto/response/reqResUser.dto';

@Injectable()
export default class FakeUserRepository implements AbstractUserRepository {
  public readonly users: User[] = [];
  public readonly avatars: Avatar[] = [];
  public defaultUserImage = 'Image';

  private makeId() {
    return Math.round(Math.random() * Number.MAX_SAFE_INTEGER);
  }

  async createUser(createUserDto: CreateUserRequestDto): Promise<User> {
    const newUser = {
      ...createUserDto,
      id: `${this.makeId()}`,
      oid: new ObjectID(),
    };
    this.users.push(newUser);
    return newUser;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.users.find((usr) => usr.email === email) ?? null;
  }

  async getUserById(userId: string): Promise<ReqResUserDto | null> {
    const user = this.users.find((usr) => usr.id === userId);
    if (!user) return null;
    const { id, email, firstName: first_name, lastName: last_name } = user;
    const avatar = this.defaultUserImage;
    return {
      id,
      avatar,
      email,
      first_name,
      last_name,
    };
  }

  async getUserAvatar(userId: string): Promise<Avatar | null> {
    return this.avatars.find((avt) => avt.userId === userId) ?? null;
  }

  async createAvatar(
    userId: string,
    path: string,
    content: string,
  ): Promise<void> {
    this.avatars.push({ userId, content, hash: path, oid: new ObjectID() });
  }

  async removeAvatar(userId: string): Promise<void> {
    const index = this.avatars.findIndex((avt) => avt.userId === userId);
    if (index === -1) return;
    this.avatars.splice(index, 1);
  }
}
