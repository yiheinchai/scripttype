/**
 * ORIGINAL TypeScript from 06-state-and-forms/redux-toolkit/packages/toolkit/src/query/react/namedHooks.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Capitalize<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DefinitionType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type EndpointDefinitions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Extract<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InfiniteQueryDefinition<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MutationDefinition<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryDefinition<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UseInfiniteQuery<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UseLazyQuery<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UseMutation<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UseQuery<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
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
