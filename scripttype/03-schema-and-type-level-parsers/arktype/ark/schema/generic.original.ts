/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/schema/generic.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BaseRoot<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type GenericRoot<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Hkt<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InstanceType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type LazyGenericBody<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RootSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type array<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type GenericParamAst<
	name extends string = string,
	constraint = unknown
> = [name: name, constraint: constraint]

export type GenericParamDef<name extends string = string> =
	| name
	| readonly [name, unknown]

export type genericParamNames<params extends array<GenericParamAst>> = {
	[i in keyof params]: params[i][0]
}

export type genericParamConstraints<params extends array<GenericParamAst>> = {
	[i in keyof params]: params[i][1]
}

export type GenericArgResolutions<
	params extends array<GenericParamAst> = array<GenericParamAst>
> = {
	[i in keyof params as params[i & `${number}`][0]]: BaseRoot
}

export type genericParamSchemasToAst<
	schemas extends readonly GenericParamDef[]
> = {
	[i in keyof schemas]: schemas[i] extends GenericParamDef<infer name> ?
		[name, unknown]
	:	never
}

export type genericHktToConstraints<hkt extends abstract new () => Hkt> =
	InstanceType<hkt>["constraints"]

export type GenericRootBodyParser<params extends array<GenericParamAst>> = {
	<const body>(body: RootSchema): GenericRoot<params, body>

	<hkt extends Hkt.constructor>(
		instantiateDef: LazyGenericBody<GenericArgResolutions<params>>,
		hkt: hkt
	): GenericRoot<
		{
			[i in keyof params]: [params[i][0], genericHktToConstraints<hkt>[i]]
		},
		InstanceType<hkt>
	>
}

export type writeUnsatisfiedParameterConstraintMessage<
	name extends string,
	constraint extends string,
	arg extends string
> = `${name} must be assignable to ${constraint} (was ${arg})`
