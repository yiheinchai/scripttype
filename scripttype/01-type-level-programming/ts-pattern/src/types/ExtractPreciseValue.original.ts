/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-pattern/src/types/ExtractPreciseValue.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BuiltInObjects<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Compute<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Contains<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Exclude<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsPlainObject<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsReadonlyArray<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type LeastUpperBound<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type MaybeAddReadonly<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Omit<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Override<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Pick<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ValueOf<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type ExtractPreciseArrayValue<
  a,
  b,
  isReadonly extends boolean,
  startOutput extends any[] = [],
  endOutput extends any[] = []
> = a extends readonly (infer aItem)[]
  ? b extends readonly []
    ? MaybeAddReadonly<[...startOutput, ...endOutput], isReadonly>
    : b extends readonly [infer b1, ...infer bRest]
    ? a extends readonly [infer a1, ...infer aRest]
      ? ExtractPreciseValue<a1, b1> extends infer currentValue
        ? [currentValue] extends [never]
          ? never
          : ExtractPreciseArrayValue<
              aRest,
              bRest,
              isReadonly,
              [...startOutput, currentValue],
              endOutput
            >
        : never
      : ExtractPreciseValue<aItem, b1> extends infer currentValue
      ? [currentValue] extends [never]
        ? never
        : ExtractPreciseArrayValue<
            aItem[],
            bRest,
            isReadonly,
            [...startOutput, currentValue],
            endOutput
          >
      : never
    : b extends readonly [...infer bInit, infer b1]
    ? a extends readonly [...infer aInit, infer a1]
      ? ExtractPreciseValue<a1, b1> extends infer currentValue
        ? [currentValue] extends [never]
          ? never
          : ExtractPreciseArrayValue<
              aInit,
              bInit,
              isReadonly,
              startOutput,
              [...endOutput, currentValue]
            >
        : never
      : ExtractPreciseValue<aItem, b1> extends infer currentValue
      ? [currentValue] extends [never]
        ? never
        : ExtractPreciseArrayValue<
            aItem[],
            bInit,
            isReadonly,
            startOutput,
            [...endOutput, currentValue]
          >
      : never
    : ExtractPreciseValue<aItem, ValueOf<b>> extends infer currentValue
    ? [currentValue] extends [never]
      ? never
      : MaybeAddReadonly<
          [...startOutput, ...currentValue[], ...endOutput],
          isReadonly
        >
    : never
  : LeastUpperBound<a, b>;

export type ExtractPreciseValue<a, b> = b extends Override<infer b1>
  ? b1
  : unknown extends b
  ? a
  : // inlining IsAny for perf
  0 extends 1 & b
  ? a
  : // inlining IsAny for perf
  0 extends 1 & a
  ? b
  : b extends readonly any[]
  ? ExtractPreciseArrayValue<a, b, IsReadonlyArray<a>>
  : b extends Map<infer bk, infer bv>
  ? a extends Map<infer ak, infer av>
    ? Map<ExtractPreciseValue<ak, bk>, ExtractPreciseValue<av, bv>>
    : LeastUpperBound<a, b>
  : b extends Set<infer bv>
  ? a extends Set<infer av>
    ? Set<ExtractPreciseValue<av, bv>>
    : LeastUpperBound<a, b>
  : // We add `Error` to the excludeUnion because
  // We want to consider them like primitive values in this context.
  IsPlainObject<b, BuiltInObjects | Error> extends true
  ? a extends object
    ? a extends b
      ? a
      : b extends a
      ? Contains<b, never> extends true
        ? never
        : // An empty object `{}` in a pattern means
        // that this key must be non-nullable.
        // If we find a key in `b` that doesn't exist in `a`
        // and that contains `{}`, then the pattern does not match.
        Contains<Omit<b, keyof a>, {}> extends true
        ? never
        : // If values have no keys in common, return `b`
        [Exclude<keyof a, keyof b>] extends [never]
        ? b
        : // Otherwise return `b` with keys of `a`
          // that do not exist on `b`.
          // It can only be optional properties,
          // otherwise `b extends a` wouldn't
          // not have passed.
          Compute<b & Omit<a, keyof b>>
      : [keyof a & keyof b] extends [never]
      ? never
      : Compute<
          // Keep other properties of `a`
          {
            // `in keyof a as ...` preserves property modifiers,
            // unlike `in keyof Exclude<keyof a, keyof b>`.
            [k in keyof a as k extends keyof b ? never : k]: a[k];
          } & {
            // use `b` to extract precise values on `a`.
            // This has the effect of preserving the optional
            // property modifier (?:) of b in the output type.
            [k in keyof b]: k extends keyof a
              ? ExtractPreciseValue<a[k], b[k]>
              : b[k];
          }
        > extends infer result
      ? Contains<Pick<result, keyof result & keyof b>, never> extends true
        ? never
        : result
      : never
    : LeastUpperBound<a, b>
  : LeastUpperBound<a, b>;
