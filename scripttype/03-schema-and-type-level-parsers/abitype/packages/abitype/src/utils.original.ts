/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/abitype/packages/abitype/src/utils.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Abi<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AbiParameter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AbiParameterKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AbiParameterTupleNameLookup<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AbiStateMutability<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AbiType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Extract<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Merge<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Pretty<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ResolvedRegister<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SolidityArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SolidityBytes<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SolidityFixedArrayRange<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SolidityFixedArraySizeLookup<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SolidityTuple<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Tuple<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TypedData<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TypedDataParameter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TypedDataType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface PrimitiveTypeLookup
  extends SolidityIntMap, SolidityByteMap, SolidityArrayMap {
  address: ResolvedRegister['addressType']
  bool: boolean
  function: `${ResolvedRegister['addressType']}${string}`
  string: string
  tuple: Record<string, unknown>
}

export type AbiTypeToPrimitiveType<
  abiType extends AbiType,
  abiParameterKind extends AbiParameterKind = AbiParameterKind,
> = abiType extends SolidityBytes
  ? // If PrimitiveTypeLookup is missing key values from AbiType,
    // there will be an error on this property access
    PrimitiveTypeLookup[abiType][abiParameterKind]
  : PrimitiveTypeLookup[abiType]

export type AbiBasicType = Exclude<AbiType, SolidityTuple | SolidityArray>

export type AbiComponentsToPrimitiveType<
  components extends readonly AbiParameter[],
  abiParameterKind extends AbiParameterKind,
> = components extends readonly []
  ? []
  : // Compare the original set of names to a "validated"
    // set where each name is coerced to a string and undefined|"" are excluded
    components[number]['name'] extends Exclude<
        components[number]['name'] & string,
        undefined | ''
      >
    ? // If all the original names are present, all tuple parameters are named so return as object
      {
        [component in components[number] as component['name'] & {}]: AbiParameterToPrimitiveType<
          component,
          abiParameterKind
        >
      }
    : // Otherwise, has unnamed tuple parameters so return as array
      {
        [key in keyof components]: AbiParameterToPrimitiveType<
          components[key],
          abiParameterKind
        >
      }

export type MaybeExtractArrayParameterType<type> =
  /**
   * First, infer `Head` against a known size type (either fixed-length array value or `""`).
   *
   * | Input           | Head         |
   * | --------------- | ------------ |
   * | `string[]`      | `string`     |
   * | `string[][][3]` | `string[][]` |
   */
  type extends `${infer head}[${'' | `${SolidityFixedArrayRange}`}]`
    ? //   * Then, infer in the opposite direction, using the known `head` to infer the exact `size` value.
      //   *
      //   * | Input        | Size |
      //   * | ------------ | ---- |
      //   * | `${head}[]`  | `""` |
      //   * | `${head}[3]` | `3`  |
      //   */
      type extends `${head}[${infer size}]`
      ? [head, size]
      : undefined
    : undefined

export type AbiArrayToPrimitiveType<
  abiParameter extends AbiParameter | { name: string; type: unknown },
  abiParameterKind extends AbiParameterKind,
  head extends string,
  size,
> = size extends keyof SolidityFixedArraySizeLookup
  ? // Check if size is within range for fixed-length arrays, if so create a tuple.
    Tuple<
      AbiParameterToPrimitiveType<
        Merge<abiParameter, { type: head }>,
        abiParameterKind
      >,
      SolidityFixedArraySizeLookup[size]
    >
  : // Otherwise, create an array. Tuples and arrays are created with `[${Size}]` popped off the end
    // and passed back into the function to continue reducing down to the basic types found in Step 1.
    readonly AbiParameterToPrimitiveType<
      Merge<abiParameter, { type: head }>,
      abiParameterKind
    >[]

export type AbiParameterToPrimitiveType<
  abiParameter extends AbiParameter | { name: string; type: unknown },
  abiParameterKind extends AbiParameterKind = AbiParameterKind,
  // 1. Check to see if type is basic (not tuple or array) and can be looked up immediately.
