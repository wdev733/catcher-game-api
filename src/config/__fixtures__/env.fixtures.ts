import { Environment } from 'config/env.config.constants';

export const environmentVariablesMock = {
  NODE_ENV: Environment.Development,
  PORT: 4201,
  DATABASE_NAME: 'catcher',
  DATABASE_USER: 'test',
  DATABASE_PASSWORD: 'testpass',
  DATABASE_PORT: 5432,
  DATABASE_URL: 'postgresql://test:testpass@localhost:5432/catcher?schema=public',
};

export const parsedEnvironmentVariablesMock = {
  env: 'test',
};
