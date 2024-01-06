export type AllTypes =
  | 'Object'
  | 'Array'
  | 'Number'
  | 'Boolean'
  | 'Undefined'
  | 'Null'
  | 'Date'
  | 'Function'
  | 'String';

export const typeOf = (data: unknown): AllTypes =>
  Object.prototype.toString.call(data).slice(8, -1);
