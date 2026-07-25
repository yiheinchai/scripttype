/**
 * ORIGINAL TypeScript from 07-compiler-internals/typescript/src/compiler/emitter.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Node<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type ParenthesizerRule<T extends Node> = (node: T) => T;

export interface OrdinalParentheizerRuleSelector<T extends Node> {
    select(index: number): ((node: T) => T) | undefined;
}

export type ParenthesizerRuleOrSelector<T extends Node> = OrdinalParentheizerRuleSelector<T> | ParenthesizerRule<T>;

export type EmitFunction = <T extends Node>(node: T, parenthesizerRule?: ParenthesizerRule<T>) => void;

export type EmitListItemFunction<T extends Node> = (node: Node, emit: EmitFunction, parenthesizerRule: ParenthesizerRuleOrSelector<T> | undefined, index: number) => void;
