/**
 * ORIGINAL TypeScript from 02-inference-at-scale/elysia/src/error.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ElysiaCustomStatusResponse<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Exclude<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Extract<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type InvertedStatusMap<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type StatusMap<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type CheckExcessProps<T, U> = 0 extends 1 & T
	? T // T is any
	: U extends U
		? Exclude<keyof T, keyof U> extends never
			? T
			: { [K in keyof U]: U[K] } & {
					[K in Exclude<keyof T, keyof U>]: never
				}
		: never

export type SelectiveStatus<in out Res> = <
	const Code extends
		| keyof Res
		| InvertedStatusMap[Extract<keyof InvertedStatusMap, keyof Res>],
	T extends Code extends keyof Res
		? Res[Code]
		: Code extends keyof StatusMap
			? // @ts-ignore StatusMap[Code] always valid because Code generic check
				Res[StatusMap[Code]]
			: never
>(
	code: Code,
	response: CheckExcessProps<
		T,
		Code extends keyof Res
			? Res[Code]
			: Code extends keyof StatusMap
				? // @ts-ignore StatusMap[Code] always valid because Code generic check
					Res[StatusMap[Code]]
				: never
	>
) => ElysiaCustomStatusResponse<
	// @ts-ignore trust me bro
	Code,
	T
>
