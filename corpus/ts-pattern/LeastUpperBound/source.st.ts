export function LeastUpperBound(a, b) {
  if (isSubtypeOf(b, a)) return b
  if (isSubtypeOf(a, b)) return a
  return never
}
