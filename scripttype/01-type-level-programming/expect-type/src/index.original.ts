/**
 * ORIGINAL TypeScript from 01-type-level-programming/expect-type/src/index.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AValue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DeepBrandOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DeepBrandOptionsDefaults<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DeepBrandPropNotes<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DeepBrandPropNotesOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DeepBrandPropNotesOptionsDefaults<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DeepPickMatchingProps<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Extends<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsUnion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MismatchArgs<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MismatchInfo<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Not<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Pick<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StrictEqualUsingBranding<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StrictEqualUsingTSInternalIdenticalToOperator<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface NegativeExpectTypeOf<Actual> extends BaseExpectTypeOf<Actual, {positive: false}> {
  /**
   * Similar to jest's `expect(...).toMatchObject(...)` but for types.
   * Deeply "picks" the properties of the actual type based on the expected type, then performs a strict check to make sure the types match `Expected`.
   *
   * **Note**: optional properties on the {@linkcode Expected | expected type} are not allowed to be missing on the {@linkcode Actual | actual type}.
   *
   * @example
   * ```ts
   * expectTypeOf({ a: 1, b: 1 }).toMatchObjectType<{ a: number }>()
   *
   * expectTypeOf({ a: 1, b: 1 }).not.toMatchObjectType<{ a: number; c?: number }>()
   * ```
   *
   * @param MISMATCH - The mismatch arguments.
   * @returns `true`.
   */
  toMatchObjectType: <Expected>(
    ...MISMATCH: MismatchArgs<
      StrictEqualUsingTSInternalIdenticalToOperator<Pick<Actual, keyof Actual & keyof Expected>, Expected>,
      false
    >
  ) => true

  /**
   * Check if your type extends the expected type
   *
   * A less strict version of {@linkcode PositiveExpectTypeOf.toEqualTypeOf | .toEqualTypeOf()} that allows for extra properties.
   * This is roughly equivalent to an `extends` constraint in a function type argument.
   *
   * @example
   * ```ts
   * expectTypeOf({ a: 1, b: 1 }).toExtend<{ a: number }>()]
   *
   * expectTypeOf({ a: 1 }).not.toExtend<{ b: number }>()
   * ```
   *
   * @param MISMATCH - The mismatch arguments.
   * @returns `true`.
   */
  toExtend<Expected>(...MISMATCH: MismatchArgs<Extends<Actual, Expected>, false>): true

  toEqualTypeOf: {
    /**
     * Uses TypeScript's internal technique to check for type "identicalness".
     *
     * It will check if the types are fully equal to each other.
     * It will not fail if two objects have different values, but the same type.
     * It will fail however if an object is missing a property.
     *
     * **_Unexpected failure_**? For a more permissive but less performant
     * check that accommodates for equivalent intersection types,
     * use {@linkcode PositiveExpectTypeOf.branded | .branded.toEqualTypeOf()}.
     * @see {@link https://github.com/mmkal/expect-type#why-is-my-assertion-failing | The documentation for details}.
     *
     * @example
     * <caption>Using generic type argument syntax</caption>
     * ```ts
     * expectTypeOf({ a: 1 }).toEqualTypeOf<{ a: number }>()
     *
     * expectTypeOf({ a: 1, b: 1 }).not.toEqualTypeOf<{ a: number }>()
     * ```
     *
     * @example
     * <caption>Using inferred type syntax by passing a value</caption>
     * ```ts
     * expectTypeOf({ a: 1 }).toEqualTypeOf({ a: 1 })
     *
     * expectTypeOf({ a: 1 }).toEqualTypeOf({ a: 2 })
     * ```
     *
     * @param value - The value to compare against the expected type.
     * @param MISMATCH - The mismatch arguments.
     * @returns `true`.
     */
    <Expected>(
      value: Expected & AValue,
      ...MISMATCH: MismatchArgs<StrictEqualUsingTSInternalIdenticalToOperator<Actual, Expected>, false>
    ): true

    /**
     * Uses TypeScript's internal technique to check for type "identicalness".
     *
     * It will check if the types are fully equal to each other.
     * It will not fail if two objects have different values, but the same type.
     * It will fail however if an object is missing a property.
     *
     * **_Unexpected failure_**? For a more permissive but less performant
     * check that accommodates for equivalent intersection types,
     * use {@linkcode PositiveExpectTypeOf.branded | .branded.toEqualTypeOf()}.
     * @see {@link https://github.com/mmkal/expect-type#why-is-my-assertion-failing | The documentation for details}.
     *
     * @example
     * <caption>Using generic type argument syntax</caption>
     * ```ts
     * expectTypeOf({ a: 1 }).toEqualTypeOf<{ a: number }>()
     *
     * expectTypeOf({ a: 1, b: 1 }).not.toEqualTypeOf<{ a: number }>()
     * ```
     *
     * @example
     * <caption>Using inferred type syntax by passing a value</caption>
     * ```ts
     * expectTypeOf({ a: 1 }).toEqualTypeOf({ a: 1 })
     *
     * expectTypeOf({ a: 1 }).toEqualTypeOf({ a: 2 })
     * ```
     *
     * @param MISMATCH - The mismatch arguments.
     * @returns `true`.
     */
    <Expected>(...MISMATCH: MismatchArgs<StrictEqualUsingTSInternalIdenticalToOperator<Actual, Expected>, false>): true
  }

  /**
   * @deprecated Since v1.2.0 - Use either {@linkcode toMatchObjectType} or {@linkcode toExtend} instead
   *
   * - Use {@linkcode toMatchObjectType} to perform a strict check on a subset of your type's keys
   * - Use {@linkcode toExtend} to check if your type extends the expected type
   */
  toMatchTypeOf: {
    /**
     * @deprecated Since v1.2.0 - Use either {@linkcode toMatchObjectType} or {@linkcode toExtend} instead
     *
     * - Use {@linkcode toMatchObjectType} to perform a strict check on a subset of your type's keys
     * - Use {@linkcode toExtend} to check if your type extends the expected type
     *
     * A less strict version of
     * {@linkcode PositiveExpectTypeOf.toEqualTypeOf | .toEqualTypeOf()}
     * that allows for extra properties.
     * This is roughly equivalent to an `extends` constraint
     * in a function type argument.
     *
     * @example
     * <caption>Using generic type argument syntax</caption>
     * ```ts
     * expectTypeOf({ a: 1, b: 1 }).toMatchTypeOf<{ a: number }>()
     * ```
     *
     * @example
     * <caption>Using inferred type syntax by passing a value</caption>
     * ```ts
     * expectTypeOf({ a: 1, b: 1 }).toMatchTypeOf({ a: 2 })
     * ```
     *
     * @param value - The value to compare against the expected type.
     * @param MISMATCH - The mismatch arguments.
     * @returns `true`.
     */
    <Expected>(
      value: Expected & AValue, // reason for `& AValue`: make sure this is only the selected overload when the end-user passes a value for an inferred typearg. The `Mismatch` type does match `AValue`.
      ...MISMATCH: MismatchArgs<Extends<Actual, Expected>, false>
    ): true

    /**
     * @deprecated Since v1.2.0 - Use either {@linkcode toMatchObjectType} or {@linkcode toExtend} instead
     *
     * - Use {@linkcode toMatchObjectType} to perform a strict check on a subset of your type's keys
     * - Use {@linkcode toExtend} to check if your type extends the expected type
     *
     * A less strict version of
     * {@linkcode PositiveExpectTypeOf.toEqualTypeOf | .toEqualTypeOf()}
     * that allows for extra properties.
     * This is roughly equivalent to an `extends` constraint
     * in a function type argument.
     *
     * @example
     * <caption>Using generic type argument syntax</caption>
     * ```ts
     * expectTypeOf({ a: 1, b: 1 }).toMatchTypeOf<{ a: number }>()
     * ```
     *
     * @example
     * <caption>Using inferred type syntax by passing a value</caption>
     * ```ts
     * expectTypeOf({ a: 1, b: 1 }).toMatchTypeOf({ a: 2 })
     * ```
     *
     * @param MISMATCH - The mismatch arguments.
     * @returns `true`.
     */
    <Expected>(...MISMATCH: MismatchArgs<Extends<Actual, Expected>, false>): true
  }

  /**
   * Checks whether an object has a given property.
   *
   * @example
   * <caption>check that properties exist</caption>
   * ```ts
   * const obj = { a: 1, b: '' }
   *
   * expectTypeOf(obj).toHaveProperty('a')
   *
   * expectTypeOf(obj).not.toHaveProperty('c')
   * ```
   *
   * @param key - The property key to check for.
   * @param MISMATCH - The mismatch arguments.
   * @returns `true`.
   */
  toHaveProperty: <KeyType extends string | number | symbol>(
    key: KeyType,
    ...MISMATCH: MismatchArgs<Extends<KeyType, keyof Actual>, false>
  ) => true
}