> = abiParameter['type'] extends AbiBasicType
  ? AbiTypeToPrimitiveType<abiParameter['type'], abiParameterKind>
  : // 2. Check if type is tuple and covert each component
    abiParameter extends {
        type: SolidityTuple
        components: infer components extends readonly AbiParameter[]
      }
    ? AbiComponentsToPrimitiveType<components, abiParameterKind>
    : // 3. Check if type is array.
      MaybeExtractArrayParameterType<abiParameter['type']> extends [
          infer head extends string,
          infer size,
        ]
      ? AbiArrayToPrimitiveType<abiParameter, abiParameterKind, head, size>
      : // 4. If type is not basic, tuple, or array, we don't know what the type is.
        // This can happen when a fixed-length array is out of range (`Size` doesn't exist in `SolidityFixedArraySizeLookup`),
        // the array has depth greater than `ResolvedRegister['arrayMaxDepth']`, etc.
        ResolvedRegister['strictAbiType'] extends true
        ? Error<`Unknown type '${abiParameter['type'] & string}'.`>
        : // 5. If we've gotten this far, let's check for errors in tuple components.
          // (Happens for recursive tuple typed data types.)
          abiParameter extends { components: Error<string> }
          ? abiParameter['components']
          : unknown

export type unwrapName<type, name> = name extends string
  ? AbiParameterTupleNameLookup<type>[name]
  : [type]

export type ToNamedTuple<
  abiParameter extends AbiParameter,
  abiParameterKind extends AbiParameterKind,
> = unwrapName<
  AbiParameterToPrimitiveType<abiParameter, abiParameterKind>,
  abiParameter['name']
>

export type AbiParametersToPrimitiveTypes_named<
  abiParameters extends readonly AbiParameter[],
  abiParameterKind extends AbiParameterKind = AbiParameterKind,
  ///
  acc extends readonly unknown[] = [],
  depth extends readonly number[] = [],
  // FIXME: Workaround to create labeled tuple so parameter names show up in autocomplete
  // e.g. [foo: string, bar: string]
  // Ideally this is a simple mapped type instead of tail recurision, but TypeScript does not support dynamic tuple labels
  // https://github.com/microsoft/TypeScript/issues/44939
> = depth['length'] extends 15
  ? readonly unknown[]
  : abiParameters extends readonly [
        // Significantly reduce type instantiations by batch proccessing up to six parameters at a time instead of processing one parameter per recursion
        infer head1 extends AbiParameter,
        infer head2 extends AbiParameter,
        infer head3 extends AbiParameter,
        infer head4 extends AbiParameter,
        infer head5 extends AbiParameter,
        infer head6 extends AbiParameter,
        ...infer tail extends readonly AbiParameter[],
      ]
    ? AbiParametersToPrimitiveTypes_named<
        tail,
        abiParameterKind,
        readonly [
          ...acc,
          ...ToNamedTuple<head1, abiParameterKind>,
          ...ToNamedTuple<head2, abiParameterKind>,
          ...ToNamedTuple<head3, abiParameterKind>,
          ...ToNamedTuple<head4, abiParameterKind>,
          ...ToNamedTuple<head5, abiParameterKind>,
          ...ToNamedTuple<head6, abiParameterKind>,
        ],
        [...depth, 1]
      >
    : abiParameters extends readonly [
          infer head1 extends AbiParameter,
          infer head2 extends AbiParameter,
          infer head3 extends AbiParameter,
          infer head4 extends AbiParameter,
          infer head5 extends AbiParameter,
        ]
      ? readonly [
          ...acc,
          ...ToNamedTuple<head1, abiParameterKind>,
          ...ToNamedTuple<head2, abiParameterKind>,
          ...ToNamedTuple<head3, abiParameterKind>,
          ...ToNamedTuple<head4, abiParameterKind>,
          ...ToNamedTuple<head5, abiParameterKind>,
        ]
      : abiParameters extends readonly [
            infer head1 extends AbiParameter,
            infer head2 extends AbiParameter,
            infer head3 extends AbiParameter,
            infer head4 extends AbiParameter,
          ]
        ? readonly [
            ...acc,
            ...ToNamedTuple<head1, abiParameterKind>,
            ...ToNamedTuple<head2, abiParameterKind>,
            ...ToNamedTuple<head3, abiParameterKind>,
            ...ToNamedTuple<head4, abiParameterKind>,
          ]
        : abiParameters extends readonly [
              infer head1 extends AbiParameter,
              infer head2 extends AbiParameter,
              infer head3 extends AbiParameter,
            ]
          ? readonly [
              ...acc,
              ...ToNamedTuple<head1, abiParameterKind>,
              ...ToNamedTuple<head2, abiParameterKind>,
              ...ToNamedTuple<head3, abiParameterKind>,
            ]
          : abiParameters extends readonly [
                infer head1 extends AbiParameter,
                infer head2 extends AbiParameter,
              ]
            ? readonly [
                ...acc,
                ...ToNamedTuple<head1, abiParameterKind>,
                ...ToNamedTuple<head2, abiParameterKind>,
              ]
            : abiParameters extends readonly [infer head extends AbiParameter]
              ? readonly [...acc, ...ToNamedTuple<head, abiParameterKind>]
              : acc extends readonly []
                ? abiParameters extends readonly []
                  ? readonly []
                  : readonly unknown[]
                : acc

