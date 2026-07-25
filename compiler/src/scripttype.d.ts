/**
 * ScriptType ambient declarations.
 *
 * Purpose: make a `.st.ts` file typecheck as real TypeScript with ZERO errors
 * and no `ts-ignore` / `ts-expect-error`. ScriptType source is *reinterpreted*
 * TypeScript syntax; these declarations exist only so the stock checker accepts
 * it. Nothing here has runtime meaning.
 *
 * REQUIREMENTS ON THE CONSUMING tsconfig:
 *   - "lib" MUST NOT include DOM. The DOM lib declares globals named
 *     `length`, `name`, `origin`, `status`, `top`, `self`, `close`, `open`,
 *     `focus`, `print`, `scroll`, `parent`, `event`, `location` which collide
 *     with builtin names below (TS2451 / TS2403). Use e.g. "lib": ["ES2022"].
 *   - "noUnusedLocals" / "noUnusedParameters" are safe (verified), but see the
 *     report for the one caveat about unused *locals* in ScriptType source.
 *
 * DESIGN NOTES (all empirically verified — see report-probe.md):
 *   - Every type keyword is declared as a *value* of type `any`, never of its
 *     namesake type. `declare const boolean: boolean` breaks `boolean | 0 | 1`
 *     with TS2362 (bitwise `|` needs any/number/bigint/enum). `any` fixes it.
 *   - `null` / `void` / `undefined` CANNOT be declared (TS1389 / TS2397) and do
 *     not need to be: `null` and `undefined` are already legal expressions, and
 *     `void` has the `voidType()` builtin.
 *   - Every builtin returns `any` so its result is freely destructurable,
 *     indexable, callable, unionable and usable as a condition.
 *   - Every builtin is variadic (`...a: any[]`) so arity is never a *type*
 *     error; arity is the compiler's job (BUILTINS[].arity), not tsc's.
 *   - Each builtin is declared as BOTH a value and a type alias of the same
 *     name. TypeScript keeps separate declaration spaces, so this is legal
 *     (verified), and it lets a name be used in annotation position too.
 */

// ---------------------------------------------------------------------------
// Type keywords in expression position.
//
// SPEC: "bare type keywords are in scope as values".
// All are `any` on purpose (see design notes).
// ---------------------------------------------------------------------------

declare const any: any
declare const unknown: any
declare const never: any
declare const string: any
declare const number: any
declare const boolean: any
declare const object: any
declare const symbol: any
declare const bigint: any

/**
 * `{}` as an expression has type `{}`, so `out & {}` fails with TS2363. Use
 * `emptyObject` where the intersection-with-`{}` idiom is wanted:
 *   `defer(out & emptyObject)`   ->   `[O & {}] extends [unknown] ? ... `
 */
declare const emptyObject: any

/**
 * `null` cannot be an operand of `|` (TS18050) and `{}` cannot be an operand of `&`
 * (TS2362), so the union/intersection-friendly spellings are named.
 */
/**
 * Names a type directly. Used where the head of a type application has no callable value
 * form — `Promise<T>` cannot be written `Promise(T)`, because the global `Promise` value
 * is a constructor and requires `new`.
 */
declare function optElem(...a: any[]): any
type optElem = any
/** indexRecord(k, v) -> { [key: K]: V } */
declare function indexRecord(...a: any[]): any
type indexRecord = any
/** ctorType([A, B], R) -> new (a0: A, a1: B) => R */
declare function ctorType(...a: any[]): any
type ctorType = any
/** genericFnType(['T'], [A], R) -> <T>(a0: A) => R */
declare function genericFnType(...a: any[]): any
type genericFnType = any

/** t<T>() -> T  (names a type whose head has no usable value form, e.g. Promise) */
declare function t<T = any>(): any

/** anyOf(a, b, ...) -> A | B | ... */
declare function anyOf(...a: any[]): any
type anyOf = any

/** obj({ k: V }) -> { k: V }  (identity; exists so an object type can be an & operand) */
declare function obj<T>(o: T): any
type obj = any

declare const Null: any
declare const Undefined: any

// ---------------------------------------------------------------------------
// Builtins — String
// ---------------------------------------------------------------------------

