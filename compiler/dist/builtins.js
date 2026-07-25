/**
 * Builtin library. Each builtin is *declared*, never implemented — it carries a
 * lowering rule from a JavaScript-looking call to native TypeScript type syntax.
 *
 * A builtin lowers to one of two things:
 *   - 'expr'  : a plain type expression (`upper(s)` -> `Uppercase<S>`)
 *   - 'match' : a test + inference pattern that the caller must weave into a
 *               conditional type (`splitOnce(s, '/')` -> `S extends `${infer A}/${infer B}``)
 */
import { cond, indexed, infer, kw, ref, str, template, tuple, intersection, union as unionOf, } from './ir.js';
const expr = (e) => ({ tag: 'expr', expr: e });
const ANY_STR = kw('string');
function def(b) {
    return b;
}
export const BUILTINS = {};
function register(...bs) {
    for (const b of bs)
        BUILTINS[b.name] = b;
}
// ---------------------------------------------------------------------------
// String
// ---------------------------------------------------------------------------
register(def({
    name: 'startsWith',
    arity: 2,
    doc: 'startsWith(s, p) -> S extends `${P}${string}`',
    lower: ([s, p]) => ({
        tag: 'match',
        check: s,
        ext: template(['', '', ''], [p, ANY_STR]),
        binds: [],
    }),
}), def({
    name: 'endsWith',
    arity: 2,
    doc: 'endsWith(s, p) -> S extends `${string}${P}`',
    lower: ([s, p]) => ({
        tag: 'match',
        check: s,
        ext: template(['', '', ''], [ANY_STR, p]),
        binds: [],
    }),
}), def({
    name: 'includes',
    arity: 2,
    doc: 'includes(s, p) -> S extends `${string}${P}${string}`',
    lower: ([s, p]) => ({
        tag: 'match',
        check: s,
        ext: template(['', '', '', ''], [ANY_STR, p, ANY_STR]),
        binds: [],
    }),
}), def({
    name: 'splitOnce',
    arity: 2,
    doc: 'splitOnce(s, sep) -> S extends `${infer A}${Sep}${infer B}` (first occurrence)',
    lower: ([s, sep], ctx) => {
        const a = ctx.fresh('Left');
        const b = ctx.fresh('Right');
        return {
            tag: 'match',
            check: s,
            ext: template(['', '', '', ''], [infer(a), sep, infer(b)]),
            binds: [a, b],
        };
    },
}), def({
    name: 'removePrefix',
    arity: 2,
    doc: 'removePrefix(s, p) -> S extends `${P}${infer R}` ? R : S',
    lower: ([s, p], ctx) => {
        const r = ctx.fresh('Rest');
        return expr(cond(s, template(['', '', ''], [p, infer(r)]), ref(r), s));
    },
}), def({
    name: 'removeSuffix',
    arity: 2,
    doc: 'removeSuffix(s, p) -> S extends `${infer R}${P}` ? R : S',
    lower: ([s, p], ctx) => {
        const r = ctx.fresh('Rest');
        return expr(cond(s, template(['', '', ''], [infer(r), p]), ref(r), s));
    },
}), def({
    name: 'upper',
    arity: 1,
    doc: 'upper(s) -> Uppercase<S>',
    lower: ([s]) => expr(ref('Uppercase', [s])),
}), def({
    name: 'lower',
    arity: 1,
    doc: 'lower(s) -> Lowercase<S>',
    lower: ([s]) => expr(ref('Lowercase', [s])),
}), def({
    name: 'capitalize',
    arity: 1,
    doc: 'capitalize(s) -> Capitalize<S>',
    lower: ([s]) => expr(ref('Capitalize', [s])),
}), def({
    name: 'uncapitalize',
    arity: 1,
    doc: 'uncapitalize(s) -> Uncapitalize<S>',
    lower: ([s]) => expr(ref('Uncapitalize', [s])),
}), def({
    name: 'concatStr',
    arity: 2,
    doc: 'concatStr(a, b) -> `${A}${B}`',
    lower: ([a, b]) => expr(template(['', '', ''], [a, b])),
}), def({
    name: 'trim',
    arity: 1,
    doc: 'trim(s) -> prelude Trim<S>',
    lower: ([s], ctx) => {
        ctx.usePrelude('Trim');
        return expr(ref('Trim', [s]));
    },
}), def({
    name: 'splitLast',
    arity: 2,
    doc: 'splitLast(s, sep) -> prelude SplitLast<S, Sep> (last occurrence)',
    lower: ([s, sep], ctx) => {
        ctx.usePrelude('SplitLast');
        return expr(ref('SplitLast', [s, sep]));
    },
}), def({
    name: 'split',
    arity: 2,
    doc: 'split(s, sep) -> prelude Split<S, Sep>',
    lower: ([s, sep], ctx) => {
        ctx.usePrelude('Split');
        return expr(ref('Split', [s, sep]));
    },
}), def({
    name: 'replaceAll',
    arity: 3,
    doc: 'replaceAll(s, from, to) -> prelude ReplaceAll<S, From, To>',
    lower: ([s, f, t], ctx) => {
        ctx.usePrelude('ReplaceAll');
        return expr(ref('ReplaceAll', [s, f, t]));
    },
}), def({
    name: 'strLength',
    arity: 1,
    doc: 'strLength(s) -> prelude StrLength<S>',
    lower: ([s], ctx) => {
        ctx.usePrelude('StrLength');
        return expr(ref('StrLength', [s]));
    },
}));
// ---------------------------------------------------------------------------
// Tuple / array
// ---------------------------------------------------------------------------
register(def({
    name: 'concat',
    arity: 2,
    doc: 'concat(a, b) -> [...A, ...B]',
    lower: ([a, b]) => expr(tuple([{ expr: a, spread: true }, { expr: b, spread: true }])),
}), def({
    name: 'append',
    arity: 2,
    doc: 'append(t, x) -> [...T, X]',
    lower: ([t, x]) => expr(tuple([{ expr: t, spread: true }, { expr: x }])),
}), def({
    name: 'prepend',
    arity: 2,
    doc: 'prepend(t, x) -> [X, ...T]',
    lower: ([t, x]) => expr(tuple([{ expr: x }, { expr: t, spread: true }])),
}), def({
    name: 'length',
    arity: 1,
    doc: "length(t) -> T['length']",
    lower: ([t]) => expr(indexed(t, str('length'))),
}), def({
    name: 'at',
    arity: 2,
    doc: 'at(t, i) -> T[I]',
    lower: ([t, i]) => expr(indexed(t, i)),
}), def({
    name: 'isEmpty',
    arity: 1,
    doc: 'isEmpty(t) -> T extends []',
    lower: ([t]) => ({ tag: 'match', check: t, ext: tuple([]), binds: [] }),
}), def({
    name: 'elementOf',
    arity: 1,
    doc: 'elementOf(t) -> T extends ReadonlyArray<infer I> ? I : never',
    lower: ([t], ctx) => {
        const i = ctx.fresh('Item');
        return expr(cond(t, ref('ReadonlyArray', [infer(i)]), ref(i), kw('never')));
    },
}), def({
    name: 'arrayOf',
    arity: 1,
    doc: 'arrayOf(t) -> T[]',
    lower: ([t]) => expr({ kind: 'array', element: t }),
}), def({
    name: 'readonlyArrayOf',
    arity: 1,
    doc: 'readonlyArrayOf(t) -> readonly T[]',
    lower: ([t]) => expr({ kind: 'array', element: t, readonly: true }),
}), def({
    name: 'indexOfType',
    arity: 1,
    doc: 'indexOfType(t) -> T[number]',
    lower: ([t]) => expr(indexed(t, kw('number'))),
}), def({
    name: 'reverse',
    arity: 1,
    doc: 'reverse(t) -> prelude Reverse<T>',
    lower: ([t], ctx) => {
        ctx.usePrelude('Reverse');
        return expr(ref('Reverse', [t]));
    },
}), def({
    name: 'join',
    arity: 2,
    doc: 'join(t, sep) -> prelude Join<T, Sep>',
    lower: ([t, sep], ctx) => {
        ctx.usePrelude('Join');
        return expr(ref('Join', [t, sep]));
    },
}));
// ---------------------------------------------------------------------------
// Object
// ---------------------------------------------------------------------------
register(def({
    name: 'keyof',
    arity: 1,
    doc: 'keyof(o) -> keyof O',
    lower: ([o]) => expr({ kind: 'op', op: 'keyof', target: o }),
}), def({
    name: 'get',
    arity: 2,
    doc: 'get(o, k) -> O[K]',
    lower: ([o, k]) => expr(indexed(o, k)),
}), def({
    name: 'pick',
    arity: 2,
    doc: 'pick(o, k) -> Pick<O, K>',
    lower: ([o, k]) => expr(ref('Pick', [o, k])),
}), def({
    name: 'omit',
    arity: 2,
    doc: 'omit(o, k) -> Omit<O, K>',
    lower: ([o, k]) => expr(ref('Omit', [o, k])),
}), def({
    name: 'merge',
    arity: [2, 16],
    doc: 'merge(a, b, ...) -> A & B & ...',
    lower: (args) => expr(intersection(args.map((a) => a))),
}), def({
    name: 'anyOf',
    arity: [2, 32],
    doc: 'anyOf(a, b, ...) -> A | B | ...',
    lower: (args) => expr(unionOf(args.map((a) => a))),
}), def({
    name: 't',
    arity: 0,
    doc: 't<T>() -> T  (names a type whose head has no usable value form, e.g. Promise)',
    lower: (_args, ctx) => {
        const T = ctx.typeArgs[0];
        if (!T)
            throw new Error('t<T>() requires a type argument');
        return expr(T);
    },
}), def({
    name: 'obj',
    arity: 1,
    doc: 'obj({ k: V }) -> { k: V }  (identity; exists so an object type can be an & operand)',
    lower: ([o]) => expr(o),
}), def({
    name: 'simplify',
    arity: 1,
    doc: 'simplify(o) -> { [K in keyof O]: O[K] } & {}',
    lower: ([o], ctx) => {
        ctx.usePrelude('Simplify');
        return expr(ref('Simplify', [o]));
    },
}));
// ---------------------------------------------------------------------------
// Predicates & meta
// ---------------------------------------------------------------------------
register(def({
    name: 'extendsType',
    arity: 1,
    doc: 'extendsType<P>(x) -> X extends P',
    lower: ([x], ctx) => {
        const p = ctx.typeArgs[0];
        if (!p)
            throw new Error('extendsType<P>(x) requires an explicit type argument P');
        return { tag: 'match', check: x, ext: p, binds: [] };
    },
}), def({
    name: 'isSubtypeOf',
    arity: 2,
    doc: 'isSubtypeOf(a, b) -> A extends B  (both sides are values, unlike extendsType<P>)',
    lower: ([a, b]) => ({ tag: 'match', check: a, ext: b, binds: [] }),
}), def({
    name: 'isNever',
    arity: 1,
    doc: 'isNever(x) -> [X] extends [never]',
    lower: ([x]) => ({
        tag: 'match',
        check: tuple([{ expr: x }]),
        ext: tuple([{ expr: kw('never') }]),
        binds: [],
    }),
}), def({
    name: 'isAny',
    arity: 1,
    doc: 'isAny(x) -> 0 extends 1 & X',
    lower: ([x]) => ({
        tag: 'match',
        check: { kind: 'lit', value: 0 },
        ext: intersection([{ kind: 'lit', value: 1 }, x]),
        binds: [],
    }),
}), def({
    name: 'equals',
    arity: 2,
    doc: 'equals(a, b) -> prelude Equals<A, B>',
    lower: ([a, b], ctx) => {
        ctx.usePrelude('Equals');
        return expr(ref('Equals', [a, b]));
    },
}), def({
    name: 'error',
    arity: 1,
    doc: "error(m) -> ScriptTypeError<'m'>",
    lower: ([m], ctx) => {
        ctx.usePrelude('ScriptTypeError');
        return expr(ref('ScriptTypeError', [m]));
    },
}), def({
    name: 'voidType',
    arity: 0,
    doc: 'voidType() -> void  (`void` is a JS operator, so it needs a call form)',
    lower: () => expr(kw('void')),
}), def({
    name: 'fnType',
    arity: 2,
    doc: 'fnType([A, B], R) -> (a0: A, a1: B) => R',
    lower: ([params, ret]) => {
        if (params.kind !== 'tuple')
            throw new Error('fnType(params, ret) needs a tuple of parameter types');
        return expr({ kind: 'fn', params: params.elements.map((e) => e.expr), ret: ret });
    },
}), def({
    name: 'indexRecord',
    arity: 2,
    doc: 'indexRecord(k, v) -> { [key: K]: V }',
    lower: ([k, v]) => expr({ kind: 'object', props: [], index: { key: k, value: v } }),
}), def({
    name: 'ctorType',
    arity: 2,
    doc: 'ctorType([A, B], R) -> new (a0: A, a1: B) => R',
    lower: ([params, ret]) => {
        if (params.kind !== 'tuple')
            throw new Error('ctorType(params, ret) needs a tuple');
        return expr({ kind: 'fn', params: params.elements.map((e) => e.expr), ret: ret, isCtor: true });
    },
}), def({
    name: 'genericFnType',
    arity: 3,
    doc: "genericFnType(['T'], [A], R) -> <T>(a0: A) => R",
    lower: ([tps, params, ret]) => {
        if (tps.kind !== 'tuple' || params.kind !== 'tuple') {
            throw new Error('genericFnType(typeParams, params, ret) needs two tuples');
        }
        const names = tps.elements.map((e) => {
            const x = e.expr;
            if (x.kind === 'lit' && x.str)
                return String(x.value);
            if (x.kind === 'raw')
                return x.text;
            throw new Error('genericFnType type parameters must be string literals');
        });
        return expr({
            kind: 'fn',
            params: params.elements.map((e) => e.expr),
            ret: ret,
            typeParams: names,
        });
    },
}), def({
    name: 'asReadonly',
    arity: 1,
    doc: 'asReadonly(t) -> readonly T',
    lower: ([t]) => expr({ kind: 'op', op: 'readonly', target: t }),
}), def({
    name: 'raw',
    arity: 1,
    doc: 'raw(`...`) -> verbatim type syntax (escape hatch)',
    lower: ([t]) => {
        if (t.kind !== 'lit' || !t.str)
            throw new Error('raw() requires a literal string');
        return expr({ kind: 'raw', text: String(t.value) });
    },
}), def({
    name: 'defer',
    arity: 1,
    doc: 'defer(x) -> [X] extends [unknown] ? X : never  (kysely DrainOuterGeneric)',
    lower: ([x]) => expr(cond(tuple([{ expr: x }]), tuple([{ expr: kw('unknown') }]), x, kw('never'))),
}));
/** Builtins usable as an `if` condition (they lower to 'match'). */
export const isPredicate = (name) => [
    'startsWith',
    'endsWith',
    'includes',
    'extendsType',
    'isSubtypeOf',
    'isNever',
    'isAny',
    'isEmpty',
    'splitOnce',
].includes(name);
/**
 * Two patterns are "guard-equivalent" when replacing every `infer X` with its
 * constraint (or a wildcard) makes them structurally identical. Used to fuse a
 * loop guard with the destructure that immediately follows it, so that
 *   `while (includes(r, s)) { const [h, t] = splitOnce(r, s) ... }`
 * emits one conditional rather than two nested ones.
 */
