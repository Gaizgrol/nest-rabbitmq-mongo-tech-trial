import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { env } from 'process';

const {
  DATABASE_HOST: host,
  DATABASE_PORT: port,
  DATABASE_USER: username,
  DATABASE_PASSWORD: password,
  DATABASE_NAME: database,
} = env;

const entities = ['dist/**/*.entity.js'];

console.log({ entities });

const dbConfig: TypeOrmModuleOptions = {
  type: 'mongodb' as const,
  port: Number(port),
  host,
  username,
  password,
  database,
  entities,
};

export default dbConfig;
