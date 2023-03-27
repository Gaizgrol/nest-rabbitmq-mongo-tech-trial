import { Module, Provider } from '@nestjs/common';
import AbstractHttpClient from './client.abstract';
import HttpClientService from './client.service';

const providers: Provider[] = [
  {
    provide: AbstractHttpClient,
    useClass: HttpClientService,
  },
];

@Module({
  providers: [...providers],
  exports: [...providers],
})
export class HttpModule {}
