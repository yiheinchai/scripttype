"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompileError = void 0;
exports.compileSourceFile = compileSourceFile;
/**
 * The lowering pass: imperative statements -> pure type expressions.
 *
 * The whole compiler is a continuation-passing translation. `lowerStmts` carries a
 * continuation `k` describing "what the rest of the function does", so an `if`
 * becomes a conditional type whose two branches each contain the continuation, and
 * a `return` simply discards it. Loops become generated tail-recursive helper
 * aliases whose parameters are the loop's mutable variables.
 */
const typescript_1 = __importDefault(require("typescript"));
const ir_js_1 = require("./ir.js");
const builtins_js_1 = require("./builtins.js");
const diagnostics_js_1 = require("./diagnostics.js");
/**
 * A user-facing compiler error.
 *
 * `code` indexes the diagnostic catalogue, which supplies the `help:` line and the
 * long-form `scripttype explain` text. `help` overrides the catalogue where the throw
 * site knows something more specific (a "did you mean" suggestion, say).
 */
class CompileError extends Error {
    node;
    code;
    help;
    constructor(message, node, code = 'ST1500', help) {
        super(message);
        this.node = node;
        this.code = code;
        this.help = help;
    }
}
exports.CompileError = CompileError;
/**
 * What each `typeof` tag narrows to as a type. Thunks, because the IR nodes for the
 * compound cases are built rather than shared.
 */
const TYPEOF_TAGS = {
    string: () => (0, ir_js_1.kw)('string'),
    number: () => (0, ir_js_1.kw)('number'),
    boolean: () => (0, ir_js_1.kw)('boolean'),
    bigint: () => (0, ir_js_1.kw)('bigint'),
    symbol: () => (0, ir_js_1.kw)('symbol'),
    object: () => (0, ir_js_1.kw)('object'),
    undefined: () => (0, ir_js_1.kw)('undefined'),
    // There is no `function` keyword type, and the general callable signature must take
    // a *rest* parameter: `(a0: any[]) => any` accepts only a single array argument, so
    // `(x: string) => void` would not match it.
    function: () => ({
        kind: 'fn',
        params: [{ kind: 'array', element: (0, ir_js_1.kw)('any') }],
        ret: (0, ir_js_1.kw)('any'),
        hasRest: true,
    }),
};
/**
 * The element type of an array constraint, when it is informative.
 *
 * `readonly unknown[]` is the fallback constraint the loop lowering uses when nothing
 * better is known, and constraining a peeled element to `unknown` buys nothing, so it
 * is treated as absent.
 */
function elementTypeOf(constraint) {
    if (!constraint)
        return undefined;
    if (constraint.kind === 'array') {
        const el = constraint.element;
        return el.kind === 'keyword' && el.name === 'unknown' ? undefined : el;
    }
    return undefined;
}
/** Human-readable name for a statement kind, for "X has no type-level meaning". */
function describeStatement(stmt) {
    const names = {
        [typescript_1.default.SyntaxKind.TryStatement]: '`try`/`catch`',
        [typescript_1.default.SyntaxKind.DoStatement]: '`do`/`while`',
        [typescript_1.default.SyntaxKind.ForStatement]: 'a C-style `for` loop',
        [typescript_1.default.SyntaxKind.LabeledStatement]: 'a labelled statement',
        [typescript_1.default.SyntaxKind.ClassDeclaration]: 'a class declaration',
        [typescript_1.default.SyntaxKind.WithStatement]: '`with`',
        [typescript_1.default.SyntaxKind.EmptyStatement]: 'an empty statement',
        [typescript_1.default.SyntaxKind.DebuggerStatement]: '`debugger`',
        [typescript_1.default.SyntaxKind.FunctionDeclaration]: 'a nested function declaration',
    };
    return names[stmt.kind] ?? `\`${typescript_1.default.SyntaxKind[stmt.kind]}\``;
}
/**
 * `unknown variable 'x'` is the most common ScriptType error, and almost always either
 * a typo or a reach for a runtime global. Both deserve a specific fix, not a generic one.
 */
function unknownVariable(target, vars) {
    const name = target.text;
    const RUNTIME_GLOBALS = new Set([
        'console', 'Math', 'JSON', 'process', 'window', 'document', 'globalThis',
        'Date', 'RegExp', 'Error', 'Map', 'Set', 'Reflect',
    ]);
    if (RUNTIME_GLOBALS.has(name)) {
        return [
            `'${name}' is a runtime value and has no type-level meaning`,
            target,
            'ST1102',
            `Type-level code cannot observe \`${name}\`; delete the statement.`,
        ];
    }
    const near = (0, diagnostics_js_1.didYouMean)(name, [...vars.keys(), ...Object.keys(builtins_js_1.BUILTINS)]);
    return [
        `unknown variable '${name}'`,
        target,
        'ST1102',
        near ? `Did you mean \`${near}\`?` : undefined,
    ];
}
/** Compound assignment and side-effecting calls are the two common shapes here. */
function unsupportedStatementExpression(e) {
    if (typescript_1.default.isBinaryExpression(e) && typescript_1.default.isIdentifier(e.left)) {
        const op = typescript_1.default.tokenToString(e.operatorToken.kind) ?? '?=';
        if (op.length > 1 && op.endsWith('=')) {
            const bare = op.slice(0, -1);
            const x = e.left.text;
            return [
                `compound assignment \`${op}\` is not supported`,
                e,
                'ST1101',
                `Write it out: \`${x} = ${x} ${bare} ${e.right.getText()}\`.`,
            ];
        }
    }
    return [`\`${e.getText()}\` has no type-level meaning`, e, 'ST1101'];
}
/** An unsupported expression, with a hint for the shapes people actually reach for. */
function unsupportedExpression(e) {
    const hints = {
        [typescript_1.default.SyntaxKind.ArrowFunction]: 'Type-level code has no closures; declare a top-level function and call it by name.',
        [typescript_1.default.SyntaxKind.FunctionExpression]: 'Type-level code has no closures; declare a top-level function and call it by name.',
        [typescript_1.default.SyntaxKind.AwaitExpression]: 'There is nothing to await at the type level.',
        [typescript_1.default.SyntaxKind.NewExpression]: 'Use `ctorType(params, ret)` for a constructor type, or name the type with `t<T>()`.',
        [typescript_1.default.SyntaxKind.RegularExpressionLiteral]: 'Match with a template-literal pattern instead: `matches<`${Hole<"A">}-${Hole<"B">}`>(x)`.',
        [typescript_1.default.SyntaxKind.TypeOfExpression]: 'In an expression a name already denotes its type; `typeof` is only needed inside a type annotation.',
    };
    return [
        `${typescript_1.default.SyntaxKind[e.kind]} \`${ellipsis(e.getText())}\` has no type-level lowering`,
        e,
        'ST1500',
        hints[e.kind],
    ];
}
const ellipsis = (s, n = 40) => s.length <= n ? s : s.slice(0, n - 1).replace(/\s+$/, '') + '…';
const TYPE_KEYWORDS = new Set([
    'string',
    'number',
    'boolean',
    'bigint',
    'symbol',
    'object',
    'unknown',
    'never',
    'any',
    'void',
    'null',
    'undefined',
]);
function pascal(name) {
    if (!name)
        return name;
    // Already capitalized (or SHOUTY) — respect the author's choice so emitted
    // parameter names can match a library's originals exactly.
    if (name[0] === name[0].toUpperCase())
        return name;
    return name[0].toUpperCase() + name.slice(1);
}
function compileSourceFile(sf, opts = {}) {
    const aliases = [];
    const prelude = new Set();
    const imports = [];
    const errors = [];
    for (const stmt of sf.statements) {
        const imported = importInfo(stmt);
        if (imported) {
            imports.push(imported);
        }
        else if (typeFunction(stmt)) {
            // A function is the natural recovery boundary: each compiles to its own alias, so
            // one failing does not corrupt the others.
            try {
                const fc = new FunctionCompiler(typeFunction(stmt), sf, prelude, opts);
                aliases.push(...fc.compile());
            }
            catch (e) {
                if (!(e instanceof CompileError))
                    throw e;
                errors.push(e);
            }
        }
        else if (typescript_1.default.isTypeAliasDeclaration(stmt)) {
            // Pass hand-written type aliases through untouched.
            aliases.push({
                name: stmt.name.text,
                params: (stmt.typeParameters ?? []).map((tp) => ({
                    name: tp.name.text,
                    constraint: tp.constraint ? rawType(tp.constraint) : undefined,
                    default: tp.default ? rawType(tp.default) : undefined,
                })),
                body: rawType(stmt.type),
                exported: hasExport(stmt),
            });
        }
    }
    return { aliases, prelude, imports, errors };
}
/**
 * Recognise a statement that declares a type function, in either spelling.
 *
 * `export const F = (x) => …` only counts when it is a single `const` bound directly to
 * an arrow function: a `let`, a destructuring, or several declarators in one statement
 * are not alias declarations and should fall through to the normal unsupported path
 * rather than being half-understood.
 */
