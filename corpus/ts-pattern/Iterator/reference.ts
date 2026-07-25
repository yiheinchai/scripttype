export type Iterator<
  n extends number,
  it extends any[] = []
> = it['length'] extends n ? it : Iterator<n, [any, ...it]>;
