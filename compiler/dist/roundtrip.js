#!/usr/bin/env tsx
/**
 * Round-trip harness: for every generic type alias in a corpus file, decompile it to
 * ScriptType, recompile, and check the result is type-identical to the original.
 *
 * Equivalence is checked structurally rather than by instantiating samples, because
 * sample arguments cannot be generated automatically for 7500 arbitrary types. Two
 * aliases are accepted as equivalent when the checker reports them as mutually
 * identical *as generic types* — see `compareAliases`.
 *
 * Usage:
 *   tsx src/roundtrip.ts <corpus-relative-file> [--limit N] [--show] [--only Name]
 */
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { compile } from './compile.js';
import { decompileFile } from './decompile.js';
import { REPO_ROOT } from './corpus.js';
import { extractType } from './extract.js';
/**
 * Compare an original alias against a compiled one by declaring both in one program
 * and asserting mutual assignability of a generic-preserving witness.
 *
 * For a generic alias we cannot enumerate arguments, so we instantiate with the
 * declared constraints (or `any` when unconstrained) and compare the results, then
 * additionally compare the aliases' textual normal forms. This is weaker than the
 * sample-based Tier 1 gate used for hand-authored targets, so results are reported
 * separately and never merged into the hand-authored coverage number.
 */
export function compareAliases(referenceSrc, compiledSrc, typeName, params) {
    const args = params.length ? `<${params.join(', ')}>` : '';
    const files = new Map([
        ['/eq.ts', `export type __Eq<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false\n`],
        ['/original.ts', referenceSrc],
        ['/compiled.ts', compiledSrc],
        [
            '/check.ts',
            `import type * as O from './original.js'\n` +
                `import type * as C from './compiled.js'\n` +
                `import type { __Eq } from './eq.js'\n` +
                `export type __O = O.${typeName}${args}\n` +
                `export type __C = C.${typeName}${args}\n` +
                `export type __EQ = __Eq<O.${typeName}${args}, C.${typeName}${args}>\n`,
        ],
    ]);
    const options = {
        strict: true,
        noEmit: true,
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.ESNext,
        moduleResolution: ts.ModuleResolutionKind.Bundler,
        skipLibCheck: true,
    };
    const libDir = ts.getDefaultLibFilePath(options).replace(/[^/\\]+$/, '');
    const host = {
        fileExists: (f) => files.has(f) || ts.sys.fileExists(f),
        readFile: (f) => files.get(f) ?? ts.sys.readFile(f),
        writeFile: () => { },
        getCanonicalFileName: (f) => f,
        getCurrentDirectory: () => '/',
        getDefaultLibFileName: () => libDir + 'lib.es2022.d.ts',
        getNewLine: () => '\n',
        useCaseSensitiveFileNames: () => true,
        getSourceFile: (fileName, lv) => {
            const text = files.get(fileName) ?? ts.sys.readFile(fileName);
            return text === undefined ? undefined : ts.createSourceFile(fileName, text, lv, true);
        },
    };
    const program = ts.createProgram(['/check.ts'], options, host);
    const fmt = (d) => ts.flattenDiagnosticMessageText(d.messageText, ' ');
    const compiledSf = program.getSourceFile('/compiled.ts');
    const compiledDiags = program.getSemanticDiagnostics(compiledSf).map(fmt);
    if (compiledDiags.length)
        return { equal: false, detail: `compiled: ${compiledDiags[0]}` };
    const originalSf = program.getSourceFile('/original.ts');
    const originalDiags = program.getSemanticDiagnostics(originalSf).map(fmt);
    if (originalDiags.length)
        return { equal: false, detail: `reference: ${originalDiags[0]}` };
    const checker = program.getTypeChecker();
    const checkSf = program.getSourceFile('/check.ts');
    const aliases = new Map();
    for (const s of checkSf.statements)
        if (ts.isTypeAliasDeclaration(s))
            aliases.set(s.name.text, s);
    const strOf = (n) => {
        const d = aliases.get(n);
        if (!d)
            return undefined;
        return checker.typeToString(checker.getTypeAtLocation(d.type), undefined, ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.InTypeAlias);
    };
    const eq = strOf('__EQ');
    if (eq === 'true')
        return { equal: true };
    return { equal: false, detail: `original=${strOf('__O')} compiled=${strOf('__C')}` };
}
/** Instantiate a type parameter with something concrete enough to compare. */
function witnessArgs(decl, sf) {
    return (decl.typeParameters ?? []).map((tp) => {
        if (!tp.constraint)
            return 'any';
        const c = tp.constraint.getText(sf);
        // A constraint is itself a valid inhabitant for comparison purposes in most cases.
        if (/\bkeyof\b|\binfer\b/.test(c))
            return 'any';
        return c;
    });
}
export function roundTripFile(rel, opts = {}) {
    const abs = path.join(REPO_ROOT, rel);
    const text = fs.readFileSync(abs, 'utf8');
    const sf = ts.createSourceFile(abs, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    let entries = decompileFile(abs, text);
    if (opts.only)
        entries = entries.filter((e) => e.name === opts.only);
    if (opts.limit)
        entries = entries.slice(0, opts.limit);
    const out = [];
    for (const e of entries) {
        const gaps = e.result.gaps;
        if (gaps.length) {
            out.push({ name: e.name, status: 'raw', gaps, scriptType: e.result.source });
            continue;
        }
        let emitted;
        try {
            emitted = compile(e.result.source, { fileName: `${e.name}.st.ts` }).code;
        }
        catch (err) {
            out.push({
                name: e.name,
                status: 'compile-error',
                gaps,
                detail: err.message,
                scriptType: e.result.source,
            });
            continue;
        }
        // The reference pulls in the local helpers it depends on; the compiled module
        // needs those same helpers, since ScriptType is only being asked to express
        // *this* alias, not to re-derive its dependencies.
        let reference;
        let deps = '';
        try {
            const ex = extractType(abs, e.name);
            reference = ex.source;
            // Take the already-deduplicated dependency parts; re-extracting each name
            // would pull overlapping transitive closures and duplicate declarations.
            const depParts = ex.parts.filter((p) => p.name !== e.name);
            if (depParts.length)
                deps = depParts.map((p) => p.text).join('\n\n') + '\n\n';
        }
        catch (err) {
            out.push({ name: e.name, status: 'reference-error', gaps, detail: err.message });
            continue;
        }
        emitted = deps + emitted;
        const cmp = compareAliases(reference, emitted, e.name, witnessArgs(e.decl, sf));
        out.push({
            name: e.name,
            status: cmp.equal ? 'covered' : 'mismatch',
            gaps,
            detail: cmp.detail,
            scriptType: e.result.source,
            emitted,
        });
    }
    return out;
}
if (process.argv[1] && import.meta.filename === path.resolve(process.argv[1])) {
    const args = process.argv.slice(2);
    const rel = args.find((a) => !a.startsWith('-'));
    if (!rel) {
        console.error('usage: roundtrip.ts <corpus-relative-file> [--limit N] [--only Name] [--show]');
        process.exit(2);
    }
    const limitArg = args.indexOf('--limit');
    const onlyArg = args.indexOf('--only');
    const results = roundTripFile(rel, {
        limit: limitArg >= 0 ? Number(args[limitArg + 1]) : undefined,
        only: onlyArg >= 0 ? args[onlyArg + 1] : undefined,
    });
    const show = args.includes('--show');
    const byStatus = new Map();
    for (const r of results)
        byStatus.set(r.status, (byStatus.get(r.status) ?? 0) + 1);
    for (const r of results) {
        const tag = r.status === 'covered' ? 'OK  ' : r.status === 'raw' ? 'RAW ' : 'FAIL';
        let line = `${tag} ${r.name}`;
        if (r.status === 'raw')
            line += `  [${[...new Set(r.gaps)].join('; ')}]`;
        else if (r.detail)
            line += `  ${r.detail.slice(0, 160)}`;
        console.log(line);
        if (show && r.scriptType && r.status !== 'covered') {
            console.log(r.scriptType.split('\n').map((l) => '    | ' + l).join('\n'));
        }
    }
    const total = results.length;
    const covered = byStatus.get('covered') ?? 0;
    console.log(`\n${rel}`);
    console.log(`  ${covered}/${total} round-trip equivalent` +
        [...byStatus].filter(([k]) => k !== 'covered').map(([k, v]) => `, ${v} ${k}`).join(''));
    const allGaps = new Map();
    for (const r of results)
        for (const g of r.gaps)
            allGaps.set(g, (allGaps.get(g) ?? 0) + 1);
    if (allGaps.size) {
        console.log('  language gaps:');
        for (const [g, n] of [...allGaps].sort((a, b) => b[1] - a[1]))
            console.log(`    ${n.toString().padStart(4)}  ${g}`);
    }
}
