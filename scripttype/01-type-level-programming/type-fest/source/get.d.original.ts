/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/get.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ApplyDefaultOptions<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type DigitCharacter<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Extract<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type KeyAsString<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Paths<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Record<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Required<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Split<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ToString<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type _LiteralStringUnion<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type GetOptions = {
	/**
	Include `undefined` in the return type when accessing properties.

	Setting this to `false` is not recommended.

	@default true
	*/
	strict?: boolean;
};

export type Strictify<Type, Options extends Required<GetOptions>> =
	Options['strict'] extends false ? Type : (Type | undefined);

export type StrictPropertyOf<BaseType, Key extends keyof BaseType, Options extends Required<GetOptions>> =
	Record<string, any> extends BaseType
		? string extends keyof BaseType
			? Strictify<BaseType[Key], Options> // Record<string, any>
			: BaseType[Key] // Record<'a' | 'b', any> (Records with a string union as keys have required properties)
		: BaseType[Key];

export type ConsistsOnlyOf<LongString extends string, Substring extends string> =
	LongString extends ''
		? true
		: LongString extends `${Substring}${infer Tail}`
			? ConsistsOnlyOf<Tail, Substring>
			: false;

export type UncheckedIndex<T, U extends string | number> = [T] extends [Record<string | number, any>] ? T[U] : never;

export type WithStringKeys<BaseType> = {
	[Key in KeyAsString<BaseType>]: UncheckedIndex<BaseType, Key>
};

export type PropertyOf<BaseType, Key extends string, Options extends Required<GetOptions>> =
	BaseType extends null | undefined
		? undefined
		: Key extends keyof BaseType
			? StrictPropertyOf<BaseType, Key, Options>
			// Handle arrays and tuples
			: BaseType extends readonly unknown[]
				? Key extends `${number}`
					// For arrays with unknown length (regular arrays)
					? number extends BaseType['length']
						? Strictify<BaseType[number], Options>
						// For tuples: check if the index is valid
						: Key extends keyof BaseType
							? Strictify<BaseType[Key & keyof BaseType], Options>
							// Out-of-bounds access for tuples
							: unknown
					// Non-numeric string key for arrays/tuples
					: unknown
				// Handle array-like objects
				: BaseType extends {
					[n: number]: infer Item;
					length: number; // Note: This is needed to avoid being too lax with records types using number keys like `{0: string; 1: boolean}`.
				}
					? (
						ConsistsOnlyOf<Key, DigitCharacter> extends true
							? Strictify<Item, Options>
							: unknown
					)
					: Key extends keyof WithStringKeys<BaseType>
						? StrictPropertyOf<WithStringKeys<BaseType>, Key, Options>
						: unknown;

export type GetWithPath<BaseType, Keys, Options extends Required<GetOptions>> =
	Keys extends readonly []
		? BaseType
		: Keys extends readonly [infer Head, ...infer Tail]
			? GetWithPath<
				PropertyOf<BaseType, Extract<Head, string>, Options>,
				Extract<Tail, string[]>,
				Options
			>
			: never;

export type FixPathSquareBrackets<Path extends string> =
	Path extends `[${infer Head}]${infer Tail}`
		? Tail extends `[${string}`
			? `${Head}.${FixPathSquareBrackets<Tail>}`
			: `${Head}${FixPathSquareBrackets<Tail>}`
		: Path extends `${infer Head}[${infer Middle}]${infer Tail}`
			? `${Head}.${FixPathSquareBrackets<`[${Middle}]${Tail}`>}`
			: Path;

export type ToPath<S extends string> = Split<FixPathSquareBrackets<S>, '.', {strictLiteralChecks: false}>;

export type DefaultGetOptions = {
	strict: true;
};

export type Get<
	BaseType,
	Path extends
	| readonly string[]
	| _LiteralStringUnion<ToString<Paths<BaseType, {bracketNotation: false; maxRecursionDepth: 2}> | Paths<BaseType, {bracketNotation: true; maxRecursionDepth: 2}>>>,
	Options extends GetOptions = {},
> =
	GetWithPath<
		BaseType,
		Path extends string ? ToPath<Path> : Path,
		ApplyDefaultOptions<GetOptions, DefaultGetOptions, Options>
	>;
