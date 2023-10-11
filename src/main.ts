import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

const {env} = process;

async function bootstrap() {  
try {
  const config = new DocumentBuilder()
  .setTitle('Stadium finder')
  .setDescription('Mini Project for Stadium finder')  
  .setVersion('1.0.0')
  .addTag('NodeJS, NestJS, Postgres, JWT, Sequelize, Swagger')
  .build();

  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe())

    await app.listen(env.PORT, () => {
      console.log("listening on port " + env.PORT);
    });
} catch (error) {
  console.log(error);
}
}
bootstrap();
