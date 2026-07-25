/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/zod/packages/zod/src/v3/helpers/partialUtil.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ZodArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ZodNullable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ZodObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ZodOptional<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ZodRawShape<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ZodTuple<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ZodTupleItems<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ZodTypeAny<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type DeepPartial<T extends ZodTypeAny> = T extends ZodObject<ZodRawShape>
    ? ZodObject<
        { [k in keyof T["shape"]]: ZodOptional<DeepPartial<T["shape"][k]>> },
        T["_def"]["unknownKeys"],
        T["_def"]["catchall"]
      >
    : T extends ZodArray<infer Type, infer Card>
      ? ZodArray<DeepPartial<Type>, Card>
      : T extends ZodOptional<infer Type>
        ? ZodOptional<DeepPartial<Type>>
        : T extends ZodNullable<infer Type>
          ? ZodNullable<DeepPartial<Type>>
          : T extends ZodTuple<infer Items>
            ? {
                [k in keyof Items]: Items[k] extends ZodTypeAny ? DeepPartial<Items[k]> : never;
              } extends infer PI
              ? PI extends ZodTupleItems
                ? ZodTuple<PI>
                : never
              : never
            : T;
