/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-router/packages/router-core/src/useNavigate.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type NavigateOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RegisteredRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type UseNavigateResult<TDefaultFrom extends string> = <
  TRouter extends RegisteredRouter,
  TTo extends string | undefined,
  TFrom extends string = TDefaultFrom,
  TMaskFrom extends string = TFrom,
  TMaskTo extends string = '',
>({
  from,
  ...rest
}: NavigateOptions<TRouter, TFrom, TTo, TMaskFrom, TMaskTo>) => Promise<void>