function typeFunction(stmt) {
    if (typescript_1.default.isFunctionDeclaration(stmt) && stmt.body && stmt.name) {
        return {
            name: stmt.name.text,
            parameters: stmt.parameters,
            body: stmt.body,
            exported: hasExport(stmt),
            docNode: stmt,
        };
    }
    if (!typescript_1.default.isVariableStatement(stmt))
        return undefined;
    const list = stmt.declarationList;
    if (!(list.flags & typescript_1.default.NodeFlags.Const) || list.declarations.length !== 1)
        return undefined;
    const decl = list.declarations[0];
    if (!typescript_1.default.isIdentifier(decl.name) || !decl.initializer)
        return undefined;
    if (!typescript_1.default.isArrowFunction(decl.initializer))
        return undefined;
    return {
        name: decl.name.text,
        parameters: decl.initializer.parameters,
        body: decl.initializer.body,
        exported: hasExport(stmt),
        // JSDoc hangs off the statement, not the arrow.
        docNode: stmt,
    };
}
/**
 * Read an import or re-export declaration, or return undefined for anything else.
 *
 * A side-effect import (`import './x.js'`) is deliberately dropped: it has no type-level
 * meaning, and carrying it into a file of pure type aliases would emit a runtime import
 * from a module that no longer exists at that path.
 */
