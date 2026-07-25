/**
 * ORIGINAL TypeScript from 02-inference-at-scale/elysia/src/types.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyElysia<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AsyncGenerator<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Awaited<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type BunHTMLBundlelike<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Capitalize<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Context<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Elysia<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ElysiaCustomStatusResponse<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ElysiaFile<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ErrorContext<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Extract<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type File<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Generator<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InternalServerError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InvalidCookieSignature<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InvalidFileType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InvertedStatusMap<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonNullable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NotFoundError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type OpenAPIV3<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ParseError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Partial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Pick<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PreContext<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Readonly<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Request<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Response<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReturnType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TAnySchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TImport<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TModule<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ValidationError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Equal<X, Y> =
	(<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
		? true
		: false

export type IsNever<T> = [T] extends [never] ? true : false

export type PickIfExists<T, K extends string> = {} extends T
	? {}
	: {
			// @ts-ignore
			[P in K as P extends keyof T ? P : never]: T[P]
		}

export type MaybeArray<T> = T | T[]

export type MaybeReadonlyArray<T> = T | readonly T[]

export type MaybePromise<T> = T | Promise<T>

export type ObjectValues<T extends object> = T[keyof T]

export type IsPathParameter<Part extends string> = Part extends `:${infer Parameter}`
	? Parameter
	: Part extends `*`
		? '*'
		: never

export type GetPathParameter<Path extends string> =
	Path extends `${infer A}/${infer B}`
		? IsPathParameter<A> | GetPathParameter<B>
		: IsPathParameter<Path>

export type _ResolvePath<Path extends string> = {
	[Param in GetPathParameter<Path> as Param extends `${string}?`
		? never
		: Param]: string
} & {
	[Param in GetPathParameter<Path> as Param extends `${infer OptionalParam}?`
		? OptionalParam
		: never]?: string
}

export type PathParameterLike = `${string}/${':' | '*'}${string}`

export type ResolvePath<Path extends string> = Path extends ''
	? {}
	: Path extends PathParameterLike
		? _ResolvePath<Path>
		: {}

export type Or<T1 extends boolean, T2 extends boolean> = T1 extends true
	? true
	: T2 extends true
		? true
		: false

export type Prettify<in out T> = {
	[K in keyof T]: T[K]
} & {}

export type NeverKey<in out T> = {
	[K in keyof T]?: never
} & {}

export type IsClass<V> = V extends abstract new (...args: any) => any ? true : false

export type IsBothObject<A, B> =
	A extends Record<keyof any, any>
		? B extends Record<keyof any, any>
			? IsClass<A> extends false
				? IsClass<B> extends false
					? true
					: false
				: false
			: false
		: false

export type And<A, B> = A extends true ? (B extends true ? true : false) : false

export type Reconcile<
	A extends Object,
	B extends Object,
	Override extends boolean = false,
	// Detect Stack limit, eg. circular dependency
	Stack extends number[] = []
> = Stack['length'] extends 16
	? A
	: Override extends true
		? {
				[key in keyof A as key extends keyof B ? never : key]: A[key]
			} extends infer Collision
			? {} extends Collision
				? {
						[key in keyof B]: IsBothObject<
							// @ts-ignore trust me bro
							A[key],
							B[key]
						> extends true
							? Reconcile<
									// @ts-ignore trust me bro
									A[key],
									B[key],
									Override,
									[0, ...Stack]
								>
							: B[key]
					}
				: Prettify<
						Collision & {
							[key in keyof B]: B[key]
						}
					>
			: never
		: {
					[key in keyof B as key extends keyof A
						? never
						: key]: B[key]
			  } extends infer Collision
			? {} extends Collision
				? {
						[key in keyof A]: IsBothObject<
							A[key],
							// @ts-ignore trust me bro
							B[key]
						> extends true
							? Reconcile<
									// @ts-ignore trust me bro
									A[key],
									// @ts-ignore trust me bro
									B[key],
									Override,
									[0, ...Stack]
								>
							: A[key]
					}
				: Prettify<
						{
							[key in keyof A]: A[key]
						} & Collision
					>
			: never

export interface StandardSchemaV1Like<
	in out Input = unknown,
	in out Output = Input
> {
	readonly '~standard': {
		readonly types?:
			| {
					readonly input: Input
					readonly output: Output
			  }
			| undefined
	}
}

export type AnySchema = TSchema | StandardSchemaV1Like

export interface DefinitionBase {
	typebox: Record<string, AnySchema>
	error: Record<string, Error>
}

export interface OptionalField {
	[OptionalKind]: 'Optional'
}

export interface FastStandardSchemaV1Like {
	readonly '~standard': {}
}

export type UnwrapSchema<
	Schema extends AnySchema | string | undefined,
	Definitions extends DefinitionBase['typebox'] = {}
> = Schema extends undefined
	? unknown
	: Schema extends TSchema
		? Schema extends OptionalField
			? Partial<
					TImport<
						// @ts-expect-error Internal typebox already filter for TSchema
						Definitions & {
							readonly __elysia: Schema
						},
						'__elysia'
					>['static']
				>
			: TImport<
					// @ts-expect-error Internal typebox already filter for TSchema
					Definitions & {
						readonly __elysia: Schema
					},
					'__elysia'
				>['static']
		: Schema extends FastStandardSchemaV1Like
			? // @ts-ignore Schema is StandardSchemaV1Like
				NonNullable<Schema['~standard']['types']>['output']
			: Schema extends string
				? Schema extends keyof Definitions
					? Definitions[Schema] extends TAnySchema
						? TImport<
								// @ts-expect-error Internal typebox already filter for TSchema
								Definitions,
								Schema
							>['static']
						: NonNullable<
								Definitions[Schema]['~standard']['types']
							>['output']
					: unknown
				: unknown

export type UnwrapBodySchema<
	Schema extends AnySchema | string | undefined,
	Definitions extends DefinitionBase['typebox'] = {}
> = undefined extends Schema
	? unknown
	: Schema extends TSchema
		? Schema extends OptionalField
			? Partial<
					TImport<
						// @ts-expect-error Internal typebox already filter for TSchema
						Definitions & {
							readonly __elysia: Schema
						},
						'__elysia'
					>['static']
				> | null
			: TImport<
					// @ts-expect-error Internal typebox already filter for TSchema
					Definitions & {
						readonly __elysia: Schema
					},
					'__elysia'
				>['static']
		: Schema extends FastStandardSchemaV1Like
			? // @ts-ignore Schema is StandardSchemaV1Like
				NonNullable<Schema['~standard']['types']>['output']
			: Schema extends string
				? Schema extends keyof Definitions
					? Definitions[Schema] extends TAnySchema
						? TImport<
								// @ts-expect-error Internal typebox already filter for TSchema
								Definitions,
								Schema
							>['static']
						: // @ts-ignore Schema is StandardSchemaV1Like
							NonNullable<
								Definitions[Schema]['~standard']['types']
							>['output']
					: unknown
				: unknown

export type LifeCycleType = 'global' | 'local' | 'scoped'

export type HookContainer<T extends Function = Function> = {
	checksum?: number
	scope?: LifeCycleType
	subType?: 'derive' | 'resolve' | 'mapDerive' | 'mapResolve' | (string & {})
	fn: T
	isAsync?: boolean
	hasReturn?: boolean
}

export type IntersectIfObject<A, B> =
	A extends Record<any, any>
		? B extends Record<any, any>
			? A & B
			: A
		: B extends Record<any, any>
			? B
			: A

export interface RouteSchema {
	body?: unknown
	headers?: unknown
	query?: unknown
	params?: unknown
	cookie?: unknown
	response?: unknown
}

export type MergeSchema<
	A extends RouteSchema,
	B extends RouteSchema,
	Path extends string = ''
> = {} extends A
	? Path extends PathParameterLike
		? Omit<B, 'params'> & { params: ResolvePath<Path> }
		: B
	: {} extends B
		? Path extends PathParameterLike
			? Omit<A, 'params'> & { params: ResolvePath<Path> }
			: A
		: {
				body: undefined extends A['body'] ? B['body'] : A['body']
				headers: undefined extends A['headers']
					? B['headers']
					: A['headers']
				query: undefined extends A['query'] ? B['query'] : A['query']
				params: IsNever<keyof A['params']> extends true
					? IsNever<keyof B['params']> extends true
						? ResolvePath<Path>
						: B['params']
					: IsNever<keyof B['params']> extends true
						? A['params']
						: Prettify<
								B['params'] &
									Omit<A['params'], keyof B['params']>
							>
				cookie: undefined extends A['cookie']
					? B['cookie']
					: A['cookie']
				response: {} extends A['response']
					? {} extends B['response']
						? {}
						: B['response']
					: {} extends B['response']
						? A['response']
						: A['response'] &
								Omit<B['response'], keyof A['response']>
			}

export interface SingletonBase {
	decorator: Record<string, unknown>
	store: Record<string, unknown>
	derive: Record<string, unknown>
	resolve: Record<string, unknown>
}

export type Handler<
	in out Route extends RouteSchema = {},
	in out Singleton extends SingletonBase = {
		decorator: {}
		store: {}
		derive: {}
		resolve: {}
	},
	Path extends string | undefined = undefined
> = (
	context: Context<Route, Singleton, Path>
) => MaybePromise<
	{} extends Route['response']
		? unknown
		: Route['response'][keyof Route['response']]
>

export type IsAny<T> = 0 extends 1 & T ? true : false

export type Replace<Original, Target, With> =
	IsAny<Target> extends true
		? Original
		: Original extends Record<string, unknown>
			? {
					[K in keyof Original]: Original[K] extends Target
						? With
						: Original[K]
				}
			: Original extends Target
				? With
				: Original

export type CoExist<Original, Target, With> =
	IsAny<Target> extends true
		? Original
		: Original extends Record<string, unknown>
			? {
					[K in keyof Original]: Original[K] extends Target
						? Original[K] | With
						: Original[K]
				}
			: Original extends Target
				? Original | With
				: Original

export type ReturnTypeIfPossible<T, Enabled = true> = false extends Enabled
	? {}
	: T extends (...a: any) => infer R
		? R
		: T

export type _FunctionArrayReturnType<T, Carry = undefined> = T extends [
	infer Fn,
	...infer Rest
]
	? _FunctionArrayReturnType<
			Rest,
			Awaited<
				// @ts-ignore Trust me bro
				ReturnType<Fn>
			> extends infer A
				? IsNever<A> extends true
					? Carry
					: A | Carry
				: Carry
		>
	: Carry

export type FunctionArrayReturnType<T> =
	// If nothing is provided, it will be resolved as any
	any[] extends T
		? never
		: T extends any[]
			? _FunctionArrayReturnType<T>
			: // @ts-ignore
				Awaited<ReturnType<T>>

export type _FunctionArrayReturnTypeNonNullable<T, Carry = undefined> = T extends [
	infer Fn,
	...infer Rest
]
	? _FunctionArrayReturnTypeNonNullable<
			Rest,
			NonNullable<
				Awaited<
					// @ts-ignore Trust me bro
					ReturnType<Fn>
				>
			> extends infer A
				? IsNever<A> extends true
					? Carry
					: A | Carry
				: Carry
		>
	: Carry

export type FunctionArrayReturnTypeNonNullable<T> =
	// If nothing is provided, it will be resolved as any
	any[] extends T
		? never
		: T extends any[]
			? _FunctionArrayReturnTypeNonNullable<T>
			: // @ts-ignore
				NonNullable<Awaited<ReturnType<T>>>

export type AnyElysiaCustomStatusResponse = ElysiaCustomStatusResponse<any, any, any>

export type ExtractResolveFromMacro<A> =
	IsNever<A> extends true
		? {}
		: A extends AnyElysiaCustomStatusResponse
			? A
			: Exclude<A, AnyElysiaCustomStatusResponse> extends infer A
				? IsAny<A> extends true
					? {}
					: A
				: {}

export type UnionToIntersect<U> = (
	U extends unknown ? (arg: U) => 0 : never
) extends (arg: infer I) => 0
	? I
	: never

export type MergeResponseStatus<A> = {
	[status in keyof UnionToIntersect<
		// Must be using generic to separate literal from Box<T>
		A extends ElysiaCustomStatusResponse<any, any, infer Status>
			? { [A in Status]: 1 }
			: never
		// @ts-ignore A is checked in key computation
	>]: Extract<A, { code: status }>['response'] extends infer Value
		? IsAny<Value> extends true
			? // @ts-ignore status is always in Status Map
				InvertedStatusMap[status]
			: Value
		: never
}

export type ExtractOnlyResponseFromMacro<A> =
	IsNever<A> extends true
		? {}
		: Extract<A, AnyElysiaCustomStatusResponse> extends infer A
			? IsNever<A> extends true
				? {}
				: {
						return: MergeResponseStatus<A>
					}
			: {}

export type MergeAllStatus<T> = {
	[K in T extends any ? keyof T : never]: T extends Record<K, infer V>
		? V
		: never
}

export type ExtractAllResponseFromMacro<A> =
	IsNever<A> extends true
		? {}
		: {
				// Merge all status to single object first
				return: MergeResponseStatus<A> &
					(Exclude<A, AnyElysiaCustomStatusResponse> extends infer A
						? IsAny<A> extends true
							? {}
							: IsNever<A> extends true
								? {}
								: // FunctionArrayReturnType
									NonNullable<void> extends A
									? {}
									: undefined extends A
										? {}
										: {
												200: A
											}
						: {})
			}

export type MergeFlattenMacroResponse<A, B> = {
	[K in keyof A | keyof B]: K extends keyof A
		? K extends keyof B
			? A[K] | B[K]
			: A[K]
		: K extends keyof B
			? B[K]
			: never
}

export type FlattenMacroResponse<T> = T extends object
	? '_' extends keyof T
		? MergeFlattenMacroResponse<
				Omit<T, '_'>,
				FlattenMacroResponse<MergeAllStatus<T['_']>>
			>
		: T
	: T

export type UnionMacroContext<A> = UnionToIntersect<{
	[K in Exclude<keyof A, 'return'>]: A[K]
}> & {
	// @ts-ignore Allow recursive Macro.return without collapse into
	return: { _: A['return'] }
}

export type BaseMacro = Record<
	string,
	string | number | boolean | Object | undefined | null
>

export type MaybeValueOrVoidFunction<T> = T | ((...a: any) => void | T)

export type BodyHandler<
	in out Route extends RouteSchema = {},
	in out Singleton extends SingletonBase = {
		decorator: {}
		store: {}
		derive: {}
		resolve: {}
	},
	Path extends string | undefined = undefined
> = (
	context: Context<
		Route,
		Singleton & {
			decorator: {
				contentType: string
			}
		},
		Path
	>,
	/**
	 * @deprecated
	 *
	 * use `context.contentType` instead
	 *
	 * @example
	 * ```ts
	 * new Elysia()
	 * 	   .onParse(({ contentType, request }) => {
	 * 		     if (contentType === 'application/json')
	 * 			     return request.json()
	 *     })
	 * ```
	 */
	contentType: string
) => MaybePromise<any>

