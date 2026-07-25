/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/client/src/links/loggerLink.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyRouter<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type InferrableClientTypes<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Operation<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type OperationResultEnvelope<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TRPCClientError<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
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
