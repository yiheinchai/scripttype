/**
 * ORIGINAL TypeScript from 06-state-and-forms/xstate/packages/core/src/spawn.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ActorRefFromLogic<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyActorLogic<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyActorRef<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ConditionalRequired<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type GetConcreteByKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InputFrom<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsLiteralString<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsNotNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ProvidedActor<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RequiredActorOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RequiredLogicInput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
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
