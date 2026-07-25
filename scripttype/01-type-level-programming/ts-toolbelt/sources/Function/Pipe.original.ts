/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Function/Pipe.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Input<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IntersectOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Mode<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PipeListAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PipeListSync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PipeMultiAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PipeMultiSync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Pipe<mode extends Mode = 'sync', input extends Input = 'multi'> = IntersectOf<{
    'sync' : {
        'multi': PipeMultiSync
        'list' : PipeListSync
    }
    'async': {
        'multi': PipeMultiAsync
        'list' : PipeListAsync
    }
}[mode][input]>