/** startsWith(s, p) -> S extends `${P}${string}` */
declare function startsWith(...a: any[]): any
/** endsWith(s, p) -> S extends `${string}${P}` */
declare function endsWith(...a: any[]): any
/** includes(s, p) -> S extends `${string}${P}${string}` */
declare function includes(...a: any[]): any
/** splitOnce(s, sep) -> S extends `${infer A}${Sep}${infer B}` (first occurrence) */
declare function splitOnce(...a: any[]): any
/** splitLast(s, sep) -> prelude SplitLast<S, Sep> (last occurrence) */
declare function splitLast(...a: any[]): any
/** split(s, sep) -> prelude Split<S, Sep> */
declare function split(...a: any[]): any
/** removePrefix(s, p) -> S extends `${P}${infer R}` ? R : S */
declare function removePrefix(...a: any[]): any
/** removeSuffix(s, p) -> S extends `${infer R}${P}` ? R : S */
declare function removeSuffix(...a: any[]): any
/** upper(s) -> Uppercase<S> */
declare function upper(...a: any[]): any
/** lower(s) -> Lowercase<S> */
declare function lower(...a: any[]): any
/** capitalize(s) -> Capitalize<S> */
declare function capitalize(...a: any[]): any
/** uncapitalize(s) -> Uncapitalize<S> */
declare function uncapitalize(...a: any[]): any
/** concatStr(a, b) -> `${A}${B}` */
declare function concatStr(...a: any[]): any
/** trim(s) -> prelude Trim<S> */
declare function trim(...a: any[]): any
/** replaceAll(s, from, to) -> prelude ReplaceAll<S, From, To> */
declare function replaceAll(...a: any[]): any
/** strLength(s) -> prelude StrLength<S> */
declare function strLength(...a: any[]): any

type startsWith = any
type endsWith = any
type includes = any
type splitOnce = any
type splitLast = any
type split = any
type removePrefix = any
type removeSuffix = any
type upper = any
type lower = any
type capitalize = any
type uncapitalize = any
type concatStr = any
type trim = any
type replaceAll = any
type strLength = any

// ---------------------------------------------------------------------------
// Builtins — Tuple / array
// ---------------------------------------------------------------------------

/** concat(a, b) -> [...A, ...B] */
declare function concat(...a: any[]): any
/** append(t, x) -> [...T, X] */
declare function append(...a: any[]): any
/** prepend(t, x) -> [X, ...T] */
declare function prepend(...a: any[]): any
/** length(t) -> T['length'] */
declare function length(...a: any[]): any
/** at(t, i) -> T[I] */
declare function at(...a: any[]): any
/** isEmpty(t) -> T extends [] */
declare function isEmpty(...a: any[]): any
/** elementOf(t) -> T extends ReadonlyArray<infer I> ? I : never */
declare function elementOf(...a: any[]): any
/** arrayOf(t) -> T[] */
declare function arrayOf(...a: any[]): any
/** readonlyArrayOf(t) -> readonly T[] */
declare function readonlyArrayOf(...a: any[]): any
/** indexOfType(t) -> T[number] */
declare function indexOfType(...a: any[]): any
/** reverse(t) -> prelude Reverse<T> */
declare function reverse(...a: any[]): any
/** join(t, sep) -> prelude Join<T, Sep> */
declare function join(...a: any[]): any

type concat = any
type append = any
type prepend = any
type length = any
type at = any
type isEmpty = any
type elementOf = any
type arrayOf = any
type readonlyArrayOf = any
type indexOfType = any
type reverse = any
type join = any

// ---------------------------------------------------------------------------
// Builtins — Object
//
// `keyof` is a type-position-only keyword; as an identifier in value position
// it is unreserved, so `declare function keyof` is legal (verified).
// ---------------------------------------------------------------------------

/** keyof(o) -> keyof O */
declare function keyof(...a: any[]): any
/** get(o, k) -> O[K] */
declare function get(...a: any[]): any
/** pick(o, k) -> Pick<O, K> */
declare function pick(...a: any[]): any
/** omit(o, k) -> Omit<O, K> */
declare function omit(...a: any[]): any
/** merge(a, b, ...) -> A & B & ... */
declare function merge(...a: any[]): any
/** simplify(o) -> { [K in keyof O]: O[K] } & {} */
declare function simplify(...a: any[]): any
declare function entries(...a: any[]): any

type get = any
type pick = any
type omit = any
type merge = any
type simplify = any
type entries = any

// ---------------------------------------------------------------------------
// Builtins — Predicates
// ---------------------------------------------------------------------------

/** extendsType<P>(x) -> X extends P */
declare function extendsType<P = any>(...a: any[]): any
/** isSubtypeOf(a, b) -> A extends B  (both sides are values, unlike extendsType<P>) */
declare function isSubtypeOf(...a: any[]): any
/** isNever(x) -> [X] extends [never] */
declare function isNever(...a: any[]): any
/** isAny(x) -> 0 extends 1 & X */
declare function isAny(...a: any[]): any
/** equals(a, b) -> prelude Equals<A, B> */
declare function equals(...a: any[]): any

