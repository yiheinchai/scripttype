/**
 * ORIGINAL TypeScript from 06-state-and-forms/redux-toolkit/packages/toolkit/src/query/core/buildSlice.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AllQueryKeys<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type DataFromAnyQueryDefinition<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type EndpointDefinitions<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type PayloadAction<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type QueryArgFromAnyQueryDefinition<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type NormalizedQueryUpsertEntry<
  Definitions extends EndpointDefinitions,
  EndpointName extends AllQueryKeys<Definitions>,
> = {
  endpointName: EndpointName
  arg: QueryArgFromAnyQueryDefinition<Definitions, EndpointName>
  value: DataFromAnyQueryDefinition<Definitions, EndpointName>
}

export type NormalizedQueryUpsertEntryPayload = {
  endpointName: string
  arg: unknown
  value: unknown
}

export type UpsertEntries<Definitions extends EndpointDefinitions> = (<
  EndpointNames extends Array<AllQueryKeys<Definitions>>,
>(
  entries: [
    ...{
      [I in keyof EndpointNames]: NormalizedQueryUpsertEntry<
        Definitions,
        EndpointNames[I]
      >
    },
  ],
) => PayloadAction<NormalizedQueryUpsertEntryPayload[]>) & {
  match: (
    action: unknown,
  ) => action is PayloadAction<NormalizedQueryUpsertEntryPayload[]>
}
