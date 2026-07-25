/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/type/parser/reduce/static.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BranchOperator<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Comparator<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Completion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ErrorMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FinalizingLookahead<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InvertedComparators<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type LimitLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MaxComparator<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MinComparator<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type OpenLeftBound<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StringifiablePrefixOperator<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type defined<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type writeMultipleLeftBoundsMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type writeOpenRangeMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type writeUnclosedGroupMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type writeUnmatchedGroupCloseMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type writeUnpairableComparatorMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type BranchState = {
	prefixes: StringifiablePrefixOperator[]
	leftBound: OpenLeftBound | undefined
	intersection: unknown
	pipe: unknown
	union: unknown
}

export type StaticState = {
	root: unknown
	branches: BranchState
	groups: BranchState[]
	finalizer: FinalizingLookahead | ErrorMessage | undefined
	scanned: string
	unscanned: string
}

export type from<s extends StaticState> = s

export type branchesFrom<b extends BranchState> = b

export type initialBranches = branchesFrom<{
		prefixes: []
		leftBound: undefined
		intersection: undefined
		pipe: undefined
		union: undefined
	}>

export type initialize<def extends string> = from<{
		root: undefined
		branches: initialBranches
		groups: []
		finalizer: undefined
		scanned: ""
		unscanned: def
	}>

export type error<message extends string> = from<{
		root: ErrorMessage<message>
		branches: initialBranches
		groups: []
		finalizer: ErrorMessage<message>
		scanned: ""
		unscanned: ""
	}>

export type completion<text extends string> = from<{
		root: Completion<text>
		branches: initialBranches
		groups: []
		finalizer: Completion<text>
		scanned: ""
		unscanned: ""
	}>

export type updateScanned<
		previousScanned extends string,
		previousUnscanned extends string,
		updatedUnscanned extends string
	> =
		previousUnscanned extends `${infer justScanned}${updatedUnscanned}` ?
			`${previousScanned}${justScanned}`
		:	previousScanned

export type setRoot<
		s extends StaticState,
		root,
		unscanned extends string = s["unscanned"]
	> = from<{
		root: root
		branches: s["branches"]
		groups: s["groups"]
		finalizer: s["finalizer"]
		scanned: updateScanned<s["scanned"], s["unscanned"], unscanned>
		unscanned: unscanned
	}>

export type addPrefix<
		s extends StaticState,
		prefix extends StringifiablePrefixOperator,
		unscanned extends string = s["unscanned"]
	> = from<{
		root: s["root"]
		branches: {
			prefixes: [...s["branches"]["prefixes"], prefix]
			leftBound: s["branches"]["leftBound"]
			intersection: s["branches"]["intersection"]
			pipe: s["branches"]["pipe"]
			union: s["branches"]["union"]
		}
		groups: s["groups"]
		finalizer: s["finalizer"]
		scanned: updateScanned<s["scanned"], s["unscanned"], unscanned>
		unscanned: unscanned
	}>

export type openRangeError<range extends defined<BranchState["leftBound"]>> =
		s.error<writeOpenRangeMessage<range["limit"], range["comparator"]>>

export type mergePrefixes<
		s extends StaticState,
		remaining extends unknown[] = s["branches"]["prefixes"]
	> =
		remaining extends [infer head, ...infer tail] ?
			[head, mergePrefixes<s, tail>]
		:	s["root"]

export type mergeToIntersection<s extends StaticState> =
		s["branches"]["intersection"] extends undefined ? mergePrefixes<s>
		:	[s["branches"]["intersection"], "&", mergePrefixes<s>]

export type mergeToUnion<s extends StaticState> =
		s["branches"]["union"] extends undefined ? mergeToIntersection<s>
		:	[s["branches"]["union"], "|", mergeToIntersection<s>]

export type mergeToPipe<s extends StaticState> =
		s["branches"]["pipe"] extends undefined ? mergeToUnion<s>
		:	[s["branches"]["pipe"], "|>", mergeToUnion<s>]

export type reduceBranch<
		s extends StaticState,
		token extends BranchOperator,
		unscanned extends string
	> =
		s["branches"]["leftBound"] extends {} ?
			openRangeError<s["branches"]["leftBound"]>
		:	from<{
				root: undefined
				branches: {
					prefixes: []
					leftBound: undefined
					intersection: token extends "&" ? mergeToIntersection<s> : undefined
					union: token extends "|" ? mergeToUnion<s>
					: token extends "|>" ? undefined
					: s["branches"]["union"]
					pipe: token extends "|>" ? mergeToPipe<s> : s["branches"]["pipe"]
				}
				groups: s["groups"]
				finalizer: s["finalizer"]
				scanned: updateScanned<s["scanned"], s["unscanned"], unscanned>
				unscanned: unscanned
			}>

