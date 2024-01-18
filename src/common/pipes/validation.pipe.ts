import { ValidationError, ValidationPipe } from '@nestjs/common';
import { ValidationException } from '../@types';

export class BaseValidationPipe extends ValidationPipe {
  constructor() {
    super({
      exceptionFactory(errors: ValidationError[]) {
        return new ValidationException(errors);
      },
    });
  }
}
