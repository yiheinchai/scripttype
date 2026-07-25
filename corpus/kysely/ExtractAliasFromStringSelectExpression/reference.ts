export type ExtractAliasFromStringSelectExpression<SE extends string> =
  SE extends `${string}.${string}.${string} as ${infer A}`
    ? A
    : SE extends `${string}.${string} as ${infer A}`
      ? A
      : SE extends `${string} as ${infer A}`
        ? A
        : SE extends `${string}.${string}.${infer C}`
          ? C
          : SE extends `${string}.${infer C}`
            ? C
            : SE
