/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/conditional-pick-deep.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ApplyDefaultOptions<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ConditionalExcept<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ConditionalSimplifyDeep<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type EmptyObject<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsEqual<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsPlainObject<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Required<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type UnknownRecord<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type conditionalPickDeepSymbol<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type ConditionalPickDeepOptions = {
	/**
	The condition assertion mode.

	@default 'extends'
	*/
	condition?: 'extends' | 'equality';
};

export type AssertCondition<Type, Condition, Options extends ConditionalPickDeepOptions> = Options['condition'] extends 'equality'
	? IsEqual<Type, Condition>
	: Type extends Condition
		? true
		: false;

export type _NeverIfEmpty<Type> = Type extends EmptyObject ? never : Type;

export type _ConditionalPickDeep<
	Type,
	Condition,
	Options extends Required<ConditionalPickDeepOptions>,
> = ConditionalSimplifyDeep<ConditionalExcept<{
	[Key in keyof Type]: AssertCondition<Type[Key], Condition, Options> extends true
		? Type[Key]
		: IsPlainObject<Type[Key]> extends true
			? _ConditionalPickDeep<Type[Key], Condition, Options>
			: typeof conditionalPickDeepSymbol;
}, (typeof conditionalPickDeepSymbol | undefined) | EmptyObject>, never, UnknownRecord>;

export type DefaultConditionalPickDeepOptions = {
	condition: 'extends';
};

export type ConditionalPickDeep<
	Type,
	Condition,
	Options extends ConditionalPickDeepOptions = {},
> = _NeverIfEmpty<_ConditionalPickDeep<
	Type,
	Condition,
	ApplyDefaultOptions<ConditionalPickDeepOptions, DefaultConditionalPickDeepOptions, Options>
>>;
