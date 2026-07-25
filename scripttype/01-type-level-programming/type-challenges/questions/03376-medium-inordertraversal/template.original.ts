/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-challenges/questions/03376-medium-inordertraversal/template.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export interface TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
}

export type InorderTraversal<T extends TreeNode | null> = any