export type VoidHandler<
	in out Route extends RouteSchema = {},
	in out Singleton extends SingletonBase = {
		decorator: {}
		store: {}
		derive: {}
		resolve: {}
	}
> = (context: Context<Route, Singleton>) => MaybePromise<void>

export type InlineHandlerResponse<Route extends RouteSchema['response']> = {
	[Status in keyof Route]: ElysiaCustomStatusResponse<
		// @ts-ignore Status is always a number
		Status,
		Route[Status],
		Status
	>
}[keyof Route]

export type OptionalHandler<
	in out Route extends RouteSchema = {},
	in out Singleton extends SingletonBase = {
		decorator: {}
		store: {}
		derive: {}
		resolve: {}
	},
	Path extends string | undefined = undefined
> = (
	context: Context<Route, Singleton, Path>
) => MaybePromise<
	{} extends Route['response']
		? unknown
		:
				| Route['response'][keyof Route['response']]
				| InlineHandlerResponse<Route['response']>
				| void
>

export type AfterHandler<
	in out Route extends RouteSchema = {},
	in out Singleton extends SingletonBase = {
		decorator: {}
		store: {}
		derive: {}
		resolve: {}
	},
	Path extends string | undefined = undefined
> = (
	context: Context<Route, Singleton, Path> & {
		responseValue: {} extends Route['response']
			? unknown
			: Route['response'][keyof Route['response']]
		/**
		 * @deprecated use `context.responseValue` instead
		 */
		response: {} extends Route['response']
			? unknown
			: Route['response'][keyof Route['response']]
	}
) => MaybePromise<
	{} extends Route['response']
		? unknown
		:
				| Route['response'][keyof Route['response']]
				| InlineHandlerResponse<Route['response']>
				| void
