import { Module, Provider } from '@nestjs/common';
import AbstractMessaging from './messaging.abstract';
import MessagingService from './messaging.service';

const providers: Provider[] = [
  {
    provide: AbstractMessaging,
    useFactory: async () => {
      const service = new MessagingService();
      await service.init();
      return service;
    },
  },
];

@Module({
  providers,
  exports: providers,
})
export class MessagingModule {}
