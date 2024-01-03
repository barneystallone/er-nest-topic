import { applyDecorators } from '@nestjs/common';
import { IsAfterNow } from './isAfterNow';
import { IsValidDateFormat } from './isValidDateFormat';

export function IsValidDateFormatAndAfterNow() {
  return applyDecorators(IsAfterNow(), IsValidDateFormat());
}
