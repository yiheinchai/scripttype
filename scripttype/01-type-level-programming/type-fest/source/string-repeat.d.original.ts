/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/string-repeat.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type DigitCharacter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsNegative<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsNumericLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type RepeatStringTenTimes<S extends string> = `${S}${S}${S}${S}${S}${S}${S}${S}${S}${S}`;

export type DigitStringRepeat<S extends string, Digit extends DigitCharacter> = [
	'',
	`${S}`,
	`${S}${S}`,
	`${S}${S}${S}`,
	`${S}${S}${S}${S}`,
	`${S}${S}${S}${S}${S}`,
	`${S}${S}${S}${S}${S}${S}`,
	`${S}${S}${S}${S}${S}${S}${S}`,
	`${S}${S}${S}${S}${S}${S}${S}${S}`,
	`${S}${S}${S}${S}${S}${S}${S}${S}${S}`,
][Digit];

export type BuildStringDigitByDigit<S extends string, Count extends string, Accumulator extends string = ''> =
	Count extends `${infer First extends DigitCharacter}${infer Rest}`
		? BuildStringDigitByDigit<
			S,
			Rest,
			`${RepeatStringTenTimes<Accumulator>}${DigitStringRepeat<S, First>}`
		>
		: Accumulator;

export type StringRepeat<S extends string, Count extends number> =
	Count extends unknown // To distribute `Count`
		? IsNegative<Count> extends true
			? never
			: S extends ''
				? ''
				: IsNumericLiteral<Count> extends false
					? string
					: `${Count}` extends `${string}e${string}`
						? string
						: BuildStringDigitByDigit<S, `${Count}`>
		: never;
