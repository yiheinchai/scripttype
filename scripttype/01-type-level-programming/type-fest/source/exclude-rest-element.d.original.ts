/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/exclude-rest-element.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type IfNotAnyOrNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsArrayReadonly<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Readonly<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SplitOnRestElement<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnknownArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ExcludeRestElement<Array_ extends UnknownArray> = IfNotAnyOrNever<Array_, {
	ifNot: SplitOnRestElement<Array_> extends infer Result
		? Result extends readonly UnknownArray[]
			? IsArrayReadonly<Array_> extends true
				? Readonly<[...Result[0], ...Result[2]]>
				: [...Result[0], ...Result[2]]
			: never
		: never;
}>;