export type reduceLeftBound<
		s extends StaticState,
		limit extends LimitLiteral,
		comparator extends Comparator,
		unscanned extends string
	> =
		comparator extends "<" | "<=" ?
			s["branches"]["leftBound"] extends {} ?
				s.error<
					writeMultipleLeftBoundsMessage<
						s["branches"]["leftBound"]["limit"],
						s["branches"]["leftBound"]["comparator"],
						limit,
						InvertedComparators[comparator]
					>
				>
			:	from<{
					root: undefined
					branches: {
						prefixes: s["branches"]["prefixes"]
						leftBound: {
							limit: limit
							comparator: InvertedComparators[comparator]
						}
						intersection: s["branches"]["intersection"]
						pipe: s["branches"]["pipe"]
						union: s["branches"]["union"]
					}
					groups: s["groups"]
					finalizer: s["finalizer"]
					scanned: updateScanned<s["scanned"], s["unscanned"], unscanned>
					unscanned: unscanned
				}>
		:	s.error<writeUnpairableComparatorMessage<comparator>>

export type reduceRange<
		s extends StaticState,
		minLimit extends LimitLiteral,
		minComparator extends MinComparator,
		maxComparator extends MaxComparator,
		maxLimit extends LimitLiteral,
		unscanned extends string
	> = s.from<{
		root: [minLimit, minComparator, [s["root"], maxComparator, maxLimit]]
		branches: {
			prefixes: s["branches"]["prefixes"]
			leftBound: undefined
			intersection: s["branches"]["intersection"]
			pipe: s["branches"]["pipe"]
			union: s["branches"]["union"]
		}
		groups: s["groups"]
		finalizer: s["finalizer"]
		scanned: updateScanned<s["scanned"], s["unscanned"], unscanned>
		unscanned: unscanned
	}>

export type reduceSingleBound<
		s extends StaticState,
		comparator extends Comparator,
		limit extends number | string,
		unscanned extends string
	> = s.from<{
		root: [s["root"], comparator, limit]
		branches: {
			prefixes: s["branches"]["prefixes"]
			leftBound: undefined
			intersection: s["branches"]["intersection"]
			pipe: s["branches"]["pipe"]
			union: s["branches"]["union"]
		}
		groups: s["groups"]
		finalizer: s["finalizer"]
		scanned: updateScanned<s["scanned"], s["unscanned"], unscanned>
		unscanned: unscanned
	}>

export type popGroup<stack extends BranchState[], top extends BranchState> = [
		...stack,
		top
	]

export type finalizeGroup<s extends StaticState, unscanned extends string> =
		s["branches"]["leftBound"] extends {} ?
			openRangeError<s["branches"]["leftBound"]>
		: s["groups"] extends popGroup<infer stack, infer top> ?
			from<{
				groups: stack
				branches: top
				root: mergeToPipe<s>
				finalizer: s["finalizer"]
				scanned: updateScanned<s["scanned"], s["unscanned"], unscanned>
				unscanned: unscanned
			}>
		:	s.error<writeUnmatchedGroupCloseMessage<")", unscanned>>

export type reduceGroupOpen<
		s extends StaticState,
		unscanned extends string
	> = from<{
		groups: [...s["groups"], s["branches"]]
		branches: initialBranches
		root: undefined
		finalizer: s["finalizer"]
		scanned: updateScanned<s["scanned"], s["unscanned"], unscanned>
		unscanned: unscanned
	}>

export type finalize<
		s extends StaticState,
		finalizer extends FinalizingLookahead
	> =
		s["groups"] extends [] ?
			s["branches"]["leftBound"] extends {} ?
				openRangeError<s["branches"]["leftBound"]>
			:	from<{
					root: mergeToPipe<s>
					groups: s["groups"]
					branches: initialBranches
					finalizer: finalizer
					scanned: s["scanned"]
					unscanned: s["unscanned"]
				}>
		:	s.error<writeUnclosedGroupMessage<")">>

export type previousOperator<s extends StaticState> =
		s["branches"]["leftBound"] extends {} ?
			s["branches"]["leftBound"]["comparator"]
		: s["branches"]["prefixes"] extends (
			[...unknown[], infer tail extends string]
		) ?
			tail
		: s["branches"]["intersection"] extends {} ? "&"
		: s["branches"]["union"] extends {} ? "|"
		: undefined

export type scanTo<s extends StaticState, unscanned extends string> = from<{
		root: s["root"]
		branches: s["branches"]
		groups: s["groups"]
		finalizer: s["finalizer"]
		scanned: updateScanned<s["scanned"], s["unscanned"], unscanned>
		unscanned: unscanned
	}>
