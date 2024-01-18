import { translate } from '@/lib';
import { HttpException } from '@nestjs/common';
import {
  BaseError,
  ErrorId,
  ErrorResponse,
  SERVER_ERROR,
  ServerError,
  ValidateError,
} from '../types';

// export const ErrorId = {
//   ...CommonErrorId,
// } as const;

// export type ERROR_ID = (typeof ErrorId)[keyof typeof ErrorId];

// Object.freeze(ErrorId);

/**
 * @example
 * new CustomHttpException({
 *   errorId: ErrorId.INVALID_PARAMETER,
 *   errorCode: APP_CODE.INVALID_PARAMETER,
 *   message: 'aa',
 * });
 */
export class BaseException extends HttpException {
  constructor(errorCaseOrBody: ErrorId | ServerError[ErrorId], errors: ValidateError[] = []) {
    let errorBody = errorCaseOrBody;
    if (typeof errorBody === 'string') errorBody = SERVER_ERROR[errorBody];
    const { errorId, code, statusCode } = errorBody;
    const metadata: BaseError = {
      errorId,
      code,
      message: translate(`exception.${errorId}.message`) as string,
      title: translate(`exception.${errorId}.title`) as string,
      errors,
      statusCode,
    };

    const body = HttpException.createBody(metadata as any);
    super(body, body.statusCode);
  }

  getResponse(): Omit<ErrorResponse, 'statusCode'> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { statusCode, ...error } = super.getResponse() as BaseError;
    return { error };
  }
}
