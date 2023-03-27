import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import database from './config/database';
import { UserModule as UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(database), UserModule],
  controllers: [AppController],
})
export class AppModule {}
