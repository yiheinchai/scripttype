/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/schema/shared/utils.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Thunk<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type array<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type mutable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type makeRootAndArrayPropertiesMutable<inner> = {
	-readonly [k in keyof inner]: inner[k] extends array | undefined ?
		mutable<inner[k]>
	:	inner[k]
} & unknown

export type internalImplementationOf<
	external,
	typeOnlyKey extends keyof external = never
> = {
	// ensure functions accept compatible numbers of args
	[k in Exclude<keyof external, typeOnlyKey>]: external[k] extends (
		(...args: infer args) => unknown
	) ?
		(...args: { [i in keyof args]: never }) => unknown
	:	unknown
}

export type unwrapDefault<thunkableValue> =
	thunkableValue extends Thunk<infer returnValue> ? returnValue : thunkableValue
