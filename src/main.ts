import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Todo App')
    .setDescription(
      `This documentation content todo module, user module and login API's. It also encorporates authorization header`,
    )
    .setVersion('1.0')
    .addTag('Todo')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
    app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
