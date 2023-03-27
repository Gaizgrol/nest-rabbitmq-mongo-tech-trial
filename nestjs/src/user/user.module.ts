import { Module, Provider } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

import AbstractUserRepository from './repository/user.repository.abstract';
import UserRepository from './repository/user.repository';
import { HttpModule } from 'src/http/http.module';
import { MailerModule } from 'src/mail/mailer.module';
import { MessagingModule } from 'src/messaging/messaging.module';
import { StorageModule } from 'src/storage/storage.module';

const repositories: Provider[] = [
  {
    provide: AbstractUserRepository,
    useClass: UserRepository,
  },
];

const services: Provider[] = [UserService];

@Module({
  imports: [HttpModule, MailerModule, MessagingModule, StorageModule],
  controllers: [UserController],
  providers: [...repositories, ...services],
})
export class UserModule {}
