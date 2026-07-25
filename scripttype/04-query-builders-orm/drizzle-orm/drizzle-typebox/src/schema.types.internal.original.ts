/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-typebox/src/schema.types.internal.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Assume<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Column<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ColumnIsGeneratedAlwaysAs<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type DrizzleTypeError<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type GetSelection<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type GetTypeboxType<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type HandleColumn<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Record<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReturnType<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type SelectedFieldsFlat<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Simplify<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Table<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type View<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type t<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type BuildRefineField<T> = T extends t.TSchema ? ((schema: T) => t.TSchema) | t.TSchema : never;

export type BuildRefine<
	TColumns extends Record<string, any>,
> = {
	[K in keyof TColumns as TColumns[K] extends Column | SelectedFieldsFlat<Column> | Table | View ? K : never]?:
		TColumns[K] extends Column ? BuildRefineField<GetTypeboxType<TColumns[K]>>
			: BuildRefine<GetSelection<TColumns[K]>>;
};

export type HandleRefinement<
	TType extends 'select' | 'insert' | 'update',
	TRefinement,
	TColumn extends Column,
> = TRefinement extends (schema: any) => t.TSchema ? (TColumn['_']['notNull'] extends true ? ReturnType<TRefinement>
		: t.TUnion<[ReturnType<TRefinement>, t.TNull]>) extends infer TSchema
		? TType extends 'update' ? t.TOptional<Assume<TSchema, t.TSchema>> : TSchema
	: t.TSchema
	: TRefinement;

export type IsRefinementDefined<
	TRefinements extends Record<string | symbol | number, any> | undefined,
	TKey extends string | symbol | number,
> = TRefinements extends object ? TRefinements[TKey] extends t.TSchema | ((schema: any) => any) ? true
	: false
	: false;

export type BuildSchema<
	TType extends 'select' | 'insert' | 'update',
	TColumns extends Record<string, any>,
	TRefinements extends Record<string, any> | undefined,
> = t.TObject<
	Simplify<
		{
			[K in keyof TColumns as ColumnIsGeneratedAlwaysAs<TColumns[K]> extends true ? never : K]: TColumns[K] extends
				infer TColumn extends Column
				? IsRefinementDefined<TRefinements, K> extends true
					? Assume<HandleRefinement<TType, TRefinements[K & keyof TRefinements], TColumn>, t.TSchema>
				: HandleColumn<TType, TColumn>
				: TColumns[K] extends infer TObject extends SelectedFieldsFlat<Column> | Table | View ? BuildSchema<
						TType,
						GetSelection<TObject>,
						TRefinements extends object ? TRefinements[K & keyof TRefinements] : undefined
					>
				: t.TAny;
		}
	>
>;

export type NoUnknownKeys<
	TRefinement extends Record<string, any>,
	TCompare extends Record<string, any>,
> = {
	[K in keyof TRefinement]: K extends keyof TCompare ? TRefinement[K] extends t.TSchema ? TRefinement[K]
		: TRefinement[K] extends Record<string, t.TSchema> ? NoUnknownKeys<TRefinement[K], TCompare[K]>
		: TRefinement[K]
		: DrizzleTypeError<`Found unknown key in refinement: "${K & string}"`>;
};
