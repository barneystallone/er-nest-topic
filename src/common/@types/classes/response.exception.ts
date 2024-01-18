import { translate } from '@/lib';
import { HttpException } from '@nestjs/common';
import {
  BaseError,
  ERROR_CASE,
  ErrorId,
  ErrorResponse,
  SERVER_ERROR,
  ServerError,
  ValidateError,
} from '..';

/**
 * @example
 * new CustomHttpException({
 *   errorId: ErrorId.INVALID_PARAMETER,
 *   errorCode: APP_CODE.INVALID_PARAMETER,
 *   message: 'aa',
 * });
 */
export class BaseException extends HttpException {
  constructor(
    errorCaseOrBody: ErrorId | ServerError[ErrorId],
    errors: ValidateError[] = [],
    stack?: string,
  ) {
    let errorBody = errorCaseOrBody;
    if (typeof errorBody === 'string') errorBody = SERVER_ERROR[errorBody];
    const metadata = BaseException.getMetadata(errorBody, errors);

    const body = HttpException.createBody(metadata as any);
    super(body, body.statusCode);
    this.stack += '\n' + stack;
  }

  static getMetadata(errorBody: ServerError[ErrorId], errors: ValidateError[] = []) {
    const { errorId, code, statusCode } = errorBody;
    const metadata: BaseError = {
      errorId,
      code,
      message: translate(`exception.${errorId}.message`) as string,
      title: translate(`exception.${errorId}.title`) as string,
      errors,
      statusCode,
    };

    return metadata;
  }

  getResponse(): ErrorResponse {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return { error: super.getResponse() as BaseError };
  }
}

export class AccessDeniedException extends BaseException {
  constructor(errors: ValidateError[] = []) {
    super(ERROR_CASE.ACCESS_DENIED, errors);
  }
}

export class BadRequestException extends BaseException {
  constructor(errors: ValidateError[] = []) {
    super(ERROR_CASE.BAD_REQUEST, errors);
  }
}

export class InternalServerException extends BaseException {
  constructor(errors: ValidateError[] = []) {
    super(ERROR_CASE.INTERNAL_SERVER_ERROR, errors);
  }
}

export class InvalidParameterException extends BaseException {
  constructor(errors: ValidateError[] = []) {
    super(ERROR_CASE.INVALID_PARAMETER_VALIDATION, errors);
  }
}

export class ResourceNotFoundException extends BaseException {
  constructor(errors: ValidateError[] = []) {
    super(ERROR_CASE.RESOURCE_NOT_FOUND, errors);
  }
}

export class UserNotAuthoriziedException extends BaseException {
  constructor(errors: ValidateError[] = []) {
    super(ERROR_CASE.USER_NOT_AUTHORIZIED, errors);
  }
}

export class UserTokenExpiresException extends BaseException {
  constructor(errors: ValidateError[] = []) {
    super(ERROR_CASE.USER_TOKEN_EXPIRES, errors);
  }
}
