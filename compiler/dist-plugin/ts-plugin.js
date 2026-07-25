"use strict";
const compile_js_1 = require("./compile.js");
const diagnostics_js_1 = require("./diagnostics.js");
/**
 * ScriptType codes rendered as TypeScript diagnostic codes.
 *
 * `ts.Diagnostic.code` is a number, so `ST1102` becomes `951102`. The 95xxxx range is
 * far outside the codes TypeScript itself issues, so nothing collides, and the readable
 * form is kept at the front of the message where the user actually reads it.
 */
const CODE_BASE = 950000;
const numericCode = (code) => {
    const n = Number(code.replace(/^\D+/, ''));
    return Number.isFinite(n) ? CODE_BASE + n : CODE_BASE;
};
const IS_SCRIPTTYPE = /\.st\.[cm]?[jt]sx?$/;
function init(mod) {
    const ts = mod.typescript;
    function create(info) {
        const log = (msg) => info.project.projectService.logger.info(`[scripttype] ${msg}`);
        log('plugin loaded');
        // Proxy every method through, so anything not overridden behaves exactly as before.
        const proxy = Object.create(null);
        for (const k of Object.keys(info.languageService)) {
            const original = info.languageService[k];
            proxy[k] = (...args) => original.apply(info.languageService, args);
        }
        proxy.getSemanticDiagnostics = (fileName) => {
            const prior = info.languageService.getSemanticDiagnostics(fileName);
            if (!IS_SCRIPTTYPE.test(fileName))
                return prior;
            const program = info.languageService.getProgram();
            const file = program?.getSourceFile(fileName);
            if (!file)
                return prior;
            try {
                return [...prior, ...scriptTypeDiagnostics(ts, file, fileName)];
            }
            catch (e) {
                // Never let a compiler bug take the language service down with it.
                log(`diagnostics failed for ${fileName}: ${e.message}`);
                return prior;
            }
        };
        return proxy;
    }
    return { create };
}
/** Compile the file and translate whatever went wrong into editor diagnostics. */
function scriptTypeDiagnostics(ts, file, fileName) {
    const { errors } = (0, compile_js_1.compileAll)(file.getFullText(), { fileName });
    return errors.map((e) => {
        // A node from our own parse of the same text: the offsets line up, but clamp anyway
        // rather than risk asking the editor to underline past the end of the file.
        const start = e.node ? Math.min(e.node.getStart(e.node.getSourceFile()), file.end) : 0;
        const end = e.node ? Math.min(e.node.getEnd(), file.end) : 0;
        const help = e.help ?? diagnostics_js_1.CATALOGUE[e.code]?.help;
        return {
            file,
            start,
            length: Math.max(1, end - start),
            // The readable code leads, because that is what a user searches for and what
            // `scripttype explain` takes.
            messageText: `[${e.code}] ${e.message}` + (help ? `\n  help: ${help}` : ''),
            category: ts.DiagnosticCategory.Error,
            code: numericCode(e.code),
            source: 'scripttype',
        };
    });
}
module.exports = init;
