/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/type/parser/ast/divisor.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ErrorMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferredMorph<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferAstRoot<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type validateAst<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type writeConstrainedMorphMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type writeIndivisibleMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type validateDivisor<l, $, args> =
	inferAstRoot<l, $, args> extends infer data ?
		[data] extends [number] ? validateAst<l, $, args>
		: [data] extends [InferredMorph] ?
			ErrorMessage<writeConstrainedMorphMessage<l>>
		:	ErrorMessage<writeIndivisibleMessage<data>>
	:	never