>

export interface PossibleResponse {
	[status: number]: unknown
}

export interface MetadataBase {
	schema: RouteSchema
	standaloneSchema: MetadataBase['schema']
	macro: BaseMacro
	macroFn: Macro
	parser: Record<string, BodyHandler<any, any>>
	response: PossibleResponse
}

export interface EphemeralType {
	derive: SingletonBase['derive']
	resolve: SingletonBase['resolve']
	schema: MetadataBase['schema']
	standaloneSchema: MetadataBase['schema']
	response: PossibleResponse
}

export type ErrorHandler<
	in out T extends Record<string, Error> = {},
	in out Route extends RouteSchema = {},
	in out Singleton extends SingletonBase = {
		decorator: {}
		store: {}
		derive: {}
		resolve: {}
	},
	// ? scoped
	in out Ephemeral extends EphemeralType = {
		derive: {}
		resolve: {}
		schema: {}
		standaloneSchema: {}
		response: {}
	},
	// ? local
	in out Volatile extends EphemeralType = {
		derive: {}
		resolve: {}
		schema: {}
		standaloneSchema: {}
		response: {}
	}
> = (
	context: ErrorContext<
		Route,
		{
			store: Singleton['store']
			decorator: Singleton['decorator']
			derive: {}
			resolve: {}
		}
	> &
		(
			| Prettify<
					{
						request: Request
						code: 'UNKNOWN'
						error: Readonly<Error>
						set: Context['set']
					} & Partial<
						Singleton['derive'] &
							Ephemeral['derive'] &
							Volatile['derive'] &
							Singleton['resolve'] &
							Ephemeral['resolve'] &
							Volatile['resolve']
					>
			  >
			| Prettify<
					{
						request: Request
						code: 'VALIDATION'
						error: Readonly<ValidationError>
						set: Context['set']
					} & Singleton['derive'] &
						Ephemeral['derive'] &
						Volatile['derive'] &
						NeverKey<
							Singleton['resolve'] &
								Ephemeral['resolve'] &
								Volatile['resolve']
						>
			  >
			| Prettify<
					{
						request: Request
						code: 'NOT_FOUND'
						error: Readonly<NotFoundError>
						set: Context['set']
					} & NeverKey<
						Singleton['derive'] &
							Ephemeral['derive'] &
							Volatile['derive'] &
							Singleton['resolve'] &
							Ephemeral['resolve'] &
							Volatile['resolve']
					>
			  >
			| Prettify<
					{
						request: Request
						code: 'PARSE'
						error: Readonly<ParseError>
						set: Context['set']
					} & NeverKey<
						Singleton['derive'] &
							Ephemeral['derive'] &
							Volatile['derive'] &
							Singleton['resolve'] &
							Ephemeral['resolve'] &
							Volatile['resolve']
					>
			  >
			| Prettify<
					{
						request: Request
						code: 'INTERNAL_SERVER_ERROR'
						error: Readonly<InternalServerError>
						set: Context['set']
					} & Partial<
						Singleton['derive'] &
							Ephemeral['derive'] &
							Volatile['derive'] &
							Singleton['resolve'] &
							Ephemeral['resolve'] &
							Volatile['resolve']
					>
			  >
			| Prettify<
					{
						request: Request
						code: 'INVALID_COOKIE_SIGNATURE'
						error: Readonly<InvalidCookieSignature>
						set: Context['set']
					} & NeverKey<
						Singleton['derive'] &
							Ephemeral['derive'] &
							Volatile['derive'] &
							Singleton['resolve'] &
							Ephemeral['resolve'] &
							Volatile['resolve']
					>
			  >
			| Prettify<
					{
						request: Request
						code: 'INVALID_FILE_TYPE'
						error: Readonly<InvalidFileType>
						set: Context['set']
					} & Singleton['derive'] &
						Ephemeral['derive'] &
						Volatile['derive'] &
						NeverKey<
							Singleton['resolve'] &
								Ephemeral['resolve'] &
								Volatile['resolve']
						>
			  >
			| Prettify<
					{
						request: Request
						code: number
						error: Readonly<ElysiaCustomStatusResponse<number>>
						set: Context['set']
					} & Partial<
						Singleton['derive'] &
							Ephemeral['derive'] &
							Volatile['derive'] &
							Singleton['resolve'] &
							Ephemeral['resolve'] &
							Volatile['resolve']
					>
			  >
			| Prettify<
					{
						[K in keyof T]: {
							request: Request
							code: K
							error: Readonly<T[K]>
							set: Context['set']
						}
					}[keyof T] &
						Partial<
							Singleton['derive'] &
								Ephemeral['derive'] &
								Volatile['derive'] &
								Singleton['resolve'] &
								Ephemeral['resolve'] &
								Volatile['resolve']
						>
			  >
		)
) => any | Promise<any>

