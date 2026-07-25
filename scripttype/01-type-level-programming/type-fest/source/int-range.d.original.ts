/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/int-range.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Subtract<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TupleOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type PrivateIntRange<
	Start extends number,
	End extends number,
	Step extends number,
	// The gap between each number, gap = step - 1
	Gap extends number = Subtract<Step, 1>,
	// The final `List` is `[...StartLengthTuple, ...[number, ...GapLengthTuple], ...[number, ...GapLengthTuple], ... ...]`, so can initialize the `List` with `[...StartLengthTuple]`
	List extends unknown[] = TupleOf<Start, never>,
	EndLengthTuple extends unknown[] = TupleOf<End>,
> = Gap extends 0
	// Handle the case that without `Step`
	? List['length'] extends End // The result of "List[length] === End"
		? Exclude<List[number], never> // All unused elements are `never`, so exclude them
		: PrivateIntRange<Start, End, Step, Gap, [...List, List['length'] ]>
	// Handle the case that with `Step`
	: List extends [...(infer U), ...EndLengthTuple] // The result of "List[length] >= End", because the `...TupleOf<Gap, never>` maybe make `List` too long.
		? Exclude<List[number], never>
		: PrivateIntRange<Start, End, Step, Gap, [...List, List['length'], ...TupleOf<Gap, never>]>;

export type IntRange<Start extends number, End extends number, Step extends number = 1> = PrivateIntRange<Start, End, Step>;
