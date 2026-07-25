/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/test-d/internal/apply-default-options.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ApplyDefaultOptions<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Required<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type PathsOptions = {
	maxRecursionDepth?: number;
	bracketNotation?: boolean;
	leavesOnly?: boolean;
	depth?: number;
};

export type _SomeType<Options extends Required<PathsOptions>> = Options;

export type DefaultPathsOptions = {
	maxRecursionDepth: 10;
	bracketNotation: false;
	leavesOnly: false;
	depth: number;
};

export type SomeType<Options extends PathsOptions = {}> = _SomeType<ApplyDefaultOptions<PathsOptions, DefaultPathsOptions, Options>>;

export type _SomeType2<Options extends Required<PathsOptions> & {extra: string}> = Options;

export type SomeType2<Options extends PathsOptions = {}> = _SomeType2<ApplyDefaultOptions<PathsOptions, DefaultPathsOptions, Options>>;

export type SomeTypeOptions = {foo: string; bar?: number};

export type _SomeType3<Options extends Required<SomeTypeOptions>> = Options;

export type DefaultSomeTypeOptions = {bar: 0};

export type SomeType3<Options extends SomeTypeOptions> = _SomeType3<ApplyDefaultOptions<SomeTypeOptions, DefaultSomeTypeOptions, Options>>;

export type _SomeType4<Options extends Required<SomeTypeOptions> & {extra: string}> = Options;

export type SomeType4<Options extends SomeTypeOptions> = _SomeType4<ApplyDefaultOptions<SomeTypeOptions, DefaultSomeTypeOptions, Options>>;
