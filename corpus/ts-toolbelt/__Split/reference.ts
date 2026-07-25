export type __Split<S extends string, D extends string, T extends string[] = []> =
    S extends `${infer BS}${D}${infer AS}`
    ? __Split<AS, D, [...T, BS]>
    : [...T, S]
