/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/abitype/packages/abitype/src/human-readable/types/structs.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AbiParameter<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ParseAbiParameter<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Record<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type StructSignature<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Trim<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type StructLookup = Record<string, readonly AbiParameter[]>

export type ParseStructProperties<
  signature extends string,
  structs extends StructLookup | unknown = unknown,
  result extends any[] = [],
> =
  Trim<signature> extends `${infer head};${infer tail}`
    ? ParseStructProperties<
        tail,
        structs,
        [...result, ParseAbiParameter<head, { structs: structs }>]
      >
    : result

export type ParseStruct<
  signature extends string,
  structs extends StructLookup | unknown = unknown,
> =
  signature extends StructSignature<infer name, infer properties>
    ? {
        readonly name: Trim<name>
        readonly components: ParseStructProperties<properties, structs>
      }
    : never

export type ResolveStructs<
  abiParameters extends readonly (AbiParameter & { type: string })[],
  structs extends Record<string, readonly (AbiParameter & { type: string })[]>,
  keyReferences extends { [_: string]: unknown } | unknown = unknown,
> = readonly [
  ...{
    [key in keyof abiParameters]: abiParameters[key]['type'] extends `${infer head extends
      string & keyof structs}[${infer tail}]` // Struct arrays (e.g. `type: 'Struct[]'`, `type: 'Struct[10]'`, `type: 'Struct[][]'`)
      ? head extends keyof keyReferences
        ? Error<`Circular reference detected. Struct "${abiParameters[key]['type']}" is a circular reference.`>
        : {
            readonly name: abiParameters[key]['name']
            readonly type: `tuple[${tail}]`
            readonly components: ResolveStructs<
              structs[head],
              structs,
              keyReferences & { [_ in head]: true }
            >
          }
      : // Basic struct (e.g. `type: 'Struct'`)
        abiParameters[key]['type'] extends keyof structs
        ? abiParameters[key]['type'] extends keyof keyReferences
          ? Error<`Circular reference detected. Struct "${abiParameters[key]['type']}" is a circular reference.`>
          : {
              readonly name: abiParameters[key]['name']
              readonly type: 'tuple'
              readonly components: ResolveStructs<
                structs[abiParameters[key]['type']],
                structs,
                keyReferences & { [_ in abiParameters[key]['type']]: true }
              >
            }
        : abiParameters[key]
  },
]

export type ParseStructs<signatures extends readonly string[]> =
  // Create "shallow" version of each struct (and filter out non-structs or invalid structs)
  {
    [signature in signatures[number] as ParseStruct<signature> extends infer struct extends
      {
        name: string
      }
      ? struct['name']
      : never]: ParseStruct<signature>['components']
  } extends infer structs extends Record<
    string,
    readonly (AbiParameter & { type: string })[]
  >
    ? // Resolve nested structs inside each struct
      {
        [structName in keyof structs]: ResolveStructs<
          structs[structName],
          structs
        >
      }
    : never