export interface Branded<Actual, Options extends DeepBrandOptions> {
  /**
   * Uses TypeScript's internal technique to check for type "identicalness".
   *
   * It will check if the types are fully equal to each other.
   * It will not fail if two objects have different values, but the same type.
   * It will fail however if an object is missing a property.
   *
   * **_Unexpected failure_**? For a more permissive but less performant
   * check that accommodates for equivalent intersection types,
   * use {@linkcode PositiveExpectTypeOf.branded | .branded.toEqualTypeOf()}.
   * @see {@link https://github.com/mmkal/expect-type#why-is-my-assertion-failing | The documentation for details}.
   *
   * @example
   * <caption>Using generic type argument syntax</caption>
   * ```ts
   * expectTypeOf({ a: 1 }).toEqualTypeOf<{ a: number }>()
   *
   * expectTypeOf({ a: 1, b: 1 }).not.toEqualTypeOf<{ a: number }>()
   * ```
   *
   * @example
   * <caption>Using inferred type syntax by passing a value</caption>
   * ```ts
   * expectTypeOf({ a: 1 }).toEqualTypeOf({ a: 1 })
   *
   * expectTypeOf({ a: 1 }).toEqualTypeOf({ a: 2 })
   * ```
   *
   * @param MISMATCH - The mismatch arguments.
   * @returns `true`.
   */
  toEqualTypeOf: <
    Expected extends StrictEqualUsingBranding<Actual, Expected, Options> extends true
      ? unknown
      : MismatchInfo<Actual, Expected, Options>,
  >(
    ...MISMATCH: MismatchArgs<StrictEqualUsingBranding<Actual, Expected, Options>, true>
  ) => true

