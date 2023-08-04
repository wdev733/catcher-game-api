import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { DbExceptionFilter } from 'common/filters/db-exception.filter';
import { HttpExceptionFilter } from 'common/filters/http-exception.filter';
import { getEnvFilePath, parseEnvVariables } from 'config/env.config';
import { validateEnvVariables } from 'config/validation';
import { UserModule } from 'user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvFilePath(process.env['NODE_ENV']),
      validate: validateEnvVariables,
      load: [parseEnvVariables],
    }),
    ScheduleModule.forRoot(),
    UserModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: DbExceptionFilter,
    },
  ],
})
export class AppModule {}
