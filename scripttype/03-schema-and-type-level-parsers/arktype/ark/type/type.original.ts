/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/type/type.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BaseParseOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Constructor<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RootSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Scope<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type instantiateType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type type<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Type<t = unknown, $ = {}> = instantiateType<t, $>

export type UnitTypeParser<$> = <const t>(value: t) => Type<t, $>

export type InstanceOfTypeParser<$> = <const t extends object>(
	ctor: Constructor<t>
) => Type<t, $>

export type EnumeratedTypeParser<$> = <const values extends readonly unknown[]>(
	...values: values
) => Type<values[number], $>

export type ValueOfTypeParser<$> = <const o extends object>(
	o: o
) => Type<o[keyof o], $>

export type DefinitionParser<$> = <const def>(def: type.validate<def, $>) => def

export type SchemaParser<$> = (
	schema: RootSchema,
	opts?: BaseParseOptions
) => Type<unknown, $>

export type TypeConstructor<t = unknown, $ = {}> = new (
	def: unknown,
	$: Scope<$>
) => Type<t, $>
