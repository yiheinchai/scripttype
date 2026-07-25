/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-challenges/questions/31824-hard-length-of-string-3/test-cases.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type Deced = [10, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

export type Signum = Deced[number]

export type Reped<
  S extends string,
  C extends Signum,
  R extends string = '',
>
  = (C extends 0
    ? R
    : Reped<S, Deced[C], `${R}${S}`>
  )

export type Signums<
  N extends string,
  Acc extends readonly Signum[] = [],
> = N extends `${infer Head extends Signum}${infer Rest}`
  ? Signums<Rest, [...Acc, Head]>
  : Acc

export type t0 = 'k'

export type t1 = Reped<t0, 10>

export type t2 = Reped<t1, 10>

export type t3 = Reped<t2, 10>

export type t4 = Reped<t3, 10>

export type t5 = Reped<t4, 10>

export type t6 = Reped<t5, 10>

export type Gened<N extends string> = Signums<N> extends [
  infer N6 extends Signum,
  infer N5 extends Signum,
  infer N4 extends Signum,
  infer N3 extends Signum,
  infer N2 extends Signum,
  infer N1 extends Signum,
  infer N0 extends Signum,
] ? `${''
  }${Reped<t6, N6>
  }${Reped<t5, N5>
  }${Reped<t4, N4>
  }${Reped<t3, N3>
  }${Reped<t2, N2>
  }${Reped<t1, N1>
  }${Reped<t0, N0>
  }` : never
