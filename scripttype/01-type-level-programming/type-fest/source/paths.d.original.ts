/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/paths.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type And<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ApplyDefaultOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type GreaterThan<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsAny<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsNumberLike<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MapsSetsOrArrays<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonRecursiveType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Required<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Sum<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ToString<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnknownArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type PathsOptions = {
	/**
	The maximum depth to recurse when searching for paths. Range: 0 ~ 10.

	@default 5
	*/
	maxRecursionDepth?: number;

	/**
	Use bracket notation for array indices and numeric object keys.

	@default false

	@example
	```
	import type {Paths} from 'type-fest';

	type ArrayExample = {
		array: ['foo'];
	};

	type A = Paths<ArrayExample, {bracketNotation: false}>;
	//=> 'array' | 'array.0'

	type B = Paths<ArrayExample, {bracketNotation: true}>;
	//=> 'array' | 'array[0]'
	```

	@example
	```
	import type {Paths} from 'type-fest';

	type NumberKeyExample = {
		1: ['foo'];
	};

	type A = Paths<NumberKeyExample, {bracketNotation: false}>;
	//=> 1 | '1' | '1.0'

	type B = Paths<NumberKeyExample, {bracketNotation: true}>;
	//=> '[1]' | '[1][0]'
	```
	*/
	bracketNotation?: boolean;

	/**
	Only include leaf paths in the output.

	@default false

	@example
	```
	import type {Paths} from 'type-fest';

	type Post = {
		id: number;
		author: {
			id: number;
			name: {
				first: string;
				last: string;
			};
		};
	};

	type AllPaths = Paths<Post, {leavesOnly: false}>;
	//=> 'id' | 'author' | 'author.id' | 'author.name' | 'author.name.first' | 'author.name.last'

	type LeafPaths = Paths<Post, {leavesOnly: true}>;
	//=> 'id' | 'author.id' | 'author.name.first' | 'author.name.last'
	```

	@example
	```
	import type {Paths} from 'type-fest';

	type ArrayExample = {
		array: Array<{foo: string}>;
		tuple: [string, {bar: string}];
	};

	type AllPaths = Paths<ArrayExample, {leavesOnly: false}>;
	//=> 'array' | 'tuple' | `array.${number}` | `array.${number}.foo` | 'tuple.0' | 'tuple.1' | 'tuple.1.bar'

	type LeafPaths = Paths<ArrayExample, {leavesOnly: true}>;
	//=> `array.${number}.foo` | 'tuple.0' | 'tuple.1.bar'
	```
	*/
	leavesOnly?: boolean;

	/**
	Only include paths at the specified depth. By default all paths up to {@link PathsOptions.maxRecursionDepth | `maxRecursionDepth`} are included.

	Note: Depth starts at `0` for root properties.

	@default number

	@example
	```
	import type {Paths} from 'type-fest';

	type Post = {
		id: number;
		author: {
			id: number;
			name: {
				first: string;
				last: string;
			};
		};
	};

	type DepthZero = Paths<Post, {depth: 0}>;
	//=> 'id' | 'author'

	type DepthOne = Paths<Post, {depth: 1}>;
	//=> 'author.id' | 'author.name'

	type DepthTwo = Paths<Post, {depth: 2}>;
	//=> 'author.name.first' | 'author.name.last'

	type LeavesAtDepthOne = Paths<Post, {leavesOnly: true; depth: 1}>;
	//=> 'author.id'
	```
	*/
	depth?: number;
};

export type InternalPaths<T, Options extends Required<PathsOptions>, CurrentDepth extends number> =
	{[Key in keyof T]: Key extends string | number // Limit `Key` to `string | number`
		? (
			And<Options['bracketNotation'], IsNumberLike<Key>> extends true
				? `[${Key}]`
				: CurrentDepth extends 0
					// Return both `Key` and `ToString<Key>` because for number keys, like `1`, both `1` and `'1'` are valid keys.
					? Key | ToString<Key>
					: `.${(Key | ToString<Key>)}`
		) extends infer TransformedKey extends string | number
			? ((Options['leavesOnly'] extends true
				? Options['maxRecursionDepth'] extends CurrentDepth
					? TransformedKey
					: IsNever<T[Key]> extends true
						? TransformedKey
						: T[Key] extends infer Value // For distributing `T[Key]`
							? (Value extends readonly [] | NonRecursiveType | Exclude<MapsSetsOrArrays, UnknownArray>
								? TransformedKey
								: IsNever<keyof Value> extends true // Check for empty object & `unknown`, because `keyof unknown` is `never`.
									? TransformedKey
									: never)
							: never // Should never happen
				: TransformedKey
			) extends infer _TransformedKey
				// If `depth` is provided, the condition becomes truthy only when it matches `CurrentDepth`.
				// Otherwise, since `depth` defaults to `number`, the condition is always truthy, returning paths at all depths.
				? CurrentDepth extends Options['depth']
					? _TransformedKey
					: never
				: never)
			// Recursively generate paths for the current key
			| (GreaterThan<Options['maxRecursionDepth'], CurrentDepth> extends true // Limit the depth to prevent infinite recursion
				? `${TransformedKey}${_Paths<T[Key], Options, Sum<CurrentDepth, 1>> & (string | number)}`
				: never)
			: never
		: never
	}[keyof T & (T extends UnknownArray ? number : unknown)];

export type _Paths<T, Options extends Required<PathsOptions>, CurrentDepth extends number = 0> =
	T extends NonRecursiveType | Exclude<MapsSetsOrArrays, UnknownArray>
		? never
		: IsAny<T> extends true
			? never
			: T extends object
				? InternalPaths<Required<T>, Options, CurrentDepth>
				: never;

export type DefaultPathsOptions = {
	maxRecursionDepth: 5;
	bracketNotation: false;
	leavesOnly: false;
	depth: number;
};

export type Paths<T, Options extends PathsOptions = {}> = _Paths<T, ApplyDefaultOptions<PathsOptions, DefaultPathsOptions, Options>>;
