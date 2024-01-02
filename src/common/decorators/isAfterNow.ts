import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

/**
 * @see https://github.com/typestack/class-validator?tab=readme-ov-file#custom-validation-decorators
 */

@ValidatorConstraint({ async: false })
export class IsAfterNowConstraint implements ValidatorConstraintInterface {
  validate(dateStr: string) {
    return +new Date(dateStr) > +new Date();
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} can not before now.`;
  }
}

export const IsAfterNow = (options?: ValidationOptions): PropertyDecorator => {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: options,
      constraints: [],
      validator: IsAfterNowConstraint,
    });
  };
};
