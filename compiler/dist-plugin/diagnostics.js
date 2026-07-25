"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CATALOGUE = void 0;
exports.diagnosticFromNode = diagnosticFromNode;
exports.colorsEnabled = colorsEnabled;
exports.formatDiagnostic = formatDiagnostic;
exports.explain = explain;
exports.allCodes = allCodes;
exports.editDistance = editDistance;
exports.didYouMean = didYouMean;
/**
 * The error catalogue. Codes are grouped:
 *   ST10xx  source and function shape
 *   ST11xx  statements and mutation
 *   ST12xx  declarations and destructuring
 *   ST13xx  loops
 *   ST14xx  calls and builtins
 *   ST15xx  expressions
 */
exports.CATALOGUE = {
    // --- ST10xx: source and function shape -----------------------------------
    ST1001: {
        help: 'ScriptType source is reinterpreted TypeScript, so it must parse as TypeScript first.',
        explain: `ScriptType files are parsed with the stock TypeScript parser — that is what lets
your editor highlight and check them with no plugin. A syntax error here is an
ordinary TypeScript syntax error, at the position reported.`,
    },
    ST1002: {
        help: 'Give the parameter a plain name, then destructure it in the body.',
        explain: `A ScriptType parameter becomes a *type parameter*, and a type parameter has a
single name. Destructure inside the body instead, where it lowers to indexed
access:

    // not allowed
    function F({ a, b }) { return a }

    // instead
    function F(T) {
      const { a } = T          //  T['a']
      return a
    }`,
    },
    ST1003: {
        help: 'Add a final `return` — a conditional type must produce a type on every branch.',
        explain: `Every path through a ScriptType function must return, because the function
lowers to a conditional type and a conditional type has no "fell off the end"
result. Where TypeScript code would return \`undefined\`, type-level code almost
always wants \`never\`:

    function F(T: string) {
      if (matches<'a'>(T)) return 1
      return never            // <- the missing branch
    }`,
    },
    ST1004: {
        help: 'Return a type: `return never` is the usual "no result" answer.',
        explain: `\`return\` with no expression has no type-level meaning. The type-level analogue
of returning nothing is \`never\`, the empty type:

    return never`,
    },
    // --- ST11xx: statements and mutation -------------------------------------
    ST1100: {
        help: 'Supported statements: const/let, if/else, switch, while, for…of, for…in, return, break, continue, throw.',
        explain: `ScriptType lowers a fixed set of statements into type operations. Anything with
a runtime-only meaning — \`try\`/\`catch\`, \`do\`/\`while\`, labelled statements,
classes, \`async\` — has no type-level counterpart and is rejected rather than
silently ignored.`,
    },
    ST1101: {
        help: 'An expression statement must be an assignment, `x.push(v)`, `x.unshift(v)`, or `out[k] = v`.',
        explain: `A statement is only meaningful to ScriptType if it changes a variable's value,
because that is what threads through the lowering as an accumulator. Compound
assignment is not supported — write the long form:

    x += 1        // not supported
    x = add(x, 1) // instead

Statements evaluated for a side effect (\`console.log(x)\`) have no type-level
meaning at all: delete them.`,
    },
    ST1102: {
        help: 'Declare it with `const`/`let`, or use a parameter. Type-level code has no ambient globals.',
        explain: `The only names in scope inside a ScriptType function are its parameters, the
locals it declares, other type functions in the file, and the ScriptType
builtins. There is no global object: \`console\`, \`Math\`, \`process\` and friends
do not exist at the type level.`,
    },
    ST1103: {
        help: 'Assign to a plain variable name: `x = …`, not `a.b = …`.',
        explain: `Only a whole variable can be reassigned, because reassignment is how ScriptType
threads a new value into the rest of the lowering. The one exception is
\`out[key] = value\` as the entire body of a \`for…in\`, which builds a mapped
type.`,
    },
    ST1104: {
        help: '`break` is only meaningful inside `while` or `for…of`.',
        explain: `\`break\` compiles to "stop recursing and return the accumulator", which only has
a meaning inside a loop. To leave a function early, use \`return\`.`,
    },
    ST1105: {
        help: '`continue` is only meaningful inside `while` or `for…of`.',
        explain: `\`continue\` compiles to "recurse with the current accumulators", which only has a
meaning inside a loop.`,
    },
    // --- ST12xx: declarations and destructuring ------------------------------
    ST1200: {
        help: 'Give the declaration an initializer — a type-level binding is always a value.',
        explain: `\`let x\` with no initializer would denote an uninitialised type, which does not
exist. Every binding needs a starting value; for an accumulator that is usually
an empty tuple or an empty object:

    let out: string[] = []
    let acc = emptyObject`,
    },
    ST1201: {
        help: 'Destructure one level at a time: bind the inner object first, then destructure it.',
        explain: `Nested patterns are not supported because each level lowers to a separate
indexed access and the intermediate needs a name:

    const { a: { b } } = T    // not supported
    const { a } = T           // instead
    const { b } = a`,
    },
    ST1202: {
        help: 'Destructure one level at a time: bind the inner tuple first, then destructure it.',
        explain: `Nested array patterns are not supported. Bind the element, then destructure it
in a second statement.`,
    },
    ST1203: {
        help: 'Use a plain name, an object pattern, or an array pattern.',
        explain: `The supported binding forms are \`const x = …\`, \`const { a, b } = …\` and
\`const [h, ...t] = …\`. Anything else — default values in patterns, computed
property names — has no lowering.`,
    },
    // --- ST13xx: loops --------------------------------------------------------
    ST1300: {
        help: 'Write `for (const x of xs)` — exactly one loop variable.',
        explain: `A \`for…of\` lowers to a tail-recursive helper that peels one element per step,
so it binds exactly one element variable.`,
    },
    ST1301: {
        help: 'Bind the element to a name, then destructure it inside the body.',
        explain: `Destructuring in the loop header is not supported:

    for (const [k, v] of pairs) { … }   // not supported

    for (const pair of pairs) {          // instead
      const [k, v] = pair
      …
    }`,
    },
    ST1302: {
        help: 'Write `for (const k in obj)` — exactly one key variable.',
        explain: `A \`for…in\` lowers to a mapped type \`{ [K in Keys]: … }\`, which binds exactly
one key.`,
    },
    ST1303: {
        help: 'Bind the key to a plain name.',
        explain: `The key of a \`for…in\` becomes the mapped type's key parameter, which must be a
single name.`,
    },
    ST1304: {
        help: 'The body must be exactly one statement of the form `out[key] = value`.',
        explain: `A \`for…in\` is the surface syntax for a mapped type, and a mapped type has
exactly one value expression per key. So the body is one assignment:

    const out = emptyObject
    for (const K in keySet(T)) {
      out[K] = someFunction(T[K])
    }
    return out

lowers to \`{ [K in keyof T]: someFunction<T[K]> }\`. If you need several steps,
call a helper function from the value position.`,
    },
    ST1305: {
        help: 'Assign to the accumulator with a computed key: `out[key] = value`.',
        explain: `The left-hand side of the single assignment in a \`for…in\` body must be an
element access on the accumulator variable, keyed by the loop variable.`,
    },
    // --- ST14xx: calls and builtins ------------------------------------------
    ST1400: {
        help: 'Pass the pattern as a type argument: `matches<`${Hole<"A">}-${Hole<"B">}`>(x)`.',
        explain: `\`matches\` is the general pattern-match form. The pattern is a *type*, so it goes
in the type-argument position, and capture positions are written \`Hole<'Name'>\`
rather than \`infer Name\` (\`infer\` is only legal inside a conditional type, so it
cannot be written here and still typecheck):

    const m = matches<\`\${Hole<'Head'>}.\${Hole<'Tail'>}\`>(S)
    if (m) {
      return m.Head
    }`,
    },
    ST1401: {
        help: 'Call it as `matches<Pattern>(value)` with exactly one value.',
        explain: `\`matches\` tests one value against one pattern.`,
    },
    ST1402: {
        help: 'Call it as `orElse(value, fallback)`.',
        explain: `\`orElse\` supplies the result used when a destructuring pattern does not match.
Without it, a failed destructure yields \`never\`:

    const [h, ...t] = orElse(xs, [never, []])`,
    },
    ST1403: {
        help: 'Call a named function directly: `F(x)`, not `obj.f(x)` or `(g())(x)`.',
        explain: `A call lowers to a type application \`F<X>\`, and the head of a type application
is a name. The exceptions the compiler understands are the JavaScript-dialect
method forms (\`s.toUpperCase()\`, \`Object.keys(o)\`, \`xs.push(v)\`) and qualified
references into an imported namespace.`,
    },
    // --- ST15xx: expressions --------------------------------------------------
    ST1500: {
        help: 'Rewrite using a supported form, or use `raw("…")` to drop to literal TypeScript.',
        explain: `This expression has no type-level lowering. If the construct genuinely cannot be
expressed, \`raw('…')\` splices literal TypeScript into the output — but a
\`raw()\` is an admission of a language gap, and the round-trip harness counts it
as uncovered rather than as a success.`,
    },
    ST1501: {
        help: 'Object members must be `key: value` or shorthand `key`.',
        explain: `An object literal lowers to an object type, so its members are property
assignments. Methods, getters, setters and spreads have no lowering; use
\`merge(a, b)\` for the intersection an object spread would suggest.`,
    },
};
/** Build a diagnostic from a compile error's node, if it has one. */
function diagnosticFromNode(code, message, node, help) {
    const d = { code, message, help, severity: 'error' };
    if (node) {
        const sf = node.getSourceFile();
        if (sf) {
            d.file = sf.fileName;
            // getStart() skips leading trivia, so the caret lands on the token, not the
            // blank line above it.
            const start = node.getStart(sf);
            d.start = start;
            d.length = Math.max(1, node.getEnd() - start);
        }
    }
    return d;
}
// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------
const ANSI = {
    reset: '\x1b[0m',
    bold: '\x1b[1m',
    dim: '\x1b[2m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
    green: '\x1b[32m',
};
function colorsEnabled(stream = process.stdout) {
    if (process.env.NO_COLOR)
        return false;
    if (process.env.FORCE_COLOR)
        return true;
    return !!stream.isTTY;
}
function paint(on) {
    const w = (c) => (s) => (on ? `${c}${s}${ANSI.reset}` : s);
    return {
        bold: w(ANSI.bold),
        dim: w(ANSI.dim),
        red: w(ANSI.red),
        yellow: w(ANSI.yellow),
        blue: w(ANSI.blue),
        cyan: w(ANSI.cyan),
        green: w(ANSI.green),
    };
}
/**
 * Render a diagnostic in the style of rustc: a headline with the code, a location
 * line, a gutter-numbered source frame with a caret under the offending span, and a
 * `help:` line.
 */
