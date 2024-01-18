export const ERROR_CASE = {
  USER_NOT_AUTHORIZIED: 'CUS-0403',
  USER_TOKEN_EXPIRES: 'CUS-0405',
  INVALID_PARAMETER_VALIDATION: 'CUS-0603',
  ACCESS_DENIED: 'CUS-0604',
  INTERNAL_SERVER_ERROR: 'CUS-0500',
  RESOURCE_NOT_FOUND: 'CUS-0602',
  BAD_REQUEST: 'CUS-0605',
} as const;

// SERVER_ERROR.CUS_0403
// ERROR_CASE.USER_NOT_AUTHORIZIED
export const SERVER_ERROR = {
  [ERROR_CASE.USER_NOT_AUTHORIZIED]: {
    errorId: ERROR_CASE.USER_NOT_AUTHORIZIED,
    statusCode: 401,
    code: 'UNAUTHORIZED_ACCESS',
  },
  [ERROR_CASE.USER_TOKEN_EXPIRES]: {
    errorId: ERROR_CASE.USER_TOKEN_EXPIRES,
    statusCode: 401,
    code: 'UNAUTHORIZED_ACCESS',
  },
  [ERROR_CASE.INVALID_PARAMETER_VALIDATION]: {
    errorId: ERROR_CASE.INVALID_PARAMETER_VALIDATION,
    statusCode: 400,
    code: 'UNAUTHORIZED_ACCESS',
  },
  [ERROR_CASE.ACCESS_DENIED]: {
    errorId: ERROR_CASE.ACCESS_DENIED,
    statusCode: 403,
    code: 'METHOD_NOT_ALLOWED',
  },
  [ERROR_CASE.INTERNAL_SERVER_ERROR]: {
    errorId: ERROR_CASE.INTERNAL_SERVER_ERROR,
    statusCode: 500,
    code: 'INTERNAL_SERVER_ERROR',
  },
  [ERROR_CASE.RESOURCE_NOT_FOUND]: {
    errorId: ERROR_CASE.RESOURCE_NOT_FOUND,
    statusCode: 404,
    code: 'OBJECT_NOT_FOUND',
  },
  [ERROR_CASE.BAD_REQUEST]: {
    errorId: ERROR_CASE.BAD_REQUEST,
    statusCode: 400,
    code: 'BAD_REQUEST',
  },
} as const;

export type ServerError = typeof SERVER_ERROR;
export type ErrorCase = typeof ERROR_CASE;
export type ErrorAppCode = ServerError[keyof ServerError]['code'];
export type StatusCode = ServerError[keyof ServerError]['statusCode'];
export type ErrorId = (typeof ERROR_CASE)[keyof typeof ERROR_CASE];

Object.freeze(ERROR_CASE);
Object.freeze(SERVER_ERROR);
