/**
 * ORIGINAL TypeScript from 07-compiler-internals/typescript/src/compiler/watchPublic.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BuilderProgram<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type CompilerHost<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type CompilerOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Diagnostic<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ExtendedConfigCacheEntry<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ParsedCommandLine<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Partial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ProjectReference<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type WatchOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type CreateProgram<T extends BuilderProgram> = (rootNames: readonly string[] | undefined, options: CompilerOptions | undefined, host?: CompilerHost, oldProgram?: T, configFileParsingDiagnostics?: readonly Diagnostic[], projectReferences?: readonly ProjectReference[] | undefined) => T;

export interface WatchCompilerHostOfFilesAndCompilerOptions<T extends BuilderProgram> extends WatchCompilerHost<T> {
    /** root files to use to generate program */
    rootFiles: string[];

    /** Compiler options */
    options: CompilerOptions;

    watchOptions?: WatchOptions;

    /** Project References */
    projectReferences?: readonly ProjectReference[];
}

export interface WatchCompilerHostOfConfigFile<T extends BuilderProgram> extends WatchCompilerHost<T> {
    configFileParsingResult?: ParsedCommandLine;
    extendedConfigCache?: Map<string, ExtendedConfigCacheEntry>;
}

export type WatchCompilerHostOfFilesAndCompilerOptionsOrConfigFile<T extends BuilderProgram> =
    | WatchCompilerHostOfFilesAndCompilerOptions<T> & Partial<WatchCompilerHostOfConfigFile<T>>
    | WatchCompilerHostOfConfigFile<T> & Partial<WatchCompilerHostOfFilesAndCompilerOptions<T>>;
