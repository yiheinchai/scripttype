/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Function/Compose.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ComposeListAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ComposeListSync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ComposeMultiAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ComposeMultiSync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Input<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IntersectOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Mode<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Compose<mode extends Mode = 'sync', input extends Input = 'multi'> = IntersectOf<{
    'sync' : {
        'multi': ComposeMultiSync
        'list' : ComposeListSync
    }
    'async': {
        'multi': ComposeMultiAsync
        'list' : ComposeListAsync
    }
}[mode][input]>
