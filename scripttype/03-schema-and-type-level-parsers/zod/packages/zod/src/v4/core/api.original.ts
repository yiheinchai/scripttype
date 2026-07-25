/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/zod/packages/zod/src/v4/core/api.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonNullable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Partial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type checks<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type errors<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type schemas<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type util<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Params<
  T extends schemas.$ZodType | checks.$ZodCheck,
  IssueTypes extends errors.$ZodIssueBase,
  OmitKeys extends keyof T["_zod"]["def"] = never,
> = util.Flatten<
  Partial<
    util.EmptyToNever<
      Omit<T["_zod"]["def"], OmitKeys> &
        ([IssueTypes] extends [never]
          ? {} // unknown
          : {
              error?: string | errors.$ZodErrorMap<IssueTypes> | undefined;
              /** @deprecated This parameter is deprecated. Use `error` instead. */
              message?: string | undefined; // supported in Zod 3
            })
    >
  >
>;

export type TypeParams<
  T extends schemas.$ZodType = schemas.$ZodType & { _isst: never },
  AlsoOmit extends Exclude<keyof T["_zod"]["def"], "type" | "checks" | "error"> = never,
> = Params<T, NonNullable<T["_zod"]["isst"]>, "type" | "checks" | "error" | AlsoOmit>;

export type CheckParams<
  T extends checks.$ZodCheck = checks.$ZodCheck, // & { _issc: never },
  AlsoOmit extends Exclude<keyof T["_zod"]["def"], "check" | "error"> = never,
> = Params<T, NonNullable<T["_zod"]["issc"]>, "check" | "error" | AlsoOmit>;

export type StringFormatParams<
  T extends schemas.$ZodStringFormat = schemas.$ZodStringFormat,
  AlsoOmit extends Exclude<keyof T["_zod"]["def"], "type" | "coerce" | "checks" | "error" | "check" | "format"> = never,
> = Params<
  T,
  NonNullable<T["_zod"]["isst"] | T["_zod"]["issc"]>,
  "type" | "coerce" | "checks" | "error" | "check" | "format" | AlsoOmit
>;

export type CheckStringFormatParams<
  T extends schemas.$ZodStringFormat = schemas.$ZodStringFormat,
  AlsoOmit extends Exclude<keyof T["_zod"]["def"], "type" | "coerce" | "checks" | "error" | "check" | "format"> = never,
> = Params<T, NonNullable<T["_zod"]["issc"]>, "type" | "coerce" | "checks" | "error" | "check" | "format" | AlsoOmit>;

export type CheckTypeParams<
  T extends schemas.$ZodType & checks.$ZodCheck = schemas.$ZodType & checks.$ZodCheck,
  AlsoOmit extends Exclude<keyof T["_zod"]["def"], "type" | "checks" | "error" | "check"> = never,
> = Params<T, NonNullable<T["_zod"]["isst"] | T["_zod"]["issc"]>, "type" | "checks" | "error" | "check" | AlsoOmit>;

export type RawIssue<T extends errors.$ZodIssueBase> = T extends any
  ? util.Flatten<
      util.MakePartial<T, "message" | "path"> & {
        /** The schema or check that originated this issue. */
        readonly inst?: schemas.$ZodType | checks.$ZodCheck;
        /** If `true`, Zod will execute subsequent checks/refinements instead of immediately aborting */
        readonly continue?: boolean | undefined;
      } & Record<string, unknown>
    >
  : never;

export type $ZodSuperRefineIssue<T extends errors.$ZodIssueBase = errors.$ZodIssue> = T extends any
  ? RawIssue<T>
  : never;
