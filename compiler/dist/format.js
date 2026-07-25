/**
 * Width-aware pretty printing for emitted TypeScript.
 *
 * The compiled `.ts` is an artifact people read, review and commit, so emitting a
 * 700-character single line is a real cost — the kysely six-branch selector was exactly
 * that before this existed.
 *
 * The algorithm is the usual one: try the flat form, and if it does not fit in the
 * remaining width, break according to the node kind and recurse. `emit()` in ir.ts stays
 * the flat printer and is still what the compiler uses internally (structural dedup keys,
 * precedence); this module only affects the final declaration text.
 *
 * ONE DELIBERATE DEPARTURE from conventional nesting. A *chain* of conditionals prints as
 * a flat cascade, with every guard in the same column:
 *
 *     SE extends P1 ? X1
 *     : SE extends P2 ? X2
 *     : never
 *
 * rather than indenting each `else` one level deeper. Indenting reproduces the pyramid
 * ScriptType exists to remove: the kysely selector reaches twelve levels, and its last
 * branch — the one a reader most often wants — ends up furthest right. A *single*
 * decision is not a chain and takes the conventional `? … : …` shape, and a conditional
 * nested in a `then` branch still indents, because that is a genuinely subordinate
 * decision rather than another link in the chain.
 */
import { emit, emitFnParam, precedenceOf, P_COND, P_INTER, P_POSTFIX, P_PREFIX, P_UNION, } from './ir.js';
const DEFAULT_WIDTH = 96;
const IDENT_RE = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
const quote = (s) => `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
const sp = (n) => ' '.repeat(Math.max(0, n));
/** Kinds whose broken form opens with a bracket, which stays on the `=` line. */
const BRACKETED = new Set(['object', 'mapped', 'tuple', 'ref']);
/** Render a declaration, wrapping where it does not fit. */
export function formatAlias(a, opts = {}) {
    const width = opts.width ?? DEFAULT_WIDTH;
    const step = opts.indent ?? 2;
    const doc = a.doc ? `/**\n * ${a.doc.split('\n').join('\n * ')}\n */\n` : '';
    const head = `${a.exported ? 'export ' : ''}type ${a.name}`;
    const paramsFlat = a.params.length ? `<${a.params.map(emitParam).join(', ')}>` : '';
    // Try the whole declaration on one line first: most aliases are short, and keeping
    // them that way matters as much as wrapping the long ones.
    const flat = `${head}${paramsFlat} = ${emit(a.body)}`;
    if (flat.length <= width && !flat.includes('\n'))
        return doc + flat;
    // Break the parameter list only if it is itself the problem.
    const params = paramsFlat && head.length + paramsFlat.length + 3 > width
        ? `<\n${a.params.map((p) => sp(step) + emitParam(p)).join(',\n')}\n>`
        : paramsFlat;
    const prefix = `${head}${params} = `;
    if (!params.includes('\n')) {
        const inline = fmt(a.body, prefix.length, 0, 0, width, step);
        if (!inline.includes('\n'))
            return doc + prefix + inline;
        // A body that opens with a bracket keeps that bracket on the `=` line, the way it
        // would be written by hand: `type T = {` reads better than `type T =` then `{`.
        if (BRACKETED.has(a.body.kind))
            return doc + prefix + fmt(a.body, prefix.length, 0, 0, width, step);
    }
    // Otherwise the body moves to its own line, indented one step, with the full width.
    return doc + `${head}${params} =\n` + sp(step) + fmt(a.body, step, step, 0, width, step);
}
function emitParam(p) {
    const v = p.variance ? `${p.variance} ` : '';
    const c = p.isConst ? 'const ' : '';
    const con = p.constraint ? ` extends ${emit(p.constraint)}` : '';
    const def = p.default ? ` = ${emit(p.default)}` : '';
    return `${c}${v}${p.name}${con}${def}`;
}
/**
 * Format `e`, parenthesising if its precedence is below `minPrec`.
 *
 * Two columns matter and they are not always the same, which is the whole subtlety of
 * the layout:
 *
 *   `start`   where the first character lands, used only to decide whether it fits;
 *   `anchor`  what continuation lines indent relative to.
 *
 * They differ whenever a caller has already written a prefix on the line. After
 * `? `, the child's text starts two columns right of the `?`, but its own broken lines
 * should indent from the `?`, not from the text — otherwise every nesting level drifts
 * an extra two columns right.
 *
 * The returned text has no indentation on its first line (the caller has already
 * positioned it); every later line carries absolute indentation.
 */
function fmt(e, start, anchor, minPrec, width, step) {
    if (precedenceOf(e) < minPrec) {
        const inner = fmt(e, start + 1, anchor + step, 0, width, step);
        return inner.includes('\n') ? `(\n${sp(anchor + step)}${inner}\n${sp(anchor)})` : `(${inner})`;
    }
    const flat = emit(e, minPrec);
    if (start + flat.length <= width)
        return flat;
    const pad = sp(anchor);
    const body = anchor + step; // where a broken child's lines live
    const bodyPad = sp(body);
    switch (e.kind) {
        case 'conditional': {
            // Flatten the else-chain so every guard can share a column.
            const arms = [];
            let cur = e;
            while (cur.kind === 'conditional') {
                arms.push({ check: cur.check, ext: cur.ext, then: cur.then });
                cur = cur.else;
            }
            const tail = cur;
            const guardOf = (a) => `${emit(a.check, P_COND + 1)} extends ${emit(a.ext, P_COND + 1)}`;
            // `?` and `:` sit one step in from the anchor; their operands hang off them.
            const q = body;
            const qPad = sp(q);
            const branch = (x) => fmt(x, q + 2, q, 0, width, step);
            if (arms.length === 1) {
                const a = arms[0];
                return `${guardOf(a)}\n${qPad}? ${branch(a.then)}\n${qPad}: ${branch(tail)}`;
            }
            const lines = [];
            arms.forEach((a, i) => {
                const guard = `${i === 0 ? '' : ': '}${guardOf(a)}`;
                const thenFlat = emit(a.then);
                if (anchor + guard.length + 3 + thenFlat.length <= width) {
                    lines.push(`${guard} ? ${thenFlat}`);
                }
                else {
                    lines.push(guard, `${sp(step)}? ${branch(a.then)}`);
                }
            });
            const tailFlat = emit(tail);
            lines.push(anchor + 2 + tailFlat.length <= width
                ? `: ${tailFlat}`
                : `: ${fmt(tail, anchor + 2, anchor, 0, width, step)}`);
            return lines.join(`\n${pad}`);
        }
        case 'union':
        case 'intersection': {
            const sep = e.kind === 'union' ? '|' : '&';
            const prec = (e.kind === 'union' ? P_UNION : P_INTER) + 1;
            return e.members
                .map((m) => `${sep} ${fmt(m, anchor + 2, anchor + 2, prec, width, step)}`)
                .join(`\n${pad}`);
        }
        case 'object': {
            const props = e.props.map((p) => {
                const key = p.computed || IDENT_RE.test(p.name) ? p.name : quote(p.name);
                const label = `${p.readonly ? 'readonly ' : ''}${key}${p.optional ? '?' : ''}: `;
                return `${label}${fmt(p.value, body + label.length, body, 0, width, step)}`;
            });
            if (e.index) {
                const label = `[key: ${emit(e.index.key)}]: `;
                props.unshift(`${label}${fmt(e.index.value, body + label.length, body, 0, width, step)}`);
            }
            if (!props.length)
                return '{}';
            return `{\n${props.map((p) => bodyPad + p).join('\n')}\n${pad}}`;
        }
        case 'mapped': {
            const ro = e.readonly === true ? 'readonly ' : e.readonly === '+' ? '+readonly ' : e.readonly === '-' ? '-readonly ' : '';
            const opt = e.optional === true ? '?' : e.optional === '+' ? '+?' : e.optional === '-' ? '-?' : '';
            const as = e.as ? ` as ${emit(e.as)}` : '';
            const label = `${ro}[${e.param} in ${emit(e.constraint)}${as}]${opt}: `;
            const value = fmt(e.value, body + label.length, body, 0, width, step);
            return `{\n${bodyPad}${label}${value}\n${pad}}`;
        }
        case 'tuple': {
            const parts = e.elements.map((el) => {
                const named = el.name ? `${el.name}${el.optional ? '?' : ''}: ` : '';
                const lead = (el.spread ? '...' : '') + named;
                const inner = fmt(el.expr, body + lead.length, body, el.spread ? P_PREFIX : 0, width, step);
                return `${lead}${inner}${el.optional && !el.name ? '?' : ''}`;
            });
            return `[\n${parts.map((p) => bodyPad + p).join(',\n')}\n${pad}]`;
        }
        case 'ref': {
            if (!e.args?.length)
                return flat;
            const parts = e.args.map((a) => fmt(a, body, body, 0, width, step));
            return `${e.name}<\n${parts.map((p) => bodyPad + p).join(',\n')}\n${pad}>`;
        }
        case 'indexed':
            return `${fmt(e.obj, start, anchor, P_POSTFIX, width, step)}[${emit(e.index)}]`;
        case 'op':
            return `${e.op} ${fmt(e.target, start + e.op.length + 1, anchor, P_PREFIX + 1, width, step)}`;
        case 'array':
            return `${e.readonly ? 'readonly ' : ''}${fmt(e.element, start, anchor, P_POSTFIX, width, step)}[]`;
        case 'paren': {
            const inner = fmt(e.inner, body, body, 0, width, step);
            return inner.includes('\n') ? `(\n${bodyPad}${inner}\n${pad})` : `(${inner})`;
        }
        case 'fn': {
            const tp = e.typeParams?.length ? `<${e.typeParams.join(', ')}>` : '';
            const open = `${e.isCtor ? 'new ' : ''}${tp}(`;
            const args = e.params.map((p, i) => emitFnParam(e, p, i));
            const argText = args.join(', ');
            const afterArrow = start + open.length + argText.length + 5;
            if (afterArrow <= width) {
                return `${open}${argText}) => ${fmt(e.ret, afterArrow, anchor, 0, width, step)}`;
            }
            const broken = args.map((a) => bodyPad + a).join(',\n');
            return `${open}\n${broken}\n${pad}) => ${fmt(e.ret, anchor + 5, anchor, 0, width, step)}`;
        }
        // Templates, literals, keywords, infer and raw text have no interior break point:
        // splitting a template literal type would change what it means.
        default:
            return flat;
    }
}
