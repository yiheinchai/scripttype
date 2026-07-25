/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/regex/parse.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Anchor<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnchorMarker<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Backslash<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Capitalize<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ErrorMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Lowercase<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QuantifyingChar<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Scanner<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type State<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnionTree<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Uppercase<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type parseBuiltinQuantifier<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type parseCharset<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type parseEscape<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type parseGroup<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type parsePossibleRange<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type maybeSplitCasing<caseInsensitive extends boolean, char extends string> =
	caseInsensitive extends false ? char
	: Lowercase<char> extends Uppercase<char> ? char
	: UnionTree<[Lowercase<char>, Capitalize<char>]>

export type next<s extends State> =
	s["unscanned"] extends Scanner.shift<infer lookahead, infer unscanned> ?
		lookahead extends "." ? s.shiftQuantifiable<s, string, unscanned>
		: lookahead extends Backslash ? parseEscape<s, unscanned>
		: lookahead extends "|" ? s.finalizeBranch<s, unscanned>
		: lookahead extends Anchor ? s.anchor<s, AnchorMarker<lookahead>, unscanned>
		: lookahead extends "(" ? parseGroup<s, unscanned>
		: lookahead extends ")" ? s.popGroup<s, unscanned>
		: lookahead extends QuantifyingChar ?
			parseBuiltinQuantifier<s, lookahead, unscanned>
		: lookahead extends "{" ? parsePossibleRange<s, unscanned>
		: lookahead extends "[" ? parseCharset<s, unscanned>
		: s.shiftQuantifiable<
				s,
				maybeSplitCasing<s["caseInsensitive"], lookahead>,
				unscanned
			>
	:	never

export type parseState<s extends State> =
	s["unscanned"] extends ErrorMessage ? s["unscanned"]
	: s["unscanned"] extends "" ? s.finalize<s>
	: parseState<next<s>>
