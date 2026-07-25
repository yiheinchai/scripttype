/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/regex/state.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ErrorMessage<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Flags<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IndexedCaptures<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type NamedCaptures<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type NumberLiteral<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Regex<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type RegexContext<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type UnnamedCaptureKind<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ZeroWidthSpace<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type contains<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type noSuggest<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type quantify<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type setIndex<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type unionKeyOf<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type writeUnmatchedGroupCloseMessage<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export interface FinalizationContext extends Required<RegexContext> {
	errors: ErrorMessage[]
}

export type FinalizationResult = {
	pattern: string
	ctx: FinalizationContext
}

export type from<r extends FinalizationResult> = r

export interface ReferenceNode<to extends string = string> {
	kind: "reference"
	to: to
}

export interface UnionTree<ast extends RegexAst[] = RegexAst[]> {
	kind: "union"
	ast: ast
}

export interface State extends State.Group {
	unscanned: string
	groups: State.Group[]
	/** the initial flags passed to the root of the expression */
	flags: Flags
}

export type CapturedGroupKind = string | State.UnnamedCaptureKind.indexed

export interface GroupTree<
	ast extends RegexAst = RegexAst,
	capture extends CapturedGroupKind = CapturedGroupKind
> {
	kind: "group"
	capture: capture
	ast: ast
}

export interface QuantifierTree<ast extends RegexAst = RegexAst> {
	kind: "quantifier"
	ast: ast
	min: number
	max: number | null
}

export type RegexAst =
	| string
	| ReferenceNode
	| UnionTree
	| SequenceTree
	| GroupTree
	| QuantifierTree

export interface SequenceTree<ast extends RegexAst[] = RegexAst[]> {
	kind: "sequence"
	ast: ast
}

export type initialize<source extends string, flags extends Flags> = from<{
		unscanned: source
		groups: []
		capture: never
		branches: []
		sequence: SequenceTree.Empty
		root: ""
		caseInsensitive: contains<flags, "i">
		flags: flags
	}>

export type CaptureKind = string | UnnamedCaptureKind

export type Group = {
		/** the name of the group or its kind */
		capture: CaptureKind
		branches: RegexAst[]
		sequence: RegexAst
		root: RegexAst
		caseInsensitive: boolean
	}

export type pop<init extends Group, last extends Group[]> = [...last, init]

export type finalizeTree<tree, ctx extends FinalizationContext> =
	tree extends string ?
		FinalizationResult.from<{
			pattern: tree
			ctx: ctx
		}>
	: tree extends SequenceTree ? SequenceTree.finalize<tree, ctx>
	: tree extends UnionTree ? UnionTree.finalize<tree, ctx>
	: tree extends GroupTree ? GroupTree.finalize<tree, ctx>
	: tree extends QuantifierTree ? QuantifierTree.finalize<tree, ctx>
	: tree extends ReferenceNode ? ReferenceNode.finalize<tree, ctx>
	: never

export type extractNewCaptures<
	base extends IndexedCaptures,
	result extends IndexedCaptures
> =
	result extends readonly [...base, ...infer elements extends IndexedCaptures] ?
		elements
	:	[]

export type finalizeNonZeroMinQuantified<
		self extends QuantifierTree,
		r extends FinalizationResult
	> = FinalizationResult.from<{
		pattern: quantify<r["pattern"], self["min"], self["max"]>
		ctx: r["ctx"]
	}>

export type zeroQuantifiedNames<
		base extends NamedCaptures,
		result extends NamedCaptures
	> = {
		[k in keyof result]: k extends keyof base ? result[k] : undefined
	} & unknown

export type finalizeZeroQuantified<
		ctx extends FinalizationContext,
		r extends FinalizationResult,
		quantifiedCaptures extends IndexedCaptures
	> = FinalizationResult.from<{
		pattern: ""
		ctx: {
			captures: [
				...ctx["captures"],
				...{
					[i in keyof quantifiedCaptures]: undefined
				}
			]
			flags: r["ctx"]["flags"]
			names: zeroQuantifiedNames<ctx["names"], r["ctx"]["names"]>
			errors: r["ctx"]["errors"]
		}
	}>

export type finalizeOnePlusQuantified<
		max extends number | null,
		r extends FinalizationResult
	> =
		max extends 1 ? r
		:	FinalizationResult.from<{
				// don't include 0 since it has been inferred separately
				pattern: quantify<r["pattern"], 1, max>
				ctx: r["ctx"]
			}>

export type finalizeZeroMinQuantifiedWithCaptures<
		self extends QuantifierTree,
		ctx extends FinalizationContext,
		r extends FinalizationResult,
		quantifiedCaptures extends IndexedCaptures
	> =
		| finalizeZeroQuantified<ctx, r, quantifiedCaptures>
		| finalizeOnePlusQuantified<self["max"], r>

