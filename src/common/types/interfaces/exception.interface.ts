import { HttpStatus } from '@nestjs/common';
import { ErrorAppCode, ErrorId } from '../constants';

export interface CommonError {
  errorId: ErrorId;
  code: ErrorAppCode;
  title: string;
  message: string;
  statusCode?: HttpStatus;
}

export interface BaseError extends CommonError {
  errors?: ValidateError[];
}
export interface ValidateError extends CommonError {
  field?: string;
}

export interface ErrorResponse {
  error: BaseError;
}
