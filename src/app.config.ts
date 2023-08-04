import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Environment, isLiveEnvironment } from 'config/env.config.constants';

type AppConfiguration = {
  env: Environment;
};

export function configureApp(app: INestApplication, { env }: AppConfiguration): void {
  app.useGlobalPipes(
    new ValidationPipe({
      // do not log error messages in upper envs
      disableErrorMessages: isLiveEnvironment(env),
      enableDebugMessages: !isLiveEnvironment(env),
      validationError: {
        target: !isLiveEnvironment(env),
        value: !isLiveEnvironment(env),
      },
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      // TODO the following might not be necessary but helps prevent injections
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
    }),
  );
}
