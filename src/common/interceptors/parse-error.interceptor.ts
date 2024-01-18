import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, catchError, throwError } from 'rxjs';
import { BaseException, ValidationException } from '../@types';
import { ValidationErrorId } from '../decorators';

@Injectable()
export class ParseErrorInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof ValidationException) {
          const errorId = this.reflector.getAllAndOverride(ValidationErrorId, [
            context.getClass(),
            context.getHandler(),
          ]);

          err = new BaseException(errorId, err.toValidateError(), err.stack);
        }

        return throwError(() => err);
      }),
    );
  }
}
