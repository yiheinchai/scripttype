/**
 * ORIGINAL TypeScript from 01-type-level-programming/hotscript/src/internals/strings/impl/trim.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type TrimLeft<
  Str,
  Sep extends string
> = Str extends `${Sep}${infer Rest}` ? TrimLeft<Rest, Sep> : Str;

export type TrimRight<
  Str,
  Sep extends string
> = Str extends `${infer Rest}${Sep}` ? TrimRight<Rest, Sep> : Str;

export type Trim<Str, Sep extends string> = TrimLeft<TrimRight<Str, Sep>, Sep>;
