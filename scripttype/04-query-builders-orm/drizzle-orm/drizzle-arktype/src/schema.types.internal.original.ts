/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-arktype/src/schema.types.internal.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ArktypeNullable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ArktypeOptional<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Column<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ColumnIsGeneratedAlwaysAs<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DrizzleTypeError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type GetArktypeType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type GetSelection<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type HandleColumn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReturnType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SelectedFieldsFlat<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Simplify<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Table<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Type<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type View<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type type<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type GenericSchema = type.cast<unknown> | [type.cast<unknown>, '?'];

export type BuildRefineField<T> = T extends GenericSchema ? ((schema: T) => GenericSchema) | GenericSchema : never;

export type BuildRefine<
	TColumns extends Record<string, any>,
> = {
	[K in keyof TColumns as TColumns[K] extends Column | SelectedFieldsFlat<Column> | Table | View ? K : never]?:
		TColumns[K] extends Column ? BuildRefineField<GetArktypeType<TColumns[K]>>
			: BuildRefine<GetSelection<TColumns[K]>>;
};

export type HandleRefinement<
	TType extends 'select' | 'insert' | 'update',
	TRefinement,
	TColumn extends Column,
> = TRefinement extends (schema: any) => GenericSchema ? (
		TColumn['_']['notNull'] extends true ? ReturnType<TRefinement>
			: ArktypeNullable<ReturnType<TRefinement>>
	) extends infer TSchema ? TType extends 'update' ? ArktypeOptional<TSchema>
		: TSchema
	: Type<any>
	: TRefinement;

export type IsRefinementDefined<
	TRefinements extends Record<string | symbol | number, any> | undefined,
	TKey extends string | symbol | number,
> = TRefinements extends object ? TRefinements[TKey] extends GenericSchema | ((schema: any) => any) ? true
	: false
	: false;

export type BuildSchema<
	TType extends 'select' | 'insert' | 'update',
	TColumns extends Record<string, any>,
	TRefinements extends Record<string, any> | undefined,
> = type.instantiate<
	Simplify<
		{
			readonly [K in keyof TColumns as ColumnIsGeneratedAlwaysAs<TColumns[K]> extends true ? never : K]:
				TColumns[K] extends infer TColumn extends Column
					? IsRefinementDefined<TRefinements, K> extends true
						? HandleRefinement<TType, TRefinements[K & keyof TRefinements], TColumn>
					: HandleColumn<TType, TColumn>
					: TColumns[K] extends infer TNested extends SelectedFieldsFlat<Column> | Table | View ? BuildSchema<
							TType,
							GetSelection<TNested>,
							TRefinements extends object ? TRefinements[K & keyof TRefinements] : undefined
						>
					: any;
		}
	>
>;

export type NoUnknownKeys<
	TRefinement extends Record<string, any>,
	TCompare extends Record<string, any>,
> = {
	[K in keyof TRefinement]: K extends keyof TCompare
		? TRefinement[K] extends Record<string, GenericSchema> ? NoUnknownKeys<TRefinement[K], TCompare[K]>
		: TRefinement[K]
		: DrizzleTypeError<`Found unknown key in refinement: "${K & string}"`>;
};