function importInfo(stmt) {
    const read = (clause, specifier, isExport) => {
        const info = { specifier, named: [], isExport };
        if (clause && 'name' in clause && clause.name)
            info.defaultName = clause.name.text;
        const bindings = clause && 'namedBindings' in clause ? clause.namedBindings : clause;
        if (bindings) {
            if (typescript_1.default.isNamespaceImport(bindings) || typescript_1.default.isNamespaceExport(bindings)) {
                info.namespaceName = bindings.name.text;
            }
            else if (typescript_1.default.isNamedImports(bindings) || typescript_1.default.isNamedExports(bindings)) {
                for (const el of bindings.elements) {
                    info.named.push({
                        name: (el.propertyName ?? el.name).text,
                        alias: el.propertyName ? el.name.text : undefined,
                    });
                }
            }
        }
        return info.named.length || info.defaultName || info.namespaceName ? info : undefined;
    };
    if (typescript_1.default.isImportDeclaration(stmt) && typescript_1.default.isStringLiteral(stmt.moduleSpecifier)) {
        return read(stmt.importClause, stmt.moduleSpecifier.text, false);
    }
    // Only a re-export can be carried over; a bare `export { X }` refers to local
    // declarations, which are already emitted with their own `export` modifier.
    if (typescript_1.default.isExportDeclaration(stmt) && stmt.moduleSpecifier && typescript_1.default.isStringLiteral(stmt.moduleSpecifier)) {
        return read(stmt.exportClause, stmt.moduleSpecifier.text, true);
    }
    return undefined;
}
const hasExport = (n) => !!(typescript_1.default.getCombinedModifierFlags(n) & typescript_1.default.ModifierFlags.Export);
const rawType = (n) => ({ kind: 'raw', text: n.getText() });
class FunctionCompiler {
    fn;
    sf;
    prelude;
    opts;
    helpers = [];
    used = new Set();
    counter = 0;
    fnName;
    /** Type parameters of the top-level alias, carried into every generated helper. */
    topParams = [];
    /**
     * Variables bound to a pattern match: `const m = matches<P>(v)`.
     *
     * The match itself is not a value, so `m` is not bound in `vars`; testing `m` lowers
     * to the conditional, and `m.H` reads hole `H` bound by the pattern. This two-step
     * form exists so ScriptType source typechecks: a hole name cannot simply appear as a
     * free identifier, but a property of an `any` is always well-typed.
     */
    markers = new Map();
    /** Declared annotations of local `const`/`let`, used to constrain accumulators. */
    localTypes = new Map();
    /**
     * Initial value of each local, so an accumulator's constraint can be inferred from
     * its shape when no annotation was written (the pure-JavaScript dialect has none).
     */
    localInits = new Map();
    constructor(fn, sf, prelude, opts = {}) {
        this.fn = fn;
        this.sf = sf;
        this.prelude = prelude;
        this.opts = opts;
        this.fnName = fn.name;
        this.used.add(this.fnName);
    }
    /** Emitted name for a source parameter. */
    paramName(src) {
        return this.opts.preserveParamNames ? src : pascal(src);
    }
    fresh(hint) {
        let name = pascal(hint);
        if (!this.used.has(name)) {
            this.used.add(name);
            return name;
        }
        while (this.used.has(`${name}${++this.counter}`)) {
            /* advance */
        }
        const out = `${name}${this.counter}`;
        this.used.add(out);
        return out;
    }
    /** Names of the emitted type parameters, for undoing source-only `typeof` queries. */
    paramNames() {
        return new Set(this.topParams.map((p) => p.name));
    }
    ctx() {
        return {
            fresh: (h) => this.fresh(h),
            typeArgs: [],
            usePrelude: (n) => this.prelude.add(n),
        };
    }
    compile() {
        const vars = new Map();
        for (const p of this.fn.parameters) {
            if (!typescript_1.default.isIdentifier(p.name))
                throw new CompileError('destructured parameters are not supported', p, 'ST1002');
            const pName = this.paramName(p.name.text);
            this.used.add(pName);
            // `extends unknown` is redundant; omit it so output matches hand-written types.
            // Pass `vars` so a constraint referring to an earlier parameter resolves to that
            // parameter's emitted name (`<a, b extends a>` -> `<A, B extends A>`).
            //
            // In the pure-JavaScript dialect there are no annotations, so the constraint comes
            // from a JSDoc `@param {T}` tag instead.
            const annotation = p.type ?? jsDocParamType(p);
            const constraint = annotation ? this.typeNode(annotation, vars) : undefined;
            this.topParams.push({
                name: pName,
                constraint: constraint && !(constraint.kind === 'keyword' && constraint.name === 'unknown')
                    ? constraint
                    : undefined,
                default: p.initializer ? this.expr(p.initializer, vars) : undefined,
            });
            vars.set(p.name.text, (0, ir_js_1.ref)(pName));
        }
        // A concise arrow body (`= (v) => expr`) is the expression itself; there is no
        // statement list and no way to fall off the end, so it lowers directly.
        const body = typescript_1.default.isBlock(this.fn.body)
            ? this.lowerStmts(this.fn.body.statements, 0, vars, () => {
                throw new CompileError(`function '${this.fnName}' has a code path that does not return; every path must return a type`, this.fn.docNode, 'ST1003');
            }, undefined)
            : this.expr(this.fn.body, vars);
        const doc = typescript_1.default
            .getJSDocCommentsAndTags(this.fn.docNode)
            .map((d) => (typescript_1.default.isJSDoc(d) ? typescript_1.default.getTextOfJSDocComment(d.comment) : undefined))
            .filter(Boolean)
            .join('\n');
        return [
            {
                name: this.fnName,
                params: this.topParams,
                body,
                exported: this.fn.exported,
                doc: doc || undefined,
            },
            ...this.helpers,
        ];
    }
    // -------------------------------------------------------------------------
    // Statements
    // -------------------------------------------------------------------------
    lowerStmts(stmts, idx, vars, k, loop) {
        if (idx >= stmts.length)
            return k(vars);
        const stmt = stmts[idx];
        const rest = (v) => this.lowerStmts(stmts, idx + 1, v, k, loop);
        if (typescript_1.default.isReturnStatement(stmt)) {
            if (!stmt.expression)
                throw new CompileError('bare `return` has no type-level meaning', stmt, 'ST1004');
            return this.expr(stmt.expression, vars);
        }
        if (typescript_1.default.isBlock(stmt))
            return this.lowerStmts(stmt.statements, 0, new Map(vars), rest, loop);
        if (typescript_1.default.isVariableStatement(stmt))
            return this.lowerVarDecl(stmt, vars, rest);
        if (typescript_1.default.isIfStatement(stmt)) {
            const thenK = (v) => this.lowerStmts(asStatements(stmt.thenStatement), 0, new Map(v), rest, loop);
            const elseK = stmt.elseStatement
                ? (v) => this.lowerStmts(asStatements(stmt.elseStatement), 0, new Map(v), rest, loop)
                : rest;
            return this.lowerTest(stmt.expression, vars, thenK, elseK);
        }
        if (typescript_1.default.isForInStatement(stmt))
            return this.lowerForIn(stmt, vars, rest);
        if (typescript_1.default.isWhileStatement(stmt) || typescript_1.default.isForOfStatement(stmt)) {
            return this.lowerLoop(stmt, vars, rest, loop);
        }
        if (typescript_1.default.isSwitchStatement(stmt))
            return this.lowerSwitch(stmt, vars, rest, loop);
        if (typescript_1.default.isBreakStatement(stmt)) {
            if (!loop)
                throw new CompileError('`break` outside a loop', stmt, 'ST1104');
            return loop.onBreak(vars);
        }
        if (typescript_1.default.isContinueStatement(stmt)) {
            if (!loop)
                throw new CompileError('`continue` outside a loop', stmt, 'ST1105');
            return loop.onContinue(vars);
        }
        if (typescript_1.default.isThrowStatement(stmt)) {
            this.prelude.add('ScriptTypeError');
            const msg = this.throwMessage(stmt);
            return (0, ir_js_1.ref)('ScriptTypeError', [(0, ir_js_1.str)(msg)]);
        }
        if (typescript_1.default.isExpressionStatement(stmt)) {
            this.applyMutation(stmt.expression, vars);
            return rest(vars);
        }
        // A stray `;` — as in `if (a) { return 1 };` — is valid JavaScript and carries no
        // meaning at all. Rejecting it would be a gratuitous difference from the language
        // ScriptType is spelled in.
        if (stmt.kind === typescript_1.default.SyntaxKind.EmptyStatement)
            return rest(vars);
        throw new CompileError(`${describeStatement(stmt)} has no type-level meaning`, stmt, 'ST1100');
    }
    throwMessage(stmt) {
        const e = stmt.expression;
        if (typescript_1.default.isNewExpression(e) && e.arguments?.length) {
            const a = e.arguments[0];
            if (typescript_1.default.isStringLiteral(a))
                return a.text;
        }
        if (typescript_1.default.isStringLiteral(e))
            return e.text;
        return 'error';
    }
    /** `x = expr`, `x.push(expr)`, `out[k] = v` — record the new value of a variable. */
    applyMutation(e, vars) {
        if (typescript_1.default.isBinaryExpression(e) && e.operatorToken.kind === typescript_1.default.SyntaxKind.EqualsToken) {
            if (!typescript_1.default.isIdentifier(e.left))
                throw new CompileError('only simple assignment is supported', e, 'ST1103');
            vars.set(e.left.text, this.expr(e.right, vars));
            return;
        }
        if (typescript_1.default.isCallExpression(e) && typescript_1.default.isPropertyAccessExpression(e.expression)) {
            const target = e.expression.expression;
            const method = e.expression.name.text;
            if (typescript_1.default.isIdentifier(target)) {
                const cur = vars.get(target.text);
                if (!cur)
                    throw new CompileError(...unknownVariable(target, vars));
                const args = e.arguments.map((a) => this.expr(a, vars));
                if (method === 'push') {
                    vars.set(target.text, (0, ir_js_1.tuple)([{ expr: cur, spread: true }, ...args.map((a) => ({ expr: a }))]));
                    return;
                }
                if (method === 'unshift') {
                    vars.set(target.text, (0, ir_js_1.tuple)([...args.map((a) => ({ expr: a })), { expr: cur, spread: true }]));
                    return;
                }
                if (method === 'concat') {
                    vars.set(target.text, (0, ir_js_1.tuple)([{ expr: cur, spread: true }, ...args.map((a) => ({ expr: a, spread: true }))]));
                    return;
                }
            }
        }
        throw new CompileError(...unsupportedStatementExpression(e));
    }
    // -------------------------------------------------------------------------
    // Variable declarations
    // -------------------------------------------------------------------------
    lowerVarDecl(stmt, vars, k) {
        let out;
        const decls = stmt.declarationList.declarations;
        // Process declarations right-to-left so each wraps the continuation of the next.
        const build = (i, v) => {
            if (i >= decls.length)
                return k(v);
            const d = decls[i];
            if (!d.initializer)
                throw new CompileError('declaration without an initializer', d, 'ST1200');
            const next = (v2) => build(i + 1, v2);
            if (typescript_1.default.isIdentifier(d.name)) {
                // `const m = matches<P>(v)` records a pattern to test, not a value.
                if (typescript_1.default.isCallExpression(d.initializer) &&
                    typescript_1.default.isIdentifier(d.initializer.expression) &&
                    d.initializer.expression.text === 'matches') {
                    const m = this.lowerMatches(d.initializer, v);
                    if (m.tag === 'match') {
                        this.markers.set(d.name.text, m);
                        return next(v);
                    }
                }
                return this.bindSimple(d.name.text, d.initializer, d.type, v, next, stmt);
            }
            if (typescript_1.default.isArrayBindingPattern(d.name)) {
                return this.bindArrayPattern(d.name, d.initializer, v, next);
            }
            if (typescript_1.default.isObjectBindingPattern(d.name)) {
                const v2 = new Map(v);
                const src = this.expr(d.initializer, v);
                for (const el of d.name.elements) {
                    if (!typescript_1.default.isIdentifier(el.name))
                        throw new CompileError('nested object patterns are not supported', el, 'ST1201');
                    const key = el.propertyName ? propName(el.propertyName) : el.name.text;
                    v2.set(el.name.text, (0, ir_js_1.indexed)(src, (0, ir_js_1.str)(key)));
                }
                return next(v2);
            }
            throw new CompileError('unsupported binding form', d, 'ST1203');
        };
        out = build(0, vars);
        return out;
    }
    /**
     * Bind one identifier. Substitutes the value inline when it is referenced at most
     * once (keeping output close to hand-written types); otherwise emits the canonical
     * type-level let-binding `Value extends infer Name ? body : never`.
     */
    bindSimple(name, init, typeNode, vars, k, pragmaNode = init) {
        if (typeNode)
            this.localTypes.set(name, this.typeNode(typeNode));
        const value = this.expr(init, vars);
        this.localInits.set(name, value);
        // A bare reference / literal is free to duplicate. A generic application is not.
        const trivial = (value.kind === 'ref' && !value.args) ||
            value.kind === 'lit' ||
            value.kind === 'keyword' ||
            value.kind === 'raw';
        const forceBind = this.hasPragma(pragmaNode, '@bind');
        const forceInline = this.hasPragma(pragmaNode, '@inline');
        if (trivial && !forceBind) {
            const v2 = new Map(vars);
            v2.set(name, value);
            return k(v2);
        }
        const placeholder = this.fresh(name);
        const v2 = new Map(vars);
        v2.set(name, (0, ir_js_1.ref)(placeholder));
        const body = k(v2);
        const uses = (0, ir_js_1.countRefs)(body, placeholder);
        if (forceBind || (uses > 1 && !forceInline)) {
            return (0, ir_js_1.cond)(value, (0, ir_js_1.infer)(placeholder, typeNode ? this.typeNode(typeNode) : undefined), body, ir_js_1.NEVER);
        }
        this.used.delete(placeholder);
        return (0, ir_js_1.substitute)(body, new Map([[placeholder, value]]));
    }
    hasPragma(node, pragma) {
        const full = node.getFullText(this.sf);
        const trivia = full.slice(0, node.getLeadingTriviaWidth(this.sf));
        return trivia.includes(pragma);
    }
    /** `const [a, ...rest] = init` -> `Init extends [infer A, ...infer Rest] ? k : never` */
    bindArrayPattern(pattern, initArg, vars, k) {
        let init = initArg;
        const names = [];
        const rests = [];
        for (const el of pattern.elements) {
            if (typescript_1.default.isOmittedExpression(el)) {
                names.push(undefined);
                rests.push(false);
                continue;
            }
            if (!typescript_1.default.isIdentifier(el.name))
                throw new CompileError('nested array patterns are not supported', el, 'ST1202');
            names.push(el.name.text);
            rests.push(!!el.dotDotDotToken);
        }
        // `const [a, b] = orElse(x, fallback)` supplies the value used when the pattern
        // does not match. Without it a failed destructure yields `never`.
        let fallback = ir_js_1.NEVER;
        let source = init;
        if (typescript_1.default.isCallExpression(init) &&
            typescript_1.default.isIdentifier(init.expression) &&
            init.expression.text === 'orElse') {
            if (init.arguments.length !== 2) {
                throw new CompileError('orElse(value, fallback) takes exactly two arguments', init, 'ST1402');
            }
            source = init.arguments[0];
            fallback = this.expr(init.arguments[1], vars);
        }
        init = source;
        // A pattern-matching builtin (splitOnce, ...) supplies its own `extends` pattern.
        const m = this.tryBuiltinMatch(init, vars);
        if (m && m.tag === 'match' && m.binds.length) {
            const renames = new Map();
            const v2 = new Map(vars);
            m.binds.forEach((bind, i) => {
                const target = names[i];
                if (!target)
                    return;
                const fresh = this.fresh(target);
                renames.set(bind, (0, ir_js_1.ref)(fresh));
                v2.set(target, (0, ir_js_1.ref)(fresh));
            });
            const ext = (0, ir_js_1.substitute)(m.ext, renames);
            // Rename the infer nodes themselves, which `substitute` does not touch.
            const ext2 = renameInfers(ext, renames);
            return (0, ir_js_1.cond)(m.check, ext2, k(v2), fallback);
        }
        const src = this.expr(init, vars);
        const elements = names.map((n, i) => {
            const fresh = n ? this.fresh(n) : this.fresh('Skip');
            return { name: n, fresh, spread: rests[i] };
        });
        const v2 = new Map(vars);
        for (const e of elements)
            if (e.name)
                v2.set(e.name, (0, ir_js_1.ref)(e.fresh));
        const ext = (0, ir_js_1.tuple)(elements.map((e) => ({
            expr: (0, ir_js_1.infer)(e.fresh),
            spread: e.spread,
        })));
        return (0, ir_js_1.cond)(src, ext, k(v2), fallback);
    }
    tryBuiltinMatch(e, vars) {
        const asMethod = this.tryMethodMatch(e, vars);
        if (asMethod)
            return asMethod;
        if (!typescript_1.default.isCallExpression(e) || !typescript_1.default.isIdentifier(e.expression))
            return undefined;
        if (e.expression.text === 'matches')
            return this.lowerMatches(e, vars);
        const b = builtins_js_1.BUILTINS[e.expression.text];
        if (!b)
            return undefined;
        const ctx = this.ctx();
        ctx.typeArgs = (e.typeArguments ?? []).map((t) => this.typeNode(t, vars));
        const args = e.arguments.map((a) => this.expr(a, vars));
        return b.lower(args, ctx);
    }
    /**
     * Lower `receiver.method(args)` when `method` denotes a type operation and `receiver`
     * is a value in scope. This is what lets ScriptType be written as plain JavaScript.
     */
    tryMethodCall(e, vars) {
        if (!typescript_1.default.isPropertyAccessExpression(e.expression))
            return undefined;
        const recvNode = e.expression.expression;
        const builtinName = METHOD_BUILTINS[e.expression.name.text];
        if (!builtinName)
            return undefined;
        // Only treat it as a method call when the receiver is something we can lower as a
        // value; a namespaced type reference (`ns.Foo`) must not be captured here.
        if (typescript_1.default.isIdentifier(recvNode) && !vars.has(recvNode.text) && !TYPE_KEYWORDS.has(recvNode.text)) {
            return undefined;
        }
        const b = builtins_js_1.BUILTINS[builtinName];
        if (!b)
            return undefined;
        const recv = this.expr(recvNode, vars);
        const args = e.arguments.map((a) => this.expr(a, vars));
        const ctx = this.ctx();
        const lowered = b.lower([recv, ...args], ctx);
        if (lowered.tag === 'expr')
            return lowered.expr;
        return (0, ir_js_1.cond)(lowered.check, lowered.ext, (0, ir_js_1.bool)(true), (0, ir_js_1.bool)(false));
    }
    /** Same as `tryMethodCall`, but yielding the raw match so it can drive a conditional. */
    tryMethodMatch(e, vars) {
        if (!typescript_1.default.isCallExpression(e) || !typescript_1.default.isPropertyAccessExpression(e.expression))
            return undefined;
        const recvNode = e.expression.expression;
        const builtinName = METHOD_BUILTINS[e.expression.name.text];
        if (!builtinName)
            return undefined;
        if (typescript_1.default.isIdentifier(recvNode) && !vars.has(recvNode.text) && !TYPE_KEYWORDS.has(recvNode.text)) {
            return undefined;
        }
        const b = builtins_js_1.BUILTINS[builtinName];
        if (!b)
            return undefined;
        const recv = this.expr(recvNode, vars);
        const args = e.arguments.map((a) => this.expr(a, vars));
        return b.lower([recv, ...args], this.ctx());
    }
    /**
     * `matches<Pattern>(x)` — the general pattern-match primitive.
     *
     * `infer` is only *semantically* legal inside a conditional type's extends clause,
     * but it parses anywhere a type does, so a pattern carrying `infer` names can be
     * written as a type argument. Each `infer X` in the pattern becomes a variable `X`
     * bound in the true-branch. This is what makes the language expressively complete
     * for conditional types, and what lets the decompiler be total.
     */
    lowerMatches(e, vars) {
        const pattern = e.typeArguments?.[0];
        if (!pattern)
            throw new CompileError('matches<Pattern>(value) requires a pattern type argument', e, 'ST1400');
        if (e.arguments.length !== 1)
            throw new CompileError('matches() takes exactly one value', e, 'ST1401');
        const check = this.expr(e.arguments[0], vars);
        const ext = this.typeNode(pattern, vars);
        const binds = [];
        const collect = (n) => {
            if (typescript_1.default.isInferTypeNode(n))
                binds.push(n.typeParameter.name.text);
            // `Hole<'N'>` is the typecheckable spelling of `infer N`.
            if (typescript_1.default.isTypeReferenceNode(n) && n.typeName.getText() === 'Hole') {
                const arg = n.typeArguments?.[0];
                if (arg && typescript_1.default.isLiteralTypeNode(arg) && typescript_1.default.isStringLiteral(arg.literal)) {
                    binds.push(arg.literal.text);
                }
            }
            typescript_1.default.forEachChild(n, collect);
        };
        collect(pattern);
        for (const b of binds)
            this.used.add(b);
        return { tag: 'match', check, ext, binds };
    }
    // -------------------------------------------------------------------------
    // Conditions
    // -------------------------------------------------------------------------
    /**
     * Lower a boolean-valued expression into branching type structure. Handles `!`,
     * `&&`, `||` compositionally by rearranging the continuations, which is why no
     * separate boolean algebra is needed at the type level.
     */
    lowerTest(e, vars, onTrue, onFalse) {
        if (typescript_1.default.isParenthesizedExpression(e))
            return this.lowerTest(e.expression, vars, onTrue, onFalse);
        if (typescript_1.default.isPrefixUnaryExpression(e) && e.operator === typescript_1.default.SyntaxKind.ExclamationToken) {
            return this.lowerTest(e.operand, vars, onFalse, onTrue);
        }
        // `typeof x === 'string'` is how a JavaScript programmer narrows, and it is exactly
        // what `X extends string` means. Recognising it before the generic `===` case keeps
        // the obvious spelling working instead of demanding `extendsType<string>(x)`.
        const typeofNarrow = this.tryTypeofNarrowing(e, vars);
        if (typeofNarrow) {
            const [t, f] = typeofNarrow.negated ? [onFalse, onTrue] : [onTrue, onFalse];
            return (0, ir_js_1.cond)(typeofNarrow.check, typeofNarrow.ext, t(vars), f(vars));
        }
        if (typescript_1.default.isBinaryExpression(e)) {
            const op = e.operatorToken.kind;
            // `'a' in o` is the JavaScript spelling of `'a' extends keyof O`.
            if (op === typescript_1.default.SyntaxKind.InKeyword) {
                return (0, ir_js_1.cond)(this.expr(e.left, vars), { kind: 'op', op: 'keyof', target: this.expr(e.right, vars) }, onTrue(vars), onFalse(vars));
            }
            // Relational operators need type-level arithmetic, which is a library concern
            // rather than a language one. Say so, instead of "no lowering".
            if (op === typescript_1.default.SyntaxKind.LessThanToken ||
                op === typescript_1.default.SyntaxKind.GreaterThanToken ||
                op === typescript_1.default.SyntaxKind.LessThanEqualsToken ||
                op === typescript_1.default.SyntaxKind.GreaterThanEqualsToken) {
                throw new CompileError(`\`${typescript_1.default.tokenToString(op)}\` has no type-level meaning`, e, 'ST1500', 'TypeScript cannot compare numbers in the type system. Compare tuple lengths ' +
                    'instead, or call a type-level arithmetic helper.');
            }
            if (op === typescript_1.default.SyntaxKind.AmpersandAmpersandToken) {
                return this.lowerTest(e.left, vars, (v) => this.lowerTest(e.right, v, onTrue, onFalse), onFalse);
            }
            if (op === typescript_1.default.SyntaxKind.BarBarToken) {
                return this.lowerTest(e.left, vars, onTrue, (v) => this.lowerTest(e.right, v, onTrue, onFalse));
            }
            if (op === typescript_1.default.SyntaxKind.EqualsEqualsEqualsToken || op === typescript_1.default.SyntaxKind.EqualsEqualsToken) {
                return (0, ir_js_1.cond)(this.expr(e.left, vars), this.expr(e.right, vars), onTrue(vars), onFalse(vars));
            }
            if (op === typescript_1.default.SyntaxKind.ExclamationEqualsEqualsToken || op === typescript_1.default.SyntaxKind.ExclamationEqualsToken) {
                return (0, ir_js_1.cond)(this.expr(e.left, vars), this.expr(e.right, vars), onFalse(vars), onTrue(vars));
            }
        }
        if (e.kind === typescript_1.default.SyntaxKind.TrueKeyword)
            return onTrue(vars);
        if (e.kind === typescript_1.default.SyntaxKind.FalseKeyword)
            return onFalse(vars);
        if (typescript_1.default.isIdentifier(e)) {
            const marker = this.markers.get(e.text);
            if (marker) {
                const v2 = new Map(vars);
                for (const b of marker.binds)
                    v2.set(b, (0, ir_js_1.ref)(b));
                return (0, ir_js_1.cond)(marker.check, marker.ext, onTrue(v2), onFalse(vars));
            }
        }
        // A predicate builtin: use its check/pattern and bind any inferred names.
        const m = this.tryBuiltinMatch(e, vars);
        if (m && m.tag === 'match') {
            const v2 = new Map(vars);
            for (const b of m.binds)
                v2.set(b, (0, ir_js_1.ref)(b));
            return (0, ir_js_1.cond)(m.check, m.ext, onTrue(v2), onFalse(vars));
        }
        // Fall back to testing the value against `true`.
        const value = m && m.tag === 'expr' ? m.expr : this.expr(e, vars);
        return (0, ir_js_1.cond)(value, (0, ir_js_1.kw)('true'), onTrue(vars), onFalse(vars));
    }
    /**
     * The JavaScript runtime type tests, as type-level `extends` checks:
     *
     *   typeof x === 'string'   ->  X extends string
     *   typeof x !== 'string'   ->  handled by the caller's `!` path
     *   Array.isArray(x)        ->  X extends any[]
     *
     * Returns undefined when `e` is not one of these, so the caller falls through.
     */
    tryTypeofNarrowing(e, vars) {
        if (typescript_1.default.isCallExpression(e) &&
            typescript_1.default.isPropertyAccessExpression(e.expression) &&
            typescript_1.default.isIdentifier(e.expression.expression) &&
            e.expression.expression.text === 'Array' &&
            e.expression.name.text === 'isArray' &&
            e.arguments.length === 1) {
            return { check: this.expr(e.arguments[0], vars), ext: { kind: 'array', element: (0, ir_js_1.kw)('any') } };
        }
        if (!typescript_1.default.isBinaryExpression(e))
            return undefined;
        const op = e.operatorToken.kind;
        const negated = op === typescript_1.default.SyntaxKind.ExclamationEqualsEqualsToken || op === typescript_1.default.SyntaxKind.ExclamationEqualsToken;
        const equality = op === typescript_1.default.SyntaxKind.EqualsEqualsEqualsToken || op === typescript_1.default.SyntaxKind.EqualsEqualsToken;
        if (!equality && !negated)
            return undefined;
        // Either order: `typeof x === 'string'` and `'string' === typeof x`.
        const [typeofSide, literalSide] = typescript_1.default.isTypeOfExpression(e.left)
            ? [e.left, e.right]
            : typescript_1.default.isTypeOfExpression(e.right)
                ? [e.right, e.left]
                : [undefined, undefined];
        if (!typeofSide || !literalSide || !typescript_1.default.isStringLiteral(literalSide))
            return undefined;
        const ext = TYPEOF_TAGS[literalSide.text];
        if (!ext) {
            throw new CompileError(`'${literalSide.text}' is not a value \`typeof\` can produce`, literalSide, 'ST1500', `Expected one of: ${Object.keys(TYPEOF_TAGS).join(', ')}.`);
        }
        return { check: this.expr(typeofSide.expression, vars), ext: ext(), negated };
    }
    lowerSwitch(stmt, vars, k, loop) {
        const subject = this.expr(stmt.expression, vars);
        const clauses = stmt.caseBlock.clauses;
        const build = (i) => {
            if (i >= clauses.length)
                return ir_js_1.NEVER;
            const c = clauses[i];
            if (typescript_1.default.isDefaultClause(c)) {
                return this.lowerStmts(c.statements, 0, new Map(vars), k, loop);
            }
            const body = this.lowerStmts(c.statements, 0, new Map(vars), k, loop);
            return (0, ir_js_1.cond)(subject, this.expr(c.expression, vars), body, build(i + 1));
        };
        return build(0);
    }
    // -------------------------------------------------------------------------
    // Loops
    // -------------------------------------------------------------------------
    lowerLoop(stmt, vars, after, _outerLoop) {
        const bodyStmts = asStatements(stmt.statement);
        const helperName = this.fresh(`${this.fnName}__loop`);
        // Mutable variables assigned inside the loop become accumulator parameters.
        const mutated = [...collectAssigned(stmt.statement)].filter((n) => vars.has(n));
        // For-of: the iterated list is itself an accumulator (it shrinks each round).
        let iterVar;
        let listVar;
        let listInit;
        let listConstraint;
        if (typescript_1.default.isForOfStatement(stmt)) {
            const decl = stmt.initializer;
            if (!typescript_1.default.isVariableDeclarationList(decl) || decl.declarations.length !== 1) {
                throw new CompileError('for-of must declare exactly one variable', stmt, 'ST1300');
            }
            const nameNode = decl.declarations[0].name;
            if (!typescript_1.default.isIdentifier(nameNode))
                throw new CompileError('for-of cannot destructure in the loop header', nameNode, 'ST1301');
            iterVar = nameNode.text;
            listInit = this.expr(stmt.expression, vars);
            listVar = this.fresh('Rest');
            // Carry the element type into the loop. Constraining the list to a bare
            // `readonly unknown[]` would make each destructured element `unknown`, so
            // iterating a `string[]` and calling a `V extends string` function on an element
            // emitted TypeScript that did not typecheck.
            if (typescript_1.default.isIdentifier(stmt.expression)) {
                listConstraint = this.constraintOf(stmt.expression.text, vars);
            }
        }
        // Free variables the loop reads but never writes are carried through unchanged.
        // The guard counts as part of the loop: a variable read only there (`n` in
        // `while (length(it) !== n)`) must still be a parameter of the helper.
        const readInLoop = collectRead(stmt.statement);
        if (typescript_1.default.isWhileStatement(stmt))
            for (const n of collectRead(stmt.expression))
                readInLoop.add(n);
        const readNames = [...readInLoop].filter((n) => vars.has(n) && !mutated.includes(n) && n !== iterVar);
        const carried = [...new Set(readNames)];
        // Order accumulators so the loop "driver" (a mutable variable tested by the
        // guard, e.g. `rest` in `while (includes(rest, sep))`) comes first, matching
        // how these recursive helpers are conventionally written by hand.
        const guardNames = typescript_1.default.isWhileStatement(stmt) ? collectRead(stmt.expression) : new Set();
        const accumNames = [...mutated].sort((a, b) => {
            const av = guardNames.has(a) ? 0 : 1;
            const bv = guardNames.has(b) ? 0 : 1;
            return av - bv || mutated.indexOf(a) - mutated.indexOf(b);
        });
        const params = [];
        const helperVars = new Map();
        // Helper parameters live in their own scope, so allocate their names from a
        // helper-local namespace instead of the function-wide one.
        const helperUsed = new Set();
        const helperFresh = (hint) => {
            const base = pascal(hint);
            if (!helperUsed.has(base)) {
                helperUsed.add(base);
                return base;
            }
            let i = 1;
            while (helperUsed.has(`${base}${i}`))
                i++;
            const out = `${base}${i}`;
            helperUsed.add(out);
            return out;
        };
        if (listVar) {
            helperUsed.add(listVar);
            params.push({
                name: listVar,
                constraint: listConstraint ?? { kind: 'raw', text: 'readonly unknown[]' },
            });
        }
        const emitParam = (srcName) => {
            const pName = helperFresh(srcName);
            params.push({ name: pName, constraint: this.constraintOf(srcName, vars) });
            helperVars.set(srcName, (0, ir_js_1.ref)(pName));
        };
        for (const a of accumNames)
            emitParam(a);
        for (const c of carried)
            emitParam(c);
        const callWith = (v) => {
            const args = [];
            if (listVar)
                args.push(v.get(`__list__${helperName}`) ?? (0, ir_js_1.ref)(listVar));
            for (const a of accumNames)
                args.push(v.get(a) ?? (0, ir_js_1.ref)(a));
            for (const c of carried)
                args.push(v.get(c) ?? (0, ir_js_1.ref)(c));
            return (0, ir_js_1.ref)(helperName, args);
        };
        const loopCtx = {
            onBreak: (v) => after(v),
            onContinue: (v) => callWith(v),
        };
        // Build the helper body.
        let helperBody;
        if (typescript_1.default.isForOfStatement(stmt)) {
            const headName = this.fresh(iterVar);
            const tailName = this.fresh('Tail');
            const bodyVars = new Map(helperVars);
            bodyVars.set(iterVar, (0, ir_js_1.ref)(headName));
            const recurse = (v) => {
                const v2 = new Map(v);
                v2.set(`__list__${helperName}`, (0, ir_js_1.ref)(tailName));
                return callWith(v2);
            };
            const bodyExpr = this.lowerStmts(bodyStmts, 0, bodyVars, recurse, {
                onBreak: loopCtx.onBreak,
                onContinue: recurse,
            });
            // Constrain the peeled element and tail when the element type is known.
            // TypeScript does not push a `Rest extends string[]` constraint through the
            // destructuring pattern, so without this `infer Head` is `unknown` and passing it
            // to a function that wants a `string` emits TypeScript that does not typecheck.
            const elem = elementTypeOf(listConstraint);
            helperBody = (0, ir_js_1.cond)((0, ir_js_1.ref)(listVar), (0, ir_js_1.tuple)([
                { expr: (0, ir_js_1.infer)(headName, elem) },
                { expr: (0, ir_js_1.infer)(tailName, elem && { kind: 'array', element: elem }), spread: true },
            ]), bodyExpr, after(helperVars));
        }
        else {
            const recurse = (v) => callWith(v);
            const isWhileTrue = stmt.expression.kind === typescript_1.default.SyntaxKind.TrueKeyword;
            if (isWhileTrue) {
                helperBody = this.lowerStmts(bodyStmts, 0, new Map(helperVars), recurse, {
                    onBreak: loopCtx.onBreak,
                    onContinue: recurse,
                });
            }
            else {
                // Fuse the guard with an immediately-following destructure of the same
                // shape, so `while (includes(r,s)) { const [h,t] = splitOnce(r,s) }`
                // emits a single inferring conditional instead of two nested tests.
                const fused = this.tryFuseGuard(stmt.expression, bodyStmts, helperVars, recurse, loopCtx, after);
                helperBody =
                    fused ??
                        this.lowerTest(stmt.expression, helperVars, (v) => this.lowerStmts(bodyStmts, 0, new Map(v), recurse, {
                            onBreak: loopCtx.onBreak,
                            onContinue: recurse,
                        }), (v) => after(v));
            }
        }
        this.helpers.push({
            name: helperName,
            params,
            body: helperBody,
            exported: false,
            generatedFrom: this.fnName,
        });
        // The call site: initial accumulator values from the enclosing scope.
        const args = [];
        if (listInit)
            args.push(listInit);
        for (const a of accumNames)
            args.push(vars.get(a));
        for (const c of carried)
            args.push(vars.get(c));
        return (0, ir_js_1.ref)(helperName, args);
    }
    /**
     * `for (const k in o) { out[k] = f(o[k]) }` -> `{ [K in keyof O]: F<O[K]> }`
     *
     * Recognising this as a mapped type rather than lowering it to recursion is what
     * keeps the output idiomatic: a recursive rebuild of an object would be correct
     * but would look nothing like the library code it is meant to reproduce.
     *
     * A computed key (`out[upper(k)] = ...`) becomes an `as` clause.
     */
    lowerForIn(stmt, vars, k) {
        const decl = stmt.initializer;
        if (!typescript_1.default.isVariableDeclarationList(decl) || decl.declarations.length !== 1) {
            throw new CompileError('for-in must declare exactly one variable', stmt, 'ST1302');
        }
        const nameNode = decl.declarations[0].name;
        if (!typescript_1.default.isIdentifier(nameNode))
            throw new CompileError('for-in cannot destructure in the loop header', nameNode, 'ST1303');
        const keySrc = nameNode.text;
        const body = asStatements(stmt.statement);
        if (body.length !== 1 || !typescript_1.default.isExpressionStatement(body[0])) {
            throw new CompileError('a for-in body must be a single assignment of the form `out[key] = value`', stmt.statement, 'ST1304');
        }
        const assign = body[0].expression;
        if (!typescript_1.default.isBinaryExpression(assign) ||
            assign.operatorToken.kind !== typescript_1.default.SyntaxKind.EqualsToken ||
            !typescript_1.default.isElementAccessExpression(assign.left) ||
            !typescript_1.default.isIdentifier(assign.left.expression)) {
            throw new CompileError('a for-in body must assign to `out[key]`', assign, 'ST1305');
        }
        const target = assign.left.expression.text;
        const param = this.fresh(this.paramName(keySrc));
        const bodyVars = new Map(vars);
        bodyVars.set(keySrc, (0, ir_js_1.ref)(param));
        // The iterated expression is the key domain. `for (const p in t)` follows
        // JavaScript and means "the keys of t" -> `keyof T`. When the value is already a
        // key union rather than an object, `keySet(K)` says so explicitly -> `[P in K]`.
        // `keyof(t)` written by hand is respected as-is rather than doubled.
        const iterExpr = stmt.expression;
        const isKeySet = typescript_1.default.isCallExpression(iterExpr) &&
            typescript_1.default.isIdentifier(iterExpr.expression) &&
            iterExpr.expression.text === 'keySet';
        const iterated = isKeySet
            ? this.expr(iterExpr.arguments[0], vars)
            : this.expr(iterExpr, vars);
        const constraint = isKeySet || (iterated.kind === 'op' && iterated.op === 'keyof')
            ? iterated
            : { kind: 'op', op: 'keyof', target: iterated };
        // A key expression other than the bare loop variable becomes an `as` clause.
        const keyExpr = this.expr(assign.left.argumentExpression, bodyVars);
        const asClause = keyExpr.kind === 'ref' && keyExpr.name === param ? undefined : keyExpr;
        // Property modifiers are written as markers wrapping the value:
        //   out[k] = optional(v)      ->  { [K in ...]?: V }
        //   out[k] = required(v)      ->  { [K in ...]-?: V }
        //   out[k] = readonlyProp(v)  ->  { readonly [K in ...]: V }
        //   out[k] = mutable(v)       ->  { -readonly [K in ...]: V }
        const { expr: valueNode, optional, readonly } = stripModifiers(assign.right);
        const value = this.expr(valueNode, bodyVars);
        const mapped = {
            kind: 'mapped',
            param,
            constraint,
            value,
            as: asClause,
            optional,
            readonly,
        };
        const v2 = new Map(vars);
        v2.set(target, mapped);
        return k(v2);
    }
    /** Guard/destructure fusion — see `guardEquivalent`. */
    tryFuseGuard(guardExpr, bodyStmts, helperVars, recurse, loopCtx, after) {
        const guard = this.tryBuiltinMatch(guardExpr, helperVars);
        if (!guard || guard.tag !== 'match' || guard.binds.length)
            return undefined;
        const first = bodyStmts[0];
        if (!first || !typescript_1.default.isVariableStatement(first))
            return undefined;
        const d = first.declarationList.declarations[0];
        if (!d || !d.initializer || !typescript_1.default.isArrayBindingPattern(d.name))
            return undefined;
        // Snapshot name allocation so a failed probe doesn't leak fresh names.
        const before = new Set(this.used);
        const m = this.tryBuiltinMatch(d.initializer, helperVars);
        if (!m || m.tag !== 'match' || !m.binds.length || (0, ir_js_1.emit)(m.check) !== (0, ir_js_1.emit)(guard.check)) {
            this.used = before;
            return undefined;
        }
        if (!(0, builtins_js_1.guardEquivalent)(guard.ext, m.ext)) {
            this.used = before;
            return undefined;
        }
        // Equivalent: emit the inferring conditional and skip the guard entirely.
        const bodyExpr = this.lowerStmts(bodyStmts, 0, new Map(helperVars), recurse, {
            onBreak: loopCtx.onBreak,
            onContinue: recurse,
        });
        // `lowerStmts` re-lowered the destructure, producing `Check extends P ? ... : never`.
        // Replace that dead `never` with the after-loop continuation.
        if (bodyExpr.kind === 'conditional' && bodyExpr.else.kind === 'keyword' && bodyExpr.else.name === 'never') {
            return { ...bodyExpr, else: after(helperVars) };
        }
        return undefined;
    }
    constraintOf(name, vars) {
        // A declared annotation (`const out: string[] = []`) is the best source. It is
        // load-bearing, not cosmetic: without it the emitted `[...Out, X]` spread does
        // not typecheck.
        const declared = this.localTypes.get(name);
        if (declared)
            return declared;
        const cur = vars.get(name);
        if (!cur)
            return undefined;
        // Otherwise infer a usable constraint from the initial value's shape. This is
        // load-bearing, not cosmetic: an unconstrained accumulator makes the emitted
        // `[...Out, X]` spread fail to typecheck.
        const init = this.localInits.get(name);
        if (init?.kind === 'tuple' || init?.kind === 'array')
            return { kind: 'raw', text: 'readonly unknown[]' };
        if (init?.kind === 'lit' && init.str)
            return (0, ir_js_1.kw)('string');
        if (cur.kind === 'tuple')
            return { kind: 'raw', text: 'readonly unknown[]' };
        if (cur.kind === 'lit' && cur.str)
            return (0, ir_js_1.kw)('string');
        if (cur.kind === 'lit' && typeof cur.value === 'number')
            return (0, ir_js_1.kw)('number');
        if (cur.kind === 'ref') {
            const tp = this.topParams.find((p) => p.name === cur.name);
            if (tp?.constraint)
                return tp.constraint;
        }
        return undefined;
    }
    // -------------------------------------------------------------------------
    // Expressions
    // -------------------------------------------------------------------------
    expr(e, vars) {
        if (typescript_1.default.isParenthesizedExpression(e))
            return this.expr(e.expression, vars);
        if (typescript_1.default.isIdentifier(e)) {
            const local = vars.get(e.text);
            if (local)
                return local;
            if (TYPE_KEYWORDS.has(e.text))
                return (0, ir_js_1.kw)(e.text);
            if (e.text === 'undefined')
                return (0, ir_js_1.kw)('undefined');
            // Spellings for types that have no usable value form: `{}` cannot be an operand
            // of `&`, and `null` cannot be an operand of `|`, so they get named stand-ins.
            if (e.text === 'emptyObject')
                return { kind: 'object', props: [] };
            if (e.text === 'Null')
                return (0, ir_js_1.kw)('null');
            if (e.text === 'Undefined')
                return (0, ir_js_1.kw)('undefined');
            return (0, ir_js_1.ref)(e.text);
        }
        if (typescript_1.default.isStringLiteral(e) || typescript_1.default.isNoSubstitutionTemplateLiteral(e))
            return (0, ir_js_1.str)(e.text);
        if (typescript_1.default.isNumericLiteral(e))
            return (0, ir_js_1.num)(Number(e.text));
        if (e.kind === typescript_1.default.SyntaxKind.TrueKeyword)
            return (0, ir_js_1.bool)(true);
        if (e.kind === typescript_1.default.SyntaxKind.FalseKeyword)
            return (0, ir_js_1.bool)(false);
        if (e.kind === typescript_1.default.SyntaxKind.NullKeyword)
            return (0, ir_js_1.kw)('null');
        if (typescript_1.default.isPrefixUnaryExpression(e) && e.operator === typescript_1.default.SyntaxKind.MinusToken) {
            const inner = this.expr(e.operand, vars);
            if (inner.kind === 'lit' && typeof inner.value === 'number')
                return (0, ir_js_1.num)(-inner.value);
        }
        if (typescript_1.default.isBinaryExpression(e)) {
            const op = e.operatorToken.kind;
            if (op === typescript_1.default.SyntaxKind.BarToken)
                return (0, ir_js_1.union)([this.expr(e.left, vars), this.expr(e.right, vars)]);
            if (op === typescript_1.default.SyntaxKind.AmpersandToken) {
                return (0, ir_js_1.intersection)([this.expr(e.left, vars), this.expr(e.right, vars)]);
            }
            if (op === typescript_1.default.SyntaxKind.PlusToken) {
                // String concatenation at the type level is a template literal.
                return (0, ir_js_1.template)(['', '', ''], [this.expr(e.left, vars), this.expr(e.right, vars)]);
            }
            // Comparisons in expression position produce a boolean-valued conditional.
            if (op === typescript_1.default.SyntaxKind.EqualsEqualsEqualsToken ||
                op === typescript_1.default.SyntaxKind.EqualsEqualsToken ||
                op === typescript_1.default.SyntaxKind.ExclamationEqualsEqualsToken ||
                op === typescript_1.default.SyntaxKind.ExclamationEqualsToken) {
                return this.lowerTest(e, vars, () => (0, ir_js_1.bool)(true), () => (0, ir_js_1.bool)(false));
            }
        }
        if (typescript_1.default.isConditionalExpression(e)) {
            return this.lowerTest(e.condition, vars, (v) => this.expr(e.whenTrue, v), (v) => this.expr(e.whenFalse, v));
        }
        if (typescript_1.default.isArrayLiteralExpression(e)) {
            return (0, ir_js_1.tuple)(e.elements.map((el) => {
                if (typescript_1.default.isSpreadElement(el))
                    return { expr: this.expr(el.expression, vars), spread: true };
                // `optElem(x)` marks an optional tuple element: `[A, B?]`.
                if (typescript_1.default.isCallExpression(el) &&
                    typescript_1.default.isIdentifier(el.expression) &&
                    el.expression.text === 'optElem' &&
                    el.arguments.length === 1) {
                    return { expr: this.expr(el.arguments[0], vars), optional: true };
                }
                return { expr: this.expr(el, vars) };
            }));
        }
        if (typescript_1.default.isObjectLiteralExpression(e)) {
            const props = [];
            let index;
            for (const p of e.properties) {
                if (typescript_1.default.isPropertyAssignment(p)) {
                    const computed = typescript_1.default.isComputedPropertyName(p.name);
                    const name = computed
                        ? (0, ir_js_1.emit)(this.expr(p.name.expression, vars))
                        : propName(p.name);
                    const mods = stripModifiers(p.initializer);
                    props.push({
                        name: computed ? `[${name}]` : name,
                        value: this.expr(mods.expr, vars),
                        computed,
                        optional: mods.optional === true,
                        readonly: mods.readonly === true,
                    });
                    continue;
                }
                if (typescript_1.default.isShorthandPropertyAssignment(p)) {
                    props.push({ name: p.name.text, value: this.expr(p.name, vars) });
                    continue;
                }
                // A call signature, a construct signature and an index signature all have no
                // name, so none can be a key. Spreading is the JavaScript way to say "and these
                // members too", and repeating it is how an overload set is written — several
                // signatures that would collide as keys.
                if (typescript_1.default.isSpreadAssignment(p)) {
                    // The property-position wrappers work on a spread member too, so an optional
                    // member of an overload set is `...optional(methodType('f', [], A))`.
                    const mods = stripModifiers(p.expression);
                    const value = this.expr(mods.expr, vars);
                    if (value.kind === 'fn' && value.sig && (value.sig !== 'method' || value.sigName)) {
                        props.push({ name: value.sigName ?? '', value, optional: mods.optional === true });
                        continue;
                    }
                    if (value.kind === 'object' && value.index && !value.props.length) {
                        if (index) {
                            throw new CompileError('an object type can have only one index signature', p, 'ST1501');
                        }
                        index = value.index;
                        continue;
                    }
                    throw new CompileError('only a call, construct, index or named method signature can be spread into an object type', p, 'ST1501', "Write `...callSig([A], R)`, `...ctorSig([A], R)`, `...indexRecord(K, V)`, or " +
                        "`...methodType('name', [A], R)` for one member of an overload set; for other " +
                        'members use `key: value`.');
                }
                throw new CompileError('unsupported object member', p, 'ST1501');
            }
            return index ? { kind: 'object', props, index } : { kind: 'object', props };
        }
        if (typescript_1.default.isTemplateExpression(e)) {
            const quasis = [e.head.text];
            const exprs = [];
            for (const span of e.templateSpans) {
                exprs.push(this.expr(span.expression, vars));
                quasis.push(span.literal.text);
            }
            return (0, ir_js_1.template)(quasis, exprs);
        }
        if (typescript_1.default.isElementAccessExpression(e)) {
            return (0, ir_js_1.indexed)(this.expr(e.expression, vars), this.expr(e.argumentExpression, vars));
        }
        if (typescript_1.default.isPropertyAccessExpression(e)) {
            if (typescript_1.default.isIdentifier(e.expression) && this.markers.has(e.expression.text)) {
                return (0, ir_js_1.ref)(e.name.text);
            }
            // `o.name` where `o` is a variable is an indexed access; `ns.Foo` where `ns` is
            // not in scope is a qualified type name and must stay dotted.
            const q = qualifiedName(e);
            if (q && !vars.has(q.root))
                return (0, ir_js_1.ref)(q.text);
            if (e.name.text === 'length')
                return (0, ir_js_1.indexed)(this.expr(e.expression, vars), (0, ir_js_1.str)('length'));
            return (0, ir_js_1.indexed)(this.expr(e.expression, vars), (0, ir_js_1.str)(e.name.text));
        }
        if (typescript_1.default.isAsExpression(e)) {
            if (e.type.kind === typescript_1.default.SyntaxKind.TypeReference && e.type.getText() === 'const') {
                const inner = this.expr(e.expression, vars);
                if (inner.kind === 'tuple')
                    return { kind: 'op', op: 'readonly', target: inner };
                return inner;
            }
            return this.expr(e.expression, vars);
        }
        if (typescript_1.default.isCallExpression(e))
            return this.callExpr(e, vars);
        if (typescript_1.default.isNonNullExpression(e))
            return this.expr(e.expression, vars);
        throw new CompileError(...unsupportedExpression(e));
    }
    callExpr(e, vars) {
        // `Object.keys(o)` is the JavaScript spelling of `keyof O`.
        if (typescript_1.default.isPropertyAccessExpression(e.expression) &&
            typescript_1.default.isIdentifier(e.expression.expression) &&
            e.expression.expression.text === 'Object' &&
            (e.expression.name.text === 'keys' || e.expression.name.text === 'entries')) {
            const target = this.expr(e.arguments[0], vars);
            return { kind: 'op', op: 'keyof', target };
        }
        // A method on a value in scope is the JavaScript spelling of a builtin.
        const method = this.tryMethodCall(e, vars);
        if (method)
            return method;
        // A qualified callee is a namespaced generic type: `ns.Foo(X)` -> `ns.Foo<X>`.
        if (typescript_1.default.isPropertyAccessExpression(e.expression)) {
            const q = qualifiedName(e.expression);
            if (q && !vars.has(q.root)) {
                const args = e.arguments.map((a) => this.expr(a, vars));
                const typeArgs = (e.typeArguments ?? []).map((t) => this.typeNode(t, vars));
                return (0, ir_js_1.ref)(q.text, [...args, ...typeArgs]);
            }
        }
        if (!typescript_1.default.isIdentifier(e.expression)) {
            throw new CompileError('only direct calls are supported', e, 'ST1403');
        }
        const name = e.expression.text;
        const args = e.arguments.map((a) => this.expr(a, vars));
        const b = builtins_js_1.BUILTINS[name];
        if (b) {
            const ctx = this.ctx();
            ctx.typeArgs = (e.typeArguments ?? []).map((t) => this.typeNode(t, vars));
            const lowered = b.lower(args, ctx);
            if (lowered.tag === 'expr')
                return lowered.expr;
            // A predicate used in value position yields a boolean.
            return (0, ir_js_1.cond)(lowered.check, lowered.ext, (0, ir_js_1.bool)(true), (0, ir_js_1.bool)(false));
        }
        // User-defined type function (possibly this one, recursively).
        const typeArgs = (e.typeArguments ?? []).map((t) => this.typeNode(t));
        return (0, ir_js_1.ref)(name, [...args, ...typeArgs]);
    }
    // -------------------------------------------------------------------------
    // Type annotations
    // -------------------------------------------------------------------------
    typeNode(t, vars) {
        switch (t.kind) {
            case typescript_1.default.SyntaxKind.StringKeyword:
                return (0, ir_js_1.kw)('string');
            case typescript_1.default.SyntaxKind.NumberKeyword:
                return (0, ir_js_1.kw)('number');
            case typescript_1.default.SyntaxKind.BooleanKeyword:
                return (0, ir_js_1.kw)('boolean');
            case typescript_1.default.SyntaxKind.UnknownKeyword:
                return (0, ir_js_1.kw)('unknown');
            case typescript_1.default.SyntaxKind.NeverKeyword:
                return (0, ir_js_1.kw)('never');
            case typescript_1.default.SyntaxKind.AnyKeyword:
                return (0, ir_js_1.kw)('any');
            case typescript_1.default.SyntaxKind.BigIntKeyword:
                return (0, ir_js_1.kw)('bigint');
            case typescript_1.default.SyntaxKind.SymbolKeyword:
                return (0, ir_js_1.kw)('symbol');
            case typescript_1.default.SyntaxKind.ObjectKeyword:
                return (0, ir_js_1.kw)('object');
        }
        if (typescript_1.default.isArrayTypeNode(t))
            return { kind: 'array', element: this.typeNode(t.elementType, vars) };
        if (typescript_1.default.isTupleTypeNode(t)) {
            return (0, ir_js_1.tuple)(t.elements.map((el) => typescript_1.default.isRestTypeNode(el)
                ? { expr: this.typeNode(el.type, vars), spread: true }
                : { expr: this.typeNode(el, vars) }));
        }
        if (typescript_1.default.isUnionTypeNode(t))
            return (0, ir_js_1.union)(t.types.map((x) => this.typeNode(x, vars)));
        if (typescript_1.default.isIntersectionTypeNode(t))
            return (0, ir_js_1.intersection)(t.types.map((x) => this.typeNode(x, vars)));
        if (typescript_1.default.isLiteralTypeNode(t)) {
            const l = t.literal;
            if (typescript_1.default.isStringLiteral(l))
                return (0, ir_js_1.str)(l.text);
            if (typescript_1.default.isNumericLiteral(l))
                return (0, ir_js_1.num)(Number(l.text));
            if (l.kind === typescript_1.default.SyntaxKind.TrueKeyword)
                return (0, ir_js_1.bool)(true);
            if (l.kind === typescript_1.default.SyntaxKind.FalseKeyword)
                return (0, ir_js_1.bool)(false);
            if (l.kind === typescript_1.default.SyntaxKind.NullKeyword)
                return (0, ir_js_1.kw)('null');
        }
        if (typescript_1.default.isInferTypeNode(t)) {
            const tp = t.typeParameter;
            return (0, ir_js_1.infer)(tp.name.text, tp.constraint ? this.typeNode(tp.constraint, vars) : undefined);
        }
        if (typescript_1.default.isTypeReferenceNode(t)) {
            const name = t.typeName.getText();
            // `Hole<'N'>` is the ScriptType spelling of `infer N`. `infer` is only legal
            // inside a conditional type's extends clause, so it cannot appear in a
            // type-argument position; a hole is an ordinary type and typechecks.
            if (name === 'Hole') {
                const arg = t.typeArguments?.[0];
                if (arg && typescript_1.default.isLiteralTypeNode(arg) && typescript_1.default.isStringLiteral(arg.literal)) {
                    // A second argument is the inference constraint: `infer X extends C`.
                    const c = t.typeArguments?.[1];
                    return (0, ir_js_1.infer)(arg.literal.text, c ? this.typeNode(c, vars) : undefined);
                }
            }
            const args = (t.typeArguments ?? []).map((a) => this.typeNode(a, vars));
            // A bare reference naming an in-scope variable resolves to that variable's
            // current value, so patterns written with the source's parameter spelling
            // still refer to the emitted type parameter.
            if (!args.length && vars?.has(name))
                return vars.get(name);
            return (0, ir_js_1.ref)(name, args);
        }
        if (typescript_1.default.isParenthesizedTypeNode(t))
            return this.typeNode(t.type, vars);
        if (typescript_1.default.isTypeOperatorNode(t)) {
            if (t.operator === typescript_1.default.SyntaxKind.KeyOfKeyword) {
                return { kind: 'op', op: 'keyof', target: this.typeNode(t.type, vars) };
            }
            if (t.operator === typescript_1.default.SyntaxKind.ReadonlyKeyword) {
                return { kind: 'op', op: 'readonly', target: this.typeNode(t.type, vars) };
            }
        }
        if (typescript_1.default.isIndexedAccessTypeNode(t)) {
            return (0, ir_js_1.indexed)(this.typeNode(t.objectType, vars), this.typeNode(t.indexType, vars));
        }
        if (typescript_1.default.isTypeQueryNode(t)) {
            // `typeof X` names the value X; in ScriptType that value *is* a type.
            // `typeof m.H` reads hole H bound by match marker m.
            if (typescript_1.default.isQualifiedName(t.exprName)) {
                const root = t.exprName.left.getText();
                if (this.markers.has(root))
                    return (0, ir_js_1.ref)(t.exprName.right.text);
            }
            const name = t.exprName.getText();
            if (vars?.has(name))
                return vars.get(name);
            return (0, ir_js_1.ref)(name);
        }
        if (typescript_1.default.isTemplateLiteralTypeNode(t)) {
            const quasis = [t.head.text];
            const exprs = [];
            for (const span of t.templateSpans) {
                exprs.push(this.typeNode(span.type, vars));
                quasis.push(span.literal.text);
            }
            return (0, ir_js_1.template)(quasis, exprs);
        }
        if (typescript_1.default.isRestTypeNode(t))
            return this.typeNode(t.type, vars);
        if (typescript_1.default.isOptionalTypeNode(t))
            return this.typeNode(t.type, vars);
        if (typescript_1.default.isNamedTupleMember(t))
            return this.typeNode(t.type, vars);
        // Anything else is already valid type syntax; pass it through verbatim — but first
        // turn any `Hole<'X'>` back into `infer X`, since a hole is ScriptType spelling and
        // must never reach the emitted TypeScript.
        return { kind: 'raw', text: holesToInfer(t, this.sf, this.paramNames()) };
    }
}
// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
/**
 * Peel property-modifier markers off an expression. Returns the inner expression plus
 * the mapped-type modifier each marker denotes.
 */
