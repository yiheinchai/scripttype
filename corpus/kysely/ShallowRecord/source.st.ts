export function ShallowRecord(K: keyof any, T) {
  const out = {}
  for (const p in keySet(K)) {
    out[p] = T
  }
  return defer(out)
}
