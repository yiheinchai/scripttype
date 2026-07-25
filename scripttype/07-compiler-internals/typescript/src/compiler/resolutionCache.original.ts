/**
 * ORIGINAL TypeScript from 07-compiler-internals/typescript/src/compiler/resolutionCache.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Path<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ResolutionWithResolvedFileName<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface ResolutionWithFailedLookupLocations {
    failedLookupLocations?: string[];
    affectingLocations?: string[];
    isInvalidated?: boolean;
    // Files that have this resolution using
    files?: Set<Path>;
    alternateResult?: string;
}

export type GetResolutionWithResolvedFileName<T extends ResolutionWithFailedLookupLocations = ResolutionWithFailedLookupLocations, R extends ResolutionWithResolvedFileName = ResolutionWithResolvedFileName> = (resolution: T) => R | undefined;
