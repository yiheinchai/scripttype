#!/usr/bin/env tsx
/**
 * Scaffold a corpus target by extracting a reference type verbatim from a clone.
 *
 *   tsx src/scaffold.ts <corpus-relative-path> <TypeName> <name> [sample...]
 */
import fs from 'node:fs';
import path from 'node:path';
import { extractType } from './extract.js';
import { CORPUS_ROOT, REPO_ROOT } from './corpus.js';
const [rel, typeName, name, ...samples] = process.argv.slice(2);
if (!rel || !typeName || !name) {
    console.error('usage: scaffold.ts <corpus-relative-path> <TypeName> <group/name> [samples...]');
    process.exit(2);
}
const abs = path.join(REPO_ROOT, rel);
const { source, emitted, unresolved } = extractType(abs, typeName);
const dir = path.join(CORPUS_ROOT, name);
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'reference.ts'), source);
const metaPath = path.join(dir, 'meta.json');
if (!fs.existsSync(metaPath)) {
    fs.writeFileSync(metaPath, JSON.stringify({ name, sourcePath: rel, typeName, samples }, null, 2) + '\n');
}
const stPath = path.join(dir, 'source.st.ts');
if (!fs.existsSync(stPath))
    fs.writeFileSync(stPath, '');
console.log(`scaffolded ${name}`);
console.log(`  emitted deps: ${emitted.join(', ')}`);
if (unresolved.length)
    console.log(`  UNRESOLVED (fixture will not typecheck): ${unresolved.join(', ')}`);
console.log(`--- reference.ts ---\n${source}`);
