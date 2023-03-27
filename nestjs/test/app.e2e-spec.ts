import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppController } from 'src/app.controller';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('(GET) /healthcheck', () => {
    return request(app.getHttpServer()).get('/healthcheck').expect(200).expect({
      healthy: true,
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
