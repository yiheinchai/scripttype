/**
 * ORIGINAL TypeScript from 06-state-and-forms/redux-toolkit/packages/toolkit/src/query/react/namedHooks.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Capitalize<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type DefinitionType<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type EndpointDefinitions<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Extract<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type InfiniteQueryDefinition<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type MutationDefinition<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type QueryDefinition<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type UseInfiniteQuery<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type UseLazyQuery<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type UseMutation<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type UseQuery<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type QueryHookNames<Definitions extends EndpointDefinitions> = {
  [K in keyof Definitions as Definitions[K] extends {
    type: DefinitionType.query
  }
    ? `use${Capitalize<K & string>}Query`
    : never]: UseQuery<
    Extract<Definitions[K], QueryDefinition<any, any, any, any>>
  >
}

export type LazyQueryHookNames<Definitions extends EndpointDefinitions> = {
  [K in keyof Definitions as Definitions[K] extends {
    type: DefinitionType.query
  }
    ? `useLazy${Capitalize<K & string>}Query`
    : never]: UseLazyQuery<
    Extract<Definitions[K], QueryDefinition<any, any, any, any>>
  >
}

export type InfiniteQueryHookNames<Definitions extends EndpointDefinitions> = {
  [K in keyof Definitions as Definitions[K] extends {
    type: DefinitionType.infinitequery
  }
    ? `use${Capitalize<K & string>}InfiniteQuery`
    : never]: UseInfiniteQuery<
    Extract<Definitions[K], InfiniteQueryDefinition<any, any, any, any, any>>
  >
}

export type MutationHookNames<Definitions extends EndpointDefinitions> = {
  [K in keyof Definitions as Definitions[K] extends {
    type: DefinitionType.mutation
  }
    ? `use${Capitalize<K & string>}Mutation`
    : never]: UseMutation<
    Extract<Definitions[K], MutationDefinition<any, any, any, any>>
  >
}

export type HooksWithUniqueNames<Definitions extends EndpointDefinitions> =
  QueryHookNames<Definitions> &
    LazyQueryHookNames<Definitions> &
    InfiniteQueryHookNames<Definitions> &
    MutationHookNames<Definitions>
