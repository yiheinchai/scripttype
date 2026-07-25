/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/snake-cased-properties.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ApplyDefaultOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DelimiterCasedProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type WordsOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type _DefaultDelimiterCaseOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type SnakeCasedProperties<
	Value,
	Options extends WordsOptions = {},
> = DelimiterCasedProperties<Value, '_', ApplyDefaultOptions<WordsOptions, _DefaultDelimiterCaseOptions, Options>>;
