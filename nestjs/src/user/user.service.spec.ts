import { ConflictException, NotFoundException } from '@nestjs/common';

import FakeHttpClientService from 'src/http/fake.client.service';
import FakeMailerService from 'src/mail/fake.mailer.service';
import FakeMessagingService from 'src/messaging/fake.messaging.service';
import FakeStorageService from 'src/storage/fake.storage.service';
import CreateUserRequestDto from './dto/request/createUser.dto';

import FakeUserRepository from './repository/fake.user.repository';

import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { Avatar } from './entities/avatar.entity';

describe('UserService', () => {
  let service: UserService;
  let userRepo: FakeUserRepository;
  let storage: FakeStorageService;
  let httpClient: FakeHttpClientService;
  let messaging: FakeMessagingService;
  let mailer: FakeMailerService;

  beforeEach(async () => {
    userRepo = new FakeUserRepository();
    storage = new FakeStorageService();
    httpClient = new FakeHttpClientService();
    messaging = new FakeMessagingService();
    mailer = new FakeMailerService();
    service = new UserService(userRepo, storage, httpClient, messaging, mailer);
  });

  it('[createUser] should not create user if email already exists', async () => {
    const email = 'already@exists';

    userRepo.users.push({
      email,
    } as User);

    await expect(
      service.createUser({
        email,
      } as CreateUserRequestDto),
    ).rejects.toEqual(
      new ConflictException('This email was already registered!'),
    );
  });
  it('[createUser] should create user, send rabbit event and send email', async () => {
    const email = 'already@exists';
    const user = await service.createUser({
      email,
    } as CreateUserRequestDto);

    expect(isNaN(Number(user.id))).toBe(false);
    expect(isNaN(Number(`0x${user.oid}`))).toBe(false);
    expect(user.email).toBe(email);

    expect(userRepo.users[0]).toEqual(user);
    expect(messaging.queues['MESSAGES'].length).toBe(1);
    expect(mailer.mails[0].to).toBe(email);
  });

  it('[getUser] should not return an user if it does not exist', async () => {
    const userId = 'Non Existent';
    await expect(service.getUser(userId)).rejects.toEqual(
      new NotFoundException(`User ${userId} not found!`),
    );
  });
  it('[getUser] should return an user if it exists', async () => {
    const userId = '123';
    userRepo.users.push({ id: userId } as User);
    const user = await service.getUser(userId);
    expect(user.id).toBe(userId);
  });

  it('[getAvatar] should not return an avatar if user does not exist', async () => {
    try {
      await service.getAvatar('Non Existent');
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
      expect(JSON.stringify(err.response)).toBeUndefined();
    }
  });
  it("[getAvatar] should return and save user's avatar in the filesystem and in the database if user's avatar exists and is not available in the database", async () => {
    const userId = '123';
    userRepo.users.push({ id: userId } as User);

    const image = await service.getAvatar(userId);

    const savedAvatar = userRepo.avatars[0] as any;
    delete savedAvatar.oid;

    const file = Object.keys(storage.files)[0];
    expect(file.endsWith('.jpeg')).toBe(true);
    expect(storage.files[file].toString()).toEqual(userRepo.defaultUserImage);
    expect(savedAvatar).toEqual({
      content: image,
      hash: file,
      userId,
    });
    expect(image.startsWith('data:image/jpeg;base64,')).toBe(true);
    expect(
      Buffer.from(
        image.replace('data:image/jpeg;base64,', ''),
        'base64',
      ).toString('utf-8'),
    ).toBe(userRepo.defaultUserImage);
  });
  it("[getAvatar] should return user's avatar if it is available in the database", async () => {
    const userId = '123';
    const content = `data:image/jpeg;base64,${Buffer.from(
      userRepo.defaultUserImage,
    ).toString('base64')}`;
    userRepo.users.push({ id: userId } as User);
    userRepo.avatars.push({ userId, content } as Avatar);

    const getUserById = jest.spyOn(userRepo, 'getUserById');

    const image = await service.getAvatar(userId);
    expect(image).toBe(content);
    expect(getUserById).not.toBeCalled();
  });

  it("[removeAvatar] should not try to delete user's avatar if user does not exist", async () => {
    const userId = 'Non Existent';
    await expect(service.removeAvatar(userId)).rejects.toEqual(
      new NotFoundException(`Could not find user ${userId}'s avatar!`),
    );
  });
  it("[removeAvatar] should remove user's avatar from database and filesystem", async () => {
    const userId = '123';
    userRepo.users.push({ id: userId } as User);
    await service.getAvatar(userId);
    expect(userRepo.avatars.length).toBe(1);
    expect(Object.keys(storage.files).length).toBe(1);
    await service.removeAvatar(userId);
    expect(userRepo.avatars.length).toBe(0);
    expect(Object.keys(storage.files).length).toBe(0);
  });
});
