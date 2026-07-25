/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/util/unionToTuple.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Fn<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Pick<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReturnType<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type array<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type conform<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type join<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type intersectUnion<t> =
	(t extends unknown ? (_: t) => void : never) extends (
		(_: infer intersection) => void
	) ?
		intersection
	:	never

export type getLastBranch<t> =
	intersectUnion<t extends unknown ? (x: t) => void : never> extends (
		(x: infer branch) => void
	) ?
		branch
	:	never

export type _unionToTuple<t, result extends unknown[]> =
	getLastBranch<t> extends infer current ?
		[t] extends [never] ?
			result
		:	_unionToTuple<Exclude<t, current>, [current, ...result]>
	:	never

export type unionToTuple<t> =
	_unionToTuple<t, []> extends infer result ? conform<result, t[]> : never

export type stringifyUnion<
	t extends string,
	delimiter extends string = ", "
> = join<unionToTuple<t>, delimiter>

export type collectSignatures<fn, givenArgs extends array, result> =
	result & fn extends (...args: infer args) => infer returns ?
		result extends fn ?
			never
		:	| collectSignatures<
					fn,
					givenArgs,
					Pick<fn, keyof fn> & result & ((...args: args) => returns)
			  >
			| (args extends givenArgs ? (...args: args) => returns : never)
	:	never

export type overloadOf<
	fn extends Fn,
	givenArgs extends array = array
> = Exclude<
	collectSignatures<
		// The "() => never" signature must be hoisted to the "front" of the
		// intersection, for two reasons: a) because recursion stops when it is
		// encountered, and b) it seems to prevent the collapse of subsequent
		// "compatible" signatures (eg. "() => void" into "(a?: 1) => void"),
		// which gives a direct conversion to a union.
		(() => never) & fn,
		givenArgs,
		unknown
	>,
	fn extends () => never ? never : () => never
>

export type intersectOverloadReturns<fn extends Fn> = intersectUnion<
	ReturnType<overloadOf<fn>>
>
