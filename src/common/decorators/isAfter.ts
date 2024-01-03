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
export class IsAfterConstraint implements ValidatorConstraintInterface {
  validate(dateStr: string, args: ValidationArguments) {
    const referenceProperty = args.object[args.constraints[0]] satisfies string;
    return +new Date(dateStr) > +new Date(referenceProperty);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} can not before ${args.constraints[0]}.`;
  }
}

/**
 *
 * @param referenceProperty : the object property want to compare with the current one
 */
export const IsAfter = (
  referenceProperty: string,
  options?: ValidationOptions,
): PropertyDecorator => {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: options,
      constraints: [referenceProperty],
      validator: IsAfterConstraint,
    });
  };
};
