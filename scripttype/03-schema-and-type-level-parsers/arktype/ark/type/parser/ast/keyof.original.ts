/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/type/parser/ast/keyof.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ErrorMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferAstRoot<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type typeToString<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type validateAst<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type writeNonStructuralOperandMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type validateKeyof<operandAst, $, args> =
	inferAstRoot<operandAst, $, args> extends infer data ?
		[data] extends [object] ?
			validateAst<operandAst, $, args>
		:	ErrorMessage<writeNonStructuralOperandMessage<"keyof", typeToString<data>>>
	:	never
