import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from "node:process";

const PORT = process.env.PORT || 5000;
async function bootstrap(): Promise<void> {
  try {
    const app = await NestFactory.create(AppModule);

    await app.listen(PORT);

    console.log(`Сервер запущен http://localhost:${PORT}/api`);
  } catch (e){
    console.error(e);
  }
}

bootstrap();
