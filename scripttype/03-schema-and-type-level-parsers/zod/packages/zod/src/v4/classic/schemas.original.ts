/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/zod/packages/zod/src/v4/classic/schemas.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Partial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StandardSchemaWithJSONProps<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type core<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type _LazyMethodsOf<T> = Partial<{
  [K in keyof T]: T[K] extends (...args: infer A) => infer R ? (this: T, ...args: A) => R : never;
}>;

export type ZodStandardSchemaWithJSON<T> = StandardSchemaWithJSONProps<core.input<T>, core.output<T>>;

export type SafeExtendShape<Base extends core.$ZodShape, Ext extends core.$ZodLooseShape> = {
  [K in keyof Ext]: K extends keyof Base
    ? core.output<Ext[K]> extends core.output<Base[K]>
      ? core.input<Ext[K]> extends core.input<Base[K]>
        ? Ext[K]
        : never
      : never
    : Ext[K];
};