function stripModifiers(e) {
    let expr = e;
    let optional;
    let readonly;
    for (;;) {
        if (!typescript_1.default.isCallExpression(expr) || !typescript_1.default.isIdentifier(expr.expression) || expr.arguments.length !== 1)
            break;
        const name = expr.expression.text;
        if (name === 'optional')
            optional = true;
        else if (name === 'required')
            optional = '-';
        else if (name === 'readonlyProp')
            readonly = true;
        else if (name === 'mutable')
            readonly = '-';
        else
            break;
        expr = expr.arguments[0];
    }
    return { expr, optional, readonly };
}
/**
 * Native JavaScript methods that denote type operations, so a ScriptType program can be
 * written as plain JavaScript: `rest.includes(sep)` instead of `includes(rest, sep)`.
 * Maps method name -> builtin name, with the receiver passed as the first argument.
 */
const METHOD_BUILTINS = {
    includes: 'includes',
    startsWith: 'startsWith',
    endsWith: 'endsWith',
    toUpperCase: 'upper',
    toLowerCase: 'lower',
    split: 'split',
    trim: 'trim',
    replaceAll: 'replaceAll',
    replace: 'replaceAll',
    reverse: 'reverse',
    join: 'join',
    at: 'at',
};
/** Flatten `a.b.c` into its dotted text plus its root identifier, if it is purely dotted. */
function qualifiedName(e) {
    const parts = [e.name.text];
    let cur = e.expression;
    while (typescript_1.default.isPropertyAccessExpression(cur)) {
        parts.unshift(cur.name.text);
        cur = cur.expression;
    }
    if (!typescript_1.default.isIdentifier(cur))
        return undefined;
    parts.unshift(cur.text);
    return { text: parts.join('.'), root: cur.text };
}
const RAW_PRINTER = typescript_1.default.createPrinter({ removeComments: true, newLine: typescript_1.default.NewLineKind.LineFeed });
/**
 * Print a type node verbatim, rewriting `Hole<'X'>` (and `Hole<'X', C>`) back into
 * `infer X` (`infer X extends C`).
 *
 * Holes exist only so ScriptType source typechecks; they are not TypeScript semantics.
 * Any path that emits a node's original text must therefore undo them, or a hole leaks
 * into the output and the emitted type fails to compile.
 */
