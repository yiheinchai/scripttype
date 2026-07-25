/**
 * ORIGINAL TypeScript from 02-inference-at-scale/elysia/src/trace.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Capitalize<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Context<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Prettify<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type RouteSchema<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type SingletonBase<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type TraceEndDetail = {
	/**
	 * Timestamp of a function after it's executed since the server start
	 */
	end: TraceProcess<'end'>
	/**
	 * Error that was thrown in the lifecycle
	 */
	error: Error | null
	/**
	 * Elapsed time of the lifecycle
	 */
	elapsed: number
}

export type TraceProcess<
	Type extends 'begin' | 'end' = 'begin' | 'end',
	WithChildren extends boolean = true
> = Type extends 'begin'
	? Prettify<
			{
				/**
				 * Function name
				 */
				name: string
				/**
				 * Timestamp of a function is called since the server start
				 */
				begin: number
				/**
				 * Timestamp of a function after it's executed since the server start
				 */
				end: Promise<number>
				/**
				 * Error that was thrown in the lifecycle
				 */
				error: Promise<Error | null>
				/**
				 * Listener to intercept the end of the lifecycle
				 *
				 * If you want to mutate the context, you must do it in this function
				 * as there's a lock mechanism to ensure the context is mutate successfully
				 */
				onStop(
					/**
					 * A callback function that will be called when the function ends
					 *
					 * If you want to mutate the context, you must do it in this function
					 * as there's a lock mechanism to ensure the context is mutate successfully
					 */
					callback?: (detail: TraceEndDetail) => unknown
				): Promise<void>
			} & (WithChildren extends true
				? {
						/**
						 * total number of lifecycle's children and
						 * total number of `onEvent` will be called
						 * if there were no early exists or error thrown
						 */
						total: number
						/**
						 * Listener to intercept each child lifecycle
						 */
						onEvent(
							/**
							 * Callback function that will be called for when each child start
							 */
							callback?: (
								process: TraceProcess<'begin', false>
							) => unknown
						): Promise<void>
					}
				: {
						/**
						 * Index of the child event
						 */
						index: number
					})
		>
	: number

export type TraceEvent =
	| 'request'
	| 'parse'
	| 'transform'
	| 'beforeHandle'
	| 'handle'
	| 'afterHandle'
	| 'mapResponse'
	| 'afterResponse'
	| 'error'

export type TraceListener = (
	callback?: (process: TraceProcess<'begin'>) => unknown
) => Promise<TraceProcess<'begin'>>

export type TraceHandler<
	in out Route extends RouteSchema = {},
	in out Singleton extends SingletonBase = {
		decorator: {}
		store: {}
		derive: {}
		resolve: {}
	}
> = {
	(
		lifecycle: Prettify<
			{
				id: number
				context: Context<Route, Singleton>
				set: Context['set']
				time: number
				store: Singleton['store']
				response: unknown
			} & {
				[x in `on${Capitalize<TraceEvent>}`]: TraceListener
			}
		>
	): unknown
}