  /**
   * Walk a type to find every deeply-nested path that resolves to `any` or `never`, useful for catching
   * badly-defined types hiding inside large or complex objects.
   *
   * Pass `{foundProps: {}}` to assert there are none - a type error will list the offending paths if there are.
   * Otherwise pass `foundProps` as a record of `path -> flagged type` to acknowledge the ones you expect.
   * The compiler tells you the exact paths (and what they resolve to) if you get it wrong.
   *
   * Use the `findType` type argument to search for `'any'`, `'never'`, or `'unknown'` instead of the default (`'any' | 'never'`).
   *
   * @param params An object with a `foundProps` record mapping each flagged path to its resolved type. For a
   * well-defined type with no issues, pass `{foundProps: {}}`.
   * @returns true
   *
   * @example
   * ```ts
   * type BadType = {a: any; nested: {b: never}; list: Array<{c: any}>}
   *
   * // \@ts-expect-error there are `any`/`never` paths, so you can't claim there are none.
   * expectTypeOf<BadType>().branded.inspect({foundProps: {}})
   *
   * // ...instead, enumerate them (the compiler reports the exact paths if this is wrong):
   * expectTypeOf<BadType>().branded.inspect({
   *   foundProps: {
   *     '.a': 'any',
   *     '.nested.b': 'never',
   *     '.list[number].c': 'any',
   *   },
   * })
   * ```
   *
   * @example
   * ```ts
   * type GoodType = {b: boolean; c: string}
   *
   * expectTypeOf<GoodType>().branded.inspect({foundProps: {}})
   * ```
   *
   * @example
   * ```ts
   * // search for `unknown` instead of `any`/`never`:
   * expectTypeOf<{u: unknown}>().branded.inspect<{findType: 'unknown'}>({foundProps: {'.u': 'unknown'}})
   * ```
   */
  inspect: <
    PropNoteOptions extends Exclude<DeepBrandPropNotesOptions, DeepBrandOptions> = DeepBrandPropNotesOptionsDefaults,
  >(params: {
    foundProps: DeepBrandPropNotes<Actual, Options & PropNoteOptions>
  }) => true

