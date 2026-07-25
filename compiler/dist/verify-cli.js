#!/usr/bin/env tsx
/** Corpus verification CLI: `pnpm verify [filter] [--verbose]` */
import { runCorpus } from './corpus.js';
import { formatResult } from './verify.js';
const args = process.argv.slice(2);
const verbose = args.includes('--verbose') || args.includes('-v');
const showCode = args.includes('--code');
const filter = args.find((a) => !a.startsWith('-'));
const summary = runCorpus(filter);
if (summary.total === 0) {
    console.log(`No corpus targets found${filter ? ` matching '${filter}'` : ''}.`);
    process.exit(0);
}
const line = (r) => {
    const flags = [];
    if (!r.rawFree)
        flags.push('uses raw()');
    if (r.provenance === 'drifted')
        flags.push('reference drifted from clone');
    if (r.provenance === 'missing')
        flags.push('clone file missing');
    if (r.meta.adapted)
        flags.push('adapted reference');
    const suffix = flags.length ? `  [${flags.join('; ')}]` : '';
    if (r.compileError)
        return `FAIL  ${r.meta.name}\n  compile error: ${r.compileError}${suffix}`;
    const base = formatResult(r.verify);
    return base + suffix;
};
for (const r of summary.results) {
    const ok = r.verify?.ok && r.rawFree;
    if (ok && !verbose) {
        console.log(line(r));
    }
    else {
        console.log(line(r));
        if ((showCode || (!ok && verbose)) && r.compiled) {
            console.log(r.compiled
                .trimEnd()
                .split('\n')
                .map((l) => `    | ${l}`)
                .join('\n'));
        }
    }
}
const pct = summary.total ? Math.round((summary.covered / summary.total) * 100) : 0;
console.log(`\n${summary.covered}/${summary.total} covered (${pct}%)` +
    (summary.passed !== summary.covered ? `, ${summary.passed} passing but using raw()` : ''));
process.exit(summary.covered === summary.total ? 0 : 1);
