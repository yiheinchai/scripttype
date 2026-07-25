/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/schema.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ApplyDefaultOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IfNotAnyOrNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsAny<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsUnknown<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonRecursiveType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type OptionalKeysOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyMap<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlySet<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Required<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Simplify<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnknownArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type SchemaOptions = {
	/**
	By default, this affects elements in array and tuple types. You can change this by passing `{recurseIntoArrays: false}` as the third type argument:
	- If `recurseIntoArrays` is set to `true` (default), array elements will be recursively processed as well.
	- If `recurseIntoArrays` is set to `false`, arrays will not be recursively processed, and the entire array will be replaced with the given value type.

	@example
	```
	import type {Schema} from 'type-fest';

	type Participants = {
		attendees: string[];
		speakers: string[];
	};

	type ParticipantsWithMetadata = Schema<Participants, {id: number; name: string}, {recurseIntoArrays: true}>;
	//=> {
	// 	attendees: {
	// 		id: number;
	// 		name: string;
	// 	}[];
	// 	speakers: {
	// 		id: number;
	// 		name: string;
	// 	}[];
	// }

	type ParticipantsCount = Schema<Participants, number, {recurseIntoArrays: false}>;
	//=> {attendees: number; speakers: number}
	```

	@default true
	*/
	recurseIntoArrays?: boolean;
};

export type SchemaHelper<Type, Value, Options extends Required<SchemaOptions>> = Simplify<{
	[Key in keyof Type]: _Schema<
		Key extends OptionalKeysOf<Type & object> ? Exclude<Type[Key], undefined> : Type[Key], // Remove `| undefined` when accessing optional properties
		Value,
		Options>
}>;

export type _Schema<Type, Value, Options extends Required<SchemaOptions>> =
	IsAny<Type> extends true
		? Value
		: IsUnknown<Type> extends true
			? Value
			: Type extends NonRecursiveType | Map<unknown, unknown> | Set<unknown> | ReadonlyMap<unknown, unknown> | ReadonlySet<unknown>
				? Value
				: Type extends UnknownArray
					? Options['recurseIntoArrays'] extends false
						? Value
						: SchemaHelper<Type, Value, Options>
					: SchemaHelper<Type, Value, Options>;

export type DefaultSchemaOptions = {
	recurseIntoArrays: true;
};

export type Schema<Type, Value, Options extends SchemaOptions = {}> =
	IfNotAnyOrNever<Type, {
		ifNot: _Schema<Type, Value, ApplyDefaultOptions<SchemaOptions, DefaultSchemaOptions, Options>>;
		ifAny: Value;
		ifNever: Value;
	}>;
