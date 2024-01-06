import { Logger } from '@nestjs/common';
import { readFileSync } from 'fs';
import { typeOf } from '../utils';
import { AppHelper } from './app.helper';

const KEYWORD_CONFIG_PATH = `${AppHelper.getRootDir()}/resources/sensitive-keyword.json`;
const logger = new Logger('DataMaskingHelper');

type ObjectOrArray = Record<string, any> | any[];

export class DataMaskingHelper {
  static keywordRegistry: string[] = [];

  static readonly maskStrategies = {
    String: DataMaskingHelper.maskString,
    Object: DataMaskingHelper.maskObjectAndArray,
    Array: DataMaskingHelper.maskObjectAndArray,
  };

  static registerKeywords(keywords: string | string[]): void {
    if (Array.isArray(keywords)) {
      DataMaskingHelper.keywordRegistry = [...DataMaskingHelper.keywordRegistry, ...keywords];
      return;
    }

    DataMaskingHelper.keywordRegistry = [...DataMaskingHelper.keywordRegistry, keywords];
  }

  /**
   * Check if a string contains  keywords (Case insensitive)
   * @example isSensitive('passWOrd is abcdb') === true
   */

  static isSensitive(str: string): boolean {
    for (const keyword of DataMaskingHelper.keywordRegistry) {
      const regexp = new RegExp(`.*${keyword}.*`, 'ig');
      if (regexp.test(str)) return true;
    }

    return false;
  }
  static maskData<T>(data: T): T {
    const allowedTypes = Object.keys(DataMaskingHelper.maskStrategies);
    const dataType = typeOf(data);

    return allowedTypes.indexOf(dataType) !== -1
      ? DataMaskingHelper.maskStrategies[dataType](data)
      : data;
  }

  static maskString(data: string): string {
    if (DataMaskingHelper.isSensitive(data)) {
      return '*********';
    }

    return data;
  }

  /**
   * @example input1 = {data:{ myPassword1: '1234' }, message: 'your CVV is 123', status_code: 200}
   * output1 = {data:{myPassword1: "*********"}, message: "*********", status_code: 200}
   *
   * @example input2 = [['abcdPassWORD123', 'abcd1234', 'acVVa'], 'secretKey is abc']
   * output2 = [['*********', 'abcd1234', '*********'], '*********']
   */

  static maskObjectAndArray<T extends ObjectOrArray>(
    data: T extends any[] ? any[] : Record<string, any>,
  ): T extends any[] ? any[] : Record<string, any> {
    const maskedData = Array.isArray(data) ? [...data] : { ...data };
    const keys = Object.keys(maskedData);

    keys.forEach((key) => {
      const value = maskedData[key];
      if ('ObjectArray'.includes(typeOf(value))) {
        maskedData[key] = DataMaskingHelper.maskObjectAndArray(value);
      }

      if (
        DataMaskingHelper.isSensitive(key) ||
        (typeOf(value) === 'String' && DataMaskingHelper.isSensitive(value))
      ) {
        maskedData[key] = '*********';
      }
    });

    return maskedData;
  }
}

const loadKeywords = () => {
  logger.debug('Load Sensitive keyword');
  try {
    const rawData = readFileSync(KEYWORD_CONFIG_PATH).toString();
    const sensitiveKeywords = JSON.parse(rawData);
    DataMaskingHelper.registerKeywords(sensitiveKeywords);
    logger.debug('Load OK');
  } catch (error) {
    logger.error('Load Failed');
  }
};

loadKeywords();
