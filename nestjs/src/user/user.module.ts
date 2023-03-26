import { Module, Provider } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import UserRepository from './repository/user.repository';
import IUserRepository from './repository/user.repository.interface';
import IFileSystem from 'src/providers/storage/FileSystem.interface';
import FileSystem from 'src/providers/storage/FileSystem';
import IHttpClient from 'src/providers/http/HttpClient.interface';
import HttpClient from 'src/providers/http/HttpClient';
import IProducer from 'src/providers/messaging/Producer.interface';
import Producer from 'src/providers/messaging/Producer';
import IMailer from 'src/providers/mail/Mailer.interface';
import Mailer from 'src/providers/mail/Mailer';

const providers: Provider<any>[] = [
  {
    provide: IFileSystem,
    useClass: FileSystem,
  },
  {
    provide: IHttpClient,
    useClass: HttpClient,
  },
  {
    provide: IMailer,
    useClass: Mailer,
  },
  {
    provide: IProducer,
    useClass: Producer,
  },
];

const repositories: Provider<any>[] = [
  {
    provide: IUserRepository,
    useClass: UserRepository,
  },
];

const services: Provider<any>[] = [UserService];

@Module({
  controllers: [UserController],
  providers: [...providers, ...repositories, ...services],
})
export class UserModule {}
