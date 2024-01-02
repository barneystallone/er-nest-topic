/**
 * @see https://docs.google.com/spreadsheets/d/1E00EAiQ_OvmwJDmjUwNJaruzasgwLeurWhjmqICXxSg/edit#gid=1063545474
 */
export enum HTTP_STATUS_CODE {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  REDIRECT = 302,
  INVALID_PARAMETER = 400,
  UNAUTHORIZED_ACCESS = 401,
  ACTION_NOT_ALLOWED = 403,
  OBJECT_NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  INTERNAL_SERVER_ERROR = 500,
  TIMEOUT = 503,
}

/**
 * @see https://docs.google.com/spreadsheets/d/1E00EAiQ_OvmwJDmjUwNJaruzasgwLeurWhjmqICXxSg/edit#gid=1063545474
 */
export enum APP_CODE {
  OK = 'OK',
  CREATED = 'CREATED',
  NO_CONTENT = 'NO_CONTENT',
  REDIRECT = 'REDIRECT',
  INVALID_PARAMETER = 'INVALID_PARAMETER',
  UNAUTHORIZED_ACCESS = 'UNAUTHORIZED_ACCESS',
  ACTION_NOT_ALLOWED = 'ACTION_NOT_ALLOWED',
  OBJECT_NOT_FOUND = 'OBJECT_NOT_FOUND',
  METHOD_NOT_ALLOWED = 'METHOD_NOT_ALLOWED',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  TIMEOUT = 'TIMEOUT',
}

/**
 * @see https://docs.google.com/spreadsheets/d/1E00EAiQ_OvmwJDmjUwNJaruzasgwLeurWhjmqICXxSg/edit#gid=1063545474
 */
// export enum HTTP_MESSAGE {
//   OK = 'Response with no error',
//   CREATED = 'Created',
//   NO_CONTENT = 'Response success with no content',
//   REDIRECT = 'Redirect',
//   INVALID_PARAMETER = 'Validation error',
//   UNAUTHORIZED_ACCESS = 'Unauthorized',
//   ACTION_NOT_ALLOWED = 'Access denied',
//   OBJECT_NOT_FOUND = 'Page not found, data not found',
//   METHOD_NOT_ALLOWED = 'Unsupported request',
//   INTERNAL_SERVER_ERROR = 'Internal server error',
//   TIMEOUT = 'API gateway timeout',
// }
