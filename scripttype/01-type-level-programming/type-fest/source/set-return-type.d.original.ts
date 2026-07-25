/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/set-return-type.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type IsUnknown<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Parameters<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type SetReturnType<Function_ extends (...arguments_: any[]) => any, TypeToReturn> =
	// Just using `Parameters<Fn>` isn't ideal because it doesn't handle the `this` fake parameter.
	Function_ extends (this: infer ThisArgument, ...arguments_: infer Arguments) => any ? (
		// If a function did not specify the `this` fake parameter, it will be inferred to `unknown`.
		// We want to detect this situation just to display a friendlier type upon hovering on an IntelliSense-powered IDE.
		IsUnknown<ThisArgument> extends true ? (...arguments_: Arguments) => TypeToReturn : (this: ThisArgument, ...arguments_: Arguments) => TypeToReturn
	) : (
		// This part should be unreachable, but we make it meaningful just in case…
		(...arguments_: Parameters<Function_>) => TypeToReturn
	);