export type MapResponse<
	in out Route extends RouteSchema = {},
	in out Singleton extends SingletonBase = {
		decorator: {}
		store: {}
		derive: {}
		resolve: {}
	},
	Path extends string | undefined = undefined
> = (
	context: Context<Route, Singleton, Path> & {
		responseValue: {} extends Route['response']
			? unknown
			: Route['response'][keyof Route['response']]
		/**
		 * @deprecated use `context.responseValue` instead
		 */
		response: {} extends Route['response']
			? unknown
			: Route['response'][keyof Route['response']]
	}
) => MaybePromise<Response | void>

export type AfterResponseHandler<
	in out Route extends RouteSchema = {},
	in out Singleton extends SingletonBase = {
		decorator: {}
		store: {}
		derive: {}
		resolve: {}
	}
> = (
	context: Context<Route, Singleton> & {
		responseValue: {} extends Route['response']
			? unknown
			: Route['response'][keyof Route['response']]
		/**
		 * @deprecated use `context.responseValue` instead
		 */
		response: {} extends Route['response']
			? unknown
			:
					| Route['response'][keyof Route['response']]
					| InlineHandlerResponse<Route['response']>
	}
) => MaybePromise<unknown>

export type ResolveHandler<
	in out Route extends RouteSchema,
	in out Singleton extends SingletonBase,
	Derivative extends
		| Record<string, unknown>
		| AnyElysiaCustomStatusResponse
		| void = Record<string, unknown> | AnyElysiaCustomStatusResponse | void
> = (context: Context<Route, Singleton>) => MaybePromise<Derivative>

export interface DocumentDecoration extends Partial<OpenAPIV3.OperationObject> {
	/**
	 * Pass `true` to hide route from OpenAPI/swagger document
	 * */
	hide?: boolean
}

export interface MacroProperty<
	in out Macro extends BaseMacro = {},
	in out TypedRoute extends RouteSchema = {},
	in out Singleton extends SingletonBase = {
		decorator: {}
		store: {}
		derive: {}
		resolve: {}
	},
	in out Errors extends Record<string, Error> = {}
> {
	/**
	 * Deduplication similar to Elysia.constructor.seed
	 */
	seed?: unknown
	parse?: MaybeArray<BodyHandler<TypedRoute, Singleton>>
	transform?: MaybeArray<VoidHandler<TypedRoute, Singleton>>
	beforeHandle?: MaybeArray<OptionalHandler<TypedRoute, Singleton>>
	afterHandle?: MaybeArray<AfterHandler<TypedRoute, Singleton>>
	error?: MaybeArray<ErrorHandler<Errors, TypedRoute, Singleton>>
	mapResponse?: MaybeArray<MapResponse<TypedRoute, Singleton>>
	afterResponse?: MaybeArray<AfterResponseHandler<TypedRoute, Singleton>>
	resolve?: MaybeArray<ResolveHandler<TypedRoute, Singleton>>
	detail?: DocumentDecoration
	/**
	 * Introspect hook option for documentation generation or analysis
	 *
	 * @param option
	 */
	introspect?(option: Prettify<Macro>): unknown
}

export interface Macro<
	in out Macro extends BaseMacro = {},
	in out Input extends BaseMacro = {},
	in out TypedRoute extends RouteSchema = {},
	in out Singleton extends SingletonBase = {
		decorator: {}
		store: {}
		derive: {}
		resolve: {}
	},
	in out Errors extends Record<string, Error> = {}
> {
	[K: keyof any]: MaybeValueOrVoidFunction<
		Input & MacroProperty<Macro, TypedRoute, Singleton, Errors>
	>
}

