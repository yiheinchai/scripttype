/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/override-properties.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Merge<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Partial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type OverrideProperties<
	TOriginal,
	// This first bit where we use `Partial` is to enable autocomplete
	// and the second bit with the mapped type is what enforces that we don't try
	// to override properties that doesn't exist in the original type.
	TOverride extends Partial<Record<keyof TOriginal, unknown>> & {
		[Key in keyof TOverride]: Key extends keyof TOriginal
			? TOverride[Key]
			: never;
	},
> = Merge<TOriginal, TOverride>;
