/**
 * ORIGINAL TypeScript from 01-type-level-programming/hotscript/src/internals/functions/Functions.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Call<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Extract<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Fn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PartialApply<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type _<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type unset<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ParametersImpl<fn> = fn extends (...args: infer args) => any
    ? args
    : never;

export interface ParametersFn extends Fn {
    return: ParametersImpl<this["arg0"]>;
  }

export type Parameters<
    fn extends ((...args: any[]) => any) | _ | unset = unset
  > = PartialApply<ParametersFn, [fn]>;

export interface ParameterFn extends Fn {
    return: ParametersImpl<this["arg0"]>[this["arg1"]];
  }

export type Parameter<
    N extends number | _ | unset = unset,
    fn extends ((...args: any[]) => any) | _ | unset = unset
  > = PartialApply<ParameterFn, [fn, N]>;

export type ReturnTypeImpl<fn> = fn extends (...args: any[]) => infer ret
    ? ret
    : never;

export interface ReturnTypeFn extends Fn {
    return: ReturnTypeImpl<this["arg0"]>;
  }

export type ReturnType<
    fn extends ((...args: any[]) => any) | _ | unset = unset
  > = PartialApply<ReturnTypeFn, [fn]>;

export interface MapReturnTypeFn extends Fn {
    return: this["args"] extends [infer fn extends Fn, infer fnValue]
      ? fnValue extends (...args: infer args) => infer returnType
        ? (...args: args) => Call<fn, returnType>
        : never
      : never;
  }

export type MapReturnType<
    fn extends Fn | unset | _ = unset,
    fnValue extends ((...args: any[]) => any) | _ | unset = unset
  > = PartialApply<MapReturnTypeFn, [fn, fnValue]>;

export interface MapParametersFn extends Fn {
    return: this["args"] extends [infer fn extends Fn, infer fnValue]
      ? fnValue extends (...args: infer args) => infer returnType
        ? (...args: Extract<Call<fn, args>, readonly any[]>) => returnType
        : never
      : never;
  }

export type MapParameters<
    fn extends Fn | unset | _ = unset,
    fnValue extends ((...args: any[]) => any) | _ | unset = unset
  > = PartialApply<MapParametersFn, [fn, fnValue]>;