  configure<O extends DeepBrandOptions>(): Branded<Actual, O>
}

export interface PositiveExpectTypeOf<Actual> extends BaseExpectTypeOf<Actual, {positive: true; branded: false}> {
  /**
   * Similar to jest's `expect(...).toMatchObject(...)` but for types.
   * Deeply "picks" the properties of the actual type based on the expected type, then performs a strict check to make sure the types match `Expected`.
   *
   * **Note**: optional properties on the {@linkcode Expected | expected type} are not allowed to be missing on the {@linkcode Actual | actual type}.
   *
   * @example
   * ```ts
   * expectTypeOf({ a: 1, b: 1 }).toMatchObjectType<{ a: number }>()
   *
   * expectTypeOf({ a: 1, b: 1 }).not.toMatchObjectType<{ a: number; c?: number }>()
   * ```
   *
   * @param MISMATCH - The mismatch arguments.
   * @returns `true`.
   */
  toMatchObjectType: <
    Expected extends IsUnion<Expected> extends true
      ? 'toMatchObject does not support union types'
      : Not<Extends<Expected, Record<string, unknown>>> extends true
        ? 'toMatchObject only supports object types'
        : StrictEqualUsingTSInternalIdenticalToOperator<DeepPickMatchingProps<Actual, Expected>, Expected> extends true
          ? unknown
          : MismatchInfo<DeepPickMatchingProps<Actual, Expected>, Expected>,
  >(
    ...MISMATCH: MismatchArgs<
      StrictEqualUsingTSInternalIdenticalToOperator<DeepPickMatchingProps<Actual, Expected>, Expected>,
      true
    >
  ) => true

  /**
   * Check if your type extends the expected type
   *
   * A less strict version of {@linkcode toEqualTypeOf | .toEqualTypeOf()} that allows for extra properties.
   * This is roughly equivalent to an `extends` constraint in a function type argument.
   *
   * @example
   * ```ts
   * expectTypeOf({ a: 1, b: 1 }).toExtend<{ a: number }>()
   *
   * expectTypeOf({ a: 1 }).not.toExtend<{ b: number }>()
   * ```
   *
   * @param MISMATCH - The mismatch arguments.
   * @returns `true`.
   */
  toExtend: <Expected extends Extends<Actual, Expected> extends true ? unknown : MismatchInfo<Actual, Expected>>(
    ...MISMATCH: MismatchArgs<Extends<Actual, Expected>, true>
  ) => true

