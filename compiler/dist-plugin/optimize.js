"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fuseGuards = fuseGuards;
exports.pruneUnusedInfers = pruneUnusedInfers;
exports.optimize = optimize;
/**
 * Peephole passes over the lowered IR. These exist for output *quality*: the
 * unoptimised form is already semantically correct, but it does not resemble
 * hand-written TypeScript, and resembling it is the project's whole point.
 */
const ir_js_1 = require("./ir.js");
const builtins_js_1 = require("./builtins.js");
/**
 * Guard/destructure fusion.
 *
 *   C extends Guard ? (C extends Pattern ? T : never) : E
 *   -->  C extends Pattern ? T : E
 *
 * Sound when `Guard` and `Pattern` match exactly the same set of types — which is
 * what `guardEquivalent` establishes, by checking they are identical once each
 * `infer X` is replaced by the wildcard it stands for. The inner `never` is then
 * unreachable, so folding discards nothing.
 *
 * This is why `if (includes(s, ' as ')) { const [, a] = splitOnce(s, ' as ') ... }`
 * compiles to a single conditional rather than two nested ones.
 */
function fuseGuards(e) {
    const rec = fuseGuards;
    if (e.kind !== 'conditional')
        return mapChildren(e, rec);
    const outer = { ...e, check: rec(e.check), then: rec(e.then), else: rec(e.else) };
    const inner = outer.then;
    if (inner.kind === 'conditional' &&
        (0, ir_js_1.emit)(inner.check) === (0, ir_js_1.emit)(outer.check) &&
        inner.else.kind === 'keyword' &&
        inner.else.name === 'never' &&
        (0, builtins_js_1.guardEquivalent)(outer.ext, inner.ext)) {
        return fuseGuards({
            kind: 'conditional',
            check: outer.check,
            ext: inner.ext,
            then: inner.then,
            else: outer.else,
        });
    }
    return outer;
}
/**
 * Replace `infer X` bindings that the true-branch never reads with the wildcard
 * they stand for, so `const [, alias] = splitOnce(se, ' as ')` emits
 * `` `${string} as ${infer Alias}` `` rather than
 * `` `${infer Left} as ${infer Alias}` ``.
 *
 * The wildcard depends on position: `string` inside a template literal (where a
 * placeholder is implicitly string-constrained), `unknown[]` for a tuple rest
 * element, and `unknown` otherwise.
 */
function pruneUnusedInfers(e) {
    if (e.kind === 'conditional') {
        const then = pruneUnusedInfers(e.then);
        const ext = replaceUnused(e.ext, then, false);
        return {
            kind: 'conditional',
            check: pruneUnusedInfers(e.check),
            ext,
            then,
            else: pruneUnusedInfers(e.else),
        };
    }
    return mapChildren(e, pruneUnusedInfers);
}
function replaceUnused(ext, then, inTemplate) {
    switch (ext.kind) {
        case 'infer': {
            if ((0, ir_js_1.countRefs)(then, ext.name) > 0)
                return ext;
            return ext.constraint ?? (inTemplate ? (0, ir_js_1.kw)('string') : (0, ir_js_1.kw)('unknown'));
        }
        case 'template':
            return { ...ext, exprs: ext.exprs.map((x) => replaceUnused(x, then, true)) };
        case 'tuple':
            return {
                ...ext,
                elements: ext.elements.map((el) => {
                    const replaced = replaceUnused(el.expr, then, false);
                    // A pruned rest element needs an array type, not a bare `unknown`.
                    if (el.spread && el.expr.kind === 'infer' && replaced !== el.expr) {
                        return { ...el, expr: { kind: 'array', element: replaced } };
                    }
                    return { ...el, expr: replaced };
                }),
            };
        case 'union':
            return { ...ext, members: ext.members.map((m) => replaceUnused(m, then, inTemplate)) };
        case 'intersection':
            return { ...ext, members: ext.members.map((m) => replaceUnused(m, then, inTemplate)) };
        case 'ref':
            return ext.args ? { ...ext, args: ext.args.map((a) => replaceUnused(a, then, inTemplate)) } : ext;
        case 'object':
            return { ...ext, props: ext.props.map((p) => ({ ...p, value: replaceUnused(p.value, then, false) })) };
        case 'array':
            return { ...ext, element: replaceUnused(ext.element, then, false) };
        default:
            return ext;
    }
}
/** Structure-preserving map over immediate children. */
function mapChildren(e, f) {
    switch (e.kind) {
        case 'ref':
            return e.args ? { ...e, args: e.args.map(f) } : e;
        case 'union':
            return { ...e, members: e.members.map(f) };
        case 'intersection':
            return { ...e, members: e.members.map(f) };
        case 'tuple':
            return { ...e, elements: e.elements.map((el) => ({ ...el, expr: f(el.expr) })) };
        case 'array':
            return { ...e, element: f(e.element) };
        case 'object':
            return {
                ...e,
                props: e.props.map((p) => ({ ...p, value: f(p.value) })),
                index: e.index ? { key: f(e.index.key), value: f(e.index.value) } : undefined,
            };
        case 'template':
            return { ...e, exprs: e.exprs.map(f) };
        case 'indexed':
            return { ...e, obj: f(e.obj), index: f(e.index) };
        case 'conditional':
            return { ...e, check: f(e.check), ext: f(e.ext), then: f(e.then), else: f(e.else) };
        case 'infer':
            return e.constraint ? { ...e, constraint: f(e.constraint) } : e;
        case 'mapped':
            return { ...e, constraint: f(e.constraint), value: f(e.value), as: e.as ? f(e.as) : undefined };
        case 'op':
            return { ...e, target: f(e.target) };
        case 'fn':
            return { ...e, params: e.params.map(f), ret: f(e.ret) };
        case 'paren':
            return { ...e, inner: f(e.inner) };
        default:
            return e;
    }
}
function optimize(e) {
    return pruneUnusedInfers(fuseGuards(e));
}
