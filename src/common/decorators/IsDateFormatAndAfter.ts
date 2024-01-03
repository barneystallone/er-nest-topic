import { applyDecorators } from '@nestjs/common';
import { IsAfter } from './isAfter';
import { IsValidDateFormat } from './isValidDateFormat';

export function IsValidDateFormatAndAfter(propertyName: string) {
  return applyDecorators(IsAfter(propertyName), IsValidDateFormat());
}