export interface InputSchema<in out Name extends string = string> {
	body?: AnySchema | Name
	headers?: AnySchema | Name
	query?: AnySchema | Name
	params?: AnySchema | Name
	cookie?: AnySchema | Name
	response?:
		| AnySchema
		| { [status in number]: AnySchema }
		| Name
		| {
				[status in number]: Name | AnySchema
		  }
}

export type FastAnySchema = TAnySchema | FastStandardSchemaV1Like

export interface UnwrapRoute<
	in out Schema extends InputSchema<any>,
	in out Definitions extends DefinitionBase['typebox'] = {},
	in out Path extends string = ''
> {
	body: UnwrapBodySchema<Schema['body'], Definitions>
	headers: UnwrapSchema<Schema['headers'], Definitions>
	query: UnwrapSchema<Schema['query'], Definitions>
	params: {} extends Schema['params']
		? ResolvePath<Path>
		: {} extends Schema
			? ResolvePath<Path>
			: UnwrapSchema<Schema['params'], Definitions>
	cookie: UnwrapSchema<Schema['cookie'], Definitions>
	response: Schema['response'] extends FastAnySchema | string
		? {
				200: UnwrapSchema<
					Schema['response'],
					Definitions
				> extends infer A
					? A extends File
						? File | ElysiaFile
						: A
					: unknown
			}
		: Schema['response'] extends {
					[status in number]: FastAnySchema | string
			  }
			? {
					[k in keyof Schema['response']]: UnwrapSchema<
						Schema['response'][k],
						Definitions
					> extends infer A
						? A extends File
							? File | ElysiaFile
							: A
						: unknown
				}
			: unknown | void
}

export type UnwrapMacroSchema<
	T extends Partial<InputSchema<any>>,
	Definitions extends DefinitionBase['typebox'] = {}
> = UnwrapRoute<
	{
		body: 'body' extends keyof T ? T['body'] : undefined
		headers: 'headers' extends keyof T ? T['headers'] : undefined
		query: 'query' extends keyof T ? T['query'] : undefined
		params: 'params' extends keyof T ? T['params'] : undefined
		cookie: 'cookie' extends keyof T ? T['cookie'] : undefined
		response: 'response' extends keyof T ? T['response'] : undefined
	},
	Definitions
>

export type InnerMacroToContext<
	MacroFn extends Macro = {},
	SelectedMacro extends BaseMacro = {},
	Definitions extends DefinitionBase['typebox'] = {},
	R extends 1[] = []
> = {} extends SelectedMacro
	? {}
	: R['length'] extends 15
		? {}
		: UnionMacroContext<
				{
					[key in keyof SelectedMacro]: ReturnTypeIfPossible<
						MacroFn[key],
						SelectedMacro[key]
					> extends infer Value
						? {
								resolve: ExtractResolveFromMacro<
									Extract<
										Exclude<
											FunctionArrayReturnType<
												// @ts-ignore Trust me bro
												Value['resolve']
											>,
											AnyElysiaCustomStatusResponse
										>,
										Record<any, unknown>
									>
								>
							} & UnwrapMacroSchema<
								// @ts-ignore Trust me bro
								Value,
								Definitions
							> &
								ExtractAllResponseFromMacro<
									FunctionArrayReturnTypeNonNullable<
										// @ts-expect-error type is checked in key mapping
										Value['beforeHandle']
									>
								> &
								ExtractAllResponseFromMacro<
									FunctionArrayReturnTypeNonNullable<
										// @ts-expect-error type is checked in key mapping
										Value['afterHandle']
									>
								> &
								ExtractAllResponseFromMacro<
									// @ts-expect-error type is checked in key mapping
									FunctionArrayReturnType<Value['error']>
								> &
								ExtractOnlyResponseFromMacro<
									FunctionArrayReturnTypeNonNullable<
										// @ts-expect-error type is checked in key mapping
										Value['resolve']
									>
								> &
								InnerMacroToContext<
									MacroFn,
									// @ts-ignore trust me bro
									Pick<
										Value,
										Extract<keyof MacroFn, keyof Value>
									>,
									Definitions,
									[...R, 1]
								>
						: {}
				}[keyof SelectedMacro]
			>

export type MacroToContext<
	in out MacroFn extends Macro = {},
	in out SelectedMacro extends BaseMacro = {},
	in out Definitions extends DefinitionBase['typebox'] = {},
	in out R extends 1[] = []
> = Prettify<
	InnerMacroToContext<
		MacroFn,
		Pick<SelectedMacro, Extract<keyof MacroFn, keyof SelectedMacro>>,
		Definitions,
		R
	> extends infer A
		? {
				[K in Exclude<keyof A, 'return'>]: UnionToIntersect<A[K]>
			} & Prettify<{
				// @ts-ignore
				return: FlattenMacroResponse<A['return']>
			}>
		: {}
>

export type IsUnknown<T> = [unknown] extends [T]
	? IsAny<T> extends true
		? false
		: true
	: false

export type _SimplifyToSchema<T extends InputSchema<any>> = Omit<
	{
		body: T['body']
		headers: T['headers']
		query: T['query']
		params: T['params']
		cookie: T['cookie']
		response: T['response']
	},
	| ('body' extends keyof T ? never : 'body')
	| ('headers' extends keyof T ? never : 'headers')
	| ('query' extends keyof T ? never : 'query')
	| ('params' extends keyof T ? never : 'params')
	| ('cookie' extends keyof T ? never : 'cookie')
	| ('response' extends keyof T ? never : 'response')
>

export type SimplifyToSchema<T extends InputSchema<any>> =
	IsUnknown<T['body']> extends false
		? _SimplifyToSchema<T>
		: IsUnknown<T['headers']> extends false
			? _SimplifyToSchema<T>
			: IsUnknown<T['query']> extends false
				? _SimplifyToSchema<T>
				: IsUnknown<T['params']> extends false
					? _SimplifyToSchema<T>
					: IsUnknown<T['cookie']> extends false
						? _SimplifyToSchema<T>
						: IsUnknown<T['response']> extends false
							? _SimplifyToSchema<T>
							: {}

export type LastOf<T> =
	UnionToIntersect<T extends any ? () => T : never> extends () => infer R
		? R
		: never

export type Push<T extends any[], V> = [...T, V]

export type TuplifyUnion<
	T,
	L = LastOf<T>,
	N = [T] extends [never] ? true : false
> = true extends N ? [] : Push<TuplifyUnion<Exclude<T, L>>, L>

