export type ArrayItemType<T> = T extends ReadonlyArray<infer I> ? I : never
