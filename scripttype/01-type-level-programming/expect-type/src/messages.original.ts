/**
 * ORIGINAL TypeScript from 01-type-level-programming/expect-type/src/messages.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type And<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DeepBrandOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DeepBrandOptionsDefaults<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Extends<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ExtendsExcludingAnyOrNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Extract<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsAny<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsUnknown<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonNullable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Not<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type OptionalKeys<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StrictEqualUsingBranding<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StrictEqualUsingTSInternalIdenticalToOperator<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UsefulKeys<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type PrintType<T> =
  IsUnknown<T> extends true
    ? 'unknown'
    : IsNever<T> extends true
      ? 'never'
      : IsAny<T> extends true
        ? never // special case, can't use `'any'` because that would match `any`
        : boolean extends T
          ? 'boolean'
          : T extends boolean
            ? `literal boolean: ${T}`
            : string extends T
              ? 'string'
              : T extends string
                ? `literal string: ${T}`
                : number extends T
                  ? 'number'
                  : T extends number
                    ? `literal number: ${T}`
                    : bigint extends T
                      ? 'bigint'
                      : T extends bigint
                        ? `literal bigint: ${T}`
                        : T extends null
                          ? 'null'
                          : T extends undefined
                            ? 'undefined'
                            : T extends (...args: any[]) => any
                              ? 'function'
                              : '...'

export type Optionalify<T, TOptionalKeys> = [TOptionalKeys] extends [never]
  ? T // no optional keys, just use the original type
  : (
      {[K in Exclude<keyof T, TOptionalKeys>]: T[K]} &
      {[K in Extract<keyof T, TOptionalKeys>]?: T[K]}
    ) extends infer X ? {[K in keyof X]: X[K]} : never

export type MismatchInfo<Actual, Expected, Options extends DeepBrandOptions = DeepBrandOptionsDefaults> =
  And<[Extends<PrintType<Actual>, '...'>, Not<IsAny<Actual>>]> extends true
    ? And<[Extends<any[], Actual>, Extends<any[], Expected>]> extends true
      ? Array<MismatchInfo<Extract<Actual, any[]>[number], Extract<Expected, any[]>[number], Options>>
      : Optionalify<
          {
            [K in UsefulKeys<Actual> | UsefulKeys<Expected>]: MismatchInfo<
              K extends keyof Actual ? Actual[K] : never,
              K extends keyof Expected ? Expected[K] : never,
              Options
            >
          },
          OptionalKeys<Expected>
        >
    : StrictEqualUsingBranding<Actual, Expected, Options> extends true
      ? Actual
      : `Expected: ${PrintType<Expected>}, Actual: ${PrintType<Exclude<Actual, Expected>>}`

export type Inverted<T> = {[inverted]: T}

export type ExpectNull<T> = {
  [expectNull]: T
  result: ExtendsExcludingAnyOrNever<T, null>
}

export type ExpectUndefined<T> = {
  [expectUndefined]: T
  result: ExtendsExcludingAnyOrNever<T, undefined>
}

export type ExpectNumber<T> = {
  [expectNumber]: T
  result: ExtendsExcludingAnyOrNever<T, number>
}

export type ExpectString<T> = {
  [expectString]: T
  result: ExtendsExcludingAnyOrNever<T, string>
}

export type ExpectBoolean<T> = {
  [expectBoolean]: T
  result: ExtendsExcludingAnyOrNever<T, boolean>
}

export type ExpectVoid<T> = {
  [expectVoid]: T
  result: ExtendsExcludingAnyOrNever<T, void>
}

export type ExpectFunction<T> = {
  [expectFunction]: T
  result: ExtendsExcludingAnyOrNever<T, (...args: any[]) => any>
}

export type ExpectObject<T> = {
  [expectObject]: T
  result: ExtendsExcludingAnyOrNever<T, object>
}

export type ExpectArray<T> = {
  [expectArray]: T
  result: ExtendsExcludingAnyOrNever<T, any[]>
}

export type ExpectSymbol<T> = {
  [expectSymbol]: T
  result: ExtendsExcludingAnyOrNever<T, symbol>
}

export type ExpectAny<T> = {[expectAny]: T; result: IsAny<T>}

export type ExpectUnknown<T> = {[expectUnknown]: T; result: IsUnknown<T>}

export type ExpectNever<T> = {[expectNever]: T; result: IsNever<T>}

export type ExpectNullable<T> = {
  [expectNullable]: T
  result: Not<StrictEqualUsingTSInternalIdenticalToOperator<T, NonNullable<T>>>
}

export type ExpectBigInt<T> = {
  [expectBigInt]: T
  result: ExtendsExcludingAnyOrNever<T, bigint>
}

export type Scolder<
  Expecter extends {result: boolean},
  Options extends {positive: boolean},
> = Expecter['result'] extends Options['positive']
  ? () => true
  : Options['positive'] extends true
    ? Expecter
    : Inverted<Expecter>
