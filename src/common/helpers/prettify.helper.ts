/**
 * @see https://www.youtube.com/watch?v=AhzjPAtzGTs&list=PLIvujZeVDLMx040-j1W4WFs1BxuTGdI_b&index=15
 */

export type Prettify<T> = {
  [K in keyof T]: T[K];
  // eslint-disable-next-line @typescript-eslint/ban-types
} & {};

// eslint-disable-next-line @typescript-eslint/ban-types
export type DeepPartial<T> = T extends Function
  ? T
  : T extends Array<infer InfferedArrayItem>
    ? DeepPartialArray<InfferedArrayItem>
    : T extends object
      ? DeepPartialObject<T>
      : T | undefined;

interface DeepPartialArray<T> extends Array<DeepPartial<T>> {}
type DeepPartialObject<T> = { [K in keyof T]?: DeepPartial<T[K]> };