export type finalizeQuantifierResult<
		self extends QuantifierTree,
		ctx extends FinalizationContext,
		r extends FinalizationResult,
		quantifiedCaptures extends IndexedCaptures = extractNewCaptures<
			ctx["captures"],
			r["ctx"]["captures"]
		>
	> =
		self["min"] extends 0 ?
			quantifiedCaptures extends [] ?
				finalizeNonZeroMinQuantified<self, r>
			:	finalizeZeroMinQuantifiedWithCaptures<self, ctx, r, quantifiedCaptures>
		:	finalizeNonZeroMinQuantified<self, r>

export type finalize<
		self extends QuantifierTree,
		ctx extends FinalizationContext
	> =
		finalizeTree<self["ast"], ctx> extends infer r extends FinalizationResult ?
			finalizeQuantifierResult<self, ctx, r>
		:	never

export type finalizeUnion<
			remaining extends RegexAst[],
			flattened extends RegexAst[]
		> =
			remaining extends (
				[infer head extends RegexAst, ...infer tail extends RegexAst[]]
			) ?
				head extends UnionTree<infer headBranches> ?
					finalizeUnion<tail, [...flattened, ...headBranches]>
				:	finalizeUnion<tail, [...flattened, head]>
			:	UnionTree<flattened>

export type Anchor = "^" | "$"

export type AnchorMarker<inner extends Anchor = Anchor> =
	`<${ZeroWidthSpace}${inner}${ZeroWidthSpace}>`

export type error<
		ctx extends FinalizationContext,
		message extends string
	> = from<{
		pattern: string
		ctx: {
			captures: ctx["captures"]
			names: ctx["names"]
			flags: ctx["flags"]
			errors: [...ctx["errors"], ErrorMessage<message>]
		}
	}>

export type appendNonRedundant<base extends string, suffix extends string> =
	string extends base ?
		string extends suffix ?
			string
		:	`${base}${suffix}`
	: // this is not generalizable, but arkregex uses `${number}`
	// to represent digits, so it is valid to merge them as `${number}`.
	`${number}` extends base ?
		`${number}` extends suffix ?
			`${number}`
		:	`${base}${suffix}`
	:	`${base}${suffix}`

export type pushToSequence<sequence extends SequenceTree, root extends RegexAst> =
	sequence extends SequenceTree.Empty ? root
	: root extends SequenceTree ?
		SequenceTree<[...sequence["ast"], ...root["ast"]]>
	:	SequenceTree<[...sequence["ast"], root]>

export type pushQuantifiable<sequence extends RegexAst, root extends RegexAst> =
	root extends "" ? sequence
	: sequence extends string ?
		sequence extends "" ? root
		: root extends string ? appendNonRedundant<sequence, root>
		: SequenceTree<[sequence, root]>
	: sequence extends SequenceTree ? pushToSequence<sequence, root>
	: SequenceTree<[sequence, root]>

export type shiftQuantifiable<
		s extends State,
		root extends RegexAst,
		unscanned extends string
	> = State.from<{
		unscanned: unscanned
		groups: s["groups"]
		capture: s["capture"]
		branches: s["branches"]
		sequence: pushQuantifiable<s["sequence"], s["root"]>
		root: root
		caseInsensitive: s["caseInsensitive"]
		flags: s["flags"]
	}>

export type pushQuantified<
		s extends State,
		quantified extends RegexAst,
		unscanned extends string
	> = State.from<{
		unscanned: unscanned
		groups: s["groups"]
		capture: s["capture"]
		branches: s["branches"]
		sequence: pushQuantifiable<s["sequence"], quantified>
		root: ""
		caseInsensitive: s["caseInsensitive"]
		flags: s["flags"]
	}>

export type pushQuantifier<
		s extends State,
		min extends number,
		max extends number | null,
		unscanned extends string
	> = State.from<{
		unscanned: unscanned
		groups: s["groups"]
		capture: s["capture"]
		branches: s["branches"]
		sequence: pushQuantifiable<
			s["sequence"],
			{
				kind: "quantifier"
				ast: s["root"]
				min: min
				max: max
			}
		>
		root: ""
		caseInsensitive: s["caseInsensitive"]
		flags: s["flags"]
	}>

export type FinalizedBranch = {
		pattern: string
		captures: IndexedCaptures
		names: NamedCaptures
	}

export type finalizeBranchCaptures<
		acc extends FinalizedBranch[],
		ctx extends FinalizationContext,
		r extends FinalizationResult,
		branchCaptures extends IndexedCaptures = extractNewCaptures<
			ctx["captures"],
			r["ctx"]["captures"]
		>
	> =
		acc extends [] ? branchCaptures
		: acc[0]["captures"] extends (
			infer firstCaptureBranch extends IndexedCaptures
		) ?
			branchCaptures extends [] ?
				{ [i in keyof firstCaptureBranch]: undefined }
			:	[...{ [i in keyof firstCaptureBranch]: undefined }, ...branchCaptures]
		:	never

