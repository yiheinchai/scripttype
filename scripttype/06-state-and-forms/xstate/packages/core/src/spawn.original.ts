/**
 * ORIGINAL TypeScript from 06-state-and-forms/xstate/packages/core/src/spawn.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ActorRefFromLogic<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AnyActorLogic<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AnyActorRef<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ConditionalRequired<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type GetConcreteByKey<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type InputFrom<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsLiteralString<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsNotNever<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ProvidedActor<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type RequiredActorOptions<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type RequiredLogicInput<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type SpawnOptions<
  TActor extends ProvidedActor,
  TSrc extends TActor['src']
> = TActor extends {
  src: TSrc;
}
  ? ConditionalRequired<
      [
        options?: {
          id?: TActor['id'];
          systemId?: string;
          input?: InputFrom<TActor['logic']>;
          syncSnapshot?: boolean;
        } & { [K in RequiredActorOptions<TActor>]: unknown }
      ],
      IsNotNever<RequiredActorOptions<TActor>>
    >
  : never;

export type Spawner<TActor extends ProvidedActor> =
  IsLiteralString<TActor['src']> extends true
    ? {
        <TSrc extends TActor['src']>(
          logic: TSrc,
          ...[options]: SpawnOptions<TActor, TSrc>
        ): ActorRefFromLogic<GetConcreteByKey<TActor, 'src', TSrc>['logic']>;
        <TLogic extends AnyActorLogic>(
          src: TLogic,
          ...[options]: ConditionalRequired<
            [
              options?: {
                id?: never;
                systemId?: string;
                input?: InputFrom<TLogic>;
                syncSnapshot?: boolean;
              } & { [K in RequiredLogicInput<TLogic>]: unknown }
            ],
            IsNotNever<RequiredLogicInput<TLogic>>
          >
        ): ActorRefFromLogic<TLogic>;
      }
    : <TLogic extends AnyActorLogic | string>(
        src: TLogic,
        ...[options]: ConditionalRequired<
          [
            options?: {
              id?: string;
              systemId?: string;
              input?: TLogic extends string ? unknown : InputFrom<TLogic>;
              syncSnapshot?: boolean;
            } & (TLogic extends AnyActorLogic
              ? { [K in RequiredLogicInput<TLogic>]: unknown }
              : {})
          ],
          IsNotNever<
            TLogic extends AnyActorLogic ? RequiredLogicInput<TLogic> : never
          >
        >
      ) => TLogic extends AnyActorLogic
        ? ActorRefFromLogic<TLogic>
        : AnyActorRef;
