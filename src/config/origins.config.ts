import { Environment } from 'config/env.config.constants';

/**
 * Holds all allowed CORS origins for each environment. When the staging and
 * development frontends are deployed, their domains should be added to this
 * map.
 */
export const ALLOWED_ORIGINS: Record<Environment, string[]> = {
  [Environment.Development]: ['http://localhost:3000', 'http://localhost:3001'], // TODO: Add all frontend localhost URIs that need to access the Pharmacy Backend
  [Environment.Staging]: [],
  [Environment.Production]: [],
  [Environment.Test]: [],
};
