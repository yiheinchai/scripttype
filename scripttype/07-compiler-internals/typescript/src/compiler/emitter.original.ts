/**
 * ORIGINAL TypeScript from 07-compiler-internals/typescript/src/compiler/emitter.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Node<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ParenthesizerRule<T extends Node> = (node: T) => T;

export interface OrdinalParentheizerRuleSelector<T extends Node> {
    select(index: number): ((node: T) => T) | undefined;
}

export type ParenthesizerRuleOrSelector<T extends Node> = OrdinalParentheizerRuleSelector<T> | ParenthesizerRule<T>;

export type EmitFunction = <T extends Node>(node: T, parenthesizerRule?: ParenthesizerRule<T>) => void;

export type EmitListItemFunction<T extends Node> = (node: Node, emit: EmitFunction, parenthesizerRule: ParenthesizerRuleOrSelector<T> | undefined, index: number) => void;
