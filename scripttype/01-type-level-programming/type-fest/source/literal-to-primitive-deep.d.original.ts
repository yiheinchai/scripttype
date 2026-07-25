/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/literal-to-primitive-deep.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type LiteralToPrimitive<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type OmitIndexSignature<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type LiteralToPrimitiveDeep<T> = T extends object
	? T extends Array<infer U>
		? Array<LiteralToPrimitiveDeep<U>>
		: {
			[K in keyof OmitIndexSignature<T>]: LiteralToPrimitiveDeep<T[K]>;
		}
	: LiteralToPrimitive<T>;
