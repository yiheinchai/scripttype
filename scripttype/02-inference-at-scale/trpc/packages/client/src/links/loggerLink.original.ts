/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/client/src/links/loggerLink.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferrableClientTypes<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Operation<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type OperationResultEnvelope<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCClientError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type EnableFnOptions<TRouter extends InferrableClientTypes> =
  | {
      direction: 'down';
      result:
        | OperationResultEnvelope<unknown, TRPCClientError<TRouter>>
        | TRPCClientError<TRouter>;
    }
  | (Operation & {
      direction: 'up';
    });

export type EnabledFn<TRouter extends AnyRouter> = (
  opts: EnableFnOptions<TRouter>,
) => boolean;

export type LoggerLinkFnOptions<TRouter extends AnyRouter> = Operation &
  (
    | {
        /**
         * Request result
         */
        direction: 'down';
        result:
          | OperationResultEnvelope<unknown, TRPCClientError<TRouter>>
          | TRPCClientError<TRouter>;
        elapsedMs: number;
      }
    | {
        /**
         * Request was just initialized
         */
        direction: 'up';
      }
  );

export type LoggerLinkFn<TRouter extends AnyRouter> = (
  opts: LoggerLinkFnOptions<TRouter>,
) => void;
