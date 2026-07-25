#!/usr/bin/env tsx
/**
 * Batch-author corpus targets: extract each reference verbatim from its clone, then
 * write the ScriptType program that must compile to an equivalent type.
 */
import fs from 'node:fs';
import path from 'node:path';
import { extractType } from './extract.js';
import { CORPUS_ROOT, REPO_ROOT } from './corpus.js';
const KY = '04-query-builders-orm/kysely/src/util/type-utils.ts';
const TP = '01-type-level-programming/ts-pattern/src/types/helpers.ts';
const SPECS = [
    {
        name: 'kysely/Nullable',
        sourcePath: KY,
        typeName: 'Nullable',
        samples: ['{ a: string; b: number }', '{}', '{ a: string | null }', '{ readonly a: 1 }'],
        exercises: 'for-in -> mapped type',
        st: `export function Nullable(t: unknown) {
  const out = {}
  for (const p in t) {
    out[p] = t[p] | null
  }
  return out
}
`,
    },
    {
        name: 'kysely/ArrayItemType',
        sourcePath: KY,
        typeName: 'ArrayItemType',
        samples: ['string[]', 'readonly number[]', '[1, 2]', 'string', 'never', '(string | number)[]'],
        exercises: 'elementOf() builtin -> ReadonlyArray<infer I> destructure',
        st: `export function ArrayItemType(t: unknown) {
  return elementOf(t)
}
`,
    },
    {
        name: 'kysely/SqlBool',
        sourcePath: KY,
        typeName: 'SqlBool',
        samples: [''],
        exercises: 'union of literals, no parameters',
        st: `export function SqlBool() {
  return boolean | 0 | 1
}
`,
    },
    {
        name: 'kysely/UnknownRow',
        sourcePath: KY,
        typeName: 'UnknownRow',
        samples: [''],
        exercises: 'calling a lib generic (Record) from ScriptType',
        st: `export function UnknownRow() {
  return Record(string, unknown)
}
`,
    },
    {
        name: 'kysely/Simplify',
        sourcePath: KY,
        typeName: 'Simplify',
        samples: ['{ a: string } & { b: number }', '{}', '{ a: 1 }', 'string'],
        exercises: 'mapped type combined with defer() (DrainOuterGeneric)',
        st: `export function Simplify(t: unknown) {
  const out = {}
  for (const k in t) {
    out[k] = t[k]
  }
  return defer(out & {})
}
`,
    },
    {
        name: 'kysely/ShallowRecord',
        sourcePath: KY,
        typeName: 'ShallowRecord',
        samples: ["'a' | 'b', number", "string, unknown", "'x', { y: 1 }"],
        exercises: 'keySet() marks an already-key-union domain: [P in K], not [P in keyof K]',
        st: `export function ShallowRecord(K: keyof any, T: unknown) {
  const out = {}
  for (const p in keySet(K)) {
    out[p] = T
  }
  return defer(out)
}
`,
    },
    {
        name: 'ts-pattern/IsNever',
        sourcePath: TP,
        typeName: 'IsNever',
        samples: ['never', 'string', 'any', 'unknown'],
        exercises: 'isNever() builtin',
        st: `export function IsNever(T: unknown) {
  if (isNever(T)) return true
  return false
}
`,
    },
    {
        name: 'ts-pattern/IsAny',
        sourcePath: TP,
        typeName: 'IsAny',
        samples: ['any', 'string', 'unknown', 'never'],
        exercises: 'isAny() builtin',
        st: `export function IsAny(a: unknown) {
  if (isAny(a)) return true
  return false
}
`,
    },
    {
        name: 'ts-pattern/Equal',
        sourcePath: TP,
        typeName: 'Equal',
        samples: ['string, string', 'string, number', 'any, unknown', '{a:1}, {a:1}'],
        exercises: 'equals() builtin',
        st: `export function Equal(a: unknown, b: unknown) {
  return equals(a, b)
}
`,
    },
    {
        name: 'ts-pattern/Length',
        sourcePath: TP,
        typeName: 'Length',
        samples: ['[]', '[1, 2, 3]', 'string[]', 'readonly [1]'],
        exercises: "length() builtin -> T['length']",
        st: `export function Length(it: readonly any[]) {
  return length(it)
}
`,
    },
    {
        name: 'ts-pattern/ValueOf',
        sourcePath: TP,
        typeName: 'ValueOf',
        samples: ['[1, 2]', '{ a: string; b: number }', 'string[]', '{}'],
        exercises: 'if/else over an array check, indexed access by number and keyof',
        st: `export function ValueOf(a: unknown) {
  if (extendsType<readonly any[]>(a)) {
    return indexOfType(a)
  }
  return a[keyof(a)]
}
`,
    },
    {
        name: 'ts-pattern/LeastUpperBound',
        sourcePath: TP,
        typeName: 'LeastUpperBound',
        samples: ['string, "a"', '"a", string', 'number, string', '1, 1'],
        exercises: 'two-level nested conditional with parameter-to-parameter checks',
        st: `export function LeastUpperBound(a: unknown, b: unknown) {
  if (isSubtypeOf(b, a)) return b
  if (isSubtypeOf(a, b)) return a
  return never
}
`,
    },
    {
        name: 'ts-pattern/Next',
        sourcePath: TP,
        typeName: 'Next',
        samples: ['[]', '[any]', '[1, 2]'],
        exercises: 'tuple prepend',
        st: `export function Next(it: any[]) {
  return prepend(it, any)
}
`,
    },
    {
        name: 'ts-pattern/Prev',
        sourcePath: TP,
        typeName: 'Prev',
        samples: ['[]', '[any]', '[1, 2, 3]'],
        exercises: 'tuple destructure with an unread head, pruned to a wildcard',
        st: `export function Prev(it: any[]) {
  const [, ...tail] = orElse(it, [])
  return tail
}
`,
    },
];
let created = 0;
for (const s of SPECS) {
    const abs = path.join(REPO_ROOT, s.sourcePath);
    let extracted;
    try {
        extracted = extractType(abs, s.typeName);
    }
    catch (e) {
        console.log(`SKIP ${s.name}: ${e.message.split('\n')[0]}`);
        continue;
    }
    const dir = path.join(CORPUS_ROOT, s.name);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'reference.ts'), extracted.source);
    fs.writeFileSync(path.join(dir, 'source.st.ts'), s.st);
    fs.writeFileSync(path.join(dir, 'meta.json'), JSON.stringify({ name: s.name, sourcePath: s.sourcePath, typeName: s.typeName, samples: s.samples, exercises: s.exercises }, null, 2) + '\n');
    created++;
    if (extracted.unresolved.length) {
        console.log(`  ${s.name}: unresolved deps ${extracted.unresolved.join(', ')}`);
    }
}
console.log(`wrote ${created} targets`);
