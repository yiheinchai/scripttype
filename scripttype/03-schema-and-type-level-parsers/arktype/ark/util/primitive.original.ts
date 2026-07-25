/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/util/primitive.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BigintLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferDomain<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type SerializedString<value extends string = string> = `"${value}"`

export type SerializedPrimitives = {
	string: SerializedString
	number: `${number}`
	bigint: BigintLiteral
	boolean: "true" | "false"
	null: "null"
	undefined: "undefined"
}

export type SerializablePrimitive = inferDomain<keyof SerializedPrimitives>

export type serializePrimitive<value extends SerializablePrimitive> =
	value extends string ? `"${value}"`
	: value extends bigint ? `${value}n`
	: `${value}`
