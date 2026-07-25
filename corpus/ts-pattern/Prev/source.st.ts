export function Prev(it: any[]) {
  const [, ...tail] = orElse(it, [])
  return tail
}
