/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/type/parser/ast/default.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ErrorMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnitLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type astToString<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferAstIn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type type<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type validateAst<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type writeUnassignableDefaultValueMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type validateDefault<baseAst, unitLiteral extends UnitLiteral, $, args> =
	validateAst<baseAst, $, args> extends infer e extends ErrorMessage ? e
	: // check against the output of the type since morphs will not occur
	//  ambient infer is safe since the default value is always a literal
	type.infer<unitLiteral> extends inferAstIn<baseAst, $, args> ? undefined
	: ErrorMessage<
			writeUnassignableDefaultValueMessage<astToString<baseAst>, unitLiteral>
		>