export function guardEquivalent(guard, inferring) {
    // The wildcard an unconstrained `infer` stands for is position-dependent: a
    // template-literal placeholder is implicitly string-constrained, so `infer X`
    // there means `string`, not `unknown`.
    const strip = (e, inTemplate) => {
        if (e.kind === 'infer')
            return e.constraint ?? (inTemplate ? kw('string') : kw('unknown'));
        return e;
    };
    const norm = (e) => JSON.stringify(walk(e, false));
    function walk(e, inTemplate) {
        const s = strip(e, inTemplate);
        switch (s.kind) {
            case 'template':
                return { t: 'tpl', q: s.quasis, e: s.exprs.map((x) => walk(x, true)) };
            case 'tuple':
                return { t: 'tup', e: s.elements.map((x) => ({ s: !!x.spread, v: walk(x.expr, false) })) };
            case 'keyword':
                return { t: 'kw', n: s.name };
            case 'ref':
                return { t: 'ref', n: s.name, a: (s.args ?? []).map((x) => walk(x, false)) };
            case 'lit':
                return { t: 'lit', v: s.value, s: s.str };
            case 'array':
                return { t: 'arr', e: walk(s.element, false) };
            default:
                return { t: s.kind, j: JSON.stringify(s) };
        }
    }
    return norm(guard) === norm(inferring);
}
