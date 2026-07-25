export type LeastUpperBound<a, b> = b extends a ? b : a extends b ? a : never;