  toEqualTypeOf: {
    /**
     * Uses TypeScript's internal technique to check for type "identicalness".
     *
     * It will check if the types are fully equal to each other.
     * It will not fail if two objects have different values, but the same type.
     * It will fail however if an object is missing a property.
     *
     * **_Unexpected failure_**? For a more permissive but less performant
     * check that accommodates for equivalent intersection types,
     * use {@linkcode branded | .branded.toEqualTypeOf()}.
     * @see {@link https://github.com/mmkal/expect-type#why-is-my-assertion-failing | The documentation for details}.
     *
     * @example
     * <caption>Using generic type argument syntax</caption>
     * ```ts
     * expectTypeOf({ a: 1 }).toEqualTypeOf<{ a: number }>()
     *
     * expectTypeOf({ a: 1, b: 1 }).not.toEqualTypeOf<{ a: number }>()
     * ```
     *
     * @example
     * <caption>Using inferred type syntax by passing a value</caption>
     * ```ts
     * expectTypeOf({ a: 1 }).toEqualTypeOf({ a: 1 })
     *
     * expectTypeOf({ a: 1 }).toEqualTypeOf({ a: 2 })
     * ```
     *
     * @param value - The value to compare against the expected type.
     * @param MISMATCH - The mismatch arguments.
     * @returns `true`.
     */
    <
      Expected extends StrictEqualUsingTSInternalIdenticalToOperator<Actual, Expected> extends true
        ? unknown
        : MismatchInfo<Actual, Expected>,
    >(
      value: Expected & AValue, // reason for `& AValue`: make sure this is only the selected overload when the end-user passes a value for an inferred typearg. The `Mismatch` type does match `AValue`.
      ...MISMATCH: MismatchArgs<StrictEqualUsingTSInternalIdenticalToOperator<Actual, Expected>, true>
    ): true

    /**
     * Uses TypeScript's internal technique to check for type "identicalness".
     *
     * It will check if the types are fully equal to each other.
     * It will not fail if two objects have different values, but the same type.
     * It will fail however if an object is missing a property.
     *
     * **_Unexpected failure_**? For a more permissive but less performant
     * check that accommodates for equivalent intersection types,
     * use {@linkcode branded | .branded.toEqualTypeOf()}.
     * @see {@link https://github.com/mmkal/expect-type#why-is-my-assertion-failing | The documentation for details}.
     *
     * @example
     * <caption>Using generic type argument syntax</caption>
     * ```ts
     * expectTypeOf({ a: 1 }).toEqualTypeOf<{ a: number }>()
     *
     * expectTypeOf({ a: 1, b: 1 }).not.toEqualTypeOf<{ a: number }>()
     * ```
     *
     * @example
     * <caption>Using inferred type syntax by passing a value</caption>
     * ```ts
     * expectTypeOf({ a: 1 }).toEqualTypeOf({ a: 1 })
     *
     * expectTypeOf({ a: 1 }).toEqualTypeOf({ a: 2 })
     * ```
     *
     * @param MISMATCH - The mismatch arguments.
     * @returns `true`.
     */
    <
      Expected extends StrictEqualUsingTSInternalIdenticalToOperator<Actual, Expected> extends true
        ? unknown
        : MismatchInfo<Actual, Expected>,
    >(
      ...MISMATCH: MismatchArgs<StrictEqualUsingTSInternalIdenticalToOperator<Actual, Expected>, true>
    ): true
  }

