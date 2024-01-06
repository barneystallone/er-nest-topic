import { PredicateHelper } from '@/common/helpers/predicate.helper';
import { LOG_TYPES, LogFormat } from '../@types';

export const LogFormatHelper: LogFormat = {
  [LOG_TYPES.REQUEST]: (prefix: string, message: any) => {
    if (PredicateHelper.isRequestLog(message)) {
      const { id, method, path, headers, body } = message.request;
      return (
        prefix +
        ` requestId=${id} ${method} ${path} headers=${JSON.stringify(
          headers,
        )} body=${JSON.stringify(body)}`
      );
    }

    return prefix + ` ${JSON.stringify(message)}`;
  },
  [LOG_TYPES.ERROR]: (prefix: string, message: any) => {
    return prefix + ` ${JSON.stringify(message)}`;
  },

  [LOG_TYPES.RESPONSE]: (prefix: string, message: any) => {
    if (PredicateHelper.isResponseLog(message)) {
      return (
        prefix + ` requestId=${message.request.id} response=${JSON.stringify(message.response)} `
      );
    }

    return prefix + `  body=${JSON.stringify(message)}`;
  },
};

Object.freeze(LogFormatHelper);