function formatDiagnostic(d, opts = {}) {
    const on = opts.color ?? colorsEnabled();
    const c = paint(on);
    const sev = d.severity ?? 'error';
    const sevText = sev === 'error' ? c.red(c.bold('error')) : c.yellow(c.bold('warning'));
    const code = d.code ? c.red(c.bold(`[${d.code}]`)) : '';
    const out = [];
    out.push(`${sevText}${code}: ${c.bold(d.message)}`);
    const text = opts.text;
    if (text !== undefined && d.start !== undefined) {
        const { line, character } = offsetToLineChar(text, d.start);
        const where = `${d.file ?? '<input>'}:${line + 1}:${character + 1}`;
        const lines = text.split('\n');
        const gutterWidth = String(Math.min(lines.length, line + 1 + (opts.context ?? 1)) + 1).length;
        const pad = (s) => s.padStart(gutterWidth);
        out.push(`${c.dim(pad('') + ' --> ')}${c.cyan(where)}`);
        out.push(c.dim(`${pad('')} |`));
        const ctx = opts.context ?? 0;
        const first = Math.max(0, line - ctx);
        const last = Math.min(lines.length - 1, line + ctx);
        for (let i = first; i <= last; i++) {
            const src = lines[i].replace(/\t/g, '  ');
            out.push(`${c.dim(pad(String(i + 1)) + ' |')} ${src}`);
            if (i === line) {
                // Clamp the caret to the line; a span covering a whole function would
                // otherwise underline hundreds of characters.
                const lineLen = lines[i].length;
                const tabsBefore = (lines[i].slice(0, character).match(/\t/g) ?? []).length;
                const col = character + tabsBefore;
                const width = Math.max(1, Math.min(d.length ?? 1, lineLen - character));
                out.push(`${c.dim(pad('') + ' |')} ${' '.repeat(col)}${c.red('^'.repeat(width))}`);
            }
        }
        out.push(c.dim(`${pad('')} |`));
    }
    else if (d.file) {
        out.push(`${c.dim(' --> ')}${c.cyan(d.file)}`);
    }
    const help = d.help ?? exports.CATALOGUE[d.code]?.help;
    if (help)
        out.push(`${c.green(c.bold('help'))}: ${help}`);
    if (exports.CATALOGUE[d.code]) {
        out.push(c.dim(`      run \`scripttype explain ${d.code}\` for a worked example`));
    }
    return out.join('\n');
}
/** Long-form explanation for `scripttype explain`. */
function explain(code, color = colorsEnabled()) {
    const spec = exports.CATALOGUE[code.toUpperCase()];
    if (!spec)
        return undefined;
    const c = paint(color);
    return [
        `${c.bold(code.toUpperCase())}`,
        '',
        spec.explain,
        '',
        `${c.green(c.bold('help'))}: ${spec.help}`,
    ].join('\n');
}
function allCodes() {
    return Object.keys(exports.CATALOGUE).sort();
}
function offsetToLineChar(text, offset) {
    let line = 0;
    let lineStart = 0;
    for (let i = 0; i < offset && i < text.length; i++) {
        if (text[i] === '\n') {
            line++;
            lineStart = i + 1;
        }
    }
    return { line, character: offset - lineStart };
}
// ---------------------------------------------------------------------------
// "did you mean" suggestions
// ---------------------------------------------------------------------------
/** Levenshtein distance, capped for early exit. */
function editDistance(a, b) {
    const m = a.length;
    const n = b.length;
    if (!m)
        return n;
    if (!n)
        return m;
    let prev = Array.from({ length: n + 1 }, (_, i) => i);
    const cur = new Array(n + 1);
    for (let i = 1; i <= m; i++) {
        cur[0] = i;
        for (let j = 1; j <= n; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            cur[j] = Math.min(cur[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
        }
        prev = cur.slice();
    }
    return prev[n];
}
/**
 * The closest candidate to `name`, if one is close enough to be worth suggesting.
 * Case-insensitive ties are resolved toward the exact-case match.
 */
function didYouMean(name, candidates) {
    const budget = name.length <= 4 ? 1 : name.length <= 8 ? 2 : 3;
    let best;
    let bestScore = Infinity;
    for (const cand of candidates) {
        if (cand === name)
            continue;
        const d = Math.min(editDistance(name, cand), 
        // A pure case difference is the most common typo of all and should always win.
        name.toLowerCase() === cand.toLowerCase() ? 1 : Infinity);
        if (d < bestScore && d <= budget) {
            bestScore = d;
            best = cand;
        }
    }
    return best;
}
