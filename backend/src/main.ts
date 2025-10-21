import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('BlackBeri Test API')
    .setDescription('Simple test API to fetch data from Sanity.io')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      docExpansion: 'list', // вкладки открыты
      persistAuthorization: true,
      tryItOutEnabled: true, // включает авто-режим Try it out (в новых версиях UI)
      // если не работает, можно добавить ниже custom JS
    },
  });

  await app.listen(3000);
  console.log('🚀 Server running on http://localhost:3000');
  console.log('📘 Swagger UI at http://localhost:3000/api');
}

bootstrap();
