/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/server/src/adapters/aws-lambda/getPlanner.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type APIGatewayProxyEvent<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type APIGatewayProxyEventV2<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type APIGatewayProxyResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type APIGatewayProxyStructuredResultV2<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type inferAPIGWReturn<TEvent> = TEvent extends APIGatewayProxyEvent
  ? APIGatewayProxyResult
  : TEvent extends APIGatewayProxyEventV2
    ? APIGatewayProxyStructuredResultV2
    : never;
