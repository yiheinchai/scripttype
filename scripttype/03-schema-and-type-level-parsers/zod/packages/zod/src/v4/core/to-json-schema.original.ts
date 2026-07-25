/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/zod/packages/zod/src/v4/core/to-json-schema.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type $ZodRegistry<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type JSONSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StandardSchemaWithJSONProps<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type core<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type schemas<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface Seen {
  /** JSON Schema result for this Zod schema */
  schema: JSONSchema.BaseSchema;
  /** A cached version of the schema that doesn't get overwritten during ref resolution */
  def?: JSONSchema.BaseSchema;
  defId?: string | undefined;
  /** Number of times this schema was encountered during traversal */
  count: number;
  /** Cycle path */
  cycle?: (string | number)[] | undefined;
  isParent?: boolean | undefined;
  /** Schema to inherit JSON Schema properties from (set by processor for wrappers) */
  ref?: schemas.$ZodType | null;
  /** JSON Schema property path for this schema */
  path?: (string | number)[] | undefined;
}

export interface ToJSONSchemaContext {
  processors: Record<string, Processor>;
  metadataRegistry: $ZodRegistry<Record<string, any>>;
  target: "draft-04" | "draft-07" | "draft-2020-12" | "openapi-3.0" | ({} & string);
  unrepresentable: "throw" | "any";
  override: (ctx: {
    // must be schemas.$ZodType to prevent recursive type resolution error
    zodSchema: schemas.$ZodType;
    jsonSchema: JSONSchema.BaseSchema;
    path: (string | number)[];
  }) => void;
  io: "input" | "output";
  counter: number;
  seen: Map<schemas.$ZodType, Seen>;
  cycles: "ref" | "throw";
  reused: "ref" | "inline";
  external?:
    | {
        registry: $ZodRegistry<{ id?: string | undefined }>;
        uri?: ((id: string) => string) | undefined;
        defs: Record<string, JSONSchema.BaseSchema>;
      }
    | undefined;
}

export interface ProcessParams {
  schemaPath: schemas.$ZodType[];
  path: (string | number)[];
}

export type Processor<T extends schemas.$ZodType = schemas.$ZodType> = (
  schema: T,
  ctx: ToJSONSchemaContext,
  json: JSONSchema.BaseSchema,
  params: ProcessParams
) => void;

export type ZodStandardSchemaWithJSON<T> = StandardSchemaWithJSONProps<core.input<T>, core.output<T>>;
