import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Nest.JS + RabbitMQ + MongoDB Tech Trial')
      .setDescription(
        'The task is to create a simple REST application from scratch using Nest.js (TypeScript), RabbitMQ, MongoDB and integration with ReqResAPI.',
      )
      .setVersion('1.0')
      .build(),
  );
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