export type finalizeBranch<
		acc extends FinalizedBranch[],
		ctx extends FinalizationContext,
		r extends FinalizationResult
	> = [
		...acc,
		FinalizedBranch.from<{
			pattern: r["pattern"]
			captures: finalizeBranchCaptures<acc, ctx, r>
			// undefined will be added to named captures as needed
			// by finalizeBranches since it can be done in one step
			names: r["ctx"]["names"]
		}>
	]

export type anchor<
		s extends State,
		a extends AnchorMarker,
		unscanned extends string
	> = State.from<{
		unscanned: unscanned
		groups: s["groups"]
		capture: s["capture"]
		branches: s["branches"]
		sequence: pushQuantifiable<s["sequence"], pushQuantifiable<s["root"], a>>
		root: ""
		caseInsensitive: s["caseInsensitive"]
		flags: s["flags"]
	}>

export type pushGroup<
		s extends State,
		capture extends string | State.UnnamedCaptureKind,
		unscanned extends string,
		caseInsensitive extends boolean | undefined
	> = State.from<{
		unscanned: unscanned
		groups: [...s["groups"], s]
		capture: capture
		branches: []
		sequence: SequenceTree.Empty
		root: ""
		caseInsensitive: caseInsensitive extends boolean ? caseInsensitive
		:	s["caseInsensitive"]
		flags: s["flags"]
	}>

export type popGroup<s extends State, unscanned extends string> =
		s["groups"] extends State.Group.pop<infer last, infer init> ?
			State.from<{
				unscanned: unscanned
				groups: init
				capture: last["capture"]
				branches: last["branches"]
				sequence: pushQuantifiable<last["sequence"], last["root"]>
				root: s["capture"] extends CapturedGroupKind ?
					GroupTree<State.Group.finalize<s>, s["capture"]>
				: s["capture"] extends State.UnnamedCaptureKind.lookaround ? ""
				: // non-capturing
					State.Group.finalize<s>
				caseInsensitive: last["caseInsensitive"]
				flags: s["flags"]
			}>
		:	s.error<writeUnmatchedGroupCloseMessage<")", unscanned>>

export type StartAnchorMarker = AnchorMarker<"^">

export type EndAnchorMarker = AnchorMarker<"$">

export type prependNonRedundant<base extends string, prefix extends string> =
	string extends base ?
		string extends prefix ?
			string
		:	`${prefix}${base}`
	: // this is not generalizable, but arkregex uses `${number}`
	// to represent digits, so it is valid to merge them as `${number}`.
	`${number}` extends base ?
		`${number}` extends prefix ?
			`${number}`
		:	`${prefix}${base}`
	:	`${prefix}${base}`

export type applyAnchors<pattern extends string> =
	pattern extends `${StartAnchorMarker}${infer startStripped}` ?
		startStripped extends `${infer bothStripped}${EndAnchorMarker}` ?
			bothStripped
		:	appendNonRedundant<startStripped, string>
	: pattern extends `${infer endStripped}${EndAnchorMarker}` ?
		prependNonRedundant<endStripped, string>
	:	prependNonRedundant<appendNonRedundant<pattern, string>, string>

export type IndexedCaptureOffset = noSuggest<"indexedCaptureOffset">

export type EmptyCaptures = [IndexedCaptureOffset]

export type finalizeContextWithoutCaptures<ctx extends FinalizationContext> =
		ctx["flags"] extends "" ? {}
		:	{
				flags: ctx["flags"]
			}

export type finalizeContextWithCaptures<ctx extends FinalizationContext> =
		keyof ctx["names"] extends never ?
			ctx["flags"] extends "" ?
				{ captures: ctx["captures"] }
			:	{ captures: ctx["captures"]; flags: ctx["flags"] }
		: ctx["flags"] extends "" ?
			{
				captures: ctx["captures"]
				names: ctx["names"]
			}
		:	{
				captures: ctx["captures"]
				names: ctx["names"]
				flags: ctx["flags"]
			}

export type finalizeContext<ctx extends FinalizationContext> =
		ctx["captures"] extends EmptyCaptures ? finalizeContextWithoutCaptures<ctx>
		:	finalizeContextWithCaptures<{
				// re-align 1-based indexing for capture groups to 0-based for
				// external display
				captures: ctx["captures"] extends (
					[IndexedCaptureOffset, ...infer rest extends IndexedCaptures]
				) ?
					rest
				:	never
				names: ctx["names"]
				flags: ctx["flags"]
				errors: ctx["errors"]
			}>

