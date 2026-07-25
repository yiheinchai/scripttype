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
export function declarePreamble(source: string): string {
  const free = freeNames(source)
  if (!free.values.length && !free.types.length) return ''
  const GENERIC = '<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any>'
  return [
    '// Names this file references but does not define: types from elsewhere in the',
    '// library, and local functions used in type position. Declared so the generated',
    '// ScriptType typechecks standalone. They carry no runtime meaning.',
    ...free.values.map((n) => `declare const ${n}: any`),
    ...free.types.map((n) => `type ${n}${GENERIC} = any`),
    '',
  ].join('\n')
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
  const GENERIC = '<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any>'
  return [
    '// Names imported from elsewhere in the library, declared here because relative',
    '// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.',
    ...free.map((n) => `type ${n}${GENERIC} = any`),
    '',
  ].join('\n')
}

/** The free names of a source, for feeding the typecheck gate. */
export function freeNamesOf(source: string): string[] {
  const f = freeNames(source)
  return [...new Set([...f.values, ...f.types])]
}
