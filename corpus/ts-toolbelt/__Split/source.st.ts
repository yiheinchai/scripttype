/**
 * Split S by D. The reference is a hand-written tail-recursive accumulator type;
 * here it is a plain while loop, and the compiler produces that same shape.
 */
export function __Split(S: string, D: string) {
  const T: string[] = []
  let rest = S
  while (includes(rest, D)) {
    const [before, after] = splitOnce(rest, D)
    T.push(before)
    rest = after
  }
  T.push(rest)
  return T
}
