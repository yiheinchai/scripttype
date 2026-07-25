/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/async-return-type.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Awaited<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PromiseLike<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReturnType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type AsyncFunction = (...arguments_: any[]) => PromiseLike<unknown>;

export type AsyncReturnType<Target extends AsyncFunction> = Awaited<ReturnType<Target>>;
