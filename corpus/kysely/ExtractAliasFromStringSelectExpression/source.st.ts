/**
 * Parse the output name out of a select expression: 'user.name as author' -> 'author',
 * 'user.name' -> 'name'.
 *
 * The dotted case deliberately reproduces the reference's *bounded* behaviour: it
 * looks past at most two dots, so 'a.b.c.d' yields 'c.d' rather than 'd'.
 */
export function ExtractAliasFromStringSelectExpression(SE: string): string {
  if (includes(SE, ' as ')) {
    const [, alias] = splitOnce(SE, ' as ')
    return alias
  }
  if (includes(SE, '.')) {
    const [, afterFirstDot] = splitOnce(SE, '.')
    if (includes(afterFirstDot, '.')) {
      const [, column] = splitOnce(afterFirstDot, '.')
      return column
    }
    return afterFirstDot
  }
  return SE
}
