/**
 * ORIGINAL TypeScript from 06-state-and-forms/redux-toolkit/packages/toolkit/src/query/defaultSerializeQueryArgs.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type EndpointDefinition<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type SerializeQueryArgs<QueryArgs, ReturnType = string> = (_: {
  queryArgs: QueryArgs
  endpointDefinition: EndpointDefinition<any, any, any, any>
  endpointName: string
}) => ReturnType
