/**
 * Prelude: hand-written type-level helpers that some builtins lower to, for
 * operations TypeScript has no native construct for (last-occurrence split,
 * string length, reverse, ...). Only the helpers a module actually uses get
 * emitted, along with their transitive dependencies.
 */
export const PRELUDE = {
    ScriptTypeError: {
        source: `type ScriptTypeError<M extends string> = { readonly __scriptTypeError: M }`,
    },
    Simplify: {
        source: `type Simplify<T> = { [K in keyof T]: T[K] } & {}`,
    },
    Equals: {
        source: `type Equals<A, B> =\n` +
            `  (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false`,
    },
    Trim: {
        provides: ['TrimLeft', 'TrimRight', 'Trim'],
        source: `type TrimLeft<S extends string> = S extends \` \${infer R}\` ? TrimLeft<R> : S\n` +
            `type TrimRight<S extends string> = S extends \`\${infer R} \` ? TrimRight<R> : S\n` +
            `type Trim<S extends string> = TrimLeft<TrimRight<S>>`,
    },
    Split: {
        source: `type Split<S extends string, Sep extends string, Acc extends string[] = []> =\n` +
            `  S extends \`\${infer H}\${Sep}\${infer T}\` ? Split<T, Sep, [...Acc, H]> : [...Acc, S]`,
    },
    /**
     * Split on the LAST occurrence. Walks forward accumulating the left side, and
     * keeps going as long as the remainder still contains the separator, so the
     * final split is the rightmost one.
     */
    SplitLast: {
        source: `type SplitLast<S extends string, Sep extends string> =\n` +
            `  S extends \`\${infer H}\${Sep}\${infer T}\`\n` +
            `    ? T extends \`\${string}\${Sep}\${string}\`\n` +
            `      ? SplitLast<T, Sep> extends [infer L extends string, infer R extends string]\n` +
            `        ? [\`\${H}\${Sep}\${L}\`, R]\n` +
            `        : never\n` +
            `      : [H, T]\n` +
            `    : [S, '']`,
    },
    ReplaceAll: {
        source: `type ReplaceAll<S extends string, From extends string, To extends string> =\n` +
            `  From extends '' ? S\n` +
            `  : S extends \`\${infer H}\${From}\${infer T}\` ? \`\${H}\${To}\${ReplaceAll<T, From, To>}\`\n` +
            `  : S`,
    },
    StrLength: {
        provides: ['StrLengthAcc', 'StrLength'],
        source: `type StrLengthAcc<S extends string, Acc extends unknown[] = []> =\n` +
            `  S extends \`\${string}\${infer R}\` ? StrLengthAcc<R, [...Acc, unknown]> : Acc['length']\n` +
            `type StrLength<S extends string> = StrLengthAcc<S>`,
    },
    Reverse: {
        source: `type Reverse<T extends readonly unknown[], Acc extends unknown[] = []> =\n` +
            `  T extends readonly [infer H, ...infer R] ? Reverse<R, [H, ...Acc]> : Acc`,
    },
    Join: {
        source: `type Join<T extends readonly string[], Sep extends string> =\n` +
            `  T extends readonly [infer H extends string, ...infer R extends string[]]\n` +
            `    ? R['length'] extends 0 ? H : \`\${H}\${Sep}\${Join<R, Sep>}\`\n` +
            `    : ''`,
    },
};
export const providedBy = (name) => PRELUDE[name]?.provides ?? [name];
/** Resolve the transitive closure of used prelude helpers, in dependency order. */
export function resolvePrelude(used) {
    const out = [];
    const seen = new Set();
    const visit = (name) => {
        if (seen.has(name))
            return;
        seen.add(name);
        const entry = PRELUDE[name];
        if (!entry)
            return;
        for (const d of entry.deps ?? [])
            visit(d);
        out.push({ source: entry.source, provides: providedBy(name) });
    };
    for (const n of used)
        visit(n);
    return out;
}
