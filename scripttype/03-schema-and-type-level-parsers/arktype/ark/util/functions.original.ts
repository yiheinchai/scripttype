/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/util/functions.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type Fn<
	args extends readonly any[] = readonly any[],
	returns = unknown
> = (...args: args) => returns

export type Thunk<ret = unknown> = () => ret

export type thunkable<t> = t | Thunk<t>

export type CallableOptions<attachments extends object> = {
	attach?: attachments
	bind?: object
}

export type GuardablePredicate<
	input = unknown,
	narrowed extends input = input
> = ((In: input) => In is narrowed) | ((In: input) => boolean)

export type TypeGuard<input = unknown, narrowed extends input = input> = (
	In: input
) => In is narrowed
