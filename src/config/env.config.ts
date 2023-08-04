import { EnvConfigError, Environment } from 'config/env.config.constants';

/**
 * Returns the path to the environment variable file for the given environment.
 * Throws an error if the given environment isn't recognized.
 * @param environment - Node environment name.
 * @throws {EnvConfigError}
 */
export const getEnvFilePath = (environment: Environment | string = Environment.Development): string => {
  if (!Object.values(Environment).includes(environment as Environment)) {
    throw new EnvConfigError(`Environment must be one of ${Object.values(Environment)} (received '${environment}')`);
  }

  return `.env.${environment}`;
};

export const parseEnvVariables = (): Record<string, unknown> => ({
  port: parseInt(process.env['PORT'] || process.env['APP_PORT'] || '4201', 10), // api defaults to 3000
  env: process.env['NODE_ENV'],
  baseUrl: process.env['BASE_URL'],
  database: {
    name: process.env['DATABASE_NAME'],
    user: process.env['DATABASE_USER'],
    password: process.env['DATABASE_PASSWORD'],
    port: parseInt(process.env['DATABASE_PORT'] || '6201', 10),
    url: process.env['DATABASE_URL'],
  },
});
