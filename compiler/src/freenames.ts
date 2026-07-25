/**
 * Free-name analysis for ScriptType source.
 *
 * A generated ScriptType file references types from elsewhere in its library. To
 * typecheck standalone it must declare them — as both a value and a type, because
 * ScriptType applies types in call position.
 */
import fs from 'node:fs'
import ts from 'typescript'
import { AMBIENT_DTS } from './typecheck.js'

const AMBIENT_NAMES: Set<string> = (() => {
  const out = new Set<string>()
  try {
    const text = fs.readFileSync(AMBIENT_DTS, 'utf8')
    for (const m of text.matchAll(/declare (?:function|const) ([A-Za-z_$][A-Za-z0-9_$]*)/g)) out.add(m[1]!)
    for (const m of text.matchAll(/^type ([A-Za-z_$][A-Za-z0-9_$]*)/gm)) out.add(m[1]!)
  } catch {
    /* no ambient file yet */
  }
  return out
})()

/** Globals that exist in lib.es2022 and need no declaration. */
const LIB_GLOBALS = new Set([
  'Object', 'Array', 'String', 'Number', 'Boolean', 'Symbol', 'Function', 'Date', 'RegExp',
  'Error', 'JSON', 'Math', 'Promise', 'Map', 'Set', 'WeakMap', 'WeakSet', 'Proxy', 'Reflect',
  'BigInt', 'globalThis', 'undefined', 'null', 'true', 'false',
])

/**
 * Names a generated file references but does not declare — types from other modules, and
 * library type constructors used in call position. They are declared as both a value and
 * a type so the file typechecks standalone, which is part of verification: generated
 * ScriptType must itself be valid TypeScript.
 */
