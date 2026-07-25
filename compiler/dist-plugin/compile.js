"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompileError = void 0;
exports.compileAll = compileAll;
exports.compile = compile;
exports.rewriteSpecifier = rewriteSpecifier;
const typescript_1 = __importDefault(require("typescript"));
const ir_js_1 = require("./ir.js");
const format_js_1 = require("./format.js");
const lower_js_1 = require("./lower.js");
Object.defineProperty(exports, "CompileError", { enumerable: true, get: function () { return lower_js_1.CompileError; } });
const prelude_js_1 = require("./prelude.js");
const optimize_js_1 = require("./optimize.js");
/**
 * Compile, collecting every error instead of stopping at the first.
 *
 * Recovery is per function: each compiles to its own alias, so one failing does not
 * corrupt the others, and a file with five mistakes reports five rather than making the
 * user fix-and-rerun five times. A syntax error still aborts, because nothing after it
 * can be trusted.
 *
 * `code` holds whatever did compile, so a partial build is still inspectable.
 */
function compileAll(source, opts = {}) {
    try {
        const collected = [];
        const result = compile(source, { ...opts, collect: collected });
        return { result, errors: collected };
    }
    catch (e) {
        if (e instanceof lower_js_1.CompileError)
            return { errors: [e] };
        throw e;
    }
}
function compile(source, opts = {}) {
    const fileName = opts.fileName ?? 'input.st.ts';
    // A `.js` source is the pure-JavaScript dialect: parse as JS so JSDoc types, which
    // carry the type-parameter constraints, are attached to the AST.
    const kind = /\.jsx?$/.test(fileName) ? typescript_1.default.ScriptKind.JS : typescript_1.default.ScriptKind.TS;
    const sf = typescript_1.default.createSourceFile(fileName, source, typescript_1.default.ScriptTarget.Latest, true, kind);
    const syntactic = sf.parseDiagnostics ?? [];
    if (syntactic.length) {
        const d = syntactic[0];
        // Attach the span so the CLI can draw a source frame, rather than embedding a
        // "at 3:12" fragment in the message text.
        const node = d.start != null ? findNodeAt(sf, d.start) : undefined;
        throw new lower_js_1.CompileError(typescript_1.default.flattenDiagnosticMessageText(d.messageText, ' '), node ?? sf, 'ST1001');
    }
    // Generated sources opt in via a pragma so the setting travels with the file.
    const preserveParamNames = opts.preserveParamNames ?? /@scripttype\s+preserveParamNames/.test(source);
    const { aliases, prelude, imports, errors } = (0, lower_js_1.compileSourceFile)(sf, { preserveParamNames });
    // Without a collector the contract is unchanged: fail on the first error.
    if (errors.length) {
        if (!opts.collect)
            throw errors[0];
        opts.collect.push(...errors);
    }
    for (const a of aliases)
        a.body = (0, optimize_js_1.optimize)(a.body);
    const entries = opts.includePrelude === false ? [] : (0, prelude_js_1.resolvePrelude)(prelude);
    // A user type may share a name with a prelude helper (a ScriptType function called
    // `Equals` alongside the `Equals` helper). Rename the helper, not the user's type.
    const userNames = new Set(aliases.map((a) => a.name));
    const renames = new Map();
    for (const e of entries) {
        for (const p of e.provides) {
            if (userNames.has(p)) {
                let candidate = `${p}$`;
                while (userNames.has(candidate) || renames.has(candidate))
                    candidate += '$';
                renames.set(p, candidate);
            }
        }
    }
    const preludeSrc = entries.map((e) => applyRenames(e.source, renames));
    if (renames.size) {
        for (const a of aliases) {
            a.body = (0, ir_js_1.mapExpr)(a.body, (x) => x.kind === 'ref' && renames.has(x.name)
                ? { ...x, name: renames.get(x.name) }
                : undefined);
        }
    }
    const aliasSrc = aliases.map((a) => (0, format_js_1.formatAlias)(a, { width: opts.width }));
    const importSrc = renderImports(imports, aliasSrc.join('\n'));
    const parts = [];
    if (importSrc.length)
        parts.push(...importSrc, '');
    if (preludeSrc.length) {
        parts.push('// --- ScriptType prelude ---', ...preludeSrc, '');
    }
    parts.push(...aliasSrc);
    return {
        code: parts.join('\n') + '\n',
        aliases: aliasSrc,
        prelude: preludeSrc,
        imports: importSrc,
    };
}
/**
 * Rewrite a module specifier for the compiled world.
 *
 * A ScriptType module `shared.st.ts` compiles to `shared.ts`, so a source that imports
 * from `./shared.st.js` — the spelling that makes TypeScript resolve to the `.st.ts`
 * file, and therefore the spelling that lets the *source* typecheck — must import from
 * `./shared.js` once compiled. Anything that is not a ScriptType module is left alone.
 */
function rewriteSpecifier(spec) {
    return spec.replace(/\.st(\.[cm]?js|\.[cm]?ts)?$/, (_m, ext) => ext ?? '');
}
/**
 * Render carried-over imports as type-only imports.
 *
 * Only names the output actually mentions are emitted: a ScriptType source may import a
 * helper that gets inlined away, and an unused import is an error under `noUnusedLocals`.
 * A re-export is emitted whether or not it is referenced, because its whole purpose is
 * to be visible to other modules.
 */
function renderImports(imports, body) {
    const mentions = (name) => new RegExp(`(?<![A-Za-z0-9_$])${name}(?![A-Za-z0-9_$])`).test(body);
    const out = [];
    for (const i of imports) {
        const spec = rewriteSpecifier(i.specifier);
        if (i.isExport) {
            const clause = i.namespaceName
                ? `* as ${i.namespaceName}`
                : `{ ${i.named.map((n) => (n.alias ? `${n.name} as ${n.alias}` : n.name)).join(', ')} }`;
            out.push(`export type ${clause} from '${spec}'`);
            continue;
        }
        const named = i.named.filter((n) => mentions(n.alias ?? n.name));
        const clauses = [];
        if (i.defaultName && mentions(i.defaultName))
            clauses.push(i.defaultName);
        if (i.namespaceName && mentions(i.namespaceName))
            clauses.push(`* as ${i.namespaceName}`);
        if (named.length) {
            clauses.push(`{ ${named.map((n) => (n.alias ? `${n.name} as ${n.alias}` : n.name)).join(', ')} }`);
        }
        if (clauses.length)
            out.push(`import type ${clauses.join(', ')} from '${spec}'`);
    }
    return out;
}
/** Innermost node containing `pos`, so a parse diagnostic gets a span to underline. */
function findNodeAt(sf, pos) {
    let found;
    const visit = (n) => {
        if (pos >= n.getStart(sf) && pos < n.getEnd()) {
            found = n;
            typescript_1.default.forEachChild(n, visit);
        }
    };
    typescript_1.default.forEachChild(sf, visit);
    return found;
}
/** Whole-word rename of type names inside prelude source text. */
function applyRenames(src, renames) {
    if (!renames.size)
        return src;
    let out = src;
    for (const [from, to] of renames) {
        out = out.replace(new RegExp(`(?<![A-Za-z0-9_$])${from}(?![A-Za-z0-9_$])`, 'g'), to);
    }
    return out;
}
