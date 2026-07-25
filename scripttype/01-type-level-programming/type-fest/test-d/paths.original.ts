/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/test-d/paths.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Paths<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type PathsConstraint<T, _U extends Paths<T>> = never;

export type Generic1<T> = {bar: {baz: T}};

export type Test1<T> = PathsConstraint<Generic1<T>, 'bar.baz'>;

export type Generic2<T, U> = {bar: {baz: {qux: T}; fizz: {buzz: U} | U | T}};

export type Test2<T, U> = PathsConstraint<
	Generic2<T, U>,
	'bar' | 'bar.baz' | 'bar.baz.qux' | 'bar.fizz' | 'bar.fizz.buzz'
>;

export type LeavesOnlyPathsConstraint<T, _U extends Paths<T, {leavesOnly: true}>> = never;

export type Generic3<T> = {bar: {baz: T; qux: string}};

export type Test3<T> = LeavesOnlyPathsConstraint<Generic3<T>, 'bar.qux'>;

export type Test4<T> = LeavesOnlyPathsConstraint<Generic3<T>, 'bar'>;

export type Test5<T> = LeavesOnlyPathsConstraint<Generic3<T>, 'bar.baz'>;

export type DepthPathsConstraint<T, _U extends Paths<T, {depth: 1}>> = never;

export type Generic4<T> = {bar: {baz: T}; qux: [T]};

export type Test6<T> = DepthPathsConstraint<Generic4<T>, 'bar.baz' | 'qux.0'>;

export type Test7<T> = DepthPathsConstraint<Generic4<T>, 'bar'>;

export type Test8<T> = DepthPathsConstraint<Generic4<T>, 'qux'>;

export type BracketNotationPathsConstraint<T, _U extends Paths<T, {bracketNotation: true}>> = never;

export type Generic5<T> = {1: {2: T}; 3: [T]};

export type Test9<T> = BracketNotationPathsConstraint<Generic5<T>, '[1]' | '[1][2]' | '[3]' | '[3][0]'>;

export type MaxRecursionDepthPathsConstraint<T, _U extends Paths<T, {maxRecursionDepth: 2}>> = never;

export type Generic6<T> = {foo: {bar: T}; baz: T; fizz: {buzz: {qux: {quxx: T}}}};

export type Test10<T> = MaxRecursionDepthPathsConstraint<
	Generic6<T>,
	'foo' | 'foo.bar' | 'baz' | 'fizz' | 'fizz.buzz' | 'fizz.buzz.qux'
>;

export type Test11<T> = MaxRecursionDepthPathsConstraint<Generic6<T>, 'fizz.buzz.qux.quxx'>;

export type LeavesOnlyAndDepthPathsConstraint<T, _U extends Paths<T, {leavesOnly: true; depth: 1}>> = never;

export type Generic7<T> = {foo: {bar: T; baz: string; fizz: {buzz: number}}; qux: string};

export type Test12<T> = LeavesOnlyAndDepthPathsConstraint<Generic7<T>, 'foo.baz'>;

export type Test13<T> = LeavesOnlyAndDepthPathsConstraint<Generic7<T>, 'qux'>;

export type Test14<T> = LeavesOnlyAndDepthPathsConstraint<Generic7<T>, 'foo.fizz'>;

export type Test15<T> = LeavesOnlyAndDepthPathsConstraint<Generic7<T>, 'foo.bar'>;
