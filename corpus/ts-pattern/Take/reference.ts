export type Length<it extends readonly any[]> = it['length'];

export type Prev<it extends any[]> = it extends readonly [any, ...infer tail]
  ? tail
  : [];

export type Take<
  xs extends readonly any[],
  it extends any[],
  output extends any[] = []
> = Length<it> extends 0
  ? output
  : xs extends readonly [infer head, ...infer tail]
  ? Take<tail, Prev<it>, [...output, head]>
  : output;