export type writeMidAnchorError<anchor extends Anchor> =
	`Anchor ${anchor} may not appear mid-pattern`

export type finalizeRegexOrError<r extends FinalizationResult> =
		r["ctx"]["errors"] extends [] ?
			applyAnchors<r["pattern"]> extends infer pattern extends string ?
				// check the negation in case pattern is a union in which some
				// branches contain invalid anchors
				contains<pattern, StartAnchorMarker> extends false ?
					contains<pattern, EndAnchorMarker> extends false ?
						Regex<pattern, finalizeContext<r["ctx"]>>
					:	ErrorMessage<writeMidAnchorError<"$">>
				:	ErrorMessage<writeMidAnchorError<"^">>
			:	never
		:	// if there were errors, return the first one
			r["ctx"]["errors"][0]

export type inferReference<to extends string | undefined> =
		to extends string ? to : ""

export type writeIncompleteReferenceError<ref extends string> =
	`Reference to incomplete group '${ref}' has no effect`

export type finalizeBranches<
		i,
		acc extends FinalizedBranch[],
		ctx extends FinalizationContext
	> =
		i extends keyof acc & NumberLiteral ?
			FinalizationResult.from<{
				pattern: acc[i]["pattern"]
				ctx: {
					flags: ctx["flags"]
					captures: [...ctx["captures"], ...acc[i]["captures"]]
					names: {
						[k in unionKeyOf<acc[number]["names"]>]: k extends (
							keyof acc[i]["names"]
						) ?
							acc[i]["names"][k]
						:	undefined
					}
					errors: ctx["errors"]
				}
			}>
		:	never

export type _finalize<
		astBranches extends unknown[],
		acc extends FinalizedBranch[],
		ctx extends FinalizationContext
	> =
		astBranches extends [infer head, ...infer tail] ?
			finalizeTree<head, ctx> extends infer r ?
				r extends FinalizationResult ?
					_finalize<tail, finalizeBranch<acc, ctx, r>, ctx>
				:	never
			:	never
		:	finalizeBranches<keyof acc, acc, ctx>

export type IncompleteCaptureGroup = noSuggest<"incompleteCaptureGroup">

export type finalizeGroupAst<
		self extends GroupTree,
		ctx extends FinalizationContext
	> = finalizeTree<
		self["ast"],
		self["capture"] extends string ?
			{
				// IncompleteCaptureGroup represents a capture group that is still being parsed
				// error on trying to reference it (will always be empty)
				captures: [...ctx["captures"], IncompleteCaptureGroup]
				names: ctx["names"] & { [_ in self["capture"]]: IncompleteCaptureGroup }
				flags: ctx["flags"]
				errors: ctx["errors"]
			}
		: self["capture"] extends State.UnnamedCaptureKind.indexed ?
			{
				captures: [...ctx["captures"], IncompleteCaptureGroup]
				names: ctx["names"]
				flags: ctx["flags"]
				errors: ctx["errors"]
			}
		:	ctx
	>

export type anchorsAway<pattern extends string> =
	pattern extends `${StartAnchorMarker}${infer startStripped}` ?
		startStripped extends `${infer bothStripped}${EndAnchorMarker}` ?
			bothStripped
		:	startStripped
	: pattern extends `${infer endStripped}${EndAnchorMarker}` ? endStripped
	: pattern

export type finalizeNamedCapture<
		name extends string,
		index extends number,
		pattern extends string,
		ctx extends FinalizationContext
	> = FinalizationContext.from<{
		// replace undefined (representing a group being parsed)
		// with the inferred reference
		captures: setIndex<ctx["captures"], index, anchorsAway<pattern>>
		names: {
			[k in keyof ctx["names"]]: k extends name ? anchorsAway<pattern>
			:	ctx["names"][k]
		}
		flags: ctx["flags"]
		errors: ctx["errors"]
	}>

export type finalizeUnnamedCapture<
		index extends number,
		pattern extends string,
		ctx extends FinalizationContext
	> = FinalizationContext.from<{
		captures: setIndex<ctx["captures"], index, anchorsAway<pattern>>
		names: ctx["names"]
		flags: ctx["flags"]
		errors: ctx["errors"]
	}>

export type finalizeGroupResult<
		self extends GroupTree,
		ctx extends FinalizationContext,
		r extends FinalizationResult
	> = FinalizationResult.from<{
		pattern: r["pattern"]
		ctx: self["capture"] extends string ?
			finalizeNamedCapture<
				self["capture"],
				ctx["captures"]["length"],
				r["pattern"],
				r["ctx"]
			>
		: self["capture"] extends State.UnnamedCaptureKind.indexed ?
			finalizeUnnamedCapture<ctx["captures"]["length"], r["pattern"], r["ctx"]>
		:	r["ctx"]
	}>
