/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-valibot/src/schema.types.internal.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Assume<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Column<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ColumnIsGeneratedAlwaysAs<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DrizzleTypeError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ExtractAdditionalProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type GetSelection<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type GetValibotType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type HandleColumn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type HasBaseColumn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReturnType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SelectedFieldsFlat<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Simplify<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Table<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type View<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type v<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type BuildRefineField<T> = T extends v.GenericSchema ? ((schema: T) => v.GenericSchema) | v.GenericSchema : never;

export type BuildRefine<
	TColumns extends Record<string, any>,
> = {
	[K in keyof TColumns as TColumns[K] extends Column | SelectedFieldsFlat<Column> | Table | View ? K : never]?:
		TColumns[K] extends Column ? BuildRefineField<
				GetValibotType<
					TColumns[K]['_']['data'],
					TColumns[K]['_']['dataType'],
					TColumns[K]['_']['columnType'],
					TColumns[K]['_']['enumValues'],
					HasBaseColumn<TColumns[K]> extends true ? Assume<TColumns[K]['_']['baseColumn'], Column> : undefined,
					ExtractAdditionalProperties<TColumns[K]>
				>
			>
			: BuildRefine<GetSelection<TColumns[K]>>;
};

export type HandleRefinement<
	TType extends 'select' | 'insert' | 'update',
	TRefinement,
	TColumn extends Column,
> = TRefinement extends (schema: any) => v.GenericSchema ? (
		TColumn['_']['notNull'] extends true ? ReturnType<TRefinement>
			: v.NullableSchema<ReturnType<TRefinement>, undefined>
	) extends infer TSchema ? TType extends 'update' ? v.OptionalSchema<Assume<TSchema, v.GenericSchema>, undefined>
		: TSchema
	: v.AnySchema
	: TRefinement;

export type IsRefinementDefined<
	TRefinements extends Record<string | symbol | number, any> | undefined,
	TKey extends string | symbol | number,
> = TRefinements extends object ? TRefinements[TKey] extends v.GenericSchema | ((schema: any) => any) ? true
	: false
	: false;

export type BuildSchema<
	TType extends 'select' | 'insert' | 'update',
	TColumns extends Record<string, any>,
	TRefinements extends Record<string, any> | undefined,
> = v.ObjectSchema<
	Simplify<
		{
			readonly [K in keyof TColumns as ColumnIsGeneratedAlwaysAs<TColumns[K]> extends true ? never : K]:
				TColumns[K] extends infer TColumn extends Column
					? IsRefinementDefined<TRefinements, Assume<K, string>> extends true
						? Assume<HandleRefinement<TType, TRefinements[K & keyof TRefinements], TColumn>, v.GenericSchema>
					: HandleColumn<TType, TColumn>
					: TColumns[K] extends infer TObject extends SelectedFieldsFlat<Column> | Table | View ? BuildSchema<
							TType,
							GetSelection<TObject>,
							TRefinements extends object ? TRefinements[K & keyof TRefinements] : undefined
						>
					: v.AnySchema;
		}
	>,
	undefined
>;

export type NoUnknownKeys<
	TRefinement extends Record<string, any>,
	TCompare extends Record<string, any>,
> = {
	[K in keyof TRefinement]: K extends keyof TCompare
		? TRefinement[K] extends Record<string, v.GenericSchema> ? NoUnknownKeys<TRefinement[K], TCompare[K]>
		: TRefinement[K]
		: DrizzleTypeError<`Found unknown key in refinement: "${K & string}"`>;
};
