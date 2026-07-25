/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/type/keywords/constructors.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export interface instances extends ecmascript, platform {}

export type NonDegenerateName =
		keyof instances extends infer k ?
			k extends keyof instances ?
				{} extends instances[k] ?
					never
				:	k
			:	never
		:	never

export type instanceOf<name extends NonDegenerateName = NonDegenerateName> =
		instances[name]
