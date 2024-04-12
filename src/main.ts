import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: 'lzt',
      resave: false,
      saveUninitialized: false,
    }),
  );

  await app.listen(9527);
}
bootstrap();
