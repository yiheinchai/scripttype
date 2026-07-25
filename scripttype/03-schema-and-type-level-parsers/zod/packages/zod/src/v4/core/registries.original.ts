/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/zod/packages/zod/src/v4/core/registries.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type $ZodType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type core<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type $output = typeof $output;

export type $input = typeof $input;

export type $replace<Meta, S extends $ZodType> = Meta extends $output
  ? core.output<S>
  : Meta extends $input
    ? core.input<S>
    : Meta extends (infer M)[]
      ? $replace<M, S>[]
      : Meta extends (...args: infer P) => infer R
        ? (
            ...args: {
              [K in keyof P]: $replace<P[K], S>; // tuple
            }
          ) => $replace<R, S>
        : // handle objects
          Meta extends object
          ? { [K in keyof Meta]: $replace<Meta[K], S> }
          : Meta;
