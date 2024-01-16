import { RequestLog, ResponseLog } from '../@types';
import { typeOf } from '../utils';

export const PredicateHelper = {
  isRequestLog(requestLog: RequestLog): requestLog is RequestLog {
    if (
      typeOf(requestLog) === 'Object' &&
      typeOf(requestLog.request) === 'Object' &&
      typeOf(requestLog.request.id) === 'String' &&
      typeOf(requestLog.request.body) === 'Object' &&
      typeOf(requestLog.request.headers) === 'Object' &&
      typeOf(requestLog.request.method) === 'String' &&
      typeOf(requestLog.request.path) === 'String'
    ) {
      return true;
    }

    return false;
  },

  isResponseLog(responseLog: ResponseLog): responseLog is ResponseLog {
    if (
      typeOf(responseLog) === 'Object' &&
      typeOf(responseLog.request) === 'Object' &&
      typeOf(responseLog.request.id) === 'String' &&
      typeOf(responseLog.response) === 'Object' &&
      responseLog.response.data &&
      typeOf(responseLog.response.message) === 'String' &&
      typeOf(responseLog.response.process_time) === 'String' &&
      typeOf(responseLog.response.status_code) === 'Number'
    ) {
      return true;
    }

    return false;
  },
};
