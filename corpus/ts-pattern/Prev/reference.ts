export type Prev<it extends any[]> = it extends readonly [any, ...infer tail]
  ? tail
  : [];
