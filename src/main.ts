import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { configureApp } from 'app.config';
import { AppModule } from 'app.module';
import * as bodyParser from 'body-parser';
import { Environment } from 'config/env.config.constants';
import helmet from 'helmet';

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    cors: true,
  });

  app.use(bodyParser.json({ limit: '60mb' }));

  const configService = app.get(ConfigService);
  const port = configService.getOrThrow<number>('port');
  const baseUrl = configService.getOrThrow<string>('baseUrl');
  const environment = configService.get<Environment>('env') ?? Environment.Development;
  if (environment === Environment.Development) {
    app.enableCors();
  }

  configureApp(app, {
    env: environment,
  });

  //configure middleware
  app.use(helmet());

  // Change these values to match your new service
  const swaggerConfig = new DocumentBuilder()
    .addServer(baseUrl)
    .setTitle('CATCHER GAME SERVICE')
    .setDescription('Api for catcher game ')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(port);
};

bootstrap();
