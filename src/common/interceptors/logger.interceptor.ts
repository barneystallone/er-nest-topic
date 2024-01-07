import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { format } from 'date-fns';
import { PathLike } from 'fs';
import { appendFile } from 'fs/promises';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { DataMaskingHelper, SuccessResponse, typeOf } from '../helpers';
import { ErrorLog, LOG_LEVEL, RequestLog, RequestWithId } from '../types';

const LOG_PATH = {
  REQUEST: `logs/info.request_${format(new Date(), 'yyyyMMdd')}.log`,
  ERROR: `logs/error.request_${format(new Date(), 'yyyyMMdd')}.log`,
};

// @todo log error
@Injectable()
export class HttpLoggerInterceptor implements NestInterceptor {
  private readonly logger: Logger = new Logger('HttpInterceptor');

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const start = new Date();
    const id = uuid();
    const req = context.switchToHttp().getRequest() as RequestWithId;
    const loggerName = context.getClass().name;

    req.id = id;

    return next.handle().pipe(
      tap((res: SuccessResponse<any>) => {
        const logMessage = this.getRequestSuccessLog(req, start, loggerName, res);
        this.writeToLogFile(LOG_PATH.REQUEST, logMessage);
      }),
      catchError((err) => {
        const logMessage = this.getErrorLog(req, start, loggerName, err);
        this.writeToLogFile(LOG_PATH.ERROR, logMessage);
        return throwError(() => err);
      }),
    );
  }

  private getRequestSuccessLog(
    req: RequestWithId,
    start: Date,
    loggerName: string,
    res: SuccessResponse<any>,
  ) {
    const { method, url, path } = req;
    const body = req.body;
    const timestamp = format(start, 'yyyy-MM-dd HH:mm:ss');
    const responseTime = `${Date.now() - start.getTime()}ms`;

    const requestLog: RequestLog = DataMaskingHelper.maskData({
      request: {
        id: req.id,
        path,
        method,
        body,
      },
      response: {
        message: res.message,
        status_code: res.status_code,
      },
    });

    return (
      `\n\n[${timestamp}][${LOG_LEVEL.INFO}][${loggerName}] ${method} ${url} - ${responseTime}\n\n` +
      `${JSON.stringify(requestLog, undefined, '\t')}`
    );
  }

  /**
   * @todo update later (after completing the error handling module)
   */
  private getErrorLog(req: RequestWithId, start: Date, loggerName: string, err: any) {
    const { method, url, path } = req;
    const body = req.body;
    const timestamp = format(start, 'yyyy-MM-dd HH:mm:ss');
    const responseTime = `${Date.now() - start.getTime()}ms`;

    if (err instanceof HttpException) {
      const errorResponse =
        typeOf(err) === 'Object'
          ? { ...(err.getResponse() as object) }
          : (err.getResponse() as string);

      const errorLog: ErrorLog = DataMaskingHelper.maskData({
        request: {
          id: req.id,
          path,
          method,
          body,
        },
        error: {
          ...errorResponse,
        },
      });

      return (
        `\n\n[${timestamp}][${LOG_LEVEL.ERROR}][${loggerName}] ${method} ${url} - ${responseTime}\n\n` +
        `${JSON.stringify(errorLog, undefined, '\t')}\n\n` +
        `Stack:${err.stack}`
      );
    }

    return '';
  }

  private async writeToLogFile(path: PathLike, logMesaage: string) {
    try {
      await appendFile(path, logMesaage, { encoding: 'utf8' });
    } catch (error) {
      this.logger.error(error);
    }
  }
}