export function freeNames(source: string): { values: string[]; types: string[] } {
  const sf = ts.createSourceFile('gen.st.ts', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  const declared = new Set<string>()
  const used = new Set<string>()

  const noteDeclared = (n: ts.Node) => {
    if (ts.isFunctionDeclaration(n) && n.name) declared.add(n.name.text)
    if (ts.isParameter(n) && ts.isIdentifier(n.name)) declared.add(n.name.text)
    if (ts.isVariableDeclaration(n) && ts.isIdentifier(n.name)) declared.add(n.name.text)
    if (ts.isBindingElement(n) && ts.isIdentifier(n.name)) declared.add(n.name.text)
    // An imported name is bound by the import, so it must not also be declared
    // ambiently — that would hide a genuinely unresolved module behind an `any`.
    if (ts.isImportClause(n) && n.name) declared.add(n.name.text)
    if (ts.isImportSpecifier(n) || ts.isNamespaceImport(n)) declared.add(n.name.text)
    if (ts.isForInStatement(n) || ts.isForOfStatement(n)) {
      const init = n.initializer
      if (ts.isVariableDeclarationList(init)) {
        for (const d of init.declarations) if (ts.isIdentifier(d.name)) declared.add(d.name.text)
      }
    }
    ts.forEachChild(n, noteDeclared)
  }
  noteDeclared(sf)

  const noteUsed = (n: ts.Node) => {
    // Identifiers in value position, but not the property half of `a.b`.
    if (ts.isIdentifier(n)) {
      const parent = n.parent
      const isPropertyName = parent && ts.isPropertyAccessExpression(parent) && parent.name === n
      const isPropAssignKey =
        parent && (ts.isPropertyAssignment(parent) || ts.isPropertySignature(parent)) && parent.name === n
      if (!isPropertyName && !isPropAssignKey) used.add(n.text)
    }
    // Type references inside patterns and annotations.
    if (ts.isTypeReferenceNode(n)) {
      const root = n.typeName.getText(sf).split('.')[0]!
      used.add(root)
    }
    ts.forEachChild(n, noteUsed)
  }
  noteUsed(sf)

  const free = [...used]
    .filter((n) => !declared.has(n) && !AMBIENT_NAMES.has(n) && !LIB_GLOBALS.has(n))
    .filter((n) => /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(n))
    .filter((n) => n !== 'Hole')

  // A ScriptType function is a value, so referencing it in a *type* position (inside a
  // `matches<...>` pattern) needs a companion type alias as well.
  const fns: string[] = []
  const noteFns = (n: ts.Node) => {
    if (ts.isFunctionDeclaration(n) && n.name) fns.push(n.name.text)
    ts.forEachChild(n, noteFns)
  }
  noteFns(sf)
  const typesUsed = new Set<string>()
  const noteTypeUse = (n: ts.Node) => {
    if (ts.isTypeReferenceNode(n)) typesUsed.add(n.typeName.getText(sf).split('.')[0]!)
    ts.forEachChild(n, noteTypeUse)
  }
  noteTypeUse(sf)

  return {
    values: [...new Set(free)].sort(),
    /** Names needing a type alias: free names plus locally declared functions used as types. */
    types: [...new Set([...free, ...fns.filter((f) => typesUsed.has(f))])].sort(),
  }
}


/** Ambient declarations making a generated file self-contained. */
// Enough optional parameters to absorb any arity the corpus applies; too few gives
// "Generic type 'X' requires between 0 and N type arguments".
const GENERIC =
  '<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any,' +
  ' T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any>'

/**
 * Qualified type references grouped by root: `A.B` and `A.C` give `A -> {B, C}`.
 *
 * A root used this way must be declared as a *namespace*, not a type alias — `A.B` in a
 * type position with `type A = any` is TS2702, "only refers to a type, but is being used
 * as a namespace here". The member names can be recovered from the usages themselves.
 */
function qualifiedMembers(sf: ts.SourceFile): Map<string, Set<string>> {
  const out = new Map<string, Set<string>>()
  const add = (text: string) => {
    const parts = text.split('.')
    if (parts.length < 2) return
    const root = parts[0]!
    if (!out.has(root)) out.set(root, new Set())
    out.get(root)!.add(parts[1]!)
  }
  const walk = (n: ts.Node) => {
    if (ts.isTypeReferenceNode(n)) add(n.typeName.getText(sf))
    if (ts.isTypeQueryNode(n)) add(n.exprName.getText(sf))
    if (ts.isPropertyAccessExpression(n)) {
      let cur: ts.Node = n
      const parts: string[] = []
      while (ts.isPropertyAccessExpression(cur)) {
        parts.unshift(cur.name.text)
        cur = cur.expression
      }
      if (ts.isIdentifier(cur)) add([cur.text, ...parts].join('.'))
    }
    ts.forEachChild(n, walk)
  }
  walk(sf)
  return out
}

/**
 * The full ambient declaration block making a source self-contained: values, generic type
 * aliases, and namespaces for any root referenced as `A.B`.
 */
export function ambientFor(source: string): string {
  const sf = ts.createSourceFile('gen.st.ts', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  const free = freeNames(source)
  const quals = qualifiedMembers(sf)

  const nsRoots = [...quals.keys()]
    .filter((r) => free.values.includes(r) || free.types.includes(r))
    .sort()
  const nsSet = new Set(nsRoots)
  const lines: string[] = []

  // A root can be used three ways in the same file — qualified (`A.B`), as a bare type,
  // and as a value — and all three declarations coexist legally, so emit all of them.
  for (const root of nsRoots) {
    lines.push(`declare namespace ${root} {`)
    for (const m of [...quals.get(root)!].sort()) lines.push(`  export type ${m}${GENERIC} = any`)
    lines.push(`}`)
  }
  for (const n of free.values) lines.push(`declare const ${n}: any`)
  for (const n of free.types) lines.push(`type ${n}${GENERIC} = any`)
  void nsSet

  if (!lines.length) return ''
  return [
    '// Names this file references but does not define: types from elsewhere in the',
    '// library, and local functions used in type position. Declared so the generated',
    '// ScriptType typechecks standalone. They carry no runtime meaning.',
    ...lines,
    '',
  ].join('\n')
}

/** Ambient declarations making a generated file self-contained. */
export function declarePreamble(source: string): string {
  return ambientFor(source)
}

/**
 * Free names of ordinary TypeScript *type declarations* (not ScriptType).
 *
 * The ScriptType analysis above understands function syntax, where parameters are
 * function parameters. In a type alias the binders are different — type parameters,
 * `infer` names, mapped-type keys — so it needs its own walk, or it reports every type
 * parameter as free.
 */
export function declarePreambleForTypes(source: string): string {
  const sf = ts.createSourceFile('orig.ts', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  const declared = new Set<string>()
  const used = new Set<string>()

  const noteDeclared = (n: ts.Node) => {
    if (ts.isTypeAliasDeclaration(n) || ts.isInterfaceDeclaration(n)) declared.add(n.name.text)
    if (ts.isTypeParameterDeclaration(n)) declared.add(n.name.text)
    if (ts.isInferTypeNode(n)) declared.add(n.typeParameter.name.text)
    if (ts.isMappedTypeNode(n)) declared.add(n.typeParameter.name.text)
    if (ts.isModuleDeclaration(n) && ts.isIdentifier(n.name)) declared.add(n.name.text)
    ts.forEachChild(n, noteDeclared)
  }
  noteDeclared(sf)

  const noteUsed = (n: ts.Node) => {
    if (ts.isTypeReferenceNode(n)) used.add(n.typeName.getText(sf).split('.')[0]!)
    if (ts.isTypeQueryNode(n)) used.add(n.exprName.getText(sf).split('.')[0]!)
    ts.forEachChild(n, noteUsed)
  }
  noteUsed(sf)

  const free = [...used]
    .filter((n) => !declared.has(n) && !LIB_GLOBALS.has(n))
    .filter((n) => /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(n))
    .sort()
  if (!free.length) return ''
  return [
    '// Names imported from elsewhere in the library, declared here because relative',
    '// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.',
    ...free.map((n) => `type ${n}${GENERIC} = any`),
    '',
  ].join('\n')
}

/**
 * Locally declared ScriptType functions that the same file also uses in *type* position.
 *
 * A ScriptType function is a value, so writing `F<X>` inside a `matches<…>` pattern or a
 * `t<…>()` — both of which are type positions — is TS2749, "refers to a value but is
 * being used as a type". The name genuinely needs a type-space declaration alongside its
 * value-space one, which is exactly how the builtins are declared.
 *
 * Returns the names needing that companion alias, so a generated file can declare only
 * the ones it actually uses rather than one per function.
 */
export function localFunctionsUsedAsTypes(source: string): string[] {
  const sf = ts.createSourceFile('gen.st.ts', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  const functions = new Set<string>()
  const collectFns = (n: ts.Node) => {
    if (ts.isFunctionDeclaration(n) && n.name) functions.add(n.name.text)
    ts.forEachChild(n, collectFns)
  }
  collectFns(sf)
  if (!functions.size) return []

  const asTypes = new Set<string>()
  const collectTypes = (n: ts.Node) => {
    if (ts.isTypeReferenceNode(n)) {
      const root = n.typeName.getText(sf).split('.')[0]!
      if (functions.has(root)) asTypes.add(root)
    }
    ts.forEachChild(n, collectTypes)
  }
  collectTypes(sf)
  return [...asTypes].sort()
}

/**
 * The companion type aliases for `localFunctionsUsedAsTypes`, ready to prepend.
 *
 * Permissive and generic, because their only job is to make the name legal in type
 * position — the compiler reads the *function* for meaning, never this alias.
 */
export function declareLocalTypeAliases(source: string): string {
  const names = localFunctionsUsedAsTypes(source)
  if (!names.length) return ''
  return [
    '// A ScriptType function is a value, so these names also need a type-space',
    '// declaration to appear inside a `matches<…>` pattern or a `t<…>()`. The compiler',
    '// reads the function below for meaning; these carry none.',
    ...names.map((n) => `type ${n}${GENERIC} = any`),
    '',
  ].join('\n')
}

/** The free names of a source, for feeding the typecheck gate. */
export function freeNamesOf(source: string): string[] {
  const f = freeNames(source)
  return [...new Set([...f.values, ...f.types])]
}
