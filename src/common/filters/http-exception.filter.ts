import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import type { Response } from 'express';
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('catcher-game-service');

  private parseError(exception: HttpException): {
    details: object | null;
    openApiDetails: object | null;
  } {
    const response = exception.getResponse() as string | object;

    //@ts-expect-error: attributes that are defined on class OpenApiError which extends HttpException
    const { request, isOpenApiError, body, apiStatusCode, apiErrorMessage } = exception;

    return {
      details: typeof response === 'string' ? null : response,
      openApiDetails: isOpenApiError
        ? {
            request,
            isOpenApiError,
            body,
            apiStatusCode,
            apiErrorMessage,
          }
        : null,
    };
  }

  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus() ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const errorDetails = this.parseError(exception);

    this.logger.error({
      message: {
        message: exception.message,
        ...errorDetails,
      },
    });

    response.status(statusCode).json({
      statusCode,
      error: exception.message ? exception.message : new InternalServerErrorException().message,
    });
  }
}
