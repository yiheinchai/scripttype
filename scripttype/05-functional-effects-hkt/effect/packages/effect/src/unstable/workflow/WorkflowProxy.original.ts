/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/unstable/workflow/WorkflowProxy.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type HttpApiEndpoint<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Lowercase<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ResumePayload<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Rpc<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Workflow<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ConvertRpcs<Workflows extends Workflow.Any, Prefix extends string> = Workflows extends Workflow.Workflow<
  infer _Name,
  infer _Payload,
  infer _Success,
  infer _Error
> ?
    | Rpc.Rpc<`${Prefix}${_Name}`, _Payload, _Success, _Error>
    | Rpc.Rpc<`${Prefix}${_Name}Discard`, _Payload>
    | Rpc.Rpc<`${Prefix}${_Name}Resume`, typeof ResumePayload>
  : never

export type ConvertHttpApi<Workflows extends Workflow.Any> = Workflows extends Workflow.Workflow<
  infer _Name,
  infer _Payload,
  infer _Success,
  infer _Error
> ?
    | HttpApiEndpoint.HttpApiEndpoint<
      _Name,
      "POST",
      `/${Lowercase<_Name>}`,
      never,
      never,
      _Payload,
      never,
      _Success,
      _Error
    >
    | HttpApiEndpoint.HttpApiEndpoint<
      `${_Name}Discard`,
      "POST",
      `/${Lowercase<_Name>}/discard`,
      never,
      never,
      _Payload
    >
    | HttpApiEndpoint.HttpApiEndpoint<
      `${_Name}Resume`,
      "POST",
      `/${Lowercase<_Name>}/resume`,
      never,
      never,
      typeof ResumePayload
    > :
  never
