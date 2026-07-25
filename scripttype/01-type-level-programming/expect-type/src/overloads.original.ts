/**
 * ORIGINAL TypeScript from 01-type-level-programming/expect-type/src/overloads.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ConstructorParameters<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsNever<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Parameters<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReturnType<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type StrictEqualUsingTSInternalIdenticalToOperator<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ThisParameterType<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type UnionToIntersection<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type UnionToTuple<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type TSPost53OverloadsInfoUnion<FunctionType> =
  FunctionType extends {(...args: infer A1): infer R1; (...args: infer A2): infer R2; (...args: infer A3): infer R3; (...args: infer A4): infer R4; (...args: infer A5): infer R5; (...args: infer A6): infer R6; (...args: infer A7): infer R7; (...args: infer A8): infer R8; (...args: infer A9): infer R9; (...args: infer A10): infer R10}
  ? ((...p: A1) => R1) | ((...p: A2) => R2) | ((...p: A3) => R3) | ((...p: A4) => R4) | ((...p: A5) => R5) | ((...p: A6) => R6) | ((...p: A7) => R7) | ((...p: A8) => R8) | ((...p: A9) => R9) | ((...p: A10) => R10)
  : never

export type UnknownFunction = (...args: unknown[]) => unknown

export type IsUselessOverloadInfo<FunctionType> = StrictEqualUsingTSInternalIdenticalToOperator<
  FunctionType,
  UnknownFunction
>

export type Tuplify<Union> = Union extends infer X ? [X] : never

export type DecreasingOverloadsInfoUnion<F> = F extends {(...args: infer A1): infer R1; (...args: infer A2): infer R2; (...args: infer A3): infer R3; (...args: infer A4): infer R4; (...args: infer A5): infer R5; (...args: infer A6): infer R6; (...args: infer A7): infer R7; (...args: infer A8): infer R8; (...args: infer A9): infer R9; (...args: infer A10): infer R10}
  ? ((...p: A1) => R1) | ((...p: A2) => R2) | ((...p: A3) => R3) | ((...p: A4) => R4) | ((...p: A5) => R5) | ((...p: A6) => R6) | ((...p: A7) => R7) | ((...p: A8) => R8) | ((...p: A9) => R9) | ((...p: A10) => R10)
  : F extends {(...args: infer A1): infer R1; (...args: infer A2): infer R2; (...args: infer A3): infer R3; (...args: infer A4): infer R4; (...args: infer A5): infer R5; (...args: infer A6): infer R6; (...args: infer A7): infer R7; (...args: infer A8): infer R8; (...args: infer A9): infer R9; }
    ? ((...p: A1) => R1) | ((...p: A2) => R2) | ((...p: A3) => R3) | ((...p: A4) => R4) | ((...p: A5) => R5) | ((...p: A6) => R6) | ((...p: A7) => R7) | ((...p: A8) => R8) | ((...p: A9) => R9)
    : F extends {(...args: infer A1): infer R1; (...args: infer A2): infer R2; (...args: infer A3): infer R3; (...args: infer A4): infer R4; (...args: infer A5): infer R5; (...args: infer A6): infer R6; (...args: infer A7): infer R7; (...args: infer A8): infer R8; }
      ? ((...p: A1) => R1) | ((...p: A2) => R2) | ((...p: A3) => R3) | ((...p: A4) => R4) | ((...p: A5) => R5) | ((...p: A6) => R6) | ((...p: A7) => R7) | ((...p: A8) => R8)
      : F extends {(...args: infer A1): infer R1; (...args: infer A2): infer R2; (...args: infer A3): infer R3; (...args: infer A4): infer R4; (...args: infer A5): infer R5; (...args: infer A6): infer R6; (...args: infer A7): infer R7; }
        ? ((...p: A1) => R1) | ((...p: A2) => R2) | ((...p: A3) => R3) | ((...p: A4) => R4) | ((...p: A5) => R5) | ((...p: A6) => R6) | ((...p: A7) => R7)
        : F extends {(...args: infer A1): infer R1; (...args: infer A2): infer R2; (...args: infer A3): infer R3; (...args: infer A4): infer R4; (...args: infer A5): infer R5; (...args: infer A6): infer R6; }
          ? ((...p: A1) => R1) | ((...p: A2) => R2) | ((...p: A3) => R3) | ((...p: A4) => R4) | ((...p: A5) => R5) | ((...p: A6) => R6)
          : F extends {(...args: infer A1): infer R1; (...args: infer A2): infer R2; (...args: infer A3): infer R3; (...args: infer A4): infer R4; (...args: infer A5): infer R5; }
            ? ((...p: A1) => R1) | ((...p: A2) => R2) | ((...p: A3) => R3) | ((...p: A4) => R4) | ((...p: A5) => R5)
            : F extends {(...args: infer A1): infer R1; (...args: infer A2): infer R2; (...args: infer A3): infer R3; (...args: infer A4): infer R4; }
              ? ((...p: A1) => R1) | ((...p: A2) => R2) | ((...p: A3) => R3) | ((...p: A4) => R4)
              : F extends {(...args: infer A1): infer R1; (...args: infer A2): infer R2; (...args: infer A3): infer R3; }
                ? ((...p: A1) => R1) | ((...p: A2) => R2) | ((...p: A3) => R3)
                : F extends {(...args: infer A1): infer R1; (...args: infer A2): infer R2; }
                  ? ((...p: A1) => R1) | ((...p: A2) => R2)
                  : F extends (...args: infer A1) => infer R1 ? ((...p: A1) => R1)
                    : never

export type TSPre53OverloadsInfoUnion<FunctionType> =
  // first, pointlessly wrap the overload variants in a 1-tuple, then infer them as `Tup` - this helps TypeScript isolate out the overload variants
  Tuplify<DecreasingOverloadsInfoUnion<FunctionType>> extends infer Tup
    ? // we know `Tup` is a 1-tuple because we just used Tuplify, but use an infer so that TypeScript knows too
      Tup extends [infer Fn]
      ? // Now check if the Fn is "useless" i.e. hit by the historical TypeScript bug that adds `(...args: unknown[]) => unknown` overloads
        IsUselessOverloadInfo<Fn> extends true
        ? // if it's useless, get rid of it from the resultant union using never
          never
        : Fn // deeply hidden happy path - keep this. We'll end up with a union of the actual meaningful overload variants
      : never
    : never

export type OverloadsInfoUnion<FunctionType> =
  // recent TypeScript versions (5.3+) can treat a 1-overload type function as a 10-overload. Test for this by seeing if we can successfully get a union from a 1-overload function. If we can't, we're on an old TypeScript and need to use the more complicated utility.
  IsNever<TSPost53OverloadsInfoUnion<(a: 1) => 2>> extends true
    ? TSPre53OverloadsInfoUnion<FunctionType>
    : TSPost53OverloadsInfoUnion<FunctionType>

export type InferFunctionType<FunctionType extends (...args: any) => any> = FunctionType

export type OverloadParameters<FunctionType> =
  OverloadsInfoUnion<FunctionType> extends InferFunctionType<infer Fn> ? Parameters<Fn> : never

export type OverloadReturnTypes<FunctionType> =
  OverloadsInfoUnion<FunctionType> extends InferFunctionType<infer Fn> ? ReturnType<Fn> : never

export type TSPost53OverloadThisParameterTypes<FunctionType> = FunctionType extends {
  (this: infer T1, ...args: any[]): any
  (this: infer T2, ...args: any[]): any
  (this: infer T3, ...args: any[]): any
  (this: infer T4, ...args: any[]): any
  (this: infer T5, ...args: any[]): any
  (this: infer T6, ...args: any[]): any
  (this: infer T7, ...args: any[]): any
  (this: infer T8, ...args: any[]): any
  (this: infer T9, ...args: any[]): any
  (this: infer T10, ...args: any[]): any
}
  ? T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10
  : never

export type DecreasingOverloadsInfoUnionWithThis<FunctionType> = FunctionType extends {
  (this: infer T1, ...args: infer A1): infer R1
  (this: infer T2, ...args: infer A2): infer R2
  (this: infer T3, ...args: infer A3): infer R3
  (this: infer T4, ...args: infer A4): infer R4
  (this: infer T5, ...args: infer A5): infer R5
  (this: infer T6, ...args: infer A6): infer R6
  (this: infer T7, ...args: infer A7): infer R7
  (this: infer T8, ...args: infer A8): infer R8
  (this: infer T9, ...args: infer A9): infer R9
  (this: infer T10, ...args: infer A10): infer R10
}
  ?
      | ((this: T1, ...args: A1) => R1)
      | ((this: T2, ...args: A2) => R2)
      | ((this: T3, ...args: A3) => R3)
      | ((this: T4, ...args: A4) => R4)
      | ((this: T5, ...args: A5) => R5)
      | ((this: T6, ...args: A6) => R6)
      | ((this: T7, ...args: A7) => R7)
      | ((this: T8, ...args: A8) => R8)
      | ((this: T9, ...args: A9) => R9)
      | ((this: T10, ...args: A10) => R10)
  : FunctionType extends {
        (this: infer T1, ...args: infer A1): infer R1
        (this: infer T2, ...args: infer A2): infer R2
        (this: infer T3, ...args: infer A3): infer R3
        (this: infer T4, ...args: infer A4): infer R4
        (this: infer T5, ...args: infer A5): infer R5
        (this: infer T6, ...args: infer A6): infer R6
        (this: infer T7, ...args: infer A7): infer R7
        (this: infer T8, ...args: infer A8): infer R8
        (this: infer T9, ...args: infer A9): infer R9
      }
    ?
        | ((this: T1, ...args: A1) => R1)
        | ((this: T2, ...args: A2) => R2)
        | ((this: T3, ...args: A3) => R3)
        | ((this: T4, ...args: A4) => R4)
        | ((this: T5, ...args: A5) => R5)
        | ((this: T6, ...args: A6) => R6)
        | ((this: T7, ...args: A7) => R7)
        | ((this: T8, ...args: A8) => R8)
        | ((this: T9, ...args: A9) => R9)
    : FunctionType extends {
          (this: infer T1, ...args: infer A1): infer R1
          (this: infer T2, ...args: infer A2): infer R2
          (this: infer T3, ...args: infer A3): infer R3
          (this: infer T4, ...args: infer A4): infer R4
          (this: infer T5, ...args: infer A5): infer R5
          (this: infer T6, ...args: infer A6): infer R6
          (this: infer T7, ...args: infer A7): infer R7
          (this: infer T8, ...args: infer A8): infer R8
        }
      ?
          | ((this: T1, ...args: A1) => R1)
          | ((this: T2, ...args: A2) => R2)
          | ((this: T3, ...args: A3) => R3)
          | ((this: T4, ...args: A4) => R4)
          | ((this: T5, ...args: A5) => R5)
          | ((this: T6, ...args: A6) => R6)
          | ((this: T7, ...args: A7) => R7)
          | ((this: T8, ...args: A8) => R8)
      : FunctionType extends {
            (this: infer T1, ...args: infer A1): infer R1
            (this: infer T2, ...args: infer A2): infer R2
            (this: infer T3, ...args: infer A3): infer R3
            (this: infer T4, ...args: infer A4): infer R4
            (this: infer T5, ...args: infer A5): infer R5
            (this: infer T6, ...args: infer A6): infer R6
            (this: infer T7, ...args: infer A7): infer R7
          }
        ?
            | ((this: T1, ...args: A1) => R1)
            | ((this: T2, ...args: A2) => R2)
            | ((this: T3, ...args: A3) => R3)
            | ((this: T4, ...args: A4) => R4)
            | ((this: T5, ...args: A5) => R5)
            | ((this: T6, ...args: A6) => R6)
            | ((this: T7, ...args: A7) => R7)
        : FunctionType extends {
              (this: infer T1, ...args: infer A1): infer R1
              (this: infer T2, ...args: infer A2): infer R2
              (this: infer T3, ...args: infer A3): infer R3
              (this: infer T4, ...args: infer A4): infer R4
              (this: infer T5, ...args: infer A5): infer R5
              (this: infer T6, ...args: infer A6): infer R6
            }
          ?
              | ((this: T1, ...args: A1) => R1)
              | ((this: T2, ...args: A2) => R2)
              | ((this: T3, ...args: A3) => R3)
              | ((this: T4, ...args: A4) => R4)
              | ((this: T5, ...args: A5) => R5)
              | ((this: T6, ...args: A6) => R6)
          : FunctionType extends {
                (this: infer T1, ...args: infer A1): infer R1
                (this: infer T2, ...args: infer A2): infer R2
                (this: infer T3, ...args: infer A3): infer R3
                (this: infer T4, ...args: infer A4): infer R4
                (this: infer T5, ...args: infer A5): infer R5
              }
            ?
                | ((this: T1, ...args: A1) => R1)
                | ((this: T2, ...args: A2) => R2)
                | ((this: T3, ...args: A3) => R3)
                | ((this: T4, ...args: A4) => R4)
                | ((this: T5, ...args: A5) => R5)
            : FunctionType extends {
                  (this: infer T1, ...args: infer A1): infer R1
                  (this: infer T2, ...args: infer A2): infer R2
                  (this: infer T3, ...args: infer A3): infer R3
                  (this: infer T4, ...args: infer A4): infer R4
                }
              ?
                  | ((this: T1, ...args: A1) => R1)
                  | ((this: T2, ...args: A2) => R2)
                  | ((this: T3, ...args: A3) => R3)
                  | ((this: T4, ...args: A4) => R4)
              : FunctionType extends {
                    (this: infer T1, ...args: infer A1): infer R1
                    (this: infer T2, ...args: infer A2): infer R2
                    (this: infer T3, ...args: infer A3): infer R3
                  }
                ? ((this: T1, ...args: A1) => R1) | ((this: T2, ...args: A2) => R2) | ((this: T3, ...args: A3) => R3)
                : FunctionType extends {
                      (this: infer T1, ...args: infer A1): infer R1
                      (this: infer T2, ...args: infer A2): infer R2
                    }
                  ? ((this: T1, ...args: A1) => R1) | ((this: T2, ...args: A2) => R2)
                  : FunctionType extends (this: infer T1, ...args: infer A1) => infer R1
                    ? (this: T1, ...args: A1) => R1
                    : never

export type TSPre53OverloadThisParameterTypes<FunctionType> =
  Tuplify<DecreasingOverloadsInfoUnionWithThis<FunctionType>> extends infer TupleType
    ? TupleType extends [infer OverloadedFunctionType]
      ? IsUselessOverloadInfo<OverloadedFunctionType> extends true
        ? never
        : OverloadedFunctionType extends (this: infer InferredThisType, ...args: any[]) => any
          ? InferredThisType
          : never
      : never
    : never

export type OverloadThisParameterTypes<FunctionType> = FunctionType extends (...args: any[]) => any
  ? IsNever<TSPost53OverloadsInfoUnion<(a: 1) => 2>> extends true
    ? TSPre53OverloadThisParameterTypes<FunctionType>
    : TSPost53OverloadThisParameterTypes<FunctionType>
  : ThisParameterType<FunctionType>

export type SelectOverloadsInfo<Union extends UnknownFunction, Args extends unknown[]> =
  Union extends InferFunctionType<infer Fn> ? (Args extends Parameters<Fn> ? Fn : never) : never

export type OverloadsNarrowedByParameters<
  FunctionType,
  Args extends OverloadParameters<FunctionType>,
> = UnionToIntersection<SelectOverloadsInfo<OverloadsInfoUnion<FunctionType>, Args>>

export type TSPost53ConstructorOverloadsInfoUnion<ConstructorType> =
  ConstructorType extends {new (...args: infer A1): infer R1; new (...args: infer A2): infer R2; new (...args: infer A3): infer R3; new (...args: infer A4): infer R4; new (...args: infer A5): infer R5; new (...args: infer A6): infer R6; new (...args: infer A7): infer R7; new (...args: infer A8): infer R8; new (...args: infer A9): infer R9; new (...args: infer A10): infer R10}
    ? (new (...p: A1) => R1) | (new (...p: A2) => R2) | (new (...p: A3) => R3) | (new (...p: A4) => R4) | (new (...p: A5) => R5) | (new (...p: A6) => R6) | (new (...p: A7) => R7) | (new (...p: A8) => R8) | (new (...p: A9) => R9) | (new (...p: A10) => R10)
    : never

export type UnknownConstructor = new (...args: unknown[]) => unknown

export type IsUselessConstructorOverloadInfo<FunctionType> = StrictEqualUsingTSInternalIdenticalToOperator<FunctionType, UnknownConstructor>

export type DecreasingConstructorOverloadsInfoUnion<ConstructorType> = ConstructorType extends {new (...args: infer A1): infer R1; new (...args: infer A2): infer R2; new (...args: infer A3): infer R3; new (...args: infer A4): infer R4; new (...args: infer A5): infer R5; new (...args: infer A6): infer R6; new (...args: infer A7): infer R7; new (...args: infer A8): infer R8; new (...args: infer A9): infer R9; new (...args: infer A10): infer R10}
  ? (new (...p: A1) => R1) | (new (...p: A2) => R2) | (new (...p: A3) => R3) | (new (...p: A4) => R4) | (new (...p: A5) => R5) | (new (...p: A6) => R6) | (new (...p: A7) => R7) | (new (...p: A8) => R8) | (new (...p: A9) => R9) | (new (...p: A10) => R10)
  : ConstructorType extends {new (...args: infer A1): infer R1; new (...args: infer A2): infer R2; new (...args: infer A3): infer R3; new (...args: infer A4): infer R4; new (...args: infer A5): infer R5; new (...args: infer A6): infer R6; new (...args: infer A7): infer R7; new (...args: infer A8): infer R8; new (...args: infer A9): infer R9; }
    ? (new (...p: A1) => R1) | (new (...p: A2) => R2) | (new (...p: A3) => R3) | (new (...p: A4) => R4) | (new (...p: A5) => R5) | (new (...p: A6) => R6) | (new (...p: A7) => R7) | (new (...p: A8) => R8) | (new (...p: A9) => R9)
    : ConstructorType extends {new (...args: infer A1): infer R1; new (...args: infer A2): infer R2; new (...args: infer A3): infer R3; new (...args: infer A4): infer R4; new (...args: infer A5): infer R5; new (...args: infer A6): infer R6; new (...args: infer A7): infer R7; new (...args: infer A8): infer R8; }
      ? (new (...p: A1) => R1) | (new (...p: A2) => R2) | (new (...p: A3) => R3) | (new (...p: A4) => R4) | (new (...p: A5) => R5) | (new (...p: A6) => R6) | (new (...p: A7) => R7) | (new (...p: A8) => R8)
      : ConstructorType extends {new (...args: infer A1): infer R1; new (...args: infer A2): infer R2; new (...args: infer A3): infer R3; new (...args: infer A4): infer R4; new (...args: infer A5): infer R5; new (...args: infer A6): infer R6; new (...args: infer A7): infer R7; }
        ? (new (...p: A1) => R1) | (new (...p: A2) => R2) | (new (...p: A3) => R3) | (new (...p: A4) => R4) | (new (...p: A5) => R5) | (new (...p: A6) => R6) | (new (...p: A7) => R7)
        : ConstructorType extends {new (...args: infer A1): infer R1; new (...args: infer A2): infer R2; new (...args: infer A3): infer R3; new (...args: infer A4): infer R4; new (...args: infer A5): infer R5; new (...args: infer A6): infer R6; }
          ? (new (...p: A1) => R1) | (new (...p: A2) => R2) | (new (...p: A3) => R3) | (new (...p: A4) => R4) | (new (...p: A5) => R5) | (new (...p: A6) => R6)
          : ConstructorType extends {new (...args: infer A1): infer R1; new (...args: infer A2): infer R2; new (...args: infer A3): infer R3; new (...args: infer A4): infer R4; new (...args: infer A5): infer R5; }
            ? (new (...p: A1) => R1) | (new (...p: A2) => R2) | (new (...p: A3) => R3) | (new (...p: A4) => R4) | (new (...p: A5) => R5)
            : ConstructorType extends {new (...args: infer A1): infer R1; new (...args: infer A2): infer R2; new (...args: infer A3): infer R3; new (...args: infer A4): infer R4; }
              ? (new (...p: A1) => R1) | (new (...p: A2) => R2) | (new (...p: A3) => R3) | (new (...p: A4) => R4)
              : ConstructorType extends {new (...args: infer A1): infer R1; new (...args: infer A2): infer R2; new (...args: infer A3): infer R3; }
                ? (new (...p: A1) => R1) | (new (...p: A2) => R2) | (new (...p: A3) => R3)
                : ConstructorType extends {new (...args: infer A1): infer R1; new (...args: infer A2): infer R2; }
                  ? (new (...p: A1) => R1) | (new (...p: A2) => R2)
                  : ConstructorType extends new (...args: infer A1) => infer R1 ? (new (...p: A1) => R1)
                    : never

export type TSPre53ConstructorOverloadsInfoUnion<ConstructorType> =
  // first, pointlessly wrap the overload variants in a 1-tuple, then infer them as `Tup` - this helps TypeScript isolate out the overload variants
  Tuplify<DecreasingConstructorOverloadsInfoUnion<ConstructorType>> extends infer Tup
    ? // we know `Tup` is a 1-tuple because we just used Tuplify, but use an infer so that TypeScript knows too
      Tup extends [infer Ctor]
      ? // Now check if the Ctor is "useless" i.e. hit by the historical TypeScript bug that adds `new (...args: unknown[]) => unknown` overloads
        IsUselessConstructorOverloadInfo<Ctor> extends true
        ? // if it's useless, get rid of it from the resultant union using never
          never
        : Ctor // deeply hidden happy path - keep this. We'll end up with a union of the actual meaningful overload variants
      : never
    : never

export type ConstructorOverloadsUnion<ConstructorType> =
  // recent TypeScript versions (5.3+) can treat a 1-overload type constructor as a 10-overload. Test for this by seeing if we can successfully get a union from a 1-overload constructor. If we can't, we're on an old TypeScript and need to use the more complicated utility.
  IsNever<TSPost53ConstructorOverloadsInfoUnion<new (a: 1) => any>> extends true
    ? TSPre53ConstructorOverloadsInfoUnion<ConstructorType>
    : TSPost53ConstructorOverloadsInfoUnion<ConstructorType>

export type InferConstructor<ConstructorType extends new (...args: any) => any> = ConstructorType

export type ConstructorOverloadParameters<ConstructorType> =
  ConstructorOverloadsUnion<ConstructorType> extends InferConstructor<infer Ctor> ? ConstructorParameters<Ctor> : never

export type NumOverloads<FunctionType> = UnionToTuple<OverloadsInfoUnion<FunctionType>>['length']
