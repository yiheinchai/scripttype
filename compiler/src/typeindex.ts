/**
 * Where a library declares each of its type names.
 *
 * A generated ScriptType file references types from elsewhere in its library, and until
 * now every one of them was declared locally as `type X<T1 = any, …> = any`. That makes
 * the file typecheck, but it makes the check nearly vacuous: `any` accepts any arity and
 * any argument, so a reference that is simply wrong passes. Resolving the name to its
 * real declaration and importing it instead turns the standalone typecheck back into a
 * real one — `StoreApi<A, B, C>` on a one-parameter type becomes TS2314 rather than
 * silence.
 *
 * Only the *type* side can be recovered this way. ScriptType applies types in call
 * position — `StoreApi(T)` is `StoreApi<T>` — so every referenced name also needs a
 * binding in value space, and a type-only import provides none. The `declare const`
 * shim stays for that reason; it is structural to the language, not a gap in the
 * packaging. The two coexist because `import type` occupies only type space.
 */
import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'

/** Name -> absolute path of the file declaring it, or AMBIGUOUS when several do. */
type Index = Map<string, string | typeof AMBIGUOUS>

const AMBIGUOUS = Symbol('declared in more than one file')

const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', 'build', 'out', 'coverage'])

/**
 * Every type name a clone declares, mapped to the file declaring it.
 *
 * A name declared in two files is recorded as ambiguous and never imported: picking one
 * arbitrarily would substitute a *wrong* type, which is worse than the `any` it replaces,
 * because it would be believed.
 */
function buildIndex(root: string): Index {
  const index: Index = new Map()
  const add = (name: string, file: string) => {
    const seen = index.get(name)
    if (seen === undefined) index.set(name, file)
    else if (seen !== file) index.set(name, AMBIGUOUS)
  }

  const walk = (dir: string) => {
    let entries: fs.Dirent[]
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true })
    } catch {
      return
    }
    for (const e of entries) {
      const full = path.join(dir, e.name)
      if (e.isDirectory()) {
        if (!SKIP_DIRS.has(e.name)) walk(full)
        continue
      }
      if (!/\.tsx?$/.test(e.name) || e.name.endsWith('.d.ts')) continue
      let text: string
      try {
        text = fs.readFileSync(full, 'utf8')
      } catch {
        continue
      }
      // Only files small enough to be worth parsing; the corpus has a few generated
      // megabyte files whose contents nothing references by name.
      if (text.length > 800_000) continue
      const sf = ts.createSourceFile(full, text, ts.ScriptTarget.Latest, false, ts.ScriptKind.TS)
      for (const name of importableFrom(sf)) add(name, full)
    }
  }
  walk(root)
  return index
}

type ImportableType = ts.TypeAliasDeclaration | ts.InterfaceDeclaration

/**
 * Only a type alias or an interface can be imported here.
 *
 * A class or an enum occupies value space as well as type space, so `import type { C }`
 * collides with the `declare const C` shim the call syntax needs (TS2440) — and dropping
 * the shim is not an option either, since a type-only import cannot appear in a call.
 * Those names keep their `any` stub.
 */
function isImportableType(stmt: ts.Node): stmt is ImportableType {
  return ts.isTypeAliasDeclaration(stmt) || ts.isInterfaceDeclaration(stmt)
}

function isExported(stmt: ts.Statement | ts.VariableStatement): boolean {
  return !!(stmt as { modifiers?: readonly ts.ModifierLike[] }).modifiers?.some(
    (m) => m.kind === ts.SyntaxKind.ExportKeyword,
  )
}

/**
 * The names a module exports that can be imported as a type *and nothing else*.
 *
 * A name the module also exports as a value is excluded, because `import type { X }`
 * binds every meaning the name has — so the companion-object pattern, an interface and a
 * `const` sharing one name, collides with the `declare const X` shim (TS2440). Kysely's
 * `CompiledQuery` is exactly that, and it accounted for most of what was left.
 */
function importableFrom(sf: ts.SourceFile): string[] {
  const types: string[] = []
  const values = new Set<string>()
  for (const stmt of sf.statements) {
    if (!isExported(stmt)) continue
    if (isImportableType(stmt)) {
      if (stmt.name) types.push(stmt.name.text)
    } else if (ts.isVariableStatement(stmt)) {
      for (const d of stmt.declarationList.declarations) {
        if (ts.isIdentifier(d.name)) values.add(d.name.text)
      }
    } else if (
      (ts.isFunctionDeclaration(stmt) || ts.isClassDeclaration(stmt) || ts.isEnumDeclaration(stmt)) &&
      stmt.name
    ) {
      values.add(stmt.name.text)
    }
  }
  return types.filter((n) => !values.has(n))
}

const CACHE = new Map<string, Index>()

/** The index for a library, built once per process. */
export function indexFor(cloneRoot: string): Index {
  let idx = CACHE.get(cloneRoot)
  if (!idx) {
    idx = buildIndex(cloneRoot)
    CACHE.set(cloneRoot, idx)
  }
  return idx
}

export interface Resolver {
  /**
   * The module specifier to import `name` from, relative to the generated file, or
   * undefined when it cannot be resolved unambiguously and the `any` stub must stand.
   */
  resolve(name: string): string | undefined
}

/**
 * A resolver for one generated file.
 *
 * `sourceAbs` is the corpus file it was decompiled from and is tried first: most free
 * names are declared in that very file and were dropped only because they are not
 * generic type aliases, so they are the least ambiguous case there is. Anything else is
 * looked up across the library.
 */
export function resolverFor(cloneRoot: string, sourceAbs: string, generatedDir: string): Resolver {
  const index = indexFor(cloneRoot)
  const own = ownDeclarations(sourceAbs)

  return {
    resolve(name) {
      const target = own.has(name) ? sourceAbs : pick(index.get(name))
      if (!target) return undefined
      return specifier(generatedDir, target)
    },
  }
}

function pick(entry: string | typeof AMBIGUOUS | undefined): string | undefined {
  return typeof entry === 'string' ? entry : undefined
}

/**
 * Importable type names declared at the top level of one file.
 *
 * Exported only, and only from the top level: a name that is not exported cannot be
 * imported at all (TS2305), and one nested inside a namespace or a function is not
 * reachable by the specifier either. Both used to be emitted as imports and were the
 * larger half of what that broke.
 */
function ownDeclarations(file: string): Set<string> {
  const out = new Set<string>()
  let text: string
  try {
    text = fs.readFileSync(file, 'utf8')
  } catch {
    return out
  }
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, false, ts.ScriptKind.TS)
  for (const n of importableFrom(sf)) out.add(n)
  return out
}

/**
 * A relative specifier from the generated file to the corpus file, with the `.js`
 * extension the bundler resolution mode expects.
 */
function specifier(fromDir: string, toFile: string): string {
  let rel = path.relative(fromDir, toFile).replace(/\\/g, '/')
  rel = rel.replace(/\.tsx?$/, '.js')
  return rel.startsWith('.') ? rel : `./${rel}`
}
