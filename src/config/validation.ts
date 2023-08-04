import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { EnvironmentVariables } from 'config/env.config.constants';
import { EnvConfigError } from 'config/env.config.constants';

/**
 * Throws an error if the actual environment variables aren't as expected.
 * @param actual - A record of the actual environment variables defined.
 * @param expected - A class annotated with `class-validator` decorators
 * indicating the expected environment variables.
 * @throws {EnvConfigError}
 */
export const validateEnvVariables = (
  actual: Record<string, unknown>,
  expected = EnvironmentVariables,
): EnvironmentVariables => {
  const validatedConfig = plainToInstance(expected, actual, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new EnvConfigError(errors.toString());
  }

  return validatedConfig;
};
