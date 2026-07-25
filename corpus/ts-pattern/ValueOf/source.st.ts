export function ValueOf(a) {
  if (extendsType<readonly any[]>(a)) {
    return indexOfType(a)
  }
  return a[keyof(a)]
}
