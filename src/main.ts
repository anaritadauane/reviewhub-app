import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

import * as compression from 'compression';
const cookieSession = require('cookie-session');


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys: ['abhdhsbk']
  }), 
  compression() // compressing some files
  )
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true    // for security concerns 
    })
  )
  await app.listen(3003);
}
bootstrap();
