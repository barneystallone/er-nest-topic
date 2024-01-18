import { Reflector } from '@nestjs/core';
import { ErrorId } from '../@types';

export const ValidationErrorId = Reflector.createDecorator<ErrorId>();
