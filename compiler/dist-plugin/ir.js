"use strict";
/**
 * ScriptType intermediate representation: the *output* side of the compiler.
 *
 * A TypeExpr is a TypeScript type-level expression tree. The lowering pass turns
 * imperative statements into one of these; the emitter turns it into source text.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_ATOM = exports.P_POSTFIX = exports.P_PREFIX = exports.P_INTER = exports.P_UNION = exports.P_COND = exports.cond = exports.raw = exports.indexed = exports.infer = exports.tuple = exports.UNKNOWN = exports.NEVER = exports.bool = exports.num = exports.str = exports.kw = exports.ref = void 0;
exports.union = union;
exports.intersection = intersection;
exports.template = template;
exports.precedenceOf = precedenceOf;
exports.emitFnParam = emitFnParam;
exports.emit = emit;
exports.emitAlias = emitAlias;
exports.mapExpr = mapExpr;
exports.substitute = substitute;
exports.countRefs = countRefs;
// ---------------------------------------------------------------------------
// Constructors
// ---------------------------------------------------------------------------
const ref = (name, args) => args && args.length ? { kind: 'ref', name, args } : { kind: 'ref', name };
exports.ref = ref;
const kw = (name) => ({ kind: 'keyword', name });
exports.kw = kw;
const str = (value) => ({ kind: 'lit', value, str: true });
exports.str = str;
const num = (value) => ({ kind: 'lit', value });
exports.num = num;
const bool = (value) => ({ kind: 'lit', value });
exports.bool = bool;
exports.NEVER = (0, exports.kw)('never');
exports.UNKNOWN = (0, exports.kw)('unknown');
const tuple = (elements) => ({ kind: 'tuple', elements });
exports.tuple = tuple;
const infer = (name, constraint) => constraint ? { kind: 'infer', name, constraint } : { kind: 'infer', name };
exports.infer = infer;
const indexed = (obj, index) => ({ kind: 'indexed', obj, index });
exports.indexed = indexed;
const raw = (text) => ({ kind: 'raw', text });
exports.raw = raw;
const cond = (check, ext, then, els) => ({
    kind: 'conditional',
    check,
    ext,
    then,
    else: els,
});
exports.cond = cond;
function union(members) {
    const flat = [];
    for (const m of members) {
        if (m.kind === 'union')
            flat.push(...m.members);
        else if (m.kind === 'keyword' && m.name === 'never')
            continue; // never is the union identity
        else
            flat.push(m);
    }
    if (flat.length === 0)
        return exports.NEVER;
    if (flat.length === 1)
        return flat[0];
    // Deduplicate structurally identical members.
    const seen = new Map();
    for (const m of flat)
        seen.set(emit(m), m);
    const uniq = [...seen.values()];
    return uniq.length === 1 ? uniq[0] : { kind: 'union', members: uniq };
}
function intersection(members) {
    const flat = [];
    for (const m of members) {
        if (m.kind === 'intersection')
            flat.push(...m.members);
        else
            flat.push(m);
    }
    if (flat.length === 0)
        return exports.UNKNOWN;
    return flat.length === 1 ? flat[0] : { kind: 'intersection', members: flat };
}
/**
 * Build a template literal type, folding adjacent literal parts.
 * `${'a'}${'b'}c` collapses to the string literal `'abc'`.
 */
