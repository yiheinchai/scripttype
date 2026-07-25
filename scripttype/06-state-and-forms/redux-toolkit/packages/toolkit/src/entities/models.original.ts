/**
 * ORIGINAL TypeScript from 06-state-and-forms/redux-toolkit/packages/toolkit/src/entities/models.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type CastAny<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Draft<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Partial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Comparer<T> = (a: T, b: T) => number

export type EntityId = number | string

export type IdSelector<T, Id extends EntityId> = (model: T) => Id

export type Update<T, Id extends EntityId> = { id: Id; changes: Partial<T> }

export interface EntityState<T, Id extends EntityId> {
  ids: Id[]
  entities: Record<Id, T>
}

export type PreventAny<S, T, Id extends EntityId> = CastAny<
  S,
  EntityState<T, Id>
>

export type DraftableEntityState<T, Id extends EntityId> =
  | EntityState<T, Id>
  | Draft<EntityState<T, Id>>
