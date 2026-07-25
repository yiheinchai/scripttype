/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/set-field-type.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ApplyDefaultOptions<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Record<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Required<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Simplify<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type SetFieldTypeOptions = {
	/**
	Preserve optional and readonly modifiers for properties being updated.

	NOTE: Property modifiers will always be preserved for properties that are not being updated.

	@default true
	*/
	preservePropertyModifiers?: boolean;
};

export type _SetFieldType<BaseType, Keys extends keyof BaseType, NewType, Options extends Required<SetFieldTypeOptions>> =
	Simplify<{
		[P in keyof BaseType]: P extends Keys ? NewType : BaseType[P];
	} & (
		// `Record` is used to remove property modifiers
		Options['preservePropertyModifiers'] extends false ? Record<Keys, NewType> : unknown
	)>;

export type DefaultSetFieldTypeOptions = {
	preservePropertyModifiers: true;
};

export type SetFieldType<BaseType, Keys extends keyof BaseType, NewType, Options extends SetFieldTypeOptions = {}> =
	_SetFieldType<BaseType, Keys, NewType, ApplyDefaultOptions<SetFieldTypeOptions, DefaultSetFieldTypeOptions, Options>>;
