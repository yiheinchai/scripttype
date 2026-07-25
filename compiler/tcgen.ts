import fs from 'node:fs'
import path from 'node:path'
import { typecheckScriptType } from './src/typecheck.js'
const root = process.argv[2]!
const files: string[] = []
const walk = (d: string) => { for (const e of fs.readdirSync(d, {withFileTypes:true})) {
  const p = path.join(d, e.name); if (e.isDirectory()) walk(p); else if (p.endsWith('.st.ts')) files.push(p) } }
walk(root)
let ok=0, bad=0; const reasons = new Map<string,number>()
for (const f of files) {
  const r = typecheckScriptType({ [path.basename(f)]: fs.readFileSync(f,'utf8') })
  if (r.ok) ok++
  else { bad++
    for (const e of r.errors.slice(0,3)) {
      const k = e.replace(/^[^ ]+/,'').replace(/'[^']*'/g,"'X'").slice(0,80)
      reasons.set(k,(reasons.get(k)??0)+1)
    }
  }
}
console.log(`${ok}/${ok+bad} generated files typecheck cleanly`)
for (const [k,n] of [...reasons].sort((a,b)=>b[1]-a[1]).slice(0,10)) console.log(`  ${String(n).padStart(4)}  ${k}`)
