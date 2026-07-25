/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/mysql-core/columns/serial.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type HasDefault<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsAutoincrement<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsPrimaryKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MySqlSerialBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NotNull<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type MySqlSerialBuilderInitial<TName extends string> = IsAutoincrement<
	IsPrimaryKey<
		NotNull<
			HasDefault<
				MySqlSerialBuilder<{
					name: TName;
					dataType: 'number';
					columnType: 'MySqlSerial';
					data: number;
					driverParam: number;
					enumValues: undefined;
				}>
			>
		>
	>
>;