export type Tuple<
	T,
	A extends T[] = []
> = TuplifyUnion<T>['length'] extends A['length'] ? [...A] : Tuple<T, [T, ...A]>

export type InlineResponse =
	| string
	| number
	| boolean
	| Record<any, unknown>
	| Response
	| AnyElysiaCustomStatusResponse
	| ElysiaFile
	| Record<any, unknown>
	| BunHTMLBundlelike

export type InlineHandler<
	Route extends RouteSchema = {},
	Singleton extends SingletonBase = {
		decorator: {}
		store: {}
		derive: {}
		resolve: {}
	},
	MacroContext extends {
		response: PossibleResponse
		return: PossibleResponse
		resolve: Record<string, unknown>
	} = {
		response: {}
		return: {}
		resolve: {}
	}
> =
	| MaybePromise<InlineResponse>
	| ((
			context: Context<
				Route & MacroContext,
				Singleton & { resolve: MacroContext['resolve'] }
			>
	  ) =>
			| MaybePromise<Response>
			| MaybePromise<
					{} extends Route['response']
						? unknown
						:
								| (Route['response'] extends {
										200: any
								  }
										?
												| Route['response'][200]
												| ElysiaCustomStatusResponse<
														200,
														Route['response'][200],
														200
												  >
												| Generator<
														Route['response'][200]
												  >
												| AsyncGenerator<
														Route['response'][200]
												  >
										: unknown)
								// This could be possible because of set.status
								| Route['response'][keyof Route['response']]
								| InlineHandlerResponse<
										Route['response'] &
											MacroContext['response']
								  >
			  >)

export type InlineHandlerNonMacro<
	Route extends RouteSchema = {},
	Singleton extends SingletonBase = {
		decorator: {}
		store: {}
		derive: {}
		resolve: {}
	}
> =
	| MaybePromise<InlineResponse>
	| ((context: Context<Route, Singleton>) =>
			| MaybePromise<Response>
			| MaybePromise<
					{} extends Route['response']
						? unknown
						:
								| (Route['response'] extends {
										200: any
								  }
										?
												| Route['response'][200]
												| ElysiaCustomStatusResponse<
														200,
														Route['response'][200],
														200
												  >
												| Generator<
														Route['response'][200]
												  >
												| AsyncGenerator<
														Route['response'][200]
												  >
										: unknown)
								// This could be possible because of set.status
								| Route['response'][keyof Route['response']]
								| InlineHandlerResponse<Route['response']>
			  >)

export type TransformHandler<
	in out Route extends RouteSchema = {},
	in out Singleton extends SingletonBase = {
		decorator: {}
		store: {}
		derive: {}
		resolve: {}
	},
	Path extends string | undefined = undefined
> = (
	context: Context<
		Route,
		Omit<Singleton, 'resolve'> & {
			resolve: {}
		},
		Path
	>
) => MaybePromise<void>

export type PreHandler<
	in out Route extends RouteSchema = {},
	in out Singleton extends SingletonBase = {
		decorator: {}
		store: {}
		derive: {}
		resolve: {}
	}
> = (
	context: PreContext<Singleton>
) => MaybePromise<
	Route['response'] | InlineHandlerResponse<Route['response']> | void
>

export type GracefulHandler<in Instance extends AnyElysia> = (
	data: Instance
) => any

export type _ResolveReturnTypeArray<T, Carry = {}> = T extends [
	infer Fn,
	...infer Rest
]
	? Exclude<
			// @ts-ignore Trust me bro
			Awaited<ReturnType<Fn>>,
			AnyElysiaCustomStatusResponse
		> extends infer Value extends Record<any, unknown>
		? _ResolveReturnTypeArray<Rest, Value & Carry>
		: _ResolveReturnTypeArray<Rest, Carry & {}>
	: Prettify<Carry>

export type ResolveReturnType<T extends MaybeArray<unknown>> =
	// If no macro are provided, it will be resolved as any
	any[] extends T
		? {}
		: // Is any, return
			T extends any[]
			? _ResolveReturnTypeArray<// @ts-ignore Trust me bro
				T>
			: Exclude<
						// @ts-ignore Trust me bro
						Awaited<ReturnType<T>>,
						AnyElysiaCustomStatusResponse
				  > extends infer Value extends Record<any, unknown>
				? Value
				: {}

export type CreateDecorator<
	Singleton extends SingletonBase,
	Ephemeral extends EphemeralType,
	Volatile extends EphemeralType
> = {} extends Ephemeral
	? {} extends Volatile
		? Singleton
		: Singleton & Volatile
	: {} extends Volatile
		? Singleton & Ephemeral
		: Singleton & Ephemeral & Volatile

export interface RouteSchemaWithResolvedMacro extends RouteSchema {
	response: PossibleResponse
	return: PossibleResponse
	resolve: Record<string, unknown>
}

export type ContentType = MaybeArray<
	| 'none'
	| 'text'
	| 'json'
	| 'formdata'
	| 'urlencoded'
	| 'arrayBuffer'
	| 'text/plain'
	| 'application/json'
	| 'multipart/form-data'
	| 'application/x-www-form-urlencoded'
	| 'application/octet-stream'
>

export type LocalHook<
	Input extends BaseMacro,
	Schema extends RouteSchemaWithResolvedMacro,
	Singleton extends SingletonBase,
	Errors extends { [key in string]: Error },
	Parser extends keyof any = ''
> = {
	detail?: DocumentDecoration
	/**
	 * Short for 'Content-Type'
	 *
	 * Available:
	 * - 'none': do not parse body
	 * - 'text' / 'text/plain': parse body as string
	 * - 'json' / 'application/json': parse body as json
	 * - 'formdata' / 'multipart/form-data': parse body as form-data
	 * - 'urlencoded' / 'application/x-www-form-urlencoded: parse body as urlencoded
	 * - 'arraybuffer': parse body as readable stream
	 */
	parse?: MaybeArray<
		| BodyHandler<Schema, Singleton & { resolve: Schema['resolve'] }>
		| ContentType
		| Parser
	>
	/**
	 * Transform context's value
	 */
	transform?: MaybeArray<
		TransformHandler<Schema, Singleton & { resolve: Schema['resolve'] }>
	>
	/**
	 * Execute before main handler
	 */
	beforeHandle?: MaybeArray<
		OptionalHandler<Schema, Singleton & { resolve: Schema['resolve'] }>
	>
	/**
	 * Execute after main handler
	 */
	afterHandle?: MaybeArray<
		AfterHandler<Schema, Singleton & { resolve: Schema['resolve'] }>
	>
	/**
	 * Execute after main handler
	 */
	mapResponse?: MaybeArray<
		MapResponse<Schema, Singleton & { resolve: Schema['resolve'] }>
	>
	/**
	 * Execute after response is sent
	 */
	afterResponse?: MaybeArray<
		AfterResponseHandler<Schema, Singleton & { resolve: Schema['resolve'] }>
	>
	/**
	 * Catch error
	 */
	error?: MaybeArray<
		ErrorHandler<Errors, Schema, Singleton & { resolve: Schema['resolve'] }>
	>
	tags?: DocumentDecoration['tags']
} & (Input extends any ? Input : Prettify<Input>)

