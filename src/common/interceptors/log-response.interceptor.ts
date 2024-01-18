import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER, WinstonLogger } from 'nest-winston';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ErrorLog, LOG_TYPES, RequestWithId, ResponseLog, SuccessResponse } from '../@types';
import { DataMaskingHelper } from '../helpers';
import { typeOf } from '../utils';

// @todo log error
@Injectable()
export class LogResponseInterceptor implements NestInterceptor {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: WinstonLogger) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const start = new Date();
    const req = context.switchToHttp().getRequest() as RequestWithId;

    return next.handle().pipe(
      tap((res: SuccessResponse<any>) => {
        const logObject = this.getResponseLog(req, start, res);
        this.logger.log(
          { message: logObject, type: [LOG_TYPES.RESPONSE] },
          LogResponseInterceptor.name,
        );
      }),
      catchError((err) => {
        const logObject = this.getErrorLog(req, start, err);
        this.logger.error(
          { message: logObject, type: [LOG_TYPES.ERROR] },
          undefined,
          LogResponseInterceptor.name,
        );

        return throwError(() => err);
      }),
    );
  }

  private getResponseLog(req: RequestWithId, start: Date, res: SuccessResponse<any>): ResponseLog {
    const processTime = `${Date.now() - start.getTime()}ms`;
    const responseLog = {
      request: {
        id: req.id,
      },
      response: {
        message: res.message,
        status_code: res.status_code,
        data: res.data,
        process_time: processTime,
      },
    };

    return responseLog;
  }

  /**
   * @todo update later (after completing the error handling module)
   */
  private getErrorLog(req: RequestWithId, start: Date, err: any): ErrorLog {
    const processTime = `${Date.now() - start.getTime()}ms`;
    const errorResponse =
      typeOf(err) === 'Object'
        ? { ...(err.getResponse() as object) }
        : (err.getResponse() as string);

    const errorLog: ErrorLog = DataMaskingHelper.maskData({
      request: { id: req.id },
      error: {
        ...errorResponse,
        process_time: processTime,
      },
      trace: err.stack,
    });

    return errorLog;
  }
}
