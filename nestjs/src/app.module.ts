import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UserModule as UserModule } from './user/user.module';
import dbConfig from './providers/database/mongo';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), UserModule],
  controllers: [AppController],
})
export class AppModule {}
