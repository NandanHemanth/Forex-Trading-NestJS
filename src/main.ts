// Importing Modules and necessary libraries
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Async Main function which is the entry point for the application on port 3000
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
