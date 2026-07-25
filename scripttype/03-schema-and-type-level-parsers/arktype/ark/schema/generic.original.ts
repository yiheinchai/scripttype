/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/schema/generic.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BaseRoot<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type GenericRoot<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Hkt<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type InstanceType<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type LazyGenericBody<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type RootSchema<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type array<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
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
