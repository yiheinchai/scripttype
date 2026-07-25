/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/schema/shared/standardSchema.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type PropertyKey<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReadonlyArray<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export interface StandardTypedV1<Input = unknown, Output = Input> {
	/** The Standard properties. */
	readonly "~standard": StandardTypedV1.Props<Input, Output>
}

export type InferInput<Schema extends StandardTypedV1> =
		StandardTypedV1.InferInput<Schema>

export type InferOutput<Schema extends StandardTypedV1> =
		StandardTypedV1.InferOutput<Schema>

export interface SuccessResult<Output> {
		/** The typed output value. */
		readonly value: Output
		/** A falsy value for `issues` indicates success. */
		readonly issues?: undefined
	}

export interface PathSegment {
		/** The key representing a path segment. */
		readonly key: PropertyKey
	}

export interface Issue {
		/** The error message of the issue. */
		readonly message: string
		/** The path of the issue, if any. */
		readonly path?: ReadonlyArray<PropertyKey | PathSegment> | undefined
	}

export interface FailureResult {
		/** The issues of failed validation. */
		readonly issues: ReadonlyArray<Issue>
	}

export type Result<Output> = SuccessResult<Output> | FailureResult
