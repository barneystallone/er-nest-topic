import { SuccessResponse } from '@/common/helpers';
import { LOG_TYPES } from '../enums';

export interface ResponseLog {
  request: {
    id: string;
  };

  response: SuccessResponse<any> & { process_time: string };
}

export interface RequestLog {
  request: {
    id: string;
    method: string;
    path: string;
    headers: object;
    body: object;
  };
}

export interface ErrorLog {
  request: { id: string };
  error: Record<string, any>;
  trace?: string;
}

export interface LogFormat {
  readonly [LOG_TYPES.REQUEST]: (prefix: string, message: any) => string;
  readonly [LOG_TYPES.ERROR]: (prefix: string, message: any) => string;
  readonly [LOG_TYPES.RESPONSE]: (prefix: string, message: any) => string;
}
