/**
 * ORIGINAL TypeScript from 07-compiler-internals/typescript/src/compiler/transformers/es2015.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type HierarchyFacts<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IterationStatement<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type LabeledStatement<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Statement<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type LoopConverter<T extends IterationStatement> = (node: T, outermostLabeledStatement: LabeledStatement | undefined, convertedLoopBodyStatements: Statement[] | undefined, ancestorFacts: HierarchyFacts) => Statement;
