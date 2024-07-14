import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('How to use a notification API')
    .setVersion('1.0')
    .addTag('notifications')
    .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apidoc', app, document)
  app.useGlobalPipes( new ValidationPipe({ whitelist: true }))
  await app.listen(configService.get('PORT'));
}
bootstrap();
