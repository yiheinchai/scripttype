/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/schema/predicate.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Traversal<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type Predicate<data = any> = (data: data, ctx: Traversal) => boolean

export interface NormalizedSchema<predicate extends Predicate = Predicate>
		extends BaseNormalizedSchema {
		readonly predicate: predicate
	}

export type Schema<predicate extends Predicate = Predicate> =
		| NormalizedSchema<predicate>
		| predicate

export type Casted<input = never, narrowed extends input = input> = (
		input: input,
		ctx: Traversal
	) => input is narrowed

export type Castable<input = never, narrowed extends input = input> =
		| Predicate<input>
		| Casted<input, narrowed>
