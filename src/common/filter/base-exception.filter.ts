import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { BaseException } from '../@types';

@Catch(BaseException)
export class BaseExceptionFiter implements ExceptionFilter {
  catch(exception: BaseException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const {
      error: { statusCode, ...error },
    } = exception.getResponse();

    response.status(statusCode).json({ error });
  }
}
