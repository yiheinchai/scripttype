/**
 * ORIGINAL TypeScript from 01-type-level-programming/hotscript/src/internals/strings/impl/utils.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Add<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Mul<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Iter = [string, number | bigint];

export type Iterator = [Iter, ...Iter[]];

export type String<It extends Iterator> = It[0][0];

export type Value<It extends Iterator> = It[0][1];

export type Size<It extends Iterator> = It["length"];

export type Next<It extends Iterator> = [
    [`${String<It>}${string}`, Add<Value<It>, 1>],
    ...It
  ];

export type Prev<It extends Iterator> = It extends [
    unknown,
    ...infer Rest extends Iterator
  ]
    ? Rest
    : undefined;

export type Double<It extends Iterator> =
    `${String<It>}_` extends `$${infer pattern}`
      ? `${String<It>}${pattern}` extends `${infer double}_`
        ? [[double, Mul<Value<It>, 2>], ...It]
        : never
      : never;

export type CutAt<
    T extends string,
    It extends Iterator
  > = `$${T}` extends `${String<It>}${infer $Rest}` ? $Rest : undefined;
