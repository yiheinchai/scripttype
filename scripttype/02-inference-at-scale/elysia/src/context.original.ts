/**
 * ORIGINAL TypeScript from 02-inference-at-scale/elysia/src/context.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Cookie<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ElysiaCookie<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ElysiaCustomStatusResponse<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Extract<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type HTTPHeaders<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InputSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InvertedStatusMap<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonNullable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Prettify<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Redirect<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Request<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ResolvePath<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RouteSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SelectiveStatus<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Server<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SingletonBase<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StatusMap<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type status<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type CheckExcessProps<T, U> = 0 extends 1 & T
	? T // T is any
	: U extends U
		? Exclude<keyof T, keyof U> extends never
			? T
			: { [K in keyof U]: U[K] } & { [K in Exclude<keyof T, keyof U>]: never }
		: never

export type InvertedStatusMapKey = keyof InvertedStatusMap

export type ErrorContext<
	in out Route extends RouteSchema = {},
	in out Singleton extends SingletonBase = {
		decorator: {}
		store: {}
		derive: {}
		resolve: {}
	},
	Path extends string | undefined = undefined
> = Prettify<
	{
		body: Route['body']
		query: undefined extends Route['query']
			? Record<string, string | undefined>
			: Route['query']
		params: undefined extends Route['params']
			? Path extends `${string}/${':' | '*'}${string}`
				? ResolvePath<Path>
				: { [key in string]: string }
			: Route['params']
		headers: undefined extends Route['headers']
			? Record<string, string | undefined>
			: Route['headers']
		cookie: undefined extends Route['cookie']
			? Record<string, Cookie<string | undefined>>
			: Record<string, Cookie<string | undefined>> & {
					[key in keyof Route['cookie']]-?: NonNullable<
						Cookie<Route['cookie'][key]>
					>
				}

		server: Server | null
		redirect: Redirect

		set: {
			headers: HTTPHeaders
			status?: number | keyof StatusMap
			redirect?: string
			/**
			 * ! Internal Property
			 *
			 * Use `Context.cookie` instead
			 */
			cookie?: Record<string, ElysiaCookie>
		}

		status: {} extends Route['response']
			? typeof status
			: <
					const Code extends
						| keyof Route['response']
						| InvertedStatusMap[Extract<
								InvertedStatusMapKey,
								keyof Route['response']
						  >],
					T extends Code extends keyof Route['response']
						? Route['response'][Code]
						: Code extends keyof StatusMap
							? // @ts-ignore StatusMap[Code] always valid because Code generic check
								Route['response'][StatusMap[Code]]
							: never
				>(
					code: Code,
					response: CheckExcessProps<
						T,
						Code extends keyof Route['response']
							? Route['response'][Code]
							: Code extends keyof StatusMap
								? // @ts-ignore StatusMap[Code] always valid because Code generic check
									Route['response'][StatusMap[Code]]
								: never
					>
				) => ElysiaCustomStatusResponse<
					// @ts-ignore trust me bro
					Code,
					T
				>

		/**
		 * Path extracted from incoming URL
		 *
		 * Represent a value extracted from URL
		 *
		 * @example '/id/9'
		 */
		path: string
		/**
		 * Path as registered to router
		 *
		 * Represent a path registered to a router, not a URL
		 *
		 * @example '/id/:id'
		 */
		route: string
		request: Request
		store: Singleton['store']
	} & Singleton['decorator'] &
		Singleton['derive'] &
		Singleton['resolve']
>

export type PrettifyIfObject<T> = T extends object ? Prettify<T> : T

export type Context<
	in out Route extends RouteSchema = {},
	in out Singleton extends SingletonBase = {
		decorator: {}
		store: {}
		derive: {}
		resolve: {}
	},
	Path extends string | undefined = undefined
> = Prettify<
	{
		body: PrettifyIfObject<Route['body'] & Singleton['resolve']['body']>
		query: undefined extends Route['query']
			? {} extends NonNullable<Singleton['resolve']['query']>
				? Record<string, string>
				: Singleton['resolve']['query']
			: PrettifyIfObject<Route['query'] & Singleton['resolve']['query']>
		params: undefined extends Route['params']
			? undefined extends Path
				? {} extends NonNullable<Singleton['resolve']['params']>
					? Record<string, string>
					: Singleton['resolve']['params']
				: Path extends `${string}/${':' | '*'}${string}`
					? ResolvePath<Path>
					: never
			: PrettifyIfObject<Route['params'] & Singleton['resolve']['params']>
		headers: undefined extends Route['headers']
			? {} extends NonNullable<Singleton['resolve']['headers']>
				? Record<string, string | undefined>
				: Singleton['resolve']['headers']
			: PrettifyIfObject<
					Route['headers'] & Singleton['resolve']['headers']
				>
		cookie: undefined extends Route['cookie']
			? Record<string, Cookie<unknown>>
			: Record<string, Cookie<unknown>> &
					Prettify<
						{
							[key in keyof Route['cookie']]-?: Cookie<
								Route['cookie'][key]
							>
						} & {
							[key in keyof Singleton['resolve']['cookie']]-?: Cookie<
								Singleton['resolve']['cookie'][key]
							>
						}
					>

		server: Server | null
		redirect: Redirect

		set: {
			headers: HTTPHeaders
			status?: number | keyof StatusMap
			/**
			 * @deprecated Use inline redirect instead
			 *
			 * @example Migration example
			 * ```ts
			 * new Elysia()
			 *     .get(({ redirect }) => redirect('/'))
			 * ```
			 */
			redirect?: string
			/**
			 * ! Internal Property
			 *
			 * Use `Context.cookie` instead
			 */
			cookie?: Record<string, ElysiaCookie>
		}

		/**
		 * Path extracted from incoming URL
		 *
		 * Represent a value extracted from URL
		 *
		 * @example '/id/9'
		 */
		path: string
		/**
		 * Path as registered to router
		 *
		 * Represent a path registered to a router, not a URL
		 *
		 * @example '/id/:id'
		 */
		route: string
		request: Request
		store: Singleton['store']

		status: {} extends Route['response']
			? typeof status
			: SelectiveStatus<Route['response']>
	} & Singleton['decorator'] &
		Singleton['derive'] &
		Omit<Singleton['resolve'], keyof InputSchema>
>

export type PreContext<
	in out Singleton extends SingletonBase = {
		decorator: {}
		store: {}
		derive: {}
		resolve: {}
	}
> = Prettify<
	{
		store: Singleton['store']
		request: Request

		redirect: Redirect
		server: Server | null

		set: {
			headers: HTTPHeaders
			status?: number
			redirect?: string
		}

		status: typeof status
	} & Singleton['decorator']
>