  /**
   * @deprecated Since v1.2.0 - Use either {@linkcode toMatchObjectType} or {@linkcode toExtend} instead
   *
   * - Use {@linkcode toMatchObjectType} to perform a strict check on a subset of your type's keys
   * - Use {@linkcode toExtend} to check if your type extends the expected type
   */
  toMatchTypeOf: {
    /**
     * @deprecated Since v1.2.0 - Use either {@linkcode toMatchObjectType} or {@linkcode toExtend} instead
     *
     * - Use {@linkcode toMatchObjectType} to perform a strict check on a subset of your type's keys
     * - Use {@linkcode toExtend} to check if your type extends the expected type
     *
     * A less strict version of {@linkcode toEqualTypeOf | .toEqualTypeOf()}
     * that allows for extra properties.
     * This is roughly equivalent to an `extends` constraint
     * in a function type argument.
     *
     * @example
     * <caption>Using generic type argument syntax</caption>
     * ```ts
     * expectTypeOf({ a: 1, b: 1 }).toMatchTypeOf<{ a: number }>()
     * ```
     *
     * @example
     * <caption>Using inferred type syntax by passing a value</caption>
     * ```ts
     * expectTypeOf({ a: 1, b: 1 }).toMatchTypeOf({ a: 2 })
     * ```
     *
     * @param value - The value to compare against the expected type.
     * @param MISMATCH - The mismatch arguments.
     * @returns `true`.
     */
    <Expected extends Extends<Actual, Expected> extends true ? unknown : MismatchInfo<Actual, Expected>>(
      value: Expected & AValue, // reason for `& AValue`: make sure this is only the selected overload when the end-user passes a value for an inferred typearg. The `Mismatch` type does match `AValue`.
      ...MISMATCH: MismatchArgs<Extends<Actual, Expected>, true>
    ): true

    /**
     * @deprecated Since v1.2.0 - Use either {@linkcode toMatchObjectType} or {@linkcode toExtend} instead
     *
     * - Use {@linkcode toMatchObjectType} to perform a strict check on a subset of your type's keys
     * - Use {@linkcode toExtend} to check if your type extends the expected type
     *
     * A less strict version of {@linkcode toEqualTypeOf | .toEqualTypeOf()}
     * that allows for extra properties.
     * This is roughly equivalent to an `extends` constraint
     * in a function type argument.
     *
     * @example
     * <caption>Using generic type argument syntax</caption>
     * ```ts
     * expectTypeOf({ a: 1, b: 1 }).toMatchTypeOf<{ a: number }>()
     * ```
     *
     * @example
     * <caption>Using inferred type syntax by passing a value</caption>
     * ```ts
     * expectTypeOf({ a: 1, b: 1 }).toMatchTypeOf({ a: 2 })
     * ```
     *
     * @param MISMATCH - The mismatch arguments.
     * @returns `true`.
     */
    <Expected extends Extends<Actual, Expected> extends true ? unknown : MismatchInfo<Actual, Expected>>(
      ...MISMATCH: MismatchArgs<Extends<Actual, Expected>, true>
    ): true
  }

  /**
   * Checks whether an object has a given property.
   *
   * @example
   * <caption>check that properties exist</caption>
   * ```ts
   * const obj = { a: 1, b: '' }
   *
   * expectTypeOf(obj).toHaveProperty('a')
   *
   * expectTypeOf(obj).not.toHaveProperty('c')
   * ```
   *
   * @param key - The property key to check for.
   * @param MISMATCH - The mismatch arguments.
   * @returns `true`.
   */
  toHaveProperty: <KeyType extends keyof Actual>(
    key: KeyType,
    ...MISMATCH: MismatchArgs<Extends<KeyType, keyof Actual>, true>
  ) => KeyType extends keyof Actual ? PositiveExpectTypeOf<Actual[KeyType]> : true

  /**
   * Inverts the result of the following assertions.
   *
   * @example
   * ```ts
   * expectTypeOf({ a: 1 }).not.toMatchTypeOf({ b: 1 })
   * ```
   */
  not: NegativeExpectTypeOf<Actual>

  /**
   * Intersection types can cause issues with
   * {@linkcode toEqualTypeOf | .toEqualTypeOf()}:
   * ```ts
   * // ❌ The following line doesn't compile, even though the types are arguably the same.
   * expectTypeOf<{ a: 1 } & { b: 2 }>().toEqualTypeOf<{ a: 1; b: 2 }>()
   * ```
   * This helper works around this problem by using
   * a more permissive but less performant check.
   *
   * __Note__: This comes at a performance cost, and can cause the compiler
   * to 'give up' if used with excessively deep types, so use sparingly.
   *
   * @see {@link https://github.com/mmkal/expect-type/pull/21 | Reference}
   */
  branded: Branded<Actual, DeepBrandOptionsDefaults>
}

export type ExpectTypeOf<Actual, Options extends {positive: boolean}> = Options['positive'] extends true
  ? PositiveExpectTypeOf<Actual>
  : NegativeExpectTypeOf<Actual>