function holesToInfer(t, sf, params) {
    let sawHole = false;
    const transformer = (ctx) => (root) => {
        const visit = (n) => {
            // `typeof X` is how a ScriptType *source* refers to a parameter in type position;
            // in the emitted type the parameter is a type, so the query has to come back off.
            if (typescript_1.default.isTypeQueryNode(n) && typescript_1.default.isIdentifier(n.exprName)) {
                const name = n.exprName.text;
                if (!params || params.has(name)) {
                    sawHole = true;
                    return ctx.factory.createTypeReferenceNode(name, undefined);
                }
            }
            if (typescript_1.default.isTypeReferenceNode(n) && n.typeName.getText(sf) === 'Hole') {
                const arg = n.typeArguments?.[0];
                if (arg && typescript_1.default.isLiteralTypeNode(arg) && typescript_1.default.isStringLiteral(arg.literal)) {
                    sawHole = true;
                    const constraint = n.typeArguments?.[1];
                    return ctx.factory.createInferTypeNode(ctx.factory.createTypeParameterDeclaration(undefined, ctx.factory.createIdentifier(arg.literal.text), constraint, undefined));
                }
            }
            return typescript_1.default.visitEachChild(n, visit, ctx);
        };
        return typescript_1.default.visitNode(root, visit);
    };
    const result = typescript_1.default.transform(t, [transformer]);
    const out = result.transformed[0];
    const text = sawHole
        ? RAW_PRINTER.printNode(typescript_1.default.EmitHint.Unspecified, out, sf)
        : t.getText(sf);
    result.dispose();
    return text.replace(/\s*\n\s*/g, ' ').trim();
}
/** The JSDoc `@param {T}` type for a parameter, used by the pure-JavaScript dialect. */
function jsDocParamType(p) {
    for (const tag of typescript_1.default.getJSDocParameterTags(p)) {
        if (tag.typeExpression?.type)
            return tag.typeExpression.type;
    }
    return undefined;
}
function asStatements(s) {
    return typescript_1.default.isBlock(s) ? s.statements : [s];
}
function propName(n) {
    if (typescript_1.default.isIdentifier(n) || typescript_1.default.isStringLiteral(n) || typescript_1.default.isNumericLiteral(n))
        return n.text;
    if (typescript_1.default.isPrivateIdentifier(n))
        return n.text;
    return n.getText();
}
/** Identifiers assigned to (or mutated via push/unshift/concat) inside a subtree. */
function collectAssigned(root) {
    const out = new Set();
    const visit = (n) => {
        if (typescript_1.default.isBinaryExpression(n) && n.operatorToken.kind === typescript_1.default.SyntaxKind.EqualsToken) {
            if (typescript_1.default.isIdentifier(n.left))
                out.add(n.left.text);
        }
        if (typescript_1.default.isCallExpression(n) && typescript_1.default.isPropertyAccessExpression(n.expression)) {
            const m = n.expression.name.text;
            if ((m === 'push' || m === 'unshift' || m === 'concat') && typescript_1.default.isIdentifier(n.expression.expression)) {
                out.add(n.expression.expression.text);
            }
        }
        typescript_1.default.forEachChild(n, visit);
    };
    visit(root);
    return out;
}
/** Identifiers read anywhere inside a subtree. */
function collectRead(root) {
    const out = new Set();
    const visit = (n) => {
        if (typescript_1.default.isIdentifier(n))
            out.add(n.text);
        typescript_1.default.forEachChild(n, visit);
    };
    visit(root);
    return out;
}
/** Rename `infer X` nodes (which `substitute` deliberately leaves alone). */
function renameInfers(e, renames) {
    const nameFor = (old) => {
        const r = renames.get(old);
        return r && r.kind === 'ref' ? r.name : undefined;
    };
    const walk = (x) => {
        if (x.kind === 'infer') {
            const n = nameFor(x.name);
            return n ? { ...x, name: n } : x;
        }
        switch (x.kind) {
            case 'template':
                return { ...x, exprs: x.exprs.map(walk) };
            case 'tuple':
                return { ...x, elements: x.elements.map((el) => ({ ...el, expr: walk(el.expr) })) };
            case 'union':
                return { ...x, members: x.members.map(walk) };
            case 'intersection':
                return { ...x, members: x.members.map(walk) };
            case 'ref':
                return x.args ? { ...x, args: x.args.map(walk) } : x;
            case 'conditional':
                return { ...x, check: walk(x.check), ext: walk(x.ext), then: walk(x.then), else: walk(x.else) };
            default:
                return x;
        }
    };
    return walk(e);
}
