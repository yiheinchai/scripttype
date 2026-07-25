/**
 * ORIGINAL TypeScript from 02-inference-at-scale/elysia/src/utils.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Blob<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ElysiaFile<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type File<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FormData<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Prettify<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Replace<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SSEPayload<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type IsTuple<T> = T extends readonly any[]
	? number extends T['length']
		? false
		: true
	: false

export type ElysiaFormData<T extends Record<keyof any, unknown>> = FormData & {
	[ELYSIA_FORM_DATA]: Replace<T, Blob | ElysiaFile, File> extends infer A
		? {
				[key in keyof A]: IsTuple<A[key]> extends true
					? // @ts-ignore Trust me bro
						A[key][number] extends Blob | ElysiaFile
						? File[]
						: A[key]
					: A[key]
			}
		: T
}

export type FormatSSEPayload<T = unknown> = T extends string
	? { readonly data: T }
	: Prettify<SSEPayload<T>>
