/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/zod/packages/zod/src/v4/mini/schemas.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type PropertyKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type core<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type util<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type SafeExtendShape<Base extends core.$ZodShape, Ext extends core.$ZodLooseShape> = {
  [K in keyof Ext]: K extends keyof Base
    ? core.output<Ext[K]> extends core.output<Base[K]>
      ? core.input<Ext[K]> extends core.input<Base[K]>
        ? Ext[K]
        : never
      : never
    : Ext[K];
};

export type SomeType = core.SomeType;

export interface ZodMiniNonOptional<T extends SomeType = core.$ZodType>
  extends _ZodMiniType<core.$ZodNonOptionalInternals<T>> {
  // _zod: core.$ZodNonOptionalInternals<T>;
}

export type RequiredInterfaceShape<
  Shape extends core.$ZodLooseShape,
  Keys extends PropertyKey = keyof Shape,
> = util.Identity<
  {
    [k in keyof Shape as k extends Keys ? k : never]: ZodMiniNonOptional<Shape[k]>;
  } & {
    [k in keyof Shape as k extends Keys ? never : k]: Shape[k];
  }
>;