export type GuardSchemaType = 'override' | 'standalone'

export type GuardLocalHook<
	Input extends BaseMacro | undefined,
	Schema extends RouteSchema,
	Singleton extends SingletonBase,
	Parser extends keyof any,
	BeforeHandle extends MaybeArray<OptionalHandler<any, any>>,
	AfterHandle extends MaybeArray<AfterHandler<any, any>>,
	ErrorHandle extends MaybeArray<ErrorHandler<any, any, any>>,
	GuardType extends GuardSchemaType = 'standalone',
	AsType extends LifeCycleType = 'local'
> = (Input extends any ? Input : Prettify<Input>) & {
	/**
	 * @default 'override'
	 */
	as?: AsType
	/**
	 * @default 'standalone'
	 * @since 1.3.0
	 */
	schema?: GuardType

	detail?: DocumentDecoration
	/**
	 * Short for 'Content-Type'
	 *
	 * Available:
	 * - 'none': do not parse body
	 * - 'text' / 'text/plain': parse body as string
	 * - 'json' / 'application/json': parse body as json
	 * - 'formdata' / 'multipart/form-data': parse body as form-data
	 * - 'urlencoded' / 'application/x-www-form-urlencoded: parse body as urlencoded
	 * - 'arraybuffer': parse body as readable stream
	 */
	parse?: MaybeArray<BodyHandler<Schema, Singleton> | ContentType | Parser>
	/**
	 * Transform context's value
	 */
	transform?: MaybeArray<TransformHandler<Schema, Singleton>>
	/**
	 * Execute before main handler
	 */
	beforeHandle?: BeforeHandle
	/**
	 * Execute after main handler
	 */
	afterHandle?: AfterHandle
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
	error?: ErrorHandle
	tags?: DocumentDecoration['tags']
}

export type AddPrefix<in out Prefix extends string, in out T> = {
	[K in keyof T as Prefix extends string ? `${Prefix}${K & string}` : K]: T[K]
}

export type AddPrefixCapitalize<in out Prefix extends string, in out T> = {
	[K in keyof T as `${Prefix}${Capitalize<K & string>}`]: T[K]
}

export type AddSuffix<in out Suffix extends string, in out T> = {
	[K in keyof T as `${K & string}${Suffix}`]: T[K]
}

export type AddSuffixCapitalize<in out Suffix extends string, in out T> = {
	[K in keyof T as `${K & string}${Capitalize<Suffix>}`]: T[K]
}

export type MaybeFunction<T> = T | ((...args: any[]) => T)

export type MacroToProperty<in out T extends Macro<any, any, any, any>> =
	Prettify<{
		[K in keyof T]: T[K] extends Function
			? T[K] extends (a: infer Params) => any
				? Params
				: boolean
			: boolean
	}>

export type _CreateEden<
	Path extends string,
	Property extends Record<string, unknown> = {}
> = Path extends `${infer Start}/${infer Rest}`
	? {
			[x in Start]: _CreateEden<Rest, Property>
		}
	: Path extends ''
		? Property
		: {
				[x in Path]: Property
			}

export type RemoveStartingSlash<T> = T extends `/${infer Rest}` ? Rest : T

export type CreateEden<
	Path extends string,
	Property extends Record<string, unknown> = {}
> = Path extends `/${infer Rest}`
	? _CreateEden<Rest, Property>
	: Path extends '' | '/'
		? Property
		: _CreateEden<Path, Property>

export type Extract200<T> = T extends AnyElysiaCustomStatusResponse
	?
			| Exclude<T, AnyElysiaCustomStatusResponse>
			| Extract<T, ElysiaCustomStatusResponse<200, any, 200>>['response']
	: T

export type ExtractErrorFromHandle<in out Handle> = {
	[ErrorResponse in Extract<
		Handle,
		AnyElysiaCustomStatusResponse
	> as ErrorResponse extends AnyElysiaCustomStatusResponse
		? ErrorResponse['code']
		: never]: Prettify<ErrorResponse['response']>
}

export type ValueToResponseSchema<Value> = ExtractErrorFromHandle<Value> &
	(Extract200<Value> extends infer R200
		? undefined extends R200
			? {}
			: IsNever<R200> extends true
				? {}
				: { 200: R200 }
		: {})

export type ValueOrFunctionToResponseSchema<T> = T extends (
	...a: any
) => MaybePromise<infer R>
	? ValueToResponseSchema<R>
	: ValueToResponseSchema<T>

export type ElysiaHandlerToResponseSchema<in out Handle extends Function> =
	Prettify<
		Handle extends (...a: any) => MaybePromise<infer R>
			? ValueToResponseSchema<Exclude<R, undefined>>
			: {}
	>

export type UnionResponseStatus<A, B> = {} extends A
	? B
	: {} extends B
		? A
		: {
				[key in keyof A | keyof B]: key extends keyof A
					? key extends keyof B
						? A[key] | B[key]
						: A[key]
					: key extends keyof B
						? B[key]
						: never
			}

export type ElysiaHandlerToResponseSchemas<
	Handle extends Function[],
	Carry extends PossibleResponse = {}
> = Handle extends [infer Current, ...infer Rest]
	? ElysiaHandlerToResponseSchemas<
			// @ts-ignore Trust me bro
			Rest,
			// @ts-ignore trust me bro
			UnionResponseStatus<ElysiaHandlerToResponseSchema<Current>, Carry>
		>
	: Prettify<Carry>

export type ElysiaHandlerToResponseSchemaAmbiguous<
	Schemas extends MaybeArray<Function>
