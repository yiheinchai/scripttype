/**
 * Build a tuple of length n. The reference is a recursive type with a defaulted
 * accumulator; here it is a while loop that grows a list until it is long enough.
 */
export function Iterator(n: number) {
  const it: any[] = []
  while (length(it) !== n) {
    it.unshift(any)
  }
  return it
}
