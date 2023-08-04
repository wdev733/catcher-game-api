import { IsEnum, IsNotEmpty, IsNumber, IsOptional, Max, Min } from 'class-validator';

export enum Environment {
  Development = 'development',
  Staging = 'staging',
  Production = 'production',
  Test = 'test',
}

export const isLiveEnvironment = (env: Environment): boolean =>
  env === Environment.Staging || env === Environment.Production;

/**
 * Specifies the required environment variables.
 */
export class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @Min(0)
  @Max(65536)
  @IsNumber()
  PORT: number;

  @IsOptional()
  DATABASE_NAME?: string;

  @IsOptional()
  DATABASE_USER?: string;

  @IsOptional()
  DATABASE_PASSWORD?: string;

  @IsNotEmpty()
  DATABASE_URL: string;

  @Min(0)
  @Max(65536)
  @IsNumber()
  @IsOptional()
  DATABASE_PORT?: number;
}

export class EnvConfigError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'EnvConfigError';
  }
}
