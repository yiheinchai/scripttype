/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/type/scope.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BoundModule<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Brand<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DefAst<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ErrorType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type GenericAst<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type GenericDeclaration<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type GenericParamAst<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferredAst<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Module<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ParameterString<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PreparsedNodeResolution<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PrivateDeclaration<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Submodule<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type anyOrNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type array<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type baseGenericConstraints<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferDefinition<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type noSuggest<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type parseGenericParams<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type parseValidGenericParams<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type type<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type writeDuplicateAliasError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Def<def = {}> = Brand<def, "unparsed">

export type bindThis<def> = { this: Def<def> }

export type PreparsedResolution = PreparsedNodeResolution

export type extractGenericName<k> =
	k extends GenericDeclaration<infer name> ? name : never

export type extractGenericParameters<k> =
	// using extends GenericDeclaration<string, infer params>
	// causes TS fail to infer a narrowed result as of 5.5
	k extends `${string}<${infer params}>` ? ParameterString<params> : never

export type UnparsedScope = "$"

export type bootstrapAliases<def> = {
	[k in Exclude<keyof def, GenericDeclaration>]: def[k] extends (
		PreparsedResolution
	) ?
		def[k] extends { t: infer g extends GenericAst } ? g
		: def[k] extends Module<infer $> | BoundModule<infer $, any> ? Submodule<$>
		: def[k]
	: def[k] extends (() => infer thunkReturn extends PreparsedResolution) ?
		thunkReturn extends { t: infer g extends GenericAst } ? g
		: thunkReturn extends Module<infer $> | BoundModule<infer $, any> ?
			Submodule<$>
		:	thunkReturn
	:	Def<def[k]>
} & {
	[k in keyof def & GenericDeclaration as extractGenericName<k>]: GenericAst<
		parseValidGenericParams<extractGenericParameters<k>, bootstrapAliases<def>>,
		def[k],
		UnparsedScope
	>
}

export type bindGenericToScope<g extends GenericAst, $> = GenericAst<
	g["paramsAst"],
	g["bodyDef"],
	g["$"] extends UnparsedScope ? $ : g["$"],
	$
>

export type inferBootstrapped<$> = {
	[name in keyof $]: $[name] extends Def<infer def> ?
		inferDefinition<def, $, {}>
	: $[name] extends { t: infer g extends GenericAst } ? bindGenericToScope<g, $>
	: // should be submodule
		$[name]
} & unknown

export type resolutionToAst<alias extends string, resolution> =
	[resolution] extends [anyOrNever] ? InferredAst<resolution, alias>
	: resolution extends Def<infer def> ? DefAst<def, alias>
	: resolution extends { [arkKind]: "module"; root: infer root } ?
		InferredAst<root, alias>
	: resolution extends GenericAst ? resolution
	: InferredAst<resolution, alias>

export type moduleKeyOf<$> = {
	[k in keyof $]: $[k] extends { [arkKind]: "module" } ?
		[$[k]] extends [anyOrNever] ?
			never
		:	k & string
	:	never
}[keyof $]

export type parseGenericScopeKey<name extends string, params extends string, def> = {
	name: name
	params: parseGenericParams<params, bootstrapAliases<def>>
}

export type parseScopeKey<k, def> =
	// trying to infer against GenericDeclaration here directly also fails as of TS 5.5
	k extends `${infer name}<${infer params}>` ?
		parseGenericScopeKey<name, params, def>
	:	{
			name: k
			params: []
		}

export type validate<def> = {
		[k in keyof def]: k extends noSuggest ?
			// avoid trying to parse meta keys when spreading modules
			unknown
		: parseScopeKey<k, def>["params"] extends infer params ?
			params extends array<GenericParamAst> ?
				params["length"] extends 0 ?
					// not including Type here directly breaks some cyclic tests (last checked w/ TS 5.5).
					// if you are from the future with a better version of TS and can remove it
					// without breaking `pnpm typecheck`, go for it.
					def[k] extends type.Any | PreparsedResolution ? def[k]
					: k extends (
						PrivateDeclaration<infer name extends keyof def & string>
					) ?
						ErrorType<writeDuplicateAliasError<name>>
					:	type.validate<def[k], bootstrapAliases<def>, {}>
				:	type.validate<
						def[k],
						bootstrapAliases<def>,
						baseGenericConstraints<params>
					>
			:	// if we get here, the params failed to parse- return the error
				params
		:	never
	}

export type infer<def> = inferBootstrapped<bootstrapAliases<def>>
