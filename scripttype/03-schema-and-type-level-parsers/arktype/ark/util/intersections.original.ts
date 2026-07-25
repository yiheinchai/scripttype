/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/util/intersections.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Extract<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Hkt<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type andPreserveUnknown<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type array<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type domainOf<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type propValueOf<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type requiredKeyOf<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export interface AndPreserveUnknown extends Hkt<[unknown, unknown]> {
	body: andPreserveUnknown<this[0], this[1]>
}

export type SequenceIntersectionKind = "array" | "parameters"

export type intersectSequences<
	l extends array,
	r extends array,
	acc extends array,
	postfix extends array,
	operation extends Hkt,
	kind extends SequenceIntersectionKind
> =
	l extends readonly [] ?
		// a longer array is assignable to a shorter one when treated as
		// parameters, but not when treated as a tuple
		kind extends "array" ?
			[] extends r ?
				[...acc, ...postfix]
			:	never
		:	[...acc, ...r, ...postfix]
	: r extends readonly [] ?
		kind extends "array" ?
			[] extends l ?
				[...acc, ...postfix]
			:	never
		:	[...acc, ...l, ...postfix]
	: // credit to @alexandroppolus for this part of the implementation
	// https://github.com/type-challenges/type-challenges/issues/33210
	[l, r] extends (
		[
			readonly [(infer lHead)?, ...infer lTail],
			readonly [(infer rHead)?, ...infer rTail]
		]
	) ?
		// if either operand has a non-variadic element at index 0
		// and both operands do not have postfix elements
		// (which causes the inferred head to widen to unknown)
		["0", lHead, rHead] extends [keyof l | keyof r, l[0], r[0]] ?
			intersectSequences<
				lTail,
				rTail,
				[[], []] extends [l, r] ?
					[...acc, Hkt.apply<operation, [lHead, rHead]>?]
				:	[...acc, Hkt.apply<operation, [lHead, rHead]>],
				postfix,
				operation,
				kind
			>
		: l extends readonly [...infer lInit, infer lLast] ?
			r extends readonly [...infer rInit, infer rLast] ?
				intersectSequences<
					lInit,
					rInit,
					acc,
					[Hkt.apply<operation, [lLast, rLast]>, ...postfix],
					operation,
					kind
				>
			:	intersectSequences<
					lInit,
					r,
					acc,
					[Hkt.apply<operation, [lLast, r[number]]>, ...postfix],
					operation,
					kind
				>
		: r extends readonly [...infer rInit, infer rLast] ?
			intersectSequences<
				l,
				rInit,
				acc,
				[Hkt.apply<operation, [l[number], rLast]>, ...postfix],
				operation,
				kind
			>
		:	[...acc, ...Hkt.apply<operation, [lHead, rHead]>[], ...postfix]
	:	never

export type intersectArrays<
	l extends array,
	r extends array,
	operator extends Hkt = AndPreserveUnknown
> = intersectSequences<l, r, [], [], operator, "array">

export type intersectParameters<
	l extends array,
	r extends array,
	operator extends Hkt = AndPreserveUnknown
> = intersectSequences<l, r, [], [], operator, "parameters">

export type overlaps<l, r> =
	l & r extends never ? false
	: domainOf<l> & domainOf<r> extends never ? false
	: [l, r] extends [object, object] ?
		false extends (
			propValueOf<{
				[k in Extract<
					keyof l & keyof r,
					requiredKeyOf<l> | requiredKeyOf<r>
				>]: overlaps<l[k], r[k]>
			}>
		) ?
			false
		:	true
	:	true

export type isDisjoint<l, r> = overlaps<l, r> extends true ? false : true
