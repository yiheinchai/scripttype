/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Any/Promise.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type Promise<A extends any> =
    globalThis.Promise<
        A extends globalThis.Promise<infer X>
        ? X
        : A
    >
