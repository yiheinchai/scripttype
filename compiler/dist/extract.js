/**
 * Extract a reference type (and the local helpers it depends on) verbatim from a
 * corpus repository, so every fixture's provenance is real and re-checkable rather
 * than paraphrased from memory.
 */
import fs from 'node:fs';
import ts from 'typescript';
/** Type names provided by the TypeScript standard library; never treated as missing. */
const LIB_TYPES = new Set([
    'Uppercase',
    'Lowercase',
    'Capitalize',
    'Uncapitalize',
    'Exclude',
    'Extract',
    'Pick',
    'Omit',
    'Partial',
    'Required',
    'Readonly',
    'Record',
    'NonNullable',
    'ReturnType',
    'Parameters',
    'Awaited',
    'InstanceType',
    'ThisType',
    'Array',
    'ReadonlyArray',
    'Function',
    'Object',
    'String',
    'Number',
    'Boolean',
    'Symbol',
    'Date',
    'RegExp',
    'Promise',
    'Map',
    'Set',
    'WeakMap',
    'WeakSet',
    'Error',
    'JSON',
    'Iterable',
    'Generator',
]);
/**
 * Parsed files and their declaration indexes, keyed by path.
 *
 * Callers extract many types from the same file — one per alias — and re-parsing per
 * call makes that quadratic. Materialising the corpus went from minutes to seconds on
 * this cache alone.
 */
const FILE_CACHE = new Map();
function parseFile(filePath) {
    const cached = FILE_CACHE.get(filePath);
    if (cached)
        return cached;
    const text = fs.readFileSync(filePath, 'utf8');
    const sf = ts.createSourceFile(filePath, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    const decls = new Map();
    const visit = (n) => {
        if (ts.isTypeAliasDeclaration(n) || ts.isInterfaceDeclaration(n))
            decls.set(n.name.text, n);
        ts.forEachChild(n, visit);
    };
    visit(sf);
    const entry = { sf, decls };
    FILE_CACHE.set(filePath, entry);
    return entry;
}
export function extractType(filePath, typeName) {
    const { sf, decls } = parseFile(filePath);
    if (!decls.has(typeName)) {
        throw new Error(`type '${typeName}' not found in ${filePath}\n` +
            `available: ${[...decls.keys()].slice(0, 40).join(', ')}${decls.size > 40 ? ', ...' : ''}`);
    }
    const emitted = [];
    const unresolved = new Set();
    const seen = new Set();
    const collect = (name) => {
        if (seen.has(name))
            return;
        seen.add(name);
        const decl = decls.get(name);
        if (!decl) {
            if (!LIB_TYPES.has(name))
                unresolved.add(name);
            return;
        }
        // Names bound *within* this declaration are not dependencies. Besides the
        // declaration's own type parameters that includes `infer X`, mapped-type
        // parameters (`[P in keyof T]`), and the type parameters of nested function
        // types (the `<G>` in the `Equals` variance trick).
        const params = new Set();
        const collectBound = (n) => {
            if (ts.isTypeParameterDeclaration(n))
                params.add(n.name.text);
            if (ts.isInferTypeNode(n))
                params.add(n.typeParameter.name.text);
            if (ts.isMappedTypeNode(n))
                params.add(n.typeParameter.name.text);
            ts.forEachChild(n, collectBound);
        };
        collectBound(decl);
        const refs = [];
        const walk = (n) => {
            if (ts.isTypeReferenceNode(n)) {
                const root = ts.isQualifiedName(n.typeName) ? n.typeName.getFirstToken()?.getText() : n.typeName.text;
                if (root && root !== name && !params.has(root))
                    refs.push(root);
            }
            ts.forEachChild(n, walk);
        };
        walk(decl);
        for (const r of refs)
            collect(r);
        emitted.push(name);
    };
    collect(typeName);
    const parts = emitted.map((n) => {
        const d = decls.get(n);
        const raw = d.getText(sf);
        // Everything must be exported from the fixture module so the checker can reach it.
        return { name: n, text: /^\s*export\b/.test(raw) ? raw : `export ${raw}` };
    });
    return {
        source: parts.map((p) => p.text).join('\n\n') + '\n',
        emitted,
        parts,
        unresolved: [...unresolved],
    };
}
/** Locate a repo file by its path relative to the corpus root. */
export function corpusPath(root, rel) {
    const p = `${root}/${rel}`;
    if (!fs.existsSync(p))
        throw new Error(`corpus file not found: ${p}`);
    return p;
}
