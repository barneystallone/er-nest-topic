import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { isMatch } from 'date-fns';

const VALID_DATE_FORMATS = ['MM-dd-yyyy', 'MM/dd/yyyy'];

@ValidatorConstraint({ async: false })
export class IsValidDateFormatConstraint implements ValidatorConstraintInterface {
  validate(dateStr: string): boolean {
    if (!dateStr) return false;

    for (const format of VALID_DATE_FORMATS) {
      if (isMatch(dateStr, format)) return true;
    }
    return false;
  }
}

/**
 *
 * @returns true if the date format is mm/dd/yyyy or mm-dd-yyyy
 */
export function IsValidDateFormat(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: {
        ...validationOptions,
        message: `${propertyName} must be in format mm/dd/yyyy | mm-dd-yyyy`,
      },
      constraints: [],
      validator: IsValidDateFormatConstraint,
    });
  };
}
