import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpStatus,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  NotFoundError,
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { DbException } from 'common/filters/filter.interfaces';
import type { Request, Response } from 'express';

@Catch(
  NotFoundError,
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientValidationError,
  PrismaClientUnknownRequestError,
)
export class DbExceptionFilter implements ExceptionFilter {
  private logger: Logger = new Logger();

  /**
   * @returns {string} URL to the DB client's documentation explaining the
   * error code.
   */
  private static formatErrorUrl(errorCode: string | null): string | null {
    if (!errorCode) {
      return null;
    }

    const dbErrorCodeDocumentationBaseUrl = 'https://www.prisma.io/docs/reference/api-reference/error-reference';

    return `${dbErrorCodeDocumentationBaseUrl}#${errorCode.toLowerCase()}`;
  }

  private static parseError(exception: DbException & { code?: string; meta?: { cause?: string } }): {
    code: string | null;
    cause: string | null;
  } {
    const code = exception.code ?? null;
    const cause = exception.meta?.cause ?? null;

    return { code, cause };
  }

  private static getStatusCodeFromError(exception: DbException): {
    statusCode: number;
    error: string;
  } {
    // These types of errors are thrown from bad requests (e.g., trying to
    // update a record that does not exist or trying to insert data of an incorrect
    // type)
    if (exception instanceof PrismaClientKnownRequestError || exception instanceof PrismaClientValidationError) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        error: new BadRequestException().message,
      };
    }
    if (exception instanceof NotFoundError) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        error: new NotFoundException().message,
      };
    }
    // The other types of error are thrown from DB connection issues, unrelated to a
    // specific request
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: new InternalServerErrorException().message,
    };
  }

  catch(exception: DbException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const { code, cause } = DbExceptionFilter.parseError(exception);
    const { statusCode, error } = DbExceptionFilter.getStatusCodeFromError(exception);

    this.logger.error({
      appName: 'catcher-game-service',
      httpRequest: request,
      message: exception.message,
      serviceName: 'DbExceptionFilter',
      stackTrace: statusCode === HttpStatus.INTERNAL_SERVER_ERROR ? exception.stack : undefined,
      additionalInfo: {
        statusCode,
        url: DbExceptionFilter.formatErrorUrl(code),
        cause,
      },
    });

    response.status(statusCode).json({ statusCode, error });
  }
}
