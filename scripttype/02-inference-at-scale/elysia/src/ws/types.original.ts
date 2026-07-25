/**
 * ORIGINAL TypeScript from 02-inference-at-scale/elysia/src/ws/types.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AfterResponseHandler<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AsyncGenerator<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type BaseMacro<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DocumentDecoration<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ElysiaWS<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ErrorHandler<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Generator<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MapResponse<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MaybeArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MaybePromise<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type OptionalHandler<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Prettify<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RouteSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SingletonBase<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TransformHandler<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type WebSocketHandler<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type FlattenResponse<Response extends RouteSchema['response']> =
	{} extends Response ? unknown : Response[keyof Response]

export type WSParseHandler<Route extends RouteSchema, Context = {}> = (
	ws: Prettify<ElysiaWS<Context, Omit<Route, 'body'> & { body: unknown }>>,
	message: unknown
) => MaybePromise<Route['body'] | void | undefined>

export type TypedWebSocketMethod =
	| 'open'
	| 'message'
	| 'drain'
	| 'close'
	| 'ping'
	| 'pong'

export interface TypedWebSocketHandler<
	in out Context,
	in out Route extends RouteSchema = {}
> extends Omit<WebSocketHandler<Context>, TypedWebSocketMethod> {
	open?(
		ws: Prettify<ElysiaWS<Context, Omit<Route, 'body'> & { body: never }>>
	): MaybePromise<FlattenResponse<Route['response']> | void>
	message?(
		ws: Prettify<ElysiaWS<Context, Route>>,
		message: Route['body']
	): MaybePromise<
		| FlattenResponse<Route['response']>
		| void
		| Generator<
				FlattenResponse<Route['response']>,
				void | FlattenResponse<Route['response']>
		  >
		| AsyncGenerator<
				FlattenResponse<Route['response']>,
				void | FlattenResponse<Route['response']>
		  >
	>
	drain?(
		ws: Prettify<ElysiaWS<Context, Omit<Route, 'body'> & { body: never }>>
	): MaybePromise<
		| FlattenResponse<Route['response']>
		| void
		| Generator<
				FlattenResponse<Route['response']>,
				void | FlattenResponse<Route['response']>
		  >
		| AsyncGenerator<
				FlattenResponse<Route['response']>,
				void | FlattenResponse<Route['response']>
		  >
	>
	close?(
		ws: Prettify<ElysiaWS<Context, Omit<Route, 'body'> & { body: never }>>,
		code: number,
		reason: string
	): MaybePromise<
		| FlattenResponse<Route['response']>
		| void
		| Generator<
				FlattenResponse<Route['response']>,
				void | FlattenResponse<Route['response']>
		  >
		| AsyncGenerator<
				FlattenResponse<Route['response']>,
				void | FlattenResponse<Route['response']>
		  >
	>
	ping?(
		ws: Prettify<ElysiaWS<Context>>,
		message: Route['body']
	): MaybePromise<
		| FlattenResponse<Route['response']>
		| void
		| Generator<
				FlattenResponse<Route['response']>,
				void | FlattenResponse<Route['response']>
		  >
		| AsyncGenerator<
				FlattenResponse<Route['response']>,
				void | FlattenResponse<Route['response']>
		  >
	>
	pong?(
		ws: Prettify<ElysiaWS<Context>>,
		message: Route['body']
	): MaybePromise<
		| FlattenResponse<Route['response']>
		| void
		| Generator<
				FlattenResponse<Route['response']>,
				void | FlattenResponse<Route['response']>
		  >
		| AsyncGenerator<
				FlattenResponse<Route['response']>,
				void | FlattenResponse<Route['response']>
		  >
	>
}

export type WSLocalHook<
	Input extends BaseMacro,
	Schema extends RouteSchema,
	Singleton extends SingletonBase
> = Prettify<Input> & {
	detail?: DocumentDecoration
	/**
	 * Headers to register to websocket before `upgrade`
	 */
	upgrade?: Record<string, unknown> | ((context: Context) => unknown)
	parse?: MaybeArray<WSParseHandler<Schema>>

	/**
	 * Transform context's value
	 */
	transform?: MaybeArray<TransformHandler<Schema, Singleton>>
	/**
	 * Execute before main handler
	 */
	beforeHandle?: MaybeArray<OptionalHandler<Schema, Singleton>>
	/**
	 * Execute after main handler
	 */
	afterHandle?: MaybeArray<OptionalHandler<Schema, Singleton>>
	/**
	 * Execute after main handler
	 */
	mapResponse?: MaybeArray<MapResponse<Schema, Singleton>>
	/**
	 * Execute after response is sent
	 */
	afterResponse?: MaybeArray<AfterResponseHandler<Schema, Singleton>>
	/**
	 * Catch error
	 */
	error?: MaybeArray<ErrorHandler<{}, Schema, Singleton>>
	tags?: DocumentDecoration['tags']
} & TypedWebSocketHandler<
		Omit<Context<Schema, Singleton>, 'body'> & {
			body: never
		},
		Schema
	>
