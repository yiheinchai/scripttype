/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-router/packages/router-core/src/utils.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Pick<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Required<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RouteIds<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Awaitable<T> = T | Promise<T>

export type NoInfer<T> = [T][T extends any ? 0 : never]

export type IsAny<TValue, TYesResult, TNoResult = TValue> = 1 extends 0 & TValue
  ? TYesResult
  : TNoResult

export type PickAsRequired<TValue, TKey extends keyof TValue> = Omit<
  TValue,
  TKey
> &
  Required<Pick<TValue, TKey>>

export type PickRequired<T> = {
  [K in keyof T as undefined extends T[K] ? never : K]: T[K]
}

export type PickOptional<T> = {
  [K in keyof T as undefined extends T[K] ? K : never]: T[K]
}

export type WithoutEmpty<T> = T extends any ? ({} extends T ? never : T) : never

export type Expand<T> = T extends object
  ? T extends infer O
    ? O extends Function
      ? O
      : { [K in keyof O]: O[K] }
    : never
  : T

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T

export type MakeDifferenceOptional<TLeft, TRight> = keyof TLeft &
  keyof TRight extends never
  ? TRight
  : Omit<TRight, keyof TLeft & keyof TRight> & {
      [K in keyof TLeft & keyof TRight]?: TRight[K]
    }

export type IsUnion<T, U extends T = T> = (
  T extends any ? (U extends T ? false : true) : never
) extends false
  ? false
  : true

export type IsNonEmptyObject<T> = T extends object
  ? keyof T extends never
    ? false
    : true
  : false

export type Assign<TLeft, TRight> = TLeft extends any
  ? TRight extends any
    ? IsNonEmptyObject<TLeft> extends false
      ? TRight
      : IsNonEmptyObject<TRight> extends false
        ? TLeft
        : keyof TLeft & keyof TRight extends never
          ? TLeft & TRight
          : Omit<TLeft, keyof TRight> & TRight
    : never
  : never

export type IntersectAssign<TLeft, TRight> = TLeft extends any
  ? TRight extends any
    ? IsNonEmptyObject<TLeft> extends false
      ? TRight
      : IsNonEmptyObject<TRight> extends false
        ? TLeft
        : TRight & TLeft
    : never
  : never

export type Updater<TPrevious, TResult = TPrevious> =
  | TResult
  | ((prev?: TPrevious) => TResult)

export type NonNullableUpdater<TPrevious, TResult = TPrevious> =
  | TResult
  | ((prev: TPrevious) => TResult)

export type MergeAllPrimitive =
  | ReadonlyArray<any>
  | number
  | string
  | bigint
  | boolean
  | symbol
  | undefined
  | null

export type ExtractObjects<TUnion> = TUnion extends MergeAllPrimitive
  ? never
  : TUnion

export type PartialMergeAllObject<TUnion> =
  ExtractObjects<TUnion> extends infer TObj
    ? [TObj] extends [never]
      ? never
      : {
          [TKey in TObj extends any ? keyof TObj : never]?: TObj extends any
            ? TKey extends keyof TObj
              ? TObj[TKey]
              : never
            : never
        }
    : never

export type ExtractPrimitives<TUnion> = TUnion extends MergeAllPrimitive
  ? TUnion
  : TUnion extends object
    ? never
    : TUnion

export type PartialMergeAll<TUnion> =
  | ExtractPrimitives<TUnion>
  | PartialMergeAllObject<TUnion>

export type Constrain<T, TConstraint, TDefault = TConstraint> =
  | (T extends TConstraint ? T : never)
  | TDefault

export type ConstrainLiteral<T, TConstraint, TDefault = TConstraint> =
  | (T & TConstraint)
  | TDefault

export type UnionToIntersection<T> = (
  T extends any ? (arg: T) => any : never
) extends (arg: infer T) => any
  ? T
  : never

export type MergeAllObjects<
  TUnion,
  TIntersected = UnionToIntersection<ExtractObjects<TUnion>>,
> = [keyof TIntersected] extends [never]
  ? never
  : {
      [TKey in keyof TIntersected]: TUnion extends any
        ? TUnion[TKey & keyof TUnion]
        : never
    }

export type MergeAll<TUnion> =
  | MergeAllObjects<TUnion>
  | ExtractPrimitives<TUnion>

export type ValidateJSON<T> = ((...args: Array<any>) => any) extends T
  ? unknown extends T
    ? never
    : 'Function is not serializable'
  : { [K in keyof T]: ValidateJSON<T[K]> }

export type LooseReturnType<T> = T extends (
  ...args: Array<any>
) => infer TReturn
  ? TReturn
  : never

export type LooseAsyncReturnType<T> = T extends (
  ...args: Array<any>
) => infer TReturn
  ? TReturn extends Promise<infer TReturn>
    ? TReturn
    : TReturn
  : never

export type StringLiteral<T> = T extends string
  ? string extends T
    ? string
    : T
  : never

export type ThrowOrOptional<T, TThrow extends boolean> = TThrow extends true
  ? T
  : T | undefined

export type StrictOrFrom<
  TRouter extends AnyRouter,
  TFrom,
  TStrict extends boolean = true,
> = TStrict extends false
  ? {
      from?: never
      strict: TStrict
    }
  : {
      from: ConstrainLiteral<TFrom, RouteIds<TRouter['routeTree']>>
      strict?: TStrict
    }

export type ThrowConstraint<
  TStrict extends boolean,
  TThrow extends boolean,
> = TStrict extends false ? (TThrow extends true ? never : TThrow) : TThrow

export type ControlledPromise<T> = Promise<T> & {
  resolve: (value: T) => void
  reject: (value: any) => void
  status: 'pending' | 'resolved' | 'rejected'
  value?: T
}
