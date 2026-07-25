/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/abitype/packages/abitype/src/narrow.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type Narrow<type> =
  | (unknown extends type ? unknown : never)
  | (type extends Function ? type : never)
  | (type extends bigint | boolean | number | string ? type : never)
  | (type extends [] ? [] : never)
  | { [K in keyof type]: Narrow<type[K]> }
