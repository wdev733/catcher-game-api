import { Prisma } from '@prisma/client';

export const PRISMA_PROVIDED_VALUE_NOT_VALID = 'P2006';
export const PRISMA_RECORD_NOT_FOUND_CODE = 'P2025';

export const isBadRequestError = (e: Error): boolean =>
  (e instanceof Prisma.PrismaClientKnownRequestError && e.code === PRISMA_PROVIDED_VALUE_NOT_VALID) ||
  e.name === 'BadRequestError';

export const isRecordNotFoundError = (e: Error): boolean =>
  (e instanceof Prisma.PrismaClientKnownRequestError && e.code === PRISMA_RECORD_NOT_FOUND_CODE) ||
  e.name === 'NotFoundError';
