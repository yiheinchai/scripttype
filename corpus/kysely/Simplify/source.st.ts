export function Simplify(t) {
  const out = {}
  for (const k in t) {
    out[k] = t[k]
  }
  return defer(merge(out, emptyObject))
}
