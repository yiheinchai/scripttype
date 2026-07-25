/**
 * ORIGINAL TypeScript from 07-compiler-internals/typescript/src/compiler/visitorPublic.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Node<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NodeVisitor<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NodesVisitor<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TransformationContext<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Visitor<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type VisitEachChildFunction<T extends Node> = (node: T, visitor: Visitor, context: TransformationContext, nodesVisitor: NodesVisitor, nodeVisitor: NodeVisitor, tokenVisitor: Visitor | undefined) => T;
