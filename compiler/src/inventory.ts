#!/usr/bin/env tsx
/**
 * Corpus inventory: count the type-level declarations across the cloned repositories
 * so coverage is reported against a real denominator rather than a guess.
 *
 * Counts only *type-level functions* — type aliases with at least one type parameter,
 * which are the constructs ScriptType exists to replace. Plain aliases (`type X = string`)
 * and interfaces are reported separately.
 */
import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'
import { REPO_ROOT, findTargets, runTarget } from './corpus.js'

const SKIP_DIR =
  /(^|\/)(node_modules|dist|build|\.git|coverage|docs|website|examples?|e2e|__tests__|tests?|benchmarks?|fixtures)(\/|$)/
const SKIP_FILE = /\.(test|spec|bench|test-d|test-types)\.tsx?$/

export interface RepoStats {
  repo: string
  files: number
  generic: number
  plain: number
  interfaces: number
  /** Declarations using constructs that make them type-level programs. */
  conditional: number
  mapped: number
  templateLit: number
  recursive: number
}

function walkFiles(dir: string, out: string[] = []): string[] {
  let entries: fs.Dirent[]
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true })
  } catch {
    return out
  }
  for (const e of entries) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (!SKIP_DIR.test(p)) walkFiles(p, out)
    } else if (/\.tsx?$/.test(e.name) && !SKIP_FILE.test(e.name)) {
      out.push(p)
    }
  }
  return out
}

export function analyzeRepo(repoDir: string, repoLabel: string): RepoStats {
  const stats: RepoStats = {
    repo: repoLabel,
    files: 0,
    generic: 0,
    plain: 0,
    interfaces: 0,
    conditional: 0,
    mapped: 0,
    templateLit: 0,
    recursive: 0,
  }
  for (const file of walkFiles(repoDir)) {
    let text: string
    try {
      text = fs.readFileSync(file, 'utf8')
    } catch {
      continue
    }
    if (text.length > 2_000_000) continue
    stats.files++
    const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, false, ts.ScriptKind.TS)
    const visit = (n: ts.Node) => {
      if (ts.isInterfaceDeclaration(n)) stats.interfaces++
      if (ts.isTypeAliasDeclaration(n)) {
        const generic = (n.typeParameters?.length ?? 0) > 0
        if (generic) stats.generic++
        else stats.plain++
        let hasCond = false
        let hasMapped = false
        let hasTpl = false
        let selfRef = false
        const name = n.name.text
        const scan = (x: ts.Node) => {
          if (ts.isConditionalTypeNode(x)) hasCond = true
          if (ts.isMappedTypeNode(x)) hasMapped = true
          if (ts.isTemplateLiteralTypeNode(x)) hasTpl = true
          if (ts.isTypeReferenceNode(x) && x.typeName.getText(sf) === name) selfRef = true
          ts.forEachChild(x, scan)
        }
        ts.forEachChild(n, scan)
        if (hasCond) stats.conditional++
        if (hasMapped) stats.mapped++
        if (hasTpl) stats.templateLit++
        if (selfRef) stats.recursive++
      }
      ts.forEachChild(n, visit)
    }
    visit(sf)
  }
  return stats
}

export function inventory(): RepoStats[] {
  const out: RepoStats[] = []
  for (const cat of fs.readdirSync(REPO_ROOT, { withFileTypes: true })) {
    if (!cat.isDirectory() || !/^\d\d-/.test(cat.name)) continue
    const catDir = path.join(REPO_ROOT, cat.name)
    for (const repo of fs.readdirSync(catDir, { withFileTypes: true })) {
      if (!repo.isDirectory()) continue
      out.push(analyzeRepo(path.join(catDir, repo.name), `${cat.name}/${repo.name}`))
    }
  }
  return out
}

if (process.argv[1] && import.meta.filename === path.resolve(process.argv[1])) {
  const stats = inventory()
  const covered = new Map<string, number>()
  for (const dir of findTargets()) {
    const r = runTarget(dir)
    if (r.verify?.ok && r.rawFree) {
      const repo = r.meta.sourcePath.split('/').slice(0, 2).join('/')
      covered.set(repo, (covered.get(repo) ?? 0) + 1)
    }
  }

  const pad = (s: string | number, n: number) => String(s).padStart(n)
  console.log('repo'.padEnd(42) + pad('generic', 8) + pad('cond', 6) + pad('mapped', 7) + pad('tpl', 5) + pad('rec', 5) + pad('covered', 9))
  console.log('-'.repeat(82))
  let tg = 0, tc = 0, tm = 0, tt = 0, tr = 0, tcov = 0
  for (const s of stats.sort((a, b) => b.generic - a.generic)) {
    const cov = covered.get(s.repo) ?? 0
    tg += s.generic; tc += s.conditional; tm += s.mapped; tt += s.templateLit; tr += s.recursive; tcov += cov
    console.log(
      s.repo.padEnd(42) + pad(s.generic, 8) + pad(s.conditional, 6) + pad(s.mapped, 7) + pad(s.templateLit, 5) + pad(s.recursive, 5) + pad(cov || '', 9),
    )
  }
  console.log('-'.repeat(82))
  console.log('TOTAL'.padEnd(42) + pad(tg, 8) + pad(tc, 6) + pad(tm, 7) + pad(tt, 5) + pad(tr, 5) + pad(tcov, 9))
  console.log(
    `\nGeneric type aliases (the ScriptType target set): ${tg}\n` +
      `Covered so far: ${tcov} (${((tcov / tg) * 100).toFixed(2)}%)`,
  )
}
