/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/unstable/workflow/WorkflowProxyServer.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Rpc<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Workflow<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type RpcHandlers<Workflows extends Workflow.Any, Prefix extends string> = Workflows extends Workflow.Workflow<
  infer _Name,
  infer _Payload,
  infer _Success,
  infer _Error
> ? Rpc.Handler<`${Prefix}${_Name}`> | Rpc.Handler<`${Prefix}${_Name}Discard`> | Rpc.Handler<`${Prefix}${_Name}Resume`>
  : never