export type AbiParametersToPrimitiveTypes_mapped<
  abiParameters extends readonly AbiParameter[],
  abiParameterKind extends AbiParameterKind = AbiParameterKind,
> = Pretty<{
  [key in keyof abiParameters]: AbiParameterToPrimitiveType<
    abiParameters[key],
    abiParameterKind
  >
}>

export type AbiParametersToPrimitiveTypes<
  abiParameters extends readonly AbiParameter[],
  abiParameterKind extends AbiParameterKind = AbiParameterKind,
  ///
  experimental_namedTuples extends boolean =
    ResolvedRegister['experimental_namedTuples'],
> = experimental_namedTuples extends true
  ? AbiParametersToPrimitiveTypes_named<abiParameters, abiParameterKind>
  : AbiParametersToPrimitiveTypes_mapped<abiParameters, abiParameterKind>

export type IsAbi<abi> = abi extends Abi ? true : false

export type ExtractAbiFunctions<
  abi extends Abi,
  abiStateMutability extends AbiStateMutability = AbiStateMutability,
> = Extract<
  abi[number],
  { type: 'function'; stateMutability: abiStateMutability }
>

export type ExtractAbiFunctionNames<
  abi extends Abi,
  abiStateMutability extends AbiStateMutability = AbiStateMutability,
> = ExtractAbiFunctions<abi, abiStateMutability>['name']

export type ExtractAbiFunction<
  abi extends Abi,
  functionName extends ExtractAbiFunctionNames<abi>,
  abiStateMutability extends AbiStateMutability = AbiStateMutability,
> = Extract<
  ExtractAbiFunctions<abi, abiStateMutability>,
  { name: functionName }
>

export type ExtractAbiEvents<abi extends Abi> = Extract<
  abi[number],
  { type: 'event' }
>

export type ExtractAbiEventNames<abi extends Abi> =
  ExtractAbiEvents<abi>['name']

export type ExtractAbiEvent<
  abi extends Abi,
  eventName extends ExtractAbiEventNames<abi>,
> = Extract<ExtractAbiEvents<abi>, { name: eventName }>

export type ExtractAbiErrors<abi extends Abi> = Extract<
  abi[number],
  { type: 'error' }
>

export type ExtractAbiErrorNames<abi extends Abi> =
  ExtractAbiErrors<abi>['name']

export type ExtractAbiError<
  abi extends Abi,
  errorName extends ExtractAbiErrorNames<abi>,
