import { Module, Provider } from '@nestjs/common';
import FileSystemService from './filesystem.service';
import AbstractStorage from './storage.abstract';

const providers: Provider[] = [
  {
    provide: AbstractStorage,
    useClass: FileSystemService,
  },
];

@Module({
  providers,
  exports: providers,
})
export class StorageModule {}
