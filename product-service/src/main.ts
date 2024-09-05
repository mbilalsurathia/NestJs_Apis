import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors();   
  await app.startAllMicroservices();
  
  const port = configService.get('PORT') || 3002;
  await app.listen(port);
}
bootstrap();