> = Extract<ExtractAbiErrors<abi>, { name: errorName }>

export type IsTypedData<typedData> = typedData extends TypedData
  ? {
      [key in keyof typedData]: {
        // Map over typed data values and turn into key-value pairs.
        // Valid types are set to `never` so we can weed out invalid types more easily.
        [key2 in typedData[key][number] as key2['type'] extends keyof typedData
          ? never
          : key2['type'] extends `${keyof typedData & string}[${string}]`
            ? never
            : key2['type'] extends TypedDataType
              ? never
              : key2['name']]: false
      }
    } extends {
      [key in keyof typedData]: Record<string, never>
    }
    ? true
    : false
  : false

export type _TypedDataParametersToAbiParameters<
  typedDataParameters extends readonly TypedDataParameter[],
  typedData extends TypedData,
  keyReferences extends { [_: string]: unknown } | unknown = unknown,
> = {
  // Map over typed data parameters and convert into ABI parameters
  [key in keyof typedDataParameters]: typedDataParameters[key] extends infer typedDataParameter extends
    {
      name: string
      type: unknown
    }
    ? // 1. Check if type is struct
      typedDataParameter['type'] extends keyof typedData & string
      ? {
          name: typedDataParameter['name']
          type: 'tuple'
          components: typedDataParameter['type'] extends keyof keyReferences
            ? Error<`Circular reference detected. '${typedDataParameter['type']}' is a circular reference.`>
            : _TypedDataParametersToAbiParameters<
                typedData[typedDataParameter['type']],
                typedData,
                keyReferences & { [_ in typedDataParameter['type']]: true }
              >
        }
      : // 2. Check if type is array of structs
        typedDataParameter['type'] extends `${infer type extends
            keyof typedData & string}[${infer tail}]`
        ? {
            name: typedDataParameter['name']
            type: `tuple[${tail}]`
            components: type extends keyof keyReferences
              ? Error<`Circular reference detected. '${typedDataParameter['type']}' is a circular reference.`>
              : _TypedDataParametersToAbiParameters<
                  typedData[type],
                  typedData,
                  keyReferences & { [_ in type]: true }
                >
          }
        : // 3. Type is already ABI parameter
          typedDataParameter
    : never
}

export type TypedDataToPrimitiveTypes<
  typedData extends TypedData,
  abiParameterKind extends AbiParameterKind = AbiParameterKind,
  keyReferences extends { [_: string]: unknown } | unknown = unknown,
> = {
  [key in keyof typedData]: {
    // Map over typed data values and turn into key-value pairs
    [key2 in typedData[key][number] as key2['name']]: key2['type'] extends key // 1. Eliminate self-referencing structs
      ? Error<`Cannot convert self-referencing struct '${key2['type']}' to primitive type.`>
      : key2['type'] extends keyof typedData // 2. Check if type is struct
        ? key2['type'] extends keyof keyReferences
          ? Error<`Circular reference detected. '${key2['type']}' is a circular reference.`>
          : TypedDataToPrimitiveTypes<
              Exclude<typedData, key>,
              abiParameterKind,
              keyReferences & { [_ in key2['type'] | key]: true }
            >[key2['type']]
        : // 3. Check if type is array of structs
          key2['type'] extends `${infer type extends keyof typedData &
              string}[${infer tail}]`
          ? AbiParameterToPrimitiveType<
              {
                name: key2['name']
                type: `tuple[${tail}]`
                components: _TypedDataParametersToAbiParameters<
                  typedData[type],
                  typedData,
                  keyReferences & { [_ in type | key]: true }
                >
              },
              abiParameterKind
            >
          : key2['type'] extends TypedDataType // 4. Known type to convert
            ? AbiParameterToPrimitiveType<key2, abiParameterKind>
            : Error<`Cannot convert unknown type '${key2['type']}' to primitive type.`>
  }
  // Ensure the result is "Prettied"
} & unknown
