import { translate } from '@/lib';
import { HttpException, HttpStatus, ValidationError as NestValidationError } from '@nestjs/common';
import { ERROR_CASE, ErrorId } from '../constants';
import { ValidateError } from '../interfaces';

export class ValidationException extends HttpException {
  constructor(public errors: NestValidationError[] = []) {
    const body = HttpException.createBody(errors as any);
    super(body, HttpStatus.BAD_REQUEST);
  }

  toValidateError(parentErrorId?: ErrorId): ValidateError[] {
    return this.errors.map(
      (error) =>
        ({
          // Hard code is good for now
          errorId: ERROR_CASE.BAD_REQUEST,
          code: 'BAD_REQUEST',
          title: translate(`exception.${ERROR_CASE.BAD_REQUEST}.title`),
          message: Object.values(error.constraints).join(' '),
          field: error.property,
        }) as ValidateError,
    );
  }
}
