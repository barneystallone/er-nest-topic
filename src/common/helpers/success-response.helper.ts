import { translate } from '@/lib';
import { HTTP_STATUS_CODE } from '../@types';

export type Data = Record<string, any> | Record<string, any>[];
/**
 * @see https://docs.google.com/spreadsheets/d/1E00EAiQ_OvmwJDmjUwNJaruzasgwLeurWhjmqICXxSg/edit#gid=1804413305
 */
export class SuccessResponse<T extends Data> {
  constructor(
    public data: T,
    public message: string = translate('http.messages.OK') as unknown as string,
    public status_code: HTTP_STATUS_CODE = HTTP_STATUS_CODE.OK,
  ) {
    // if (!data) throw new BadRequestException();
    // this.data =  data };
  }
}

export class OK<T extends Data> extends SuccessResponse<T> {
  constructor(
    data: T,
    public message: string = translate('http.messages.OK') as unknown as string,
  ) {
    super(data, message, HTTP_STATUS_CODE.OK);
  }
}

export class CREATED<T extends Data> extends SuccessResponse<T> {
  constructor(
    data: T,
    public message: string = translate('http.messages.CREATED') as unknown as string,
  ) {
    super(data, message, HTTP_STATUS_CODE.CREATED);
  }
}
export class NoContent<T extends Data> extends SuccessResponse<T> {
  constructor(
    data: T,
    public message: string = translate('http.messages.NO_CONTENT') as unknown as string,
  ) {
    super(data, message, HTTP_STATUS_CODE.NO_CONTENT);
  }
}
