/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/words.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ApplyDefaultOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AsciiPunctuation<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsLowercase<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsNumeric<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsUppercase<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Required<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type WordSeparators<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type SkipEmptyWord<Word extends string> = Word extends '' ? [] : [Word];

export type RemoveLastCharacter<
	Sentence extends string,
	Character extends string,
> = Sentence extends `${infer LeftSide}${Character}`
	? SkipEmptyWord<LeftSide>
	: never;

export type WordsOptions = {
	/**
	Split on numeric sequence.

	@default true

	@example
	```
	import type {Words} from 'type-fest';

	type Example1 = Words<'p2pNetwork', {splitOnNumbers: true}>;
	//=> ['p', '2', 'p', 'Network']

	type Example2 = Words<'p2pNetwork', {splitOnNumbers: false}>;
	//=> ['p2p', 'Network']
	```
	*/
	splitOnNumbers?: boolean;
	/**
	Split on {@link AsciiPunctuation | punctuation characters} (e.g., `#`, `&`, `*`, `:`, `?`, `@`, `~`).

	@example
	```
	import type {Words} from 'type-fest';

	type Example1 = Words<'hello:world', {splitOnPunctuation: true}>;
	//=> ['hello', 'world']

	type Example2 = Words<'hello:world', {splitOnPunctuation: false}>;
	//=> ['hello', ':world']
	```
	*/
	splitOnPunctuation?: boolean;
};

export type WordsImplementation<
	Sentence extends string,
	Options extends Required<WordsOptions>,
	LastCharacter extends string = '',
	CurrentWord extends string = '',
> = Sentence extends `${infer FirstCharacter}${infer RemainingCharacters}`
	? FirstCharacter extends WordSeparators | (Options['splitOnPunctuation'] extends true ? AsciiPunctuation : never)
		// Skip word separator
		? [...SkipEmptyWord<CurrentWord>, ...WordsImplementation<RemainingCharacters, Options>]
		: LastCharacter extends ''
			// Fist char of word
			? WordsImplementation<RemainingCharacters, Options, FirstCharacter, FirstCharacter>
			// Case change: non-numeric to numeric
			: [false, true] extends [IsNumeric<LastCharacter>, IsNumeric<FirstCharacter>]
				? Options['splitOnNumbers'] extends true
					// Split on number: push word
					? [...SkipEmptyWord<CurrentWord>, ...WordsImplementation<RemainingCharacters, Options, FirstCharacter, FirstCharacter>]
					// No split on number: concat word
					: WordsImplementation<RemainingCharacters, Options, FirstCharacter, `${CurrentWord}${FirstCharacter}`>
				// Case change: numeric to non-numeric
				: [true, false] extends [IsNumeric<LastCharacter>, IsNumeric<FirstCharacter>]
					? Options['splitOnNumbers'] extends true
						// Split on number: push word
						? [...SkipEmptyWord<CurrentWord>, ...WordsImplementation<RemainingCharacters, Options, FirstCharacter, FirstCharacter>]
						// No split on number: concat word
						: WordsImplementation<RemainingCharacters, Options, FirstCharacter, `${CurrentWord}${FirstCharacter}`>
					// No case change: concat word
					: [true, true] extends [IsNumeric<LastCharacter>, IsNumeric<FirstCharacter>]
						? WordsImplementation<RemainingCharacters, Options, FirstCharacter, `${CurrentWord}${FirstCharacter}`>
					// Case change: lower to upper, push word
						: [true, true] extends [IsLowercase<LastCharacter>, IsUppercase<FirstCharacter>]
							? [...SkipEmptyWord<CurrentWord>, ...WordsImplementation<RemainingCharacters, Options, FirstCharacter, FirstCharacter>]
						// Case change: upper to lower, brings back the last character, push word
							: [true, true] extends [IsUppercase<LastCharacter>, IsLowercase<FirstCharacter>]
								? [...RemoveLastCharacter<CurrentWord, LastCharacter>, ...WordsImplementation<RemainingCharacters, Options, FirstCharacter, `${LastCharacter}${FirstCharacter}`>]
							// No case change: concat word
								: WordsImplementation<RemainingCharacters, Options, FirstCharacter, `${CurrentWord}${FirstCharacter}`>
	: [...SkipEmptyWord<CurrentWord>];

export type _DefaultWordsOptions = {
	splitOnNumbers: true;
	splitOnPunctuation: false;
};

export type Words<Sentence extends string, Options extends WordsOptions = {}> = WordsImplementation<Sentence, ApplyDefaultOptions<WordsOptions, _DefaultWordsOptions, Options>>;
