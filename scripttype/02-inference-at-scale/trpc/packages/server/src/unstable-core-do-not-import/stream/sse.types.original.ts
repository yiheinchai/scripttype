/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/server/src/unstable-core-do-not-import/stream/sse.types.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ConstructorParameters<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type InstanceType<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Parameters<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export interface InitDict {
    withCredentials?: boolean;
  }

export interface Event {}

export type EventSourceListenerLike = (event: Event) => void;

export interface Instance {
    readonly CLOSED: number;
    readonly CONNECTING: number;
    readonly OPEN: number;

    addEventListener(type: string, listener: EventSourceListenerLike): void;
    removeEventListener(type: string, listener: EventSourceListenerLike): void;
    close: () => void;

    readyState: number;
  }

export type AnyConstructorLike<TInit extends InitDict> = new (
    url: string,
    eventSourceInitDict?: TInit,
  ) => Instance;

export type AnyConstructor = AnyConstructorLike<any>;

export type ListenerOf<T extends AnyConstructor> = Parameters<
    InstanceType<T>['addEventListener']
  >[1];

export type EventOf<T extends AnyConstructor> = Parameters<ListenerOf<T>>[0];

export type InitDictOf<T extends AnyConstructor> =
    ConstructorParameters<T>[1];
