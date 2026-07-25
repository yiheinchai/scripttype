/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/Data.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Extract<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReturnType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Types<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Unify<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ChildrenAreTagged<A> = keyof A extends infer K ? K extends keyof A ? "_tag" extends keyof A[K] ? true
    : false
  : never
  : never

export type UntaggedChildren<A> = true extends ChildrenAreTagged<A>
  ? "It looks like you're trying to create a tagged enum, but one or more of its members already has a `_tag` property."
  : unknown

export type TaggedEnum<
  A extends Record<string, Record<string, any>> & UntaggedChildren<A>
> = keyof A extends infer Tag ? Tag extends keyof A ? Types.Simplify<
      { readonly _tag: Tag } & { readonly [K in keyof A[Tag]]: A[Tag][K] }
    >
  : never
  : never

export interface WithGenerics<Count extends number> {
    readonly taggedEnum: { readonly _tag: string }
    readonly numberOfGenerics: Count

    readonly A: unknown
    readonly B: unknown
    readonly C: unknown
    readonly D: unknown
  }

export type Kind<
    Z extends WithGenerics<number>,
    A = unknown,
    B = unknown,
    C = unknown,
    D = unknown
  > = (Z & {
    readonly A: A
    readonly B: B
    readonly C: C
    readonly D: D
  })["taggedEnum"]

export type Args<
    A extends { readonly _tag: string },
    K extends A["_tag"],
    E = Extract<A, { readonly _tag: K }>
  > = {
    readonly [K in keyof E as K extends "_tag" ? never : K]: E[K]
  } extends infer T ? Types.VoidIfEmpty<T>
    : never

export type Value<
    A extends { readonly _tag: string },
    K extends A["_tag"]
  > = Extract<A, { readonly _tag: K }>

export type ConstructorFrom<A, Tag extends keyof A = never> = (
    args: Types.VoidIfEmpty<{ readonly [P in keyof A as P extends Tag ? never : P]: A[P] }>
  ) => A

export type Constructor<A extends { readonly _tag: string }> = Types.Simplify<
    {
      readonly [Tag in A["_tag"]]: ConstructorFrom<
        Extract<A, { readonly _tag: Tag }>,
        "_tag"
      >
    } & {
      readonly $is: <Tag extends A["_tag"]>(
        tag: Tag
      ) => (u: unknown) => u is Extract<A, { readonly _tag: Tag }>
      readonly $match: {
        <
          Cases extends {
            readonly [Tag in A["_tag"]]: (
              args: Extract<A, { readonly _tag: Tag }>
            ) => any
          }
        >(
          cases: Cases
        ): (value: A) => Unify<ReturnType<Cases[A["_tag"]]>>
        <
          Cases extends {
            readonly [Tag in A["_tag"]]: (
              args: Extract<A, { readonly _tag: Tag }>
            ) => any
          }
        >(
          value: A,
          cases: Cases
        ): Unify<ReturnType<Cases[A["_tag"]]>>
      }
    }
  >
