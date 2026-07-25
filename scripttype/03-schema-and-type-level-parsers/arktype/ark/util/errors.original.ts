/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/util/errors.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type noSuggest<s extends string = string> = ` ${s}`

export type ZeroWidthSpace = typeof ZeroWidthSpace

export type ErrorMessage<message extends string = string> =
	`${message}${ZeroWidthSpace}`

export type Completion<text extends string = string> =
	`${text}${ZeroWidthSpace}${ZeroWidthSpace}`
