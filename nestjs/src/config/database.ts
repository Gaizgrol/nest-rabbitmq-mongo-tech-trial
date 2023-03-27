import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { env } from 'process';

const type = 'mongodb' as const;
const {
  DATABASE_HOST: host,
  DATABASE_USER: username,
  DATABASE_PASSWORD: password,
  DATABASE_NAME: dbName,
} = env;
const entities = ['dist/**/*.entity.js'];
const port = Number(env.DATABASE_PORT);

const database: TypeOrmModuleOptions = {
  type,
  port,
  host,
  username,
  password,
  database: dbName,
  entities,
  useUnifiedTopology: true,
};

export default database;