> =
	MaybeArray<(...a: any) => any> extends Schemas
		? {}
		: Schemas extends Function
			? ElysiaHandlerToResponseSchema<Schemas>
			: Schemas extends Function[]
				? ElysiaHandlerToResponseSchemas<Schemas>
				: {}

export type ReconcileStatus<
	in out A extends Record<number, unknown>,
	in out B extends Record<number, unknown>
> = {
	// @ts-ignore Trust me bro
	[K in keyof A | keyof B]: K extends keyof A ? A[K] : B[K]
}

export interface EmptyRouteSchema {
	body: unknown
	headers: unknown
	query: unknown
	params: {}
	cookie: unknown
	response: unknown
}

export type ComposeElysiaResponse<
	Schema extends RouteSchema,
	Handle,
	Possibility extends PossibleResponse
> = ReconcileStatus<
	// @ts-ignore
	Schema['response'],
	UnionResponseStatus<
		ValueOrFunctionToResponseSchema<Handle>,
		Possibility &
			(EmptyRouteSchema extends Pick<Schema, keyof EmptyRouteSchema>
				? {}
				: {
						422: {
							type: 'validation'
							on: string
							summary?: string
							message?: string
							found?: unknown
							property?: string
							expected?: string
						}
					})
	>
>

export type RouteBase = Record<string, unknown>

export type MergeElysiaInstances<
	Instances extends AnyElysia[] = [],
	Prefix extends string = '',
	Singleton extends SingletonBase = {
		decorator: {}
		store: {}
		derive: {}
		resolve: {}
	},
	Definitions extends DefinitionBase = {
		typebox: {}
		error: {}
	},
	Metadata extends MetadataBase = {
		schema: {}
		standaloneSchema: {}
		macro: {}
		macroFn: {}
		parser: {}
		response: {}
	},
	Ephemeral extends EphemeralType = {
		derive: {}
		resolve: {}
		schema: {}
		standaloneSchema: {}
		response: {}
	},
	Volatile extends EphemeralType = {
		derive: {}
		resolve: {}
		schema: {}
		standaloneSchema: {}
		response: {}
	},
	Routes extends RouteBase = {}
> = Instances extends [
	infer Current extends AnyElysia,
	...infer Rest extends AnyElysia[]
]
	? MergeElysiaInstances<
			Rest,
			Prefix,
			Singleton & Current['~Singleton'],
			Definitions & Current['~Definitions'],
			Metadata & Current['~Metadata'],
			Ephemeral,
			Volatile & Current['~Ephemeral'],
			Routes &
				(Prefix extends ``
					? Current['~Routes']
					: CreateEden<Prefix, Current['~Routes']>)
		>
	: Elysia<
			Prefix,
			{
				decorator: Singleton['decorator']
				store: Prettify<Singleton['store']>
				derive: Singleton['derive']
				resolve: Singleton['resolve']
			},
			Definitions,
			Metadata,
			Routes,
			Ephemeral,
			Volatile
		>

export type PartialIf<T, Condition extends boolean> = Condition extends true
	? Partial<T>
	: T

export type ExcludeElysiaResponse<T> = PartialIf<
	Exclude<Awaited<T>, AnyElysiaCustomStatusResponse> extends infer A
		? IsNever<A & {}> extends true
			? {}
			: // Intersect all union and fallback never to {}
				A & {}
		: {},
	undefined extends Awaited<T> ? true : false
>

export type InferContext<
	T extends AnyElysia,
	Path extends string = T['~Prefix'],
	Schema extends RouteSchema = T['~Metadata']['schema']
> = Context<
	MergeSchema<Schema, T['~Metadata']['schema']>,
	T['~Singleton'] & {
		derive: T['~Ephemeral']['derive'] & T['~Volatile']['derive']
		resolve: T['~Ephemeral']['resolve'] & T['~Volatile']['resolve']
	},
	Path
>

export type InferHandler<
	T extends AnyElysia,
	Path extends string = T['~Prefix'],
	Schema extends RouteSchema = T['~Metadata']['schema']
> = InlineHandler<
	MergeSchema<Schema, T['~Metadata']['schema'], Path>,
	T['~Singleton'] & {
		derive: T['~Ephemeral']['derive'] & T['~Volatile']['derive']
		resolve: T['~Ephemeral']['resolve'] & T['~Volatile']['resolve']
	}
>

export type HigherOrderFunction<
	T extends (...arg: unknown[]) => Function = (...arg: unknown[]) => Function
> = (fn: T, request: Request) => ReturnType<T>

export type JoinPath<
	A extends string,
	B extends string
> = B extends `/${string}` ? `${A}${B}` : `${A}/${B}`

export type UnwrapTypeModule<Module extends TModule<any, any>> =
	Module extends TModule<infer Type extends TProperties, any> ? Type : {}

export type MergeTypeModule<
	A extends TModule<any, any>,
	B extends TModule<any, any>
> = TModule<Prettify<UnwrapTypeModule<A> & UnwrapTypeModule<B>>>

export type SSEPayload<
	Data extends unknown = unknown,
	Event extends string | undefined = string | undefined
> = {
	/** id of the event */
	id?: string | number | null
	/** event name */
	event?: Event
	/** retry in millisecond */
	retry?: number
	/** data to send */
	data?: Data
}

export type CreateEdenResponse<
	Path extends string,
	Schema extends RouteSchema,
	MacroContext extends RouteSchema,
	// This should be handled by ComposeElysiaResponse
	Res extends PossibleResponse
> = RouteSchema extends MacroContext
	? {
			body: Schema['body']
			params: IsNever<keyof Schema['params']> extends true
				? ResolvePath<Path>
				: Schema['params']
			query: Schema['query']
			headers: Schema['headers']
			response: Prettify<Res>
		}
	: {
			body: Prettify<Schema['body'] & MacroContext['body']>
			params: IsNever<
				keyof (Schema['params'] & MacroContext['params'])
			> extends true
				? ResolvePath<Path>
				: Prettify<Schema['params'] & MacroContext['params']>
			query: Prettify<Schema['query'] & MacroContext['query']>
			headers: Prettify<Schema['headers'] & MacroContext['headers']>
			response: Prettify<Res>
		}

export type ModelsToTypes<T extends Record<keyof any, AnySchema>> = {
	[K in keyof T]: UnwrapSchema<T[K]>
}
