import {
  Catch,
  Inject,
  HttpStatus,
  ArgumentsHost,
  HttpException,
  ExceptionFilter
} from '@nestjs/common';
import * as util from 'util';
import { Response } from 'express';
import { HttpAdapterHost } from '@nestjs/core';
import { WinstonLogger, WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
    private readonly httpAdapterHost: HttpAdapterHost
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status;
    let message;
    let title;

    this.logger.error(util.inspect(exception, true, null, true));

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse()['message'];
      title = exception?.name;

      this.logger.error(
        `STATUS: ${status}, MESSAGE: ${message} STACK: ${exception.stack}`
      );

      if (typeof message === 'string') {
        message.replaceAll('data.attributes.', '');

        message = message
          .replaceAll('Error:', '')
          .replaceAll('NotFoundException:', 'Not found: ')
          .replaceAll('ConflictException:', 'Conflict: ')
          .replaceAll('BadRequestException:', 'Bad request: ')
          .split('|');
      }

      const errorResponse = {
        errors:
          message.map((m) => ({
            code: status,
            title: exception?.name,
            message: m.includes('data.attributes.')
              ? m.replace('data.attributes.', '')
              : m
          })) || null
      };
      return response.status(status).json(errorResponse);
    }

    if (!status && !title && !message) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      title = 'Internal Server Error';
      message = 'Internal Server Error';
    }

    response.status(status).json({
      errors: [
        {
          code: status,
          title: title,
          message: message
        }
      ]
    });
  }
}
