/**
 * Loop recovery: turn a tail-recursive type alias back into a `while` loop.
 *
 * This is the inverse of the compiler's flagship transformation, and it is the largest
 * readability win available on decompiled output. A type like
 *
 *     type Split<S extends string, D extends string, T extends string[] = []> =
 *       S extends `${infer BS}${D}${infer AS}` ? Split<AS, D, [...T, BS]> : [...T, S]
 *
 * is a loop written as recursion because the type system has no loops. Recovering the
 * loop restores the form a person would actually write:
 *
 *     export function Split(S, D) {
 *       const T = []
 *       let rest = S
 *       while (true) {
 *         const m = matches<`${Hole<'BS'>}${typeof D}${Hole<'AS'>}`>(rest)
 *         if (!m) break
 *         T.push(m.BS)
 *         rest = m.AS
 *       }
 *       return [...T, rest]
 *     }
 *
 * Recovery is deliberately conservative: it fires only on the clean tail-recursive
 * accumulator shape and bails out otherwise, leaving the recursive form in place. A
 * wrong recovery cannot slip through silently either — the round-trip gate compares the
 * recompiled type against the original.
 */
import ts from 'typescript';
/**
 * Recognise `type F<...> = Check extends Pattern ? F<...> : Exit`.
 *
 * Requirements, all necessary for the rewrite to be sound:
 *  - the body is a conditional whose true-branch is a direct self-application;
 *  - the recursive call passes exactly one argument per declared parameter;
 *  - at least one parameter actually changes, or the loop would not terminate;
 *  - the false-branch is the loop's result.
 */
export function detectTailLoop(decl, sf) {
    const name = decl.name.text;
    const params = [...(decl.typeParameters ?? [])];
    if (!params.length)
        return undefined;
    const body = unwrap(decl.type);
    if (!ts.isConditionalTypeNode(body))
        return undefined;
    // Exactly one branch may be the recursive call; the other is the exit.
    const trueIsRec = isSelfCall(body.trueType, name);
    const falseIsRec = isSelfCall(body.falseType, name);
    if (trueIsRec === falseIsRec)
        return undefined;
    const recCall = unwrap(trueIsRec ? body.trueType : body.falseType);
    const exit = trueIsRec ? body.falseType : body.trueType;
    // When the loop continues on guard *failure*, the exit is the true-branch, so any
    // bindings would have to outlive the loop body. Only allow it for a binding-free guard.
    if (!trueIsRec && hasInfer(body.extendsType))
        return undefined;
    const args = [...(recCall.typeArguments ?? [])];
    if (args.length !== params.length)
        return undefined;
    // The guard may test any expression — `it['length']` as readily as a bare parameter.
    // What makes this a loop is that at least one parameter changes each round; that is
    // checked below, and the round-trip gate confirms the rewrite preserves the type.
    const changing = new Set();
    params.forEach((p, i) => {
        if (plainName(args[i], sf) !== p.name.text)
            changing.add(p.name.text);
    });
    if (!changing.size)
        return undefined;
    const publicParams = params.filter((p) => !p.default);
    const accumulators = params
        .filter((p) => p.default)
        .map((p) => ({ param: p, init: p.default }));
    // Every changing parameter must be either public or an accumulator — always true, but
    // stated so the invariant is checked rather than assumed.
    for (const c of changing) {
        if (!params.some((p) => p.name.text === c))
            return undefined;
    }
    return {
        publicParams,
        accumulators,
        check: body.checkType,
        pattern: body.extendsType,
        nextArgs: args,
        exit,
        changing,
        recursiveOnTrue: trueIsRec,
    };
}
function hasInfer(t) {
    let found = false;
    const walk = (n) => {
        if (ts.isInferTypeNode(n))
            found = true;
        ts.forEachChild(n, walk);
    };
    walk(t);
    return found;
}
function unwrap(t) {
    while (ts.isParenthesizedTypeNode(t))
        t = t.type;
    return t;
}
function isSelfCall(t, name) {
    const n = unwrap(t);
    return ts.isTypeReferenceNode(n) && ts.isIdentifier(n.typeName) && n.typeName.text === name;
}
/** The identifier of a bare type reference, or undefined if it is anything else. */
function plainName(t, sf) {
    const n = unwrap(t);
    if (ts.isTypeReferenceNode(n) && ts.isIdentifier(n.typeName) && !n.typeArguments?.length) {
        return n.typeName.text;
    }
    void sf;
    return undefined;
}
