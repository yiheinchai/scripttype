/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/valibot/library/src/actions/readonly/readonly.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Readonly<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyMap<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlySet<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ReadonlyOutput<TInput> =
  TInput extends Map<infer TKey, infer TValue>
    ? ReadonlyMap<TKey, TValue>
    : TInput extends Set<infer TValue>
      ? ReadonlySet<TValue>
      : Readonly<TInput>;
