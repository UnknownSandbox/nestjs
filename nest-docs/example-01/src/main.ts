import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import {ValidationPipe} from "@nestjs/common";
import {EmptyBodyPipe} from "./core/pipes/EmptyBodyPipe";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    abortOnError: true,
  });
  app.useGlobalPipes(new EmptyBodyPipe());
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));
  app.set('query parser', 'extended');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
