export function Nullable(t) {
  const out = {}
  for (const p in t) {
    out[p] = t[p] | Null
  }
  return out
}
