/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/type/variants/instantiate.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ArrayType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type BaseType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DateType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NumberType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StringType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type anyOrNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type array<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type instantiateType<t, $> =
	// all branches have to conform to a single basis type those methods to be available
	[t] extends [anyOrNever] ? BaseType<t, $>
	: [t] extends [object] ?
		[t] extends [array] ? ArrayType<t, $>
		: [t] extends [Date] ? DateType<t, $>
		: ObjectType<t, $>
	: [t] extends [string] ? StringType<t, $>
	: [t] extends [number] ? NumberType<t, $>
	: BaseType<t, $>
