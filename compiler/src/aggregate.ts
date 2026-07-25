#!/usr/bin/env tsx
/**
 * Aggregate per-repo round-trip JSON into one coverage report.
 *
 * Usage: tsx src/aggregate.ts <dir-of-json-files> [--md out.md]
 */
import fs from 'node:fs'
import path from 'node:path'
import type { AliasOutcome, Status } from './batch.js'

const dir = process.argv[2]
if (!dir) {
  console.error('usage: aggregate.ts <dir-of-json-files> [--md out.md]')
  process.exit(2)
}
const mdIdx = process.argv.indexOf('--md')
const mdOut = mdIdx >= 0 ? process.argv[mdIdx + 1] : undefined

interface RepoRow {
  repo: string
  total: number
  covered: number
  counts: Map<Status, number>
  crashed: boolean
}

const rows: RepoRow[] = []
const gapCounts = new Map<string, number>()

// Group by the repository named in each outcome's `file`, not by the JSON filename:
// sharded runs put outcomes from every repository into every shard's file.
const byRepo = new Map<string, AliasOutcome[]>()
for (const f of fs.readdirSync(dir).sort()) {
  if (!f.endsWith('.json')) continue
  let outcomes: AliasOutcome[]
  try {
    outcomes = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'))
  } catch {
    continue
  }
  for (const o of outcomes) {
    const repo = o.file.split('/').slice(0, 2).join('/')
    if (!byRepo.has(repo)) byRepo.set(repo, [])
    byRepo.get(repo)!.push(o)
  }
}
for (const [repo, outcomes] of byRepo) {
  const counts = new Map<Status, number>()
  for (const o of outcomes) {
    counts.set(o.status, (counts.get(o.status) ?? 0) + 1)
    for (const g of o.gaps) gapCounts.set(g, (gapCounts.get(g) ?? 0) + 1)
  }
  rows.push({
    repo,
    total: outcomes.length,
    covered: counts.get('covered') ?? 0,
    counts,
    crashed: false,
  })
}

/**
 * A markdown cell cannot hold a newline, and a bare pipe would end it early. Everything
 * else survives: the reason is the only record of why a shard measured nothing, and a
 * module path cut off mid-word turns a one-line diagnosis into an investigation. The cap
 * is only there to stop a pathological message from swamping the table, and says so.
 */
const CELL_LIMIT = 400
function cell(text: string): string {
  const flat = text.replace(/\s+/g, ' ').replace(/\|/g, '\\|').trim()
  return flat.length > CELL_LIMIT ? `${flat.slice(0, CELL_LIMIT)}… (truncated)` : flat
}

// Repos whose json is missing entirely (the process died before writing it).
const crashReason = new Map<string, string>()
const txtOnly = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith('.txt'))
  .map((f) => f.replace(/\.txt$/, ''))
  .filter((n) => !fs.existsSync(path.join(dir, `${n}.json`)))
for (const n of txtOnly) {
  const repo = n.replace(/^(\d\d-[a-z-]+)_/, '$1/')
  let why = 'no output'
  try {
    const txt = fs.readFileSync(path.join(dir, `${n}.txt`), 'utf8')
    if (/heap out of memory|Ineffective mark-compacts/i.test(txt)) why = 'checker OOM'
    else if (/Maximum call stack/i.test(txt)) why = 'checker stack overflow'
    else if (/command not found/i.test(txt)) why = 'runner error'
    else {
      // Prefer the thrown error over the stack frames around it: a node crash dump puts
      // `throw err` first and the line that names the missing module several lines down.
      const lines = txt.split('\n').map((l) => l.trim()).filter(Boolean)
      const first =
        lines.find((l) => /^[A-Za-z]*Error[:\s]/.test(l)) ?? lines.find((l) => /error/i.test(l))
      if (first) why = first
    }
  } catch {
    /* keep default */
  }
  crashReason.set(repo, cell(why))
  rows.push({ repo, total: 0, covered: 0, counts: new Map(), crashed: true })
}

const sum = (k: Status) => rows.reduce((a, r) => a + (r.counts.get(k) ?? 0), 0)
const total = rows.reduce((a, r) => a + r.total, 0)
const covered = rows.reduce((a, r) => a + r.covered, 0)
const unresolved = sum('unresolved-deps')
const refErr = sum('reference-error')
const rawN = sum('raw')
const mismatch = sum('mismatch')
const compileErr = sum('compile-error')
/** Aliases that could actually be judged: the harness could typecheck them in isolation. */
const judgeable = total - unresolved - refErr

const pct = (n: number, d: number) => (d ? ((n / d) * 100).toFixed(1) + '%' : '—')

const lines: string[] = []
lines.push('| repo | aliases | covered | % of all | % judgeable | raw | mismatch | unjudged |')
lines.push('|---|--:|--:|--:|--:|--:|--:|--:|')
for (const r of [...rows].sort((a, b) => b.total - a.total)) {
  if (r.crashed) {
    lines.push(`| ${r.repo} | — | — | — | — | — | — | not measured: ${crashReason.get(r.repo) ?? 'unknown'} |`)
    continue
  }
  const u = (r.counts.get('unresolved-deps') ?? 0) + (r.counts.get('reference-error') ?? 0)
  const j = r.total - u
  lines.push(
    `| ${r.repo} | ${r.total} | ${r.covered} | ${pct(r.covered, r.total)} | ${pct(r.covered, j)} | ` +
      `${r.counts.get('raw') ?? 0} | ${r.counts.get('mismatch') ?? 0} | ${u} |`,
  )
}
lines.push(
  `| **TOTAL** | **${total}** | **${covered}** | **${pct(covered, total)}** | **${pct(covered, judgeable)}** | ` +
    `**${rawN}** | **${mismatch}** | **${unresolved + refErr}** |`,
)

const KNOWN_TOTAL = 7518

const report = [
  '## Round-trip coverage',
  '',
  total < KNOWN_TOTAL
    ? `> **Partial run.** ${total} of ${KNOWN_TOTAL} generic type aliases were measured; ` +
      `shards that exceeded their wall-clock cap contributed only their completed batches. ` +
      `Percentages below are of what was measured.`
    : '',
  // A capped shard and a crashed one both shrink the denominator, but only one of them is
  // expected. Saying which happened here, rather than only in a table cell, is what makes
  // a broken run distinguishable from a slow one at a glance.
  crashReason.size
    ? `>\n> **${crashReason.size} run(s) produced no results at all** ` +
      `(${[...crashReason.keys()].join(', ')}): ${[...new Set(crashReason.values())].join(' / ')}`
    : '',
  '',
  ...lines,
  '',
  `- **covered**: decompiled to ScriptType, recompiled, and type-identical to the original.`,
  `- **raw**: the decompiler hit a construct the language cannot express (${rawN}).`,
  `- **mismatch**: compiled but not type-identical (${mismatch}); **compile-error**: ${compileErr}.`,
  `- **unresolvable**: the harness could not typecheck the reference in isolation` +
    ` (cross-file imports, no node_modules in the clones) — ${unresolved + refErr}. A harness` +
    ` limitation, not a language gap.`,
  '',
  '### Language gaps (raw() fallbacks), most frequent first',
  '',
  ...[...gapCounts]
    .sort((a, b) => b[1] - a[1])
    .map(([g, n]) => `- ${n} — ${g}`),
].join('\n')

console.log(report)
if (mdOut) {
  fs.writeFileSync(mdOut, report + '\n')
  console.log(`\nwrote ${mdOut}`)
}
