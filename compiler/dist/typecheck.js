/**
 * Typecheck gate for ScriptType source.
 *
 * ScriptType source is written in TypeScript syntax, so it must also *be* valid
 * TypeScript: it typechecks against an ambient declaration file describing the builtin
 * surface, with zero errors and no suppression comments. This is part of verification,
 * not a nicety — if a ScriptType program does not typecheck, the language is not good
 * enough, and this gate is what says so.
 *
 * The gate is deliberately strict:
 *   - zero diagnostics, under `strict`;
 *   - no `@ts-ignore` / `@ts-expect-error` / `@ts-nocheck` anywhere in the source.
 */
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
const SUPPRESSION_RE = /@ts-(ignore|expect-error|nocheck)/g;
const OPTIONS = {
    target: ts.ScriptTarget.ES2022,
    lib: ['lib.es2022.d.ts'],
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    strict: true,
    // A ScriptType parameter denotes a *type*, not a value, so there is no meaningful
    // value-level type to infer and "implicit any" carries no information. Unconstrained
    // parameters are therefore written without an annotation. Everything else in `strict`
    // stays on.
    noImplicitAny: false,
    noEmit: true,
    skipLibCheck: true,
    noUnusedLocals: false,
    noUnusedParameters: false,
    noErrorTruncation: true,
};
const LIB_CACHE = new Map();
/**
 * Absolute path of the ambient declarations describing the ScriptType surface.
 *
 * Resolved against both the module directory and `src/`, because a `.d.ts` is not emitted
 * by a build: running from `dist/` must still find the copy in `src/`.
 */
export const AMBIENT_DTS = (() => {
    const candidates = [
        path.resolve(import.meta.dirname, 'scripttype.d.ts'),
        path.resolve(import.meta.dirname, '../src/scripttype.d.ts'),
    ];
    return candidates.find((p) => fs.existsSync(p)) ?? candidates[0];
})();
/**
 * Typecheck one or more ScriptType sources together with the ambient declarations.
 * `sources` maps a virtual file name to its text.
 */
/**
 * Extra ambient names a source legitimately references — the local helper types its
 * reference implementation depends on. Declared as both a value and a type so they can
 * appear in call, value and annotation positions.
 */
function extraAmbient(names) {
    const uniq = [...new Set(names)].filter((n) => /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(n));
    // Both a value and a *generic* type: ScriptType applies types in call position
    // (`Foo(A, B)` -> `Foo<A, B>`), so a non-generic alias fails with "not generic".
    const GENERIC = '<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any>';
    return (uniq
        .map((n) => `declare const ${n}: any\ntype ${n}${GENERIC} = any`)
        .join('\n') + '\n');
}
export function typecheckScriptType(sources, extraNames = [], 
/** A pre-built ambient block, used instead of deriving one from `extraNames`. */
extraAmbientText) {
    const suppressions = [];
    for (const [name, text] of Object.entries(sources)) {
        for (const m of text.matchAll(SUPPRESSION_RE))
            suppressions.push(`${name}: ${m[0]}`);
    }
    const ambient = fs.existsSync(AMBIENT_DTS) ? fs.readFileSync(AMBIENT_DTS, 'utf8') : undefined;
    if (ambient === undefined) {
        return {
            ok: false,
            errors: [`ambient declarations not found at ${AMBIENT_DTS}`],
            suppressions,
        };
    }
    const files = new Map();
    files.set('/scripttype.d.ts', ambient);
    const roots = ['/scripttype.d.ts'];
    const deps = extraAmbientText ?? (extraNames.length ? extraAmbient(extraNames) : '');
    if (deps) {
        files.set('/deps.d.ts', deps);
        roots.push('/deps.d.ts');
    }
    for (const [name, text] of Object.entries(sources)) {
        const p = name.startsWith('/') ? name : `/${name}`;
        files.set(p, text);
        roots.push(p);
    }
    const libDir = ts.getDefaultLibFilePath(OPTIONS).replace(/[^/\\]+$/, '');
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
            const own = files.get(fileName);
            if (own !== undefined)
                return ts.createSourceFile(fileName, own, lv, true);
            if (LIB_CACHE.has(fileName))
                return LIB_CACHE.get(fileName);
            const text = ts.sys.readFile(fileName);
            const sf = text === undefined ? undefined : ts.createSourceFile(fileName, text, lv, true);
            LIB_CACHE.set(fileName, sf);
            return sf;
        },
    };
    const program = ts.createProgram(roots, OPTIONS, host);
    const errors = [];
    for (const [name] of Object.entries(sources)) {
        const p = name.startsWith('/') ? name : `/${name}`;
        const sf = program.getSourceFile(p);
        if (!sf) {
            errors.push(`${name}: source file missing from program`);
            continue;
        }
        for (const d of [...program.getSyntacticDiagnostics(sf), ...program.getSemanticDiagnostics(sf)]) {
            const pos = d.start != null ? sf.getLineAndCharacterOfPosition(d.start) : undefined;
            const where = pos ? `${pos.line + 1}:${pos.character + 1}` : '?';
            errors.push(`${name}(${where}) TS${d.code}: ${ts.flattenDiagnosticMessageText(d.messageText, ' ')}`);
        }
    }
    // Errors in the ambient file itself are our bug, and must also surface.
    const ambientSf = program.getSourceFile('/scripttype.d.ts');
    if (ambientSf) {
        for (const d of program.getSemanticDiagnostics(ambientSf)) {
            errors.push(`scripttype.d.ts TS${d.code}: ${ts.flattenDiagnosticMessageText(d.messageText, ' ')}`);
        }
    }
    return { ok: errors.length === 0 && suppressions.length === 0, errors, suppressions };
}
/** Convenience: typecheck a single ScriptType file from disk. */
export function typecheckFile(filePath) {
    const text = fs.readFileSync(filePath, 'utf8');
    return typecheckScriptType({ [path.basename(filePath)]: text });
}