function template(quasis, exprs) {
    const q = [quasis[0] ?? ''];
    const e = [];
    for (let i = 0; i < exprs.length; i++) {
        const x = exprs[i];
        const next = quasis[i + 1] ?? '';
        if (x.kind === 'lit' && x.str) {
            q[q.length - 1] += String(x.value) + next;
        }
        else if (x.kind === 'template') {
            // Splice a nested template inline.
            q[q.length - 1] += x.quasis[0] ?? '';
            for (let j = 0; j < x.exprs.length; j++) {
                e.push(x.exprs[j]);
                q.push(x.quasis[j + 1] ?? '');
            }
            q[q.length - 1] += next;
        }
        else {
            e.push(x);
            q.push(next);
        }
    }
    if (e.length === 0)
        return (0, exports.str)(q[0]);
    return { kind: 'template', quasis: q, exprs: e };
}
// ---------------------------------------------------------------------------
// Emitter
// ---------------------------------------------------------------------------
// Precedence: higher binds tighter.
exports.P_COND = 1;
exports.P_UNION = 2;
exports.P_INTER = 3;
exports.P_PREFIX = 4;
exports.P_POSTFIX = 5;
exports.P_ATOM = 6;
/** Binding strength of a type expression, so the printer can parenthesise. */
function precedenceOf(e) {
    switch (e.kind) {
        case 'conditional':
        case 'fn':
            return exports.P_COND;
        case 'union':
            return exports.P_UNION;
        case 'intersection':
            return exports.P_INTER;
        case 'op':
            return exports.P_PREFIX;
        case 'infer':
            return e.constraint ? exports.P_COND : exports.P_PREFIX;
        case 'indexed':
        case 'array':
            return exports.P_POSTFIX;
        default:
            return exports.P_ATOM;
    }
}
const quote = (s) => `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
/** Escape a literal chunk for inclusion in a template literal type. */
const escapeQuasi = (s) => s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
const IDENT_RE = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
/**
 * One parameter of a function type. Parameter names are synthesised (`a0`, `a1`) —
 * a type-level function type has no meaningful names — and only the final one may be
 * a rest parameter.
 */
function emitFnParam(fn, p, i) {
    const rest = fn.hasRest && i === fn.params.length - 1 ? '...' : '';
    // Optionality is part of the type: `(a?: T) => R` and `(a: T) => R` differ, so dropping
    // the marker would make an otherwise correct translation fail equivalence.
    const opt = fn.optionalAt?.includes(i) ? '?' : '';
    return `${rest}a${i}${opt}: ${emit(p)}`;
}
function emit(e, minPrec = 0) {
    const text = emitInner(e);
    return precedenceOf(e) < minPrec ? `(${text})` : text;
}
function emitInner(e) {
    switch (e.kind) {
        case 'ref':
            return e.args?.length ? `${e.name}<${e.args.map((a) => emit(a)).join(', ')}>` : e.name;
        case 'keyword':
            return e.name;
        case 'lit':
            return e.str ? quote(String(e.value)) : String(e.value);
        case 'union':
            return e.members.map((m) => emit(m, exports.P_UNION + 1)).join(' | ');
        case 'intersection':
            return e.members.map((m) => emit(m, exports.P_INTER + 1)).join(' & ');
        case 'tuple': {
            const parts = e.elements.map((el) => {
                // Spread needs an array-ish operand, so bind tighter than union/intersection.
                // An `infer X` is exempt, constrained or not: the tuple's `,` or `]` already
                // terminates the constraint, so `...infer T extends string[]` parses, and the
                // parentheses would only be noise.
                const inner = emit(el.expr, el.spread && el.expr.kind !== 'infer' ? exports.P_PREFIX : 0);
                const named = el.name ? `${el.name}${el.optional ? '?' : ''}: ` : '';
                if (el.spread)
                    return `...${named}${inner}`;
                return `${named}${inner}${el.optional && !el.name ? '?' : ''}`;
            });
            return `[${parts.join(', ')}]`;
        }
        case 'array': {
            const inner = emit(e.element, exports.P_POSTFIX);
            return `${e.readonly ? 'readonly ' : ''}${inner}[]`;
        }
        case 'object': {
            const props = e.props.map((p) => {
                const key = p.computed || IDENT_RE.test(p.name) ? p.name : quote(p.name);
                return `${p.readonly ? 'readonly ' : ''}${key}${p.optional ? '?' : ''}: ${emit(p.value)}`;
            });
            if (e.index)
                props.unshift(`[key: ${emit(e.index.key)}]: ${emit(e.index.value)}`);
            return props.length ? `{ ${props.join('; ')} }` : '{}';
        }
        case 'template': {
            let out = '`' + escapeQuasi(e.quasis[0] ?? '');
            for (let i = 0; i < e.exprs.length; i++) {
                out += '${' + emit(e.exprs[i]) + '}' + escapeQuasi(e.quasis[i + 1] ?? '');
            }
            return out + '`';
        }
        case 'indexed':
            return `${emit(e.obj, exports.P_POSTFIX)}[${emit(e.index)}]`;
        case 'conditional':
            return `${emit(e.check, exports.P_COND + 1)} extends ${emit(e.ext, exports.P_COND + 1)} ? ${emit(e.then)} : ${emit(e.else)}`;
        case 'infer':
            return e.constraint ? `infer ${e.name} extends ${emit(e.constraint, exports.P_COND + 1)}` : `infer ${e.name}`;
        case 'mapped': {
            const ro = e.readonly === true ? 'readonly ' : e.readonly === '+' ? '+readonly ' : e.readonly === '-' ? '-readonly ' : '';
            const opt = e.optional === true ? '?' : e.optional === '+' ? '+?' : e.optional === '-' ? '-?' : '';
            const as = e.as ? ` as ${emit(e.as)}` : '';
            return `{ ${ro}[${e.param} in ${emit(e.constraint)}${as}]${opt}: ${emit(e.value)} }`;
        }
        case 'op':
            return `${e.op} ${emit(e.target, exports.P_PREFIX + 1)}`;
        case 'paren':
            return `(${emit(e.inner)})`;
        case 'fn': {
            const tp = e.typeParams?.length ? `<${e.typeParams.join(', ')}>` : '';
            const args = e.params.map((p, i) => emitFnParam(e, p, i)).join(', ');
            return `${e.isCtor ? 'new ' : ''}${tp}(${args}) => ${emit(e.ret)}`;
        }
        case 'raw':
            return e.text;
    }
}
function emitAlias(a) {
    const params = a.params.length
        ? `<${a.params
            .map((p) => {
            const v = p.variance ? `${p.variance} ` : '';
            const c = p.isConst ? 'const ' : '';
            const con = p.constraint ? ` extends ${emit(p.constraint)}` : '';
            const def = p.default ? ` = ${emit(p.default)}` : '';
            return `${c}${v}${p.name}${con}${def}`;
        })
            .join(', ')}>`
        : '';
    const doc = a.doc ? `/**\n * ${a.doc.split('\n').join('\n * ')}\n */\n` : '';
    return `${doc}${a.exported ? 'export ' : ''}type ${a.name}${params} = ${emit(a.body)}`;
}
/** Rewrite every `ref` node matching `name` using `fn`. Used by the inliner. */
function mapExpr(e, fn) {
    const replaced = fn(e);
    if (replaced)
        return replaced;
    const rec = (x) => mapExpr(x, fn);
    switch (e.kind) {
        case 'ref':
            return e.args ? { ...e, args: e.args.map(rec) } : e;
        case 'union':
            return { ...e, members: e.members.map(rec) };
        case 'intersection':
            return { ...e, members: e.members.map(rec) };
        case 'tuple':
            return { ...e, elements: e.elements.map((el) => ({ ...el, expr: rec(el.expr) })) };
        case 'array':
            return { ...e, element: rec(e.element) };
        case 'object':
            return {
                ...e,
                props: e.props.map((p) => ({ ...p, value: rec(p.value) })),
                index: e.index ? { key: rec(e.index.key), value: rec(e.index.value) } : undefined,
            };
        case 'template':
            return { ...e, exprs: e.exprs.map(rec) };
        case 'indexed':
            return { ...e, obj: rec(e.obj), index: rec(e.index) };
        case 'conditional':
            return { ...e, check: rec(e.check), ext: rec(e.ext), then: rec(e.then), else: rec(e.else) };
        case 'infer':
            return e.constraint ? { ...e, constraint: rec(e.constraint) } : e;
        case 'mapped':
            return { ...e, constraint: rec(e.constraint), value: rec(e.value), as: e.as ? rec(e.as) : undefined };
        case 'op':
            return { ...e, target: rec(e.target) };
        case 'fn':
            return { ...e, params: e.params.map(rec), ret: rec(e.ret) };
        case 'paren':
            return { ...e, inner: rec(e.inner) };
        default:
            return e;
    }
}
/** Substitute type-parameter references by name. */
function substitute(e, subs) {
    return mapExpr(e, (x) => (x.kind === 'ref' && !x.args && subs.has(x.name) ? subs.get(x.name) : undefined));
}
function countRefs(e, name) {
    let n = 0;
    mapExpr(e, (x) => {
        if (x.kind === 'ref' && x.name === name)
            n++;
        return undefined;
    });
    return n;
}
