import { Module, Provider } from '@nestjs/common';
import AbstractMailer from './mailer.abstract';
import FakeMailerService from './fake.mailer.service';

const providers: Provider[] = [
  {
    provide: AbstractMailer,
    useClass: FakeMailerService,
  },
];

@Module({
  providers,
  exports: providers,
})
export class MailerModule {}
