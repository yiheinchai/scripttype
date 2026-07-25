/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/server/src/adapters/aws-lambda/index.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type APIGWContext<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type CreateContextCallback<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type HTTPBaseHandlerOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type LambdaEvent<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCRequestInfo<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferRouterContext<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type CreateAWSLambdaContextOptions<TEvent extends LambdaEvent> = {
  event: TEvent;
  context: APIGWContext;
  info: TRPCRequestInfo;
};

export type AWSLambdaCreateContextFn<
  TRouter extends AnyRouter,
  TEvent extends LambdaEvent,
> = ({
  event,
  context,
  info,
}: CreateAWSLambdaContextOptions<TEvent>) =>
  | inferRouterContext<TRouter>
  | Promise<inferRouterContext<TRouter>>;

export type AWSLambdaOptions<
  TRouter extends AnyRouter,
  TEvent extends LambdaEvent,
> = HTTPBaseHandlerOptions<TRouter, TEvent> &
  CreateContextCallback<
    inferRouterContext<AnyRouter>,
    AWSLambdaCreateContextFn<TRouter, TEvent>
  >;
