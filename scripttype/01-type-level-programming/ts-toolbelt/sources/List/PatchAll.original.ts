/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/List/PatchAll.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BuiltIn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Cast<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Depth<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type List<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type OPatchAll<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type PatchAll<O extends List, Ls extends List<List>, depth extends Depth = 'flat', ignore extends object = BuiltIn, fill extends any = never> =
    Cast<OPatchAll<O, Ls, depth, ignore, fill>, List>
