/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/util/serialize.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Primitive<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type array<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type snapshotPrimitive<t> = t extends symbol ? `Symbol(${string})` : t

export type snapshot<t, depth extends 1[] = []> =
	unknown extends t ? unknown
	: t extends Primitive ? snapshotPrimitive<t>
	: t extends { toJSON: () => infer serialized } ? serialized
	: t extends Function ? `Function(${string})`
	: t extends Date ? string
	: depth["length"] extends 10 ? unknown
	: t extends array<infer item> ? array<snapshot<item, [...depth, 1]>>
	: {
			[k in keyof t as snapshotPrimitive<k>]: snapshot<t[k], [...depth, 1]>
		}
