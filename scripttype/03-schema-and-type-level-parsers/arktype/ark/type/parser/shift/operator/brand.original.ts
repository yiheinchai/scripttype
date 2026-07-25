/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/type/parser/shift/operator/brand.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Scanner<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StaticState<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TerminatingChar<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type emptyBrandNameMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type parseBrand<s extends StaticState, unscanned extends string> =
	Scanner.shiftUntil<
		Scanner.skipWhitespace<unscanned>,
		TerminatingChar
	> extends Scanner.shiftResult<`${infer brandName}`, infer nextUnscanned> ?
		brandName extends "" ?
			s.error<emptyBrandNameMessage>
		:	s.setRoot<s, [s["root"], "#", brandName], nextUnscanned>
	:	never
