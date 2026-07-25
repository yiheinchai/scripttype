/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/literal-to-primitive.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type LiteralToPrimitive<T> = T extends number
	? number
	: T extends bigint
		? bigint
		: T extends string
			? string
			: T extends boolean
				? boolean
				: T extends symbol
					? symbol
					: T extends null
						? null
						: T extends undefined
							? undefined
							: never;
