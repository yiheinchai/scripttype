/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/json-schema/errors.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type writeJsonSchemaInsufficientKeysMessage<
	describedExpectedKeys extends string,
	printableJsonSchema extends string
> = `Provided JSON Schema must have at least one of the keys ${describedExpectedKeys} (was ${printableJsonSchema})`

export type writeJsonSchemaUnsupportedTypeMessage<
	printableType extends string
> =
	`Provided 'type' value must be a supported JSON Schema type (was '${printableType}')`

export type writeJsonSchemaObjectNonConformingKeyAndPropertyNamesMessage<
	requiredKey extends string,
	propertyNamesExpression extends string
> = `Required key ${requiredKey} doesn't conform to propertyNames schema of ${propertyNamesExpression}`

export type writeJsonSchemaObjectNonConformingPatternAndPropertyNamesMessage<
	patternPropertySignatureExpression extends string,
	propertyNamesExpression extends string
> = `Pattern property ${patternPropertySignatureExpression} doesn't conform to propertyNames schema of ${propertyNamesExpression}`
