/**
 * ORIGINAL TypeScript from 01-type-level-programming/hotscript/src/internals/strings/impl/replace.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type Replace<
  Str,
  From extends string,
  To extends string
> = Str extends string
  ? Str extends `${infer Before}${From}${infer After}`
    ? Replace<`${Before}${To}${After}`, From, To>
    : Str
  : Str;
