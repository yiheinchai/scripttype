/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/types/call.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface TCall<Target extends TSchema = TSchema, Arguments extends TSchema[] = TSchema[]> extends TSchema {
  '~kind': 'Call'
  type: 'call',
  target: Target
  arguments: Arguments
}

export type TCallConstruct<Target extends TSchema, Arguments extends TSchema[],
  Result extends TSchema = TCall<Target, Arguments>
> = Result