type isSubtypeOf = any
type isNever = any
type isAny = any
type equals = any

// ---------------------------------------------------------------------------
// Builtins — Meta
//
// `matches<P>` returns `any` (not `Record<string, any> | null`): the compiler
// binds each hole as a fresh *variable* in the then-branch, and `any` is what
// makes both `if (matches<P>(x))` and `if (!matches<P>(x))` well-typed while
// still allowing property access on the result.
//
// A pattern passed to `matches` MUST NOT contain `infer` — `infer` in a
// type-argument position is a SEMANTIC error, TS1338. Use `Hole<'Name'>`
// instead; see the `Hole` declaration below.
// ---------------------------------------------------------------------------

declare function matches<P = any>(...a: any[]): any
declare function keySet(...a: any[]): any
declare function orElse(...a: any[]): any
declare function optional(...a: any[]): any
declare function required(...a: any[]): any
declare function readonlyProp(...a: any[]): any
declare function mutable(...a: any[]): any
/** defer(x) -> [X] extends [unknown] ? X : never  (kysely DrainOuterGeneric) */
declare function defer(...a: any[]): any
/** fnType([A, B], R) -> (a0: A, a1: B) => R */
declare function fnType(...a: any[]): any
/** voidType() -> void  (`void` is a JS operator, so it needs a call form) */
declare function voidType(...a: any[]): any
/** error(m) -> ScriptTypeError<'m'> */
declare function error(...a: any[]): any
/** raw(`...`) -> verbatim type syntax (escape hatch) */
declare function raw(...a: any[]): any
/** asReadonly(t) -> readonly T */
declare function asReadonly(...a: any[]): any

type keySet = any
type orElse = any
type optional = any
type required = any
type readonlyProp = any
type mutable = any
type defer = any
type fnType = any
type voidType = any
type error = any
type raw = any
type asReadonly = any

/**
 * The `infer` replacement for `matches` patterns.
 *
 * `matches<[infer H, ...infer T]>(x)` is TS1338. Write
 * `matches<[Hole<'H'>, ...Hole<'T'>[]]>(x)` instead: `Hole<N>` resolves to
 * `any`, which is legal as a template-literal placeholder, as a tuple element,
 * and as a rest element (all verified). The compiler reads the `N` string
 * literal to recover the binding name and emits `infer H` / `infer T`.
 *
 * The bound names still have to reach value position somehow. Two options,
 * both zero-error:
 *   1. destructure (`const [h, ...t] = orElse(x, [])`) — what the corpus does;
 *   2. `hole('H')`, which is an ordinary call returning `any`.
 */
type Hole<N extends string = string, C = any> = any
declare function hole<N extends string = string>(name?: N): any

// ---------------------------------------------------------------------------
// Global type constructors used in CALL position.
//
// `Foo(a, b)` lowers to `Foo<A, B>`, so *any* type a ScriptType file applies
// must also exist as a value. TypeScript's own global types have no value
// counterpart, so declare them. (kysely/UnknownRow does `Record(string, unknown)`.)
//
// Declaring a value named `Record` alongside the global `Record<K, T>` type is
// legal — separate declaration spaces (verified).
//
// User-defined ScriptType functions called across files (`Prev(n)` in
// ts-pattern/Take) are NOT covered here; those need a real import or a
// per-corpus-entry declaration. See report-probe.md.
// ---------------------------------------------------------------------------

declare function Record(...a: any[]): any
declare function Partial(...a: any[]): any
declare function Required(...a: any[]): any
declare function Readonly(...a: any[]): any
declare function Pick(...a: any[]): any
declare function Omit(...a: any[]): any
declare function Exclude(...a: any[]): any
declare function Extract(...a: any[]): any
declare function NonNullable(...a: any[]): any
declare function Parameters(...a: any[]): any
declare function ConstructorParameters(...a: any[]): any
declare function ReturnType(...a: any[]): any
declare function InstanceType(...a: any[]): any
declare function ThisParameterType(...a: any[]): any
declare function OmitThisParameter(...a: any[]): any
declare function Awaited(...a: any[]): any
declare function Uppercase(...a: any[]): any
declare function Lowercase(...a: any[]): any
declare function Capitalize(...a: any[]): any
declare function Uncapitalize(...a: any[]): any
declare function ReadonlyArray(...a: any[]): any
// The readonly collection interfaces are type-only in lib.es5: unlike `Map` and `Set`
// there is no constructor value to fall back on, so without these a decompiled
// `ReadonlyMap<K, V>` is TS2693.
declare function ReadonlyMap(...a: any[]): any
declare function ReadonlySet(...a: any[]): any
declare function ScriptTypeError(...a: any[]): any
