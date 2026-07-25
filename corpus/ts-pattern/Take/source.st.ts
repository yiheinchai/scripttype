/**
 * Take as many leading elements of xs as it has entries.
 */
export function Take(xs: readonly any[], it: any[]) {
  const output: any[] = []
  let rest = xs
  let n = it
  while (length(n) !== 0) {
    if (!matches<readonly [any, ...any[]]>(rest)) {
      break
    }
    const [head, ...tail] = orElse(rest, [])
    output.push(head)
    rest = tail
    n = Prev(n)
  }
  return output
}
