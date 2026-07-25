/**
 * ORIGINAL TypeScript from 07-compiler-internals/typescript/src/compiler/types.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type DiagnosticCategory<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type EmitFlags<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type EmitHelperFactory<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type EmitHint<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Extract<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FileIncludeKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type GeneratedIdentifierFlags<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ImportsNotUsedAsValues<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InternalEmitFlags<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InternalNodeBuilderFlags<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InternalSymbolName<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type JsxEmit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MapLike<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ModifierFlags<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ModuleDetectionKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ModuleKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ModuleResolutionCache<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ModuleResolutionKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MultiMap<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NewLineKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NodeBuilderFlags<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NodeCheckFlags<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NodeFlags<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PackageJsonInfoCache<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PollingWatchKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PragmaKindFlags<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Readonly<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyMap<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ScriptTarget<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SnippetKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SymbolAccessibility<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SymbolFlags<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SymlinkCache<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SyntaxKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TokenFlags<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TransformFlags<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TypeReferenceSerializationKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type WatchDirectoryFlags<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type WatchDirectoryKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type WatchFileKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type MatchingKeys<TRecord, TMatch, K extends keyof TRecord = keyof TRecord> = K extends (TRecord[K] extends TMatch ? K : never) ? K : never;

export type __String = (string & { __escapedIdentifier: void; }) | (void & { __escapedIdentifier: void; }) | InternalSymbolName;

export type ReadonlyUnderscoreEscapedMap<T> = ReadonlyMap<__String, T>;

export type UnderscoreEscapedMap<T> = Map<__String, T>;

export type ModuleImportResult<T = {}> =
    | { module: T; modulePath?: string; error: undefined; }
    | { module: undefined; modulePath?: undefined; error: { stack?: string; message?: string; }; };

export interface Expression extends Node {
    _expressionBrand: any;
}

export interface ParenthesizedExpression extends PrimaryExpression, JSDocContainer {
    readonly kind: SyntaxKind.ParenthesizedExpression;
    readonly expression: Expression;
}

export type KeywordTypeSyntaxKind =
    | SyntaxKind.AnyKeyword
    | SyntaxKind.BigIntKeyword
    | SyntaxKind.BooleanKeyword
    | SyntaxKind.IntrinsicKeyword
    | SyntaxKind.NeverKeyword
    | SyntaxKind.NumberKeyword
    | SyntaxKind.ObjectKeyword
    | SyntaxKind.StringKeyword
    | SyntaxKind.SymbolKeyword
    | SyntaxKind.UndefinedKeyword
    | SyntaxKind.UnknownKeyword
    | SyntaxKind.VoidKeyword;

export type TypeNodeSyntaxKind =
    | KeywordTypeSyntaxKind
    | SyntaxKind.TypePredicate
    | SyntaxKind.TypeReference
    | SyntaxKind.FunctionType
    | SyntaxKind.ConstructorType
    | SyntaxKind.TypeQuery
    | SyntaxKind.TypeLiteral
    | SyntaxKind.ArrayType
    | SyntaxKind.TupleType
    | SyntaxKind.NamedTupleMember
    | SyntaxKind.OptionalType
    | SyntaxKind.RestType
    | SyntaxKind.UnionType
    | SyntaxKind.IntersectionType
    | SyntaxKind.ConditionalType
    | SyntaxKind.InferType
    | SyntaxKind.ParenthesizedType
    | SyntaxKind.ThisType
    | SyntaxKind.TypeOperator
    | SyntaxKind.IndexedAccessType
    | SyntaxKind.MappedType
    | SyntaxKind.LiteralType
    | SyntaxKind.TemplateLiteralType
    | SyntaxKind.TemplateLiteralTypeSpan
    | SyntaxKind.ImportType
    | SyntaxKind.ExpressionWithTypeArguments
    | SyntaxKind.JSDocTypeExpression
    | SyntaxKind.JSDocAllType
    | SyntaxKind.JSDocUnknownType
    | SyntaxKind.JSDocNonNullableType
    | SyntaxKind.JSDocNullableType
    | SyntaxKind.JSDocOptionalType
    | SyntaxKind.JSDocFunctionType
    | SyntaxKind.JSDocVariadicType
    | SyntaxKind.JSDocNamepathType
    | SyntaxKind.JSDocSignature
    | SyntaxKind.JSDocTypeLiteral;

export interface TypeNode extends Node {
    readonly kind: TypeNodeSyntaxKind;
}

export interface UnaryExpression extends Expression {
    _unaryExpressionBrand: any;
}

export interface TypeAssertion extends UnaryExpression {
    readonly kind: SyntaxKind.TypeAssertionExpression;
    readonly type: TypeNode;
    readonly expression: UnaryExpression;
}

export interface SatisfiesExpression extends Expression {
    readonly kind: SyntaxKind.SatisfiesExpression;
    readonly expression: Expression;
    readonly type: TypeNode;
}

export interface AsExpression extends Expression {
    readonly kind: SyntaxKind.AsExpression;
    readonly expression: Expression;
    readonly type: TypeNode;
}

export interface NonNullExpression extends LeftHandSideExpression {
    readonly kind: SyntaxKind.NonNullExpression;
    readonly expression: Expression;
}

export interface LeftHandSideExpression extends UpdateExpression {
    _leftHandSideExpressionBrand: any;
}

export interface ExpressionWithTypeArguments extends MemberExpression, NodeWithTypeArguments {
    readonly kind: SyntaxKind.ExpressionWithTypeArguments;
    readonly expression: LeftHandSideExpression;
}

export interface PartiallyEmittedExpression extends LeftHandSideExpression {
    readonly kind: SyntaxKind.PartiallyEmittedExpression;
    readonly expression: Expression;
}

export type OuterExpression =
    | ParenthesizedExpression
    | TypeAssertion
    | SatisfiesExpression
    | AsExpression
    | NonNullExpression
    | ExpressionWithTypeArguments
    | PartiallyEmittedExpression;

export type WrappedExpression<T extends Expression> =
    | OuterExpression & { readonly expression: WrappedExpression<T>; }
    | T;

export type NodeId = number;

export interface SynthesizedComment extends CommentRange {
    text: string;
    pos: -1;
    end: -1;
    hasLeadingNewline?: boolean;
}

export interface TextRange {
    pos: number;
    end: number;
}

export interface SourceMapSource {
    fileName: string;
    text: string;
    /** @internal */ lineMap: readonly number[];
    skipTrivia?: (pos: number) => number;
}

export interface SourceMapRange extends TextRange {
    source?: SourceMapSource;
}

export interface Identifier extends PrimaryExpression, Declaration, JSDocContainer, FlowContainer {
    readonly kind: SyntaxKind.Identifier;
    /**
     * Prefer to use `id.unescapedText`. (Note: This is available only in services, not internally to the TypeScript compiler.)
     * Text of identifier, but if the identifier begins with two underscores, this will begin with three.
     */
    readonly escapedText: __String;
}

export interface ScopedEmitHelper extends EmitHelperBase {
    readonly scoped: true;
}

export interface UnscopedEmitHelper extends EmitHelperBase {
    readonly scoped: false;                                         // Indicates whether the helper MUST be emitted in the current scope.
    /** @internal */
    readonly importName?: string;                                   // The name of the helper to use when importing via `--importHelpers`.
    readonly text: string;                                          // ES3-compatible raw script text, or a function yielding such a string
}

export type EmitHelper = ScopedEmitHelper | UnscopedEmitHelper;

export interface TabStop {
    kind: SnippetKind.TabStop;
    order: number;
}

export interface Placeholder {
    kind: SnippetKind.Placeholder;
    order: number;
}

export type SnippetElement = TabStop | Placeholder;

export interface NodeArray<T extends Node> extends ReadonlyArray<T>, ReadonlyTextRange {
    readonly hasTrailingComma: boolean;
    /** @internal */ transformFlags: TransformFlags; // Flags for transforms, possibly undefined
}

export interface CallSignatureDeclaration extends SignatureDeclarationBase, TypeElement, LocalsContainer {
    readonly kind: SyntaxKind.CallSignature;
}

export interface ConstructSignatureDeclaration extends SignatureDeclarationBase, TypeElement, LocalsContainer {
    readonly kind: SyntaxKind.ConstructSignature;
}

export interface NoSubstitutionTemplateLiteral extends LiteralExpression, TemplateLiteralLikeNode, Declaration {
    readonly kind: SyntaxKind.NoSubstitutionTemplateLiteral;
    /** @internal */
    templateFlags?: TokenFlags;
}

export type StringLiteralLike = StringLiteral | NoSubstitutionTemplateLiteral;

export interface NumericLiteral extends LiteralExpression, Declaration {
    readonly kind: SyntaxKind.NumericLiteral;
    /** @internal */
    readonly numericLiteralFlags: TokenFlags;
}

export interface PrivateIdentifier extends PrimaryExpression {
    readonly kind: SyntaxKind.PrivateIdentifier;
    // escaping not strictly necessary
    // avoids gotchas in transforms and utils
    readonly escapedText: __String;
}

export interface JsxNamespacedName extends Node {
    readonly kind: SyntaxKind.JsxNamespacedName;
    readonly name: Identifier;
    readonly namespace: Identifier;
}

export interface BigIntLiteral extends LiteralExpression {
    readonly kind: SyntaxKind.BigIntLiteral;
}

export interface StringLiteral extends LiteralExpression, Declaration {
    readonly kind: SyntaxKind.StringLiteral;
    /** @internal */
    readonly textSourceNode?: Identifier | StringLiteralLike | NumericLiteral | PrivateIdentifier | JsxNamespacedName | BigIntLiteral; // Allows a StringLiteral to get its text from another node (used by transforms).
    /**
     * Note: this is only set when synthesizing a node, not during parsing.
     *
     * @internal
     */
    readonly singleQuote?: boolean;
}

export type SymbolTable = Map<__String, Symbol>;

export type SymbolId = number;

export interface Symbol {
    flags: SymbolFlags;                     // Symbol flags
    escapedName: __String;                  // Name of symbol
    declarations?: Declaration[];           // Declarations associated with this symbol
    valueDeclaration?: Declaration;         // First value declaration of the symbol
    members?: SymbolTable;                  // Class, interface or object literal instance members
    exports?: SymbolTable;                  // Module exports
    globalExports?: SymbolTable;            // Conditional global UMD exports
    /** @internal */ id: SymbolId;          // Unique id (used to look up SymbolLinks)
    /** @internal */ mergeId: number;       // Merge id (used to look up merged symbol)
    /** @internal */ parent?: Symbol;       // Parent symbol
    /** @internal */ exportSymbol?: Symbol; // Exported symbol associated with this symbol
    /** @internal */ constEnumOnlyModule: boolean | undefined; // True if module contains only const enums or other modules with only const enums
    /** @internal */ isReferenced?: SymbolFlags; // True if the symbol is referenced elsewhere. Keeps track of the meaning of a reference in case a symbol is both a type parameter and parameter.
    /** @internal */ lastAssignmentPos?: number; // Source position of last node that assigns value to symbol. Negative if it is assigned anywhere definitely
    /** @internal */ isReplaceableByMethod?: boolean; // Can this Javascript class property be replaced by a method symbol?
    /** @internal */ assignmentDeclarationMembers?: Map<number, Declaration>; // detected late-bound assignment declarations associated with the symbol
}

export interface Declaration extends Node {
    _declarationBrand: any;
    /** @internal */ symbol: Symbol; // Symbol declared by node (initialized by binding)
    /** @internal */ localSymbol?: Symbol; // Local symbol declared by node (initialized by binding only for exported nodes)
}

export interface ComputedPropertyName extends Node {
    readonly kind: SyntaxKind.ComputedPropertyName;
    readonly parent: Declaration;
    readonly expression: Expression;
}

export type PropertyName =
    | Identifier
    | StringLiteral
    | NoSubstitutionTemplateLiteral
    | NumericLiteral
    | ComputedPropertyName
    | PrivateIdentifier
    | BigIntLiteral;

export type PunctuationSyntaxKind =
    | SyntaxKind.OpenBraceToken
    | SyntaxKind.CloseBraceToken
    | SyntaxKind.OpenParenToken
    | SyntaxKind.CloseParenToken
    | SyntaxKind.OpenBracketToken
    | SyntaxKind.CloseBracketToken
    | SyntaxKind.DotToken
    | SyntaxKind.DotDotDotToken
    | SyntaxKind.SemicolonToken
    | SyntaxKind.CommaToken
    | SyntaxKind.QuestionDotToken
    | SyntaxKind.LessThanToken
    | SyntaxKind.LessThanSlashToken
    | SyntaxKind.GreaterThanToken
    | SyntaxKind.LessThanEqualsToken
    | SyntaxKind.GreaterThanEqualsToken
    | SyntaxKind.EqualsEqualsToken
    | SyntaxKind.ExclamationEqualsToken
    | SyntaxKind.EqualsEqualsEqualsToken
    | SyntaxKind.ExclamationEqualsEqualsToken
    | SyntaxKind.EqualsGreaterThanToken
    | SyntaxKind.PlusToken
    | SyntaxKind.MinusToken
    | SyntaxKind.AsteriskToken
    | SyntaxKind.AsteriskAsteriskToken
    | SyntaxKind.SlashToken
    | SyntaxKind.PercentToken
    | SyntaxKind.PlusPlusToken
    | SyntaxKind.MinusMinusToken
    | SyntaxKind.LessThanLessThanToken
    | SyntaxKind.GreaterThanGreaterThanToken
    | SyntaxKind.GreaterThanGreaterThanGreaterThanToken
    | SyntaxKind.AmpersandToken
    | SyntaxKind.BarToken
    | SyntaxKind.CaretToken
    | SyntaxKind.ExclamationToken
    | SyntaxKind.TildeToken
    | SyntaxKind.AmpersandAmpersandToken
    | SyntaxKind.AmpersandAmpersandEqualsToken
    | SyntaxKind.BarBarToken
    | SyntaxKind.BarBarEqualsToken
    | SyntaxKind.QuestionQuestionToken
    | SyntaxKind.QuestionQuestionEqualsToken
    | SyntaxKind.QuestionToken
    | SyntaxKind.ColonToken
    | SyntaxKind.AtToken
    | SyntaxKind.BacktickToken
    | SyntaxKind.HashToken
    | SyntaxKind.EqualsToken
    | SyntaxKind.PlusEqualsToken
    | SyntaxKind.MinusEqualsToken
    | SyntaxKind.AsteriskEqualsToken
    | SyntaxKind.AsteriskAsteriskEqualsToken
    | SyntaxKind.SlashEqualsToken
    | SyntaxKind.PercentEqualsToken
    | SyntaxKind.LessThanLessThanEqualsToken
    | SyntaxKind.GreaterThanGreaterThanEqualsToken
    | SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken
    | SyntaxKind.AmpersandEqualsToken
    | SyntaxKind.BarEqualsToken
    | SyntaxKind.CaretEqualsToken;

export interface PunctuationToken<TKind extends PunctuationSyntaxKind> extends Token<TKind> {
}

export type QuestionToken = PunctuationToken<SyntaxKind.QuestionToken>;

export interface TypeElement extends NamedDeclaration {
    _typeElementBrand: any;
    readonly name?: PropertyName;
    readonly questionToken?: QuestionToken | undefined;
}

export interface TypeLiteralNode extends TypeNode, Declaration {
    readonly kind: SyntaxKind.TypeLiteral;
    readonly members: NodeArray<TypeElement>;
}

export type ModifierSyntaxKind =
    | SyntaxKind.AbstractKeyword
    | SyntaxKind.AccessorKeyword
    | SyntaxKind.AsyncKeyword
    | SyntaxKind.ConstKeyword
    | SyntaxKind.DeclareKeyword
    | SyntaxKind.DefaultKeyword
    | SyntaxKind.ExportKeyword
    | SyntaxKind.InKeyword
    | SyntaxKind.PrivateKeyword
    | SyntaxKind.ProtectedKeyword
    | SyntaxKind.PublicKeyword
    | SyntaxKind.ReadonlyKeyword
    | SyntaxKind.OutKeyword
    | SyntaxKind.OverrideKeyword
    | SyntaxKind.StaticKeyword;

export interface ModifierToken<TKind extends ModifierSyntaxKind> extends KeywordToken<TKind> {
}

export type AbstractKeyword = ModifierToken<SyntaxKind.AbstractKeyword>;

export type AccessorKeyword = ModifierToken<SyntaxKind.AccessorKeyword>;

export type AsyncKeyword = ModifierToken<SyntaxKind.AsyncKeyword>;

export type ConstKeyword = ModifierToken<SyntaxKind.ConstKeyword>;

export type DeclareKeyword = ModifierToken<SyntaxKind.DeclareKeyword>;

export type DefaultKeyword = ModifierToken<SyntaxKind.DefaultKeyword>;

export type ExportKeyword = ModifierToken<SyntaxKind.ExportKeyword>;

export type InKeyword = ModifierToken<SyntaxKind.InKeyword>;

export type PrivateKeyword = ModifierToken<SyntaxKind.PrivateKeyword>;

export type ProtectedKeyword = ModifierToken<SyntaxKind.ProtectedKeyword>;

export type PublicKeyword = ModifierToken<SyntaxKind.PublicKeyword>;

export type OutKeyword = ModifierToken<SyntaxKind.OutKeyword>;

export type OverrideKeyword = ModifierToken<SyntaxKind.OverrideKeyword>;

export type ReadonlyKeyword = ModifierToken<SyntaxKind.ReadonlyKeyword>;

export type StaticKeyword = ModifierToken<SyntaxKind.StaticKeyword>;

export type Modifier =
    | AbstractKeyword
    | AccessorKeyword
    | AsyncKeyword
    | ConstKeyword
    | DeclareKeyword
    | DefaultKeyword
    | ExportKeyword
    | InKeyword
    | PrivateKeyword
    | ProtectedKeyword
    | PublicKeyword
    | OutKeyword
    | OverrideKeyword
    | ReadonlyKeyword
    | StaticKeyword;

export type JsxAttributeName =
    | Identifier
    | JsxNamespacedName;

export type QuestionDotToken = PunctuationToken<SyntaxKind.QuestionDotToken>;

export interface ElementAccessExpression extends MemberExpression, Declaration, JSDocContainer, FlowContainer {
    readonly kind: SyntaxKind.ElementAccessExpression;
    readonly expression: LeftHandSideExpression;
    readonly questionDotToken?: QuestionDotToken;
    readonly argumentExpression: Expression;
}

export interface VariableStatement extends Statement, FlowContainer {
    readonly kind: SyntaxKind.VariableStatement;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly declarationList: VariableDeclarationList;
}

export type ForInitializer =
    | VariableDeclarationList
    | Expression;

export interface ForStatement extends IterationStatement, LocalsContainer, FlowContainer {
    readonly kind: SyntaxKind.ForStatement;
    readonly initializer?: ForInitializer;
    readonly condition?: Expression;
    readonly incrementor?: Expression;
}

export type KeywordSyntaxKind =
    | SyntaxKind.AbstractKeyword
    | SyntaxKind.AccessorKeyword
    | SyntaxKind.AnyKeyword
    | SyntaxKind.AsKeyword
    | SyntaxKind.AssertsKeyword
    | SyntaxKind.AssertKeyword
    | SyntaxKind.AsyncKeyword
    | SyntaxKind.AwaitKeyword
    | SyntaxKind.BigIntKeyword
    | SyntaxKind.BooleanKeyword
    | SyntaxKind.BreakKeyword
    | SyntaxKind.CaseKeyword
    | SyntaxKind.CatchKeyword
    | SyntaxKind.ClassKeyword
    | SyntaxKind.ConstKeyword
    | SyntaxKind.ConstructorKeyword
    | SyntaxKind.ContinueKeyword
    | SyntaxKind.DebuggerKeyword
    | SyntaxKind.DeclareKeyword
    | SyntaxKind.DefaultKeyword
    | SyntaxKind.DeferKeyword
    | SyntaxKind.DeleteKeyword
    | SyntaxKind.DoKeyword
    | SyntaxKind.ElseKeyword
    | SyntaxKind.EnumKeyword
    | SyntaxKind.ExportKeyword
    | SyntaxKind.ExtendsKeyword
    | SyntaxKind.FalseKeyword
    | SyntaxKind.FinallyKeyword
    | SyntaxKind.ForKeyword
    | SyntaxKind.FromKeyword
    | SyntaxKind.FunctionKeyword
    | SyntaxKind.GetKeyword
    | SyntaxKind.GlobalKeyword
    | SyntaxKind.IfKeyword
    | SyntaxKind.ImplementsKeyword
    | SyntaxKind.ImportKeyword
    | SyntaxKind.InferKeyword
    | SyntaxKind.InKeyword
    | SyntaxKind.InstanceOfKeyword
    | SyntaxKind.InterfaceKeyword
    | SyntaxKind.IntrinsicKeyword
    | SyntaxKind.IsKeyword
    | SyntaxKind.KeyOfKeyword
    | SyntaxKind.LetKeyword
    | SyntaxKind.ModuleKeyword
    | SyntaxKind.NamespaceKeyword
    | SyntaxKind.NeverKeyword
    | SyntaxKind.NewKeyword
    | SyntaxKind.NullKeyword
    | SyntaxKind.NumberKeyword
    | SyntaxKind.ObjectKeyword
    | SyntaxKind.OfKeyword
    | SyntaxKind.PackageKeyword
    | SyntaxKind.PrivateKeyword
    | SyntaxKind.ProtectedKeyword
    | SyntaxKind.PublicKeyword
    | SyntaxKind.ReadonlyKeyword
    | SyntaxKind.OutKeyword
    | SyntaxKind.OverrideKeyword
    | SyntaxKind.RequireKeyword
    | SyntaxKind.ReturnKeyword
    | SyntaxKind.SatisfiesKeyword
    | SyntaxKind.SetKeyword
    | SyntaxKind.StaticKeyword
    | SyntaxKind.StringKeyword
    | SyntaxKind.SuperKeyword
    | SyntaxKind.SwitchKeyword
    | SyntaxKind.SymbolKeyword
    | SyntaxKind.ThisKeyword
    | SyntaxKind.ThrowKeyword
    | SyntaxKind.TrueKeyword
    | SyntaxKind.TryKeyword
    | SyntaxKind.TypeKeyword
    | SyntaxKind.TypeOfKeyword
    | SyntaxKind.UndefinedKeyword
    | SyntaxKind.UniqueKeyword
    | SyntaxKind.UnknownKeyword
    | SyntaxKind.UsingKeyword
    | SyntaxKind.VarKeyword
    | SyntaxKind.VoidKeyword
    | SyntaxKind.WhileKeyword
    | SyntaxKind.WithKeyword
    | SyntaxKind.YieldKeyword;

export interface KeywordToken<TKind extends KeywordSyntaxKind> extends Token<TKind> {
}

export type AwaitKeyword = KeywordToken<SyntaxKind.AwaitKeyword>;

export interface ForOfStatement extends IterationStatement, LocalsContainer, FlowContainer {
    readonly kind: SyntaxKind.ForOfStatement;
    readonly awaitModifier?: AwaitKeyword;
    readonly initializer: ForInitializer;
    readonly expression: Expression;
}

export interface ForInStatement extends IterationStatement, LocalsContainer, FlowContainer {
    readonly kind: SyntaxKind.ForInStatement;
    readonly initializer: ForInitializer;
    readonly expression: Expression;
}

export interface VariableDeclarationList extends Node {
    readonly kind: SyntaxKind.VariableDeclarationList;
    readonly parent: VariableStatement | ForStatement | ForOfStatement | ForInStatement;
    readonly declarations: NodeArray<VariableDeclaration>;
}

export interface Statement extends Node, JSDocContainer {
    _statementBrand: any;
}

export interface Block extends Statement, LocalsContainer {
    readonly kind: SyntaxKind.Block;
    readonly statements: NodeArray<Statement>;
    /** @internal */ multiLine?: boolean;
}

export interface TryStatement extends Statement, FlowContainer {
    readonly kind: SyntaxKind.TryStatement;
    readonly tryBlock: Block;
    readonly catchClause?: CatchClause;
    readonly finallyBlock?: Block;
}

export interface CatchClause extends Node, LocalsContainer {
    readonly kind: SyntaxKind.CatchClause;
    readonly parent: TryStatement;
    readonly variableDeclaration?: VariableDeclaration;
    readonly block: Block;
}

export type BindingName = Identifier | BindingPattern;

export type ExclamationToken = PunctuationToken<SyntaxKind.ExclamationToken>;

export interface VariableDeclaration extends NamedDeclaration, JSDocContainer {
    readonly kind: SyntaxKind.VariableDeclaration;
    readonly parent: VariableDeclarationList | CatchClause;
    readonly name: BindingName;                    // Declared variable name
    readonly exclamationToken?: ExclamationToken;  // Optional definite assignment assertion
    readonly type?: TypeNode;                      // Optional type annotation
    readonly initializer?: Expression;             // Optional initializer
}

export type DotDotDotToken = PunctuationToken<SyntaxKind.DotDotDotToken>;

export interface ParameterDeclaration extends NamedDeclaration, JSDocContainer {
    readonly kind: SyntaxKind.Parameter;
    readonly parent: SignatureDeclaration;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly dotDotDotToken?: DotDotDotToken;    // Present on rest parameter
    readonly name: BindingName;                  // Declared parameter name.
    readonly questionToken?: QuestionToken;      // Present on optional parameter
    readonly type?: TypeNode;                    // Optional type annotation
    readonly initializer?: Expression;           // Optional initializer
}

export interface BindingElement extends NamedDeclaration, FlowContainer {
    readonly kind: SyntaxKind.BindingElement;
    readonly parent: BindingPattern;
    readonly propertyName?: PropertyName;        // Binding property name (in object binding pattern)
    readonly dotDotDotToken?: DotDotDotToken;    // Present on rest element (in object binding pattern)
    readonly name: BindingName;                  // Declared binding element name
    readonly initializer?: Expression;           // Optional initializer
}

export interface ObjectBindingPattern extends Node {
    readonly kind: SyntaxKind.ObjectBindingPattern;
    readonly parent: VariableDeclaration | ParameterDeclaration | BindingElement;
    readonly elements: NodeArray<BindingElement>;
}

export interface OmittedExpression extends Expression {
    readonly kind: SyntaxKind.OmittedExpression;
}

export type ArrayBindingElement = BindingElement | OmittedExpression;

export interface ArrayBindingPattern extends Node {
    readonly kind: SyntaxKind.ArrayBindingPattern;
    readonly parent: VariableDeclaration | ParameterDeclaration | BindingElement;
    readonly elements: NodeArray<ArrayBindingElement>;
}

export type BindingPattern = ObjectBindingPattern | ArrayBindingPattern;

export interface PropertyAccessEntityNameExpression extends PropertyAccessExpression {
    _propertyAccessExpressionLikeQualifiedNameBrand?: any;
    readonly expression: EntityNameExpression;
    readonly name: Identifier;
}

export type EntityNameExpression = Identifier | PropertyAccessEntityNameExpression;

export type DeclarationName =
    | PropertyName
    | JsxAttributeName
    | StringLiteralLike
    | ElementAccessExpression
    | BindingPattern
    | EntityNameExpression;

export interface NamedDeclaration extends Declaration {
    readonly name?: DeclarationName;
}

export interface Decorator extends Node {
    readonly kind: SyntaxKind.Decorator;
    readonly parent: NamedDeclaration;
    readonly expression: LeftHandSideExpression;
}

export type ModifierLike = Modifier | Decorator;

export interface ClassDeclaration extends ClassLikeDeclarationBase, DeclarationStatement {
    readonly kind: SyntaxKind.ClassDeclaration;
    readonly modifiers?: NodeArray<ModifierLike>;
    /** May be undefined in `export default class { ... }`. */
    readonly name?: Identifier;
}

export interface ClassExpression extends ClassLikeDeclarationBase, PrimaryExpression {
    readonly kind: SyntaxKind.ClassExpression;
    readonly modifiers?: NodeArray<ModifierLike>;
}

export type ClassLikeDeclaration =
    | ClassDeclaration
    | ClassExpression;

export interface HeritageClause extends Node {
    readonly kind: SyntaxKind.HeritageClause;
    readonly parent: InterfaceDeclaration | ClassLikeDeclaration;
    readonly token: SyntaxKind.ExtendsKeyword | SyntaxKind.ImplementsKeyword;
    readonly types: NodeArray<ExpressionWithTypeArguments>;
}

export interface InterfaceDeclaration extends DeclarationStatement, JSDocContainer {
    readonly kind: SyntaxKind.InterfaceDeclaration;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly name: Identifier;
    readonly typeParameters?: NodeArray<TypeParameterDeclaration>;
    readonly heritageClauses?: NodeArray<HeritageClause>;
    readonly members: NodeArray<TypeElement>;
}

export interface MethodSignature extends SignatureDeclarationBase, TypeElement, LocalsContainer {
    readonly kind: SyntaxKind.MethodSignature;
    readonly parent: TypeLiteralNode | InterfaceDeclaration;
    readonly modifiers?: NodeArray<Modifier>;
    readonly name: PropertyName;
}

export type ObjectTypeDeclaration =
    | ClassLikeDeclaration
    | InterfaceDeclaration
    | TypeLiteralNode;

export interface IndexSignatureDeclaration extends SignatureDeclarationBase, ClassElement, TypeElement, LocalsContainer {
    readonly kind: SyntaxKind.IndexSignature;
    readonly parent: ObjectTypeDeclaration;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly type: TypeNode;
}

export interface FunctionTypeNode extends FunctionOrConstructorTypeNodeBase, LocalsContainer {
    readonly kind: SyntaxKind.FunctionType;

    // A function type cannot have modifiers
    /** @internal */ readonly modifiers?: undefined;
}

export interface ConstructorTypeNode extends FunctionOrConstructorTypeNodeBase, LocalsContainer {
    readonly kind: SyntaxKind.ConstructorType;
    readonly modifiers?: NodeArray<Modifier>;
}

export interface JSDocFunctionType extends JSDocType, SignatureDeclarationBase, LocalsContainer {
    readonly kind: SyntaxKind.JSDocFunctionType;
}

export type FunctionBody = Block;

export interface FunctionDeclaration extends FunctionLikeDeclarationBase, DeclarationStatement, LocalsContainer {
    readonly kind: SyntaxKind.FunctionDeclaration;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly name?: Identifier;
    readonly body?: FunctionBody;
}

export interface PropertyAssignment extends ObjectLiteralElement, JSDocContainer {
    readonly kind: SyntaxKind.PropertyAssignment;
    readonly parent: ObjectLiteralExpression;
    readonly name: PropertyName;
    readonly initializer: Expression;

    // The following properties are used only to report grammar errors (see `isGrammarError` in utilities.ts)
    /** @internal */ readonly modifiers?: NodeArray<ModifierLike> | undefined; // property assignment cannot have decorators or modifiers
    /** @internal */ readonly questionToken?: QuestionToken | undefined; // property assignment cannot have a question token
    /** @internal */ readonly exclamationToken?: ExclamationToken | undefined; // property assignment cannot have an exclamation token
}

export type EqualsToken = PunctuationToken<SyntaxKind.EqualsToken>;

export interface ShorthandPropertyAssignment extends ObjectLiteralElement, JSDocContainer {
    readonly kind: SyntaxKind.ShorthandPropertyAssignment;
    readonly parent: ObjectLiteralExpression;
    readonly name: Identifier;
    // used when ObjectLiteralExpression is used in ObjectAssignmentPattern
    // it is a grammar error to appear in actual object initializer (see `isGrammarError` in utilities.ts):
    readonly equalsToken?: EqualsToken;
    readonly objectAssignmentInitializer?: Expression;

    // The following properties are used only to report grammar errors (see `isGrammarError` in utilities.ts)
    /** @internal */ readonly modifiers?: NodeArray<ModifierLike> | undefined; // shorthand property assignment cannot have decorators or modifiers
    /** @internal */ readonly questionToken?: QuestionToken | undefined; // shorthand property assignment cannot have a question token
    /** @internal */ readonly exclamationToken?: ExclamationToken | undefined; // shorthand property assignment cannot have an exclamation token
}

export interface SpreadAssignment extends ObjectLiteralElement, JSDocContainer {
    readonly kind: SyntaxKind.SpreadAssignment;
    readonly parent: ObjectLiteralExpression;
    readonly expression: Expression;
}

export interface GetAccessorDeclaration extends FunctionLikeDeclarationBase, ClassElement, TypeElement, ObjectLiteralElement, JSDocContainer, LocalsContainer, FlowContainer {
    readonly kind: SyntaxKind.GetAccessor;
    readonly parent: ClassLikeDeclaration | ObjectLiteralExpression | TypeLiteralNode | InterfaceDeclaration;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly name: PropertyName;
    readonly body?: FunctionBody;

    // The following properties are used only to report grammar errors (see `isGrammarError` in utilities.ts)
    /** @internal */ readonly typeParameters?: NodeArray<TypeParameterDeclaration> | undefined; // A get accessor cannot have type parameters
}

export interface SetAccessorDeclaration extends FunctionLikeDeclarationBase, ClassElement, TypeElement, ObjectLiteralElement, JSDocContainer, LocalsContainer, FlowContainer {
    readonly kind: SyntaxKind.SetAccessor;
    readonly parent: ClassLikeDeclaration | ObjectLiteralExpression | TypeLiteralNode | InterfaceDeclaration;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly name: PropertyName;
    readonly body?: FunctionBody;

    // The following properties are used only to report grammar errors (see `isGrammarError` in utilities.ts)
    /** @internal */ readonly typeParameters?: NodeArray<TypeParameterDeclaration> | undefined; // A set accessor cannot have type parameters
    /** @internal */ readonly type?: TypeNode | undefined; // A set accessor cannot have a return type
}

export type AccessorDeclaration = GetAccessorDeclaration | SetAccessorDeclaration;

export type ObjectLiteralElementLike =
    | PropertyAssignment
    | ShorthandPropertyAssignment
    | SpreadAssignment
    | MethodDeclaration
    | AccessorDeclaration;

export interface ObjectLiteralExpression extends ObjectLiteralExpressionBase<ObjectLiteralElementLike>, JSDocContainer {
    readonly kind: SyntaxKind.ObjectLiteralExpression;
    /** @internal */
    multiLine?: boolean;
}

export interface MethodDeclaration extends FunctionLikeDeclarationBase, ClassElement, ObjectLiteralElement, JSDocContainer, LocalsContainer, FlowContainer {
    readonly kind: SyntaxKind.MethodDeclaration;
    readonly parent: ClassLikeDeclaration | ObjectLiteralExpression;
    readonly modifiers?: NodeArray<ModifierLike> | undefined;
    readonly name: PropertyName;
    readonly body?: FunctionBody | undefined;

    // The following properties are used only to report grammar errors (see `isGrammarError` in utilities.ts)
    /** @internal */ readonly exclamationToken?: ExclamationToken | undefined; // A method cannot have an exclamation token
}

export interface ConstructorDeclaration extends FunctionLikeDeclarationBase, ClassElement, JSDocContainer, LocalsContainer {
    readonly kind: SyntaxKind.Constructor;
    readonly parent: ClassLikeDeclaration;
    readonly modifiers?: NodeArray<ModifierLike> | undefined;
    readonly body?: FunctionBody | undefined;

    // The following properties are used only to report grammar errors (see `isGrammarError` in utilities.ts)
    /** @internal */ readonly typeParameters?: NodeArray<TypeParameterDeclaration>; // A constructor cannot have type parameters
    /** @internal */ readonly type?: TypeNode; // A constructor cannot have a return type annotation
}

export interface FunctionExpression extends PrimaryExpression, FunctionLikeDeclarationBase, JSDocContainer, LocalsContainer, FlowContainer {
    readonly kind: SyntaxKind.FunctionExpression;
    readonly modifiers?: NodeArray<Modifier>;
    readonly name?: Identifier;
    readonly body: FunctionBody; // Required, whereas the member inherited from FunctionDeclaration is optional
}

export type EqualsGreaterThanToken = PunctuationToken<SyntaxKind.EqualsGreaterThanToken>;

export type ConciseBody = FunctionBody | Expression;

export interface ArrowFunction extends Expression, FunctionLikeDeclarationBase, JSDocContainer, LocalsContainer, FlowContainer {
    readonly kind: SyntaxKind.ArrowFunction;
    readonly modifiers?: NodeArray<Modifier>;
    readonly equalsGreaterThanToken: EqualsGreaterThanToken;
    readonly body: ConciseBody;
    readonly name: never;
}

export type SignatureDeclaration =
    | CallSignatureDeclaration
    | ConstructSignatureDeclaration
    | MethodSignature
    | IndexSignatureDeclaration
    | FunctionTypeNode
    | ConstructorTypeNode
    | JSDocFunctionType
    | FunctionDeclaration
    | MethodDeclaration
    | ConstructorDeclaration
    | AccessorDeclaration
    | FunctionExpression
    | ArrowFunction;

export interface TypeAliasDeclaration extends DeclarationStatement, JSDocContainer, LocalsContainer {
    readonly kind: SyntaxKind.TypeAliasDeclaration;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly name: Identifier;
    readonly typeParameters?: NodeArray<TypeParameterDeclaration>;
    readonly type: TypeNode;
}

export interface JSDocTypeExpression extends TypeNode {
    readonly kind: SyntaxKind.JSDocTypeExpression;
    readonly type: TypeNode;
}

export interface JSDocTemplateTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocTemplateTag;
    readonly constraint: JSDocTypeExpression | undefined;
    readonly typeParameters: NodeArray<TypeParameterDeclaration>;
}

export type DeclarationWithTypeParameterChildren =
    | SignatureDeclaration
    | ClassLikeDeclaration
    | InterfaceDeclaration
    | TypeAliasDeclaration
    | JSDocTemplateTag;

export interface InferTypeNode extends TypeNode {
    readonly kind: SyntaxKind.InferType;
    readonly typeParameter: TypeParameterDeclaration;
}

export interface TypeParameterDeclaration extends NamedDeclaration, JSDocContainer {
    readonly kind: SyntaxKind.TypeParameter;
    readonly parent: DeclarationWithTypeParameterChildren | InferTypeNode;
    readonly modifiers?: NodeArray<Modifier>;
    readonly name: Identifier;
    /** Note: Consider calling `getEffectiveConstraintOfTypeParameter` */
    readonly constraint?: TypeNode;
    readonly default?: TypeNode;

    // For error recovery purposes (see `isGrammarError` in utilities.ts).
    expression?: Expression;
}

export interface GeneratedNamePart {
    /** an additional prefix to insert before the text sourced from `node` */
    prefix?: string;
    node: Identifier | PrivateIdentifier;
    /** an additional suffix to insert after the text sourced from `node` */
    suffix?: string;
}

export interface AutoGenerateInfo {
    flags: GeneratedIdentifierFlags;            // Specifies whether to auto-generate the text for an identifier.
    readonly id: number;                        // Ensures unique generated identifiers get unique names, but clones get the same name.
    readonly prefix?: string | GeneratedNamePart;
    readonly suffix?: string;
}

export interface SourceFile extends ReadonlyPragmaContext {}

export interface NamespaceDeclaration extends ModuleDeclaration {
    readonly name: Identifier;
    readonly body: NamespaceBody;
}

export type NamespaceBody =
    | ModuleBlock
    | NamespaceDeclaration;

export interface JSDocNamespaceDeclaration extends ModuleDeclaration {
    readonly name: Identifier;
    readonly body?: JSDocNamespaceBody;
}

export type JSDocNamespaceBody =
    | Identifier
    | JSDocNamespaceDeclaration;

export type ModuleBody =
    | NamespaceBody
    | JSDocNamespaceBody;

export type ModuleName =
    | Identifier
    | StringLiteral;

export interface ModuleDeclaration extends DeclarationStatement, JSDocContainer, LocalsContainer {
    readonly kind: SyntaxKind.ModuleDeclaration;
    readonly parent: ModuleBody | SourceFile;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly name: ModuleName;
    readonly body?: ModuleBody | JSDocNamespaceDeclaration;
}

export interface ModuleBlock extends Node, Statement {
    readonly kind: SyntaxKind.ModuleBlock;
    readonly parent: ModuleDeclaration;
    readonly statements: NodeArray<Statement>;
}

export interface AssertClause extends ImportAttributes {}

export type ModuleExportName = Identifier | StringLiteral;

export interface NamespaceExport extends NamedDeclaration {
    readonly kind: SyntaxKind.NamespaceExport;
    readonly parent: ExportDeclaration;
    readonly name: ModuleExportName;
}

export interface ExportSpecifier extends NamedDeclaration, JSDocContainer {
    readonly kind: SyntaxKind.ExportSpecifier;
    readonly parent: NamedExports;
    readonly isTypeOnly: boolean;
    readonly propertyName?: ModuleExportName; // Name preceding "as" keyword (or undefined when "as" is absent)
    readonly name: ModuleExportName; // Declared name
}

export interface NamedExports extends Node {
    readonly kind: SyntaxKind.NamedExports;
    readonly parent: ExportDeclaration;
    readonly elements: NodeArray<ExportSpecifier>;
}

export type NamedExportBindings =
    | NamespaceExport
    | NamedExports;

export interface ExportDeclaration extends DeclarationStatement, JSDocContainer {
    readonly kind: SyntaxKind.ExportDeclaration;
    readonly parent: SourceFile | ModuleBlock;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly isTypeOnly: boolean;
    /** Will not be assigned in the case of `export * from "foo";` */
    readonly exportClause?: NamedExportBindings;
    /** If this is not a StringLiteral it will be a grammar error. */
    readonly moduleSpecifier?: Expression;
    /** @deprecated */ readonly assertClause?: AssertClause;
    readonly attributes?: ImportAttributes;
}

export type ImportAttributeName = Identifier | StringLiteral;

export interface ImportAttribute extends Node {
    readonly kind: SyntaxKind.ImportAttribute;
    readonly parent: ImportAttributes;
    readonly name: ImportAttributeName;
    readonly value: Expression;
}

export interface ImportAttributes extends Node {
    readonly token: SyntaxKind.WithKeyword | SyntaxKind.AssertKeyword;
    readonly kind: SyntaxKind.ImportAttributes;
    readonly parent: ImportDeclaration | ExportDeclaration;
    readonly elements: NodeArray<ImportAttribute>;
    readonly multiLine?: boolean;
}

export interface ImportDeclaration extends Statement {
    readonly kind: SyntaxKind.ImportDeclaration;
    readonly parent: SourceFile | ModuleBlock;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly importClause?: ImportClause;
    /** If this is not a StringLiteral it will be a grammar error. */
    readonly moduleSpecifier: Expression;
    /** @deprecated */ readonly assertClause?: AssertClause;
    readonly attributes?: ImportAttributes;
}

export interface Token<TKind extends SyntaxKind> extends Node {
    readonly kind: TKind;
}

export type ExponentiationOperator = SyntaxKind.AsteriskAsteriskToken;

export type MultiplicativeOperator =
    | SyntaxKind.AsteriskToken
    | SyntaxKind.SlashToken
    | SyntaxKind.PercentToken;

export type MultiplicativeOperatorOrHigher =
    | ExponentiationOperator
    | MultiplicativeOperator;

export type AdditiveOperator =
    | SyntaxKind.PlusToken
    | SyntaxKind.MinusToken;

export type AdditiveOperatorOrHigher =
    | MultiplicativeOperatorOrHigher
    | AdditiveOperator;

export type ShiftOperator =
    | SyntaxKind.LessThanLessThanToken
    | SyntaxKind.GreaterThanGreaterThanToken
    | SyntaxKind.GreaterThanGreaterThanGreaterThanToken;

export type ShiftOperatorOrHigher =
    | AdditiveOperatorOrHigher
    | ShiftOperator;

export type RelationalOperator =
    | SyntaxKind.LessThanToken
    | SyntaxKind.LessThanEqualsToken
    | SyntaxKind.GreaterThanToken
    | SyntaxKind.GreaterThanEqualsToken
    | SyntaxKind.InstanceOfKeyword
    | SyntaxKind.InKeyword;

export type RelationalOperatorOrHigher =
    | ShiftOperatorOrHigher
    | RelationalOperator;

export type EqualityOperator =
    | SyntaxKind.EqualsEqualsToken
    | SyntaxKind.EqualsEqualsEqualsToken
    | SyntaxKind.ExclamationEqualsEqualsToken
    | SyntaxKind.ExclamationEqualsToken;

export type EqualityOperatorOrHigher =
    | RelationalOperatorOrHigher
    | EqualityOperator;

export type BitwiseOperator =
    | SyntaxKind.AmpersandToken
    | SyntaxKind.BarToken
    | SyntaxKind.CaretToken;

export type BitwiseOperatorOrHigher =
    | EqualityOperatorOrHigher
    | BitwiseOperator;

export type LogicalOperator =
    | SyntaxKind.AmpersandAmpersandToken
    | SyntaxKind.BarBarToken;

export type LogicalOperatorOrHigher =
    | BitwiseOperatorOrHigher
    | LogicalOperator;

export type CompoundAssignmentOperator =
    | SyntaxKind.PlusEqualsToken
    | SyntaxKind.MinusEqualsToken
    | SyntaxKind.AsteriskAsteriskEqualsToken
    | SyntaxKind.AsteriskEqualsToken
    | SyntaxKind.SlashEqualsToken
    | SyntaxKind.PercentEqualsToken
    | SyntaxKind.AmpersandEqualsToken
    | SyntaxKind.BarEqualsToken
    | SyntaxKind.CaretEqualsToken
    | SyntaxKind.LessThanLessThanEqualsToken
    | SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken
    | SyntaxKind.GreaterThanGreaterThanEqualsToken
    | SyntaxKind.BarBarEqualsToken
    | SyntaxKind.AmpersandAmpersandEqualsToken
    | SyntaxKind.QuestionQuestionEqualsToken;

export type AssignmentOperator =
    | SyntaxKind.EqualsToken
    | CompoundAssignmentOperator;

export type AssignmentOperatorOrHigher =
    | SyntaxKind.QuestionQuestionToken
    | LogicalOperatorOrHigher
    | AssignmentOperator;

export type BinaryOperator =
    | AssignmentOperatorOrHigher
    | SyntaxKind.CommaToken;

export type BinaryOperatorToken = Token<BinaryOperator>;

export interface BinaryExpression extends Expression, Declaration, JSDocContainer {
    readonly kind: SyntaxKind.BinaryExpression;
    readonly left: Expression;
    readonly operatorToken: BinaryOperatorToken;
    readonly right: Expression;
}

export interface BreakStatement extends Statement, FlowContainer {
    readonly kind: SyntaxKind.BreakStatement;
    readonly label?: Identifier;
}

export interface SwitchStatement extends Statement, FlowContainer {
    readonly kind: SyntaxKind.SwitchStatement;
    readonly expression: Expression;
    readonly caseBlock: CaseBlock;
    possiblyExhaustive?: boolean; // initialized by binding
}

export interface FlowUnreachable extends FlowNodeBase {
    node: undefined;
    antecedent: undefined;
}

export interface FlowStart extends FlowNodeBase {
    node: FunctionExpression | ArrowFunction | MethodDeclaration | GetAccessorDeclaration | SetAccessorDeclaration | undefined;
    antecedent: undefined;
}

export interface FlowLabel extends FlowNodeBase {
    node: undefined;
    antecedent: FlowNode[] | undefined;
}

export interface FlowAssignment extends FlowNodeBase {
    node: Expression | VariableDeclaration | BindingElement;
    antecedent: FlowNode;
}

export interface FlowCondition extends FlowNodeBase {
    node: Expression;
    antecedent: FlowNode;
}

export interface FlowSwitchClauseData {
    switchStatement: SwitchStatement;
    clauseStart: number; // Start index of case/default clause range
    clauseEnd: number; // End index of case/default clause range
}

export interface FlowSwitchClause extends FlowNodeBase {
    node: FlowSwitchClauseData;
    antecedent: FlowNode;
}

export interface CallExpression extends LeftHandSideExpression, Declaration {
    readonly kind: SyntaxKind.CallExpression;
    readonly expression: LeftHandSideExpression;
    readonly questionDotToken?: QuestionDotToken;
    readonly typeArguments?: NodeArray<TypeNode>;
    readonly arguments: NodeArray<Expression>;
}

export interface FlowArrayMutation extends FlowNodeBase {
    node: CallExpression | BinaryExpression;
    antecedent: FlowNode;
}

export interface FlowCall extends FlowNodeBase {
    node: CallExpression;
    antecedent: FlowNode;
}

export interface FlowReduceLabelData {
    target: FlowLabel;
    antecedents: FlowNode[];
}

export interface FlowReduceLabel extends FlowNodeBase {
    node: FlowReduceLabelData;
    antecedent: FlowNode;
}

export type FlowNode =
    | FlowUnreachable
    | FlowStart
    | FlowLabel
    | FlowAssignment
    | FlowCondition
    | FlowSwitchClause
    | FlowArrayMutation
    | FlowCall
    | FlowReduceLabel;

export interface DefaultClause extends Node {
    readonly kind: SyntaxKind.DefaultClause;
    readonly parent: CaseBlock;
    readonly statements: NodeArray<Statement>;
    /** @internal */ fallthroughFlowNode?: FlowNode;
}

export type CaseOrDefaultClause =
    | CaseClause
    | DefaultClause;

export interface CaseBlock extends Node, LocalsContainer {
    readonly kind: SyntaxKind.CaseBlock;
    readonly parent: SwitchStatement;
    readonly clauses: NodeArray<CaseOrDefaultClause>;
}

export interface CaseClause extends Node, JSDocContainer {
    readonly kind: SyntaxKind.CaseClause;
    readonly parent: CaseBlock;
    readonly expression: Expression;
    readonly statements: NodeArray<Statement>;
    /** @internal */ fallthroughFlowNode?: FlowNode;
}

export interface ClassStaticBlockDeclaration extends ClassElement, JSDocContainer, LocalsContainer {
    readonly kind: SyntaxKind.ClassStaticBlockDeclaration;
    readonly parent: ClassDeclaration | ClassExpression;
    readonly body: Block;

    /** @internal */ endFlowNode?: FlowNode;
    /** @internal */ returnFlowNode?: FlowNode;

    // The following properties are used only to report grammar errors (see `isGrammarError` in utilities.ts)
    /** @internal */ readonly modifiers?: NodeArray<ModifierLike> | undefined;
}

export interface ContinueStatement extends Statement, FlowContainer {
    readonly kind: SyntaxKind.ContinueStatement;
    readonly label?: Identifier;
}

export interface DebuggerStatement extends Statement, FlowContainer {
    readonly kind: SyntaxKind.DebuggerStatement;
}

export interface DoStatement extends IterationStatement, FlowContainer {
    readonly kind: SyntaxKind.DoStatement;
    readonly expression: Expression;
}

export interface EmptyStatement extends Statement {
    readonly kind: SyntaxKind.EmptyStatement;
}

export interface QualifiedName extends Node, FlowContainer {
    readonly kind: SyntaxKind.QualifiedName;
    readonly left: EntityName;
    readonly right: Identifier;
}

export type EntityName = Identifier | QualifiedName;

export interface JSDocPropertyLikeTag extends JSDocTag, Declaration {
    readonly parent: JSDoc;
    readonly name: EntityName;
    readonly typeExpression?: JSDocTypeExpression;
    /** Whether the property name came before the type -- non-standard for JSDoc, but Typescript-like */
    readonly isNameFirst: boolean;
    readonly isBracketed: boolean;
}

export interface JSDocTypeLiteral extends JSDocType, Declaration {
    readonly kind: SyntaxKind.JSDocTypeLiteral;
    readonly jsDocPropertyTags?: readonly JSDocPropertyLikeTag[];
    /** If true, then this type literal represents an *array* of its type. */
    readonly isArrayType: boolean;
}

export interface JSDocText extends Node {
    readonly kind: SyntaxKind.JSDocText;
    text: string;
}

export interface JSDocMemberName extends Node {
    readonly kind: SyntaxKind.JSDocMemberName;
    readonly left: EntityName | JSDocMemberName;
    readonly right: Identifier;
}

export interface JSDocLink extends Node {
    readonly kind: SyntaxKind.JSDocLink;
    readonly name?: EntityName | JSDocMemberName;
    text: string;
}

export interface JSDocLinkCode extends Node {
    readonly kind: SyntaxKind.JSDocLinkCode;
    readonly name?: EntityName | JSDocMemberName;
    text: string;
}

export interface JSDocLinkPlain extends Node {
    readonly kind: SyntaxKind.JSDocLinkPlain;
    readonly name?: EntityName | JSDocMemberName;
    text: string;
}

export type JSDocComment = JSDocText | JSDocLink | JSDocLinkCode | JSDocLinkPlain;

export interface JSDocTag extends Node {
    readonly parent: JSDoc | JSDocTypeLiteral;
    readonly tagName: Identifier;
    readonly comment?: string | NodeArray<JSDocComment>;
}

export interface JSDocArray extends Array<JSDoc> {
    jsDocCache?: readonly JSDocTag[]; // Cache for getJSDocTags
}

export interface JSDocContainer extends Node {
    _jsdocContainerBrand: any;
    /** @internal */ jsDoc?: JSDocArray; // JSDoc that directly precedes this node
}

export type EndOfFileToken = Token<SyntaxKind.EndOfFileToken> & JSDocContainer;

export interface EnumMember extends NamedDeclaration, JSDocContainer {
    readonly kind: SyntaxKind.EnumMember;
    readonly parent: EnumDeclaration;
    // This does include ComputedPropertyName, but the parser will give an error
    // if it parses a ComputedPropertyName in an EnumMember
    readonly name: PropertyName;
    readonly initializer?: Expression;
}

export interface EnumDeclaration extends DeclarationStatement, JSDocContainer {
    readonly kind: SyntaxKind.EnumDeclaration;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly name: Identifier;
    readonly members: NodeArray<EnumMember>;
}

export interface ExportAssignment extends DeclarationStatement, JSDocContainer {
    readonly kind: SyntaxKind.ExportAssignment;
    readonly parent: SourceFile;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly isExportEquals?: boolean;
    readonly expression: Expression;
}

export interface ExpressionStatement extends Statement, FlowContainer {
    readonly kind: SyntaxKind.ExpressionStatement;
    readonly expression: Expression;
}

export interface IfStatement extends Statement, FlowContainer {
    readonly kind: SyntaxKind.IfStatement;
    readonly expression: Expression;
    readonly thenStatement: Statement;
    readonly elseStatement?: Statement;
}

export interface ExternalModuleReference extends Node {
    readonly kind: SyntaxKind.ExternalModuleReference;
    readonly parent: ImportEqualsDeclaration;
    readonly expression: Expression;
}

export type ModuleReference =
    | EntityName
    | ExternalModuleReference;

export interface ImportEqualsDeclaration extends DeclarationStatement, JSDocContainer {
    readonly kind: SyntaxKind.ImportEqualsDeclaration;
    readonly parent: SourceFile | ModuleBlock;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly name: Identifier;
    readonly isTypeOnly: boolean;

    // 'EntityName' for an internal module reference, 'ExternalModuleReference' for an external
    // module reference.
    readonly moduleReference: ModuleReference;
}

export interface JSDocParameterTag extends JSDocPropertyLikeTag {
    readonly kind: SyntaxKind.JSDocParameterTag;
}

export interface JSDocReturnTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocReturnTag;
    readonly typeExpression?: JSDocTypeExpression;
}

export interface JSDocSignature extends JSDocType, Declaration, JSDocContainer, LocalsContainer {
    readonly kind: SyntaxKind.JSDocSignature;
    readonly typeParameters?: readonly JSDocTemplateTag[];
    readonly parameters: readonly JSDocParameterTag[];
    readonly type: JSDocReturnTag | undefined;
}

export interface LabeledStatement extends Statement, FlowContainer {
    readonly kind: SyntaxKind.LabeledStatement;
    readonly label: Identifier;
    readonly statement: Statement;
}

export interface NamedTupleMember extends TypeNode, Declaration, JSDocContainer {
    readonly kind: SyntaxKind.NamedTupleMember;
    readonly dotDotDotToken?: Token<SyntaxKind.DotDotDotToken>;
    readonly name: Identifier;
    readonly questionToken?: Token<SyntaxKind.QuestionToken>;
    readonly type: TypeNode;
}

export interface NamespaceExportDeclaration extends DeclarationStatement, JSDocContainer {
    readonly kind: SyntaxKind.NamespaceExportDeclaration;
    readonly name: Identifier;

    // The following properties are used only to report grammar errors (see `isGrammarError` in utilities.ts)
    /** @internal */ readonly modifiers?: NodeArray<ModifierLike> | undefined;
}

export type MemberName = Identifier | PrivateIdentifier;

export interface PropertyAccessExpression extends MemberExpression, NamedDeclaration, JSDocContainer, FlowContainer {
    readonly kind: SyntaxKind.PropertyAccessExpression;
    readonly expression: LeftHandSideExpression;
    readonly questionDotToken?: QuestionDotToken;
    readonly name: MemberName;
}

export interface PropertyDeclaration extends ClassElement, JSDocContainer {
    readonly kind: SyntaxKind.PropertyDeclaration;
    readonly parent: ClassLikeDeclaration;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly name: PropertyName;
    readonly questionToken?: QuestionToken;      // Present for use with reporting a grammar error for auto-accessors (see `isGrammarError` in utilities.ts)
    readonly exclamationToken?: ExclamationToken;
    readonly type?: TypeNode;
    readonly initializer?: Expression;           // Optional initializer
}

export interface PropertySignature extends TypeElement, JSDocContainer {
    readonly kind: SyntaxKind.PropertySignature;
    readonly parent: TypeLiteralNode | InterfaceDeclaration;
    readonly modifiers?: NodeArray<Modifier>;
    readonly name: PropertyName;                 // Declared property name
    readonly questionToken?: QuestionToken;      // Present on optional property
    readonly type?: TypeNode;                    // Optional type annotation

    // The following properties are used only to report grammar errors (see `isGrammarError` in utilities.ts)
    /** @internal */ readonly initializer?: Expression | undefined; // A property signature cannot have an initializer
}

export interface ReturnStatement extends Statement, FlowContainer {
    readonly kind: SyntaxKind.ReturnStatement;
    readonly expression?: Expression;
}

export interface SemicolonClassElement extends ClassElement, JSDocContainer {
    readonly kind: SyntaxKind.SemicolonClassElement;
    readonly parent: ClassLikeDeclaration;
}

export interface ThrowStatement extends Statement, FlowContainer {
    readonly kind: SyntaxKind.ThrowStatement;
    readonly expression: Expression;
}

export interface WhileStatement extends IterationStatement, FlowContainer {
    readonly kind: SyntaxKind.WhileStatement;
    readonly expression: Expression;
}

export interface WithStatement extends Statement, FlowContainer {
    readonly kind: SyntaxKind.WithStatement;
    readonly expression: Expression;
    readonly statement: Statement;
}

export type HasJSDoc =
    | AccessorDeclaration
    | ArrowFunction
    | BinaryExpression
    | Block
    | BreakStatement
    | CallSignatureDeclaration
    | CaseClause
    | ClassLikeDeclaration
    | ClassStaticBlockDeclaration
    | ConstructorDeclaration
    | ConstructorTypeNode
    | ConstructSignatureDeclaration
    | ContinueStatement
    | DebuggerStatement
    | DoStatement
    | ElementAccessExpression
    | EmptyStatement
    | EndOfFileToken
    | EnumDeclaration
    | EnumMember
    | ExportAssignment
    | ExportDeclaration
    | ExportSpecifier
    | ExpressionStatement
    | ForInStatement
    | ForOfStatement
    | ForStatement
    | FunctionDeclaration
    | FunctionExpression
    | FunctionTypeNode
    | Identifier
    | IfStatement
    | ImportDeclaration
    | ImportEqualsDeclaration
    | IndexSignatureDeclaration
    | InterfaceDeclaration
    | JSDocFunctionType
    | JSDocSignature
    | LabeledStatement
    | MethodDeclaration
    | MethodSignature
    | ModuleDeclaration
    | NamedTupleMember
    | NamespaceExportDeclaration
    | ObjectLiteralExpression
    | ParameterDeclaration
    | ParenthesizedExpression
    | PropertyAccessExpression
    | PropertyAssignment
    | PropertyDeclaration
    | PropertySignature
    | ReturnStatement
    | SemicolonClassElement
    | ShorthandPropertyAssignment
    | SpreadAssignment
    | SwitchStatement
    | ThrowStatement
    | TryStatement
    | TypeAliasDeclaration
    | TypeParameterDeclaration
    | VariableDeclaration
    | VariableStatement
    | WhileStatement
    | WithStatement;

export interface JSDoc extends Node {
    readonly kind: SyntaxKind.JSDoc;
    readonly parent: HasJSDoc;
    readonly tags?: NodeArray<JSDocTag>;
    readonly comment?: string | NodeArray<JSDocComment>;
}

export interface JSDocImportTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocImportTag;
    readonly parent: JSDoc;
    readonly importClause?: ImportClause;
    readonly moduleSpecifier: Expression;
    readonly attributes?: ImportAttributes;
}

export type ImportPhaseModifierSyntaxKind = SyntaxKind.TypeKeyword | SyntaxKind.DeferKeyword;

export interface NamespaceImport extends NamedDeclaration {
    readonly kind: SyntaxKind.NamespaceImport;
    readonly parent: ImportClause;
    readonly name: Identifier;
}

export type NamedImportBindings =
    | NamespaceImport
    | NamedImports;

export interface ImportClause extends NamedDeclaration {
    readonly kind: SyntaxKind.ImportClause;
    readonly parent: ImportDeclaration | JSDocImportTag;
    /** @deprecated Use `phaseModifier` instead */
    readonly isTypeOnly: boolean;
    readonly phaseModifier: undefined | ImportPhaseModifierSyntaxKind;
    readonly name?: Identifier; // Default binding
    readonly namedBindings?: NamedImportBindings;
}

export interface NamedImports extends Node {
    readonly kind: SyntaxKind.NamedImports;
    readonly parent: ImportClause;
    readonly elements: NodeArray<ImportSpecifier>;
}

export interface ImportSpecifier extends NamedDeclaration {
    readonly kind: SyntaxKind.ImportSpecifier;
    readonly parent: NamedImports;
    readonly propertyName?: ModuleExportName; // Name preceding "as" keyword (or undefined when "as" is absent)
    readonly name: Identifier; // Declared name
    readonly isTypeOnly: boolean;
}

export interface EmitNode {
    flags: EmitFlags;                        // Flags that customize emit
    internalFlags: InternalEmitFlags;        // Internal flags that customize emit
    annotatedNodes?: Node[];                 // Tracks Parse-tree nodes with EmitNodes for eventual cleanup.
    leadingComments?: SynthesizedComment[];  // Synthesized leading comments
    trailingComments?: SynthesizedComment[]; // Synthesized trailing comments
    commentRange?: TextRange;                // The text range to use when emitting leading or trailing comments
    sourceMapRange?: SourceMapRange;         // The text range to use when emitting leading or trailing source mappings
    tokenSourceMapRanges?: (SourceMapRange | undefined)[]; // The text range to use when emitting source mappings for tokens
    constantValue?: string | number;         // The constant value of an expression
    externalHelpersModuleName?: Identifier;  // The local name for an imported helpers module
    externalHelpers?: boolean;
    helpers?: EmitHelper[];                  // Emit helpers for the node
    startsOnNewLine?: boolean;               // If the node should begin on a new line
    snippetElement?: SnippetElement;         // Snippet element of the node
    typeNode?: TypeNode;                     // VariableDeclaration type
    classThis?: Identifier;                  // Identifier that points to a captured static `this` for a class which may be updated after decorators are applied
    assignedName?: Expression;               // Expression used as the assigned name of a class or function
    identifierTypeArguments?: NodeArray<TypeNode | TypeParameterDeclaration>; // Only defined on synthesized identifiers. Though not syntactically valid, used in emitting diagnostics, quickinfo, and signature help.
    autoGenerate: AutoGenerateInfo | undefined; // Used for auto-generated identifiers and private identifiers.
    generatedImportReference?: ImportSpecifier; // Reference to the generated import specifier this identifier refers to
}

export interface Node extends ReadonlyTextRange {
    readonly kind: SyntaxKind;
    readonly flags: NodeFlags;
    /** @internal */ modifierFlagsCache: ModifierFlags;
    /** @internal */ readonly transformFlags: TransformFlags; // Flags for transforms
    /** @internal */ id?: NodeId; // Unique id (used to look up NodeLinks)
    readonly parent: Node; // Parent node (initialized by binding)
    /** @internal */ original?: Node; // The original node if this is an updated node.
    /** @internal */ emitNode?: EmitNode; // Associated EmitNode (initialized by transforms)
    // NOTE: `symbol` and `localSymbol` have been moved to `Declaration`
    //       `locals` and `nextContainer` have been moved to `LocalsContainer`
    //       `flowNode` has been moved to `FlowContainer`
    //       see: https://github.com/microsoft/TypeScript/pull/51682
}

export type LazyNodeCheckFlags =
    | NodeCheckFlags.SuperInstance
    | NodeCheckFlags.SuperStatic
    | NodeCheckFlags.MethodWithSuperPropertyAccessInAsync
    | NodeCheckFlags.MethodWithSuperPropertyAssignmentInAsync
    | NodeCheckFlags.ContainsSuperPropertyInStaticInitializer
    | NodeCheckFlags.CaptureArguments
    | NodeCheckFlags.ContainsCapturedBlockScopeBinding
    | NodeCheckFlags.NeedsLoopOutParameter
    | NodeCheckFlags.ContainsConstructorReference
    | NodeCheckFlags.ConstructorReference
    | NodeCheckFlags.CapturedBlockScopedBinding
    | NodeCheckFlags.BlockScopedBindingInLoop
    | NodeCheckFlags.LoopWithCapturedBlockScopedBinding;

export type AnyImportSyntax = ImportDeclaration | ImportEqualsDeclaration;

export interface LateBoundName extends ComputedPropertyName {
    readonly expression: EntityNameExpression;
}

export interface LateBoundDeclaration extends DynamicNamedDeclaration {
    readonly name: LateBoundName;
}

export interface JsxSpreadAttribute extends ObjectLiteralElement {
    readonly kind: SyntaxKind.JsxSpreadAttribute;
    readonly parent: JsxAttributes;
    readonly expression: Expression;
}

export type JsxAttributeLike =
    | JsxAttribute
    | JsxSpreadAttribute;

export interface ThisExpression extends PrimaryExpression, FlowContainer {
    readonly kind: SyntaxKind.ThisKeyword;
}

export interface JsxTagNamePropertyAccess extends PropertyAccessExpression {
    readonly expression: Identifier | ThisExpression | JsxTagNamePropertyAccess;
}

export type JsxTagNameExpression =
    | Identifier
    | ThisExpression
    | JsxTagNamePropertyAccess
    | JsxNamespacedName;

export interface JsxSelfClosingElement extends PrimaryExpression {
    readonly kind: SyntaxKind.JsxSelfClosingElement;
    readonly tagName: JsxTagNameExpression;
    readonly typeArguments?: NodeArray<TypeNode>;
    readonly attributes: JsxAttributes;
}

export interface JsxOpeningFragment extends Expression {
    readonly kind: SyntaxKind.JsxOpeningFragment;
    readonly parent: JsxFragment;
}

export interface JsxClosingFragment extends Expression {
    readonly kind: SyntaxKind.JsxClosingFragment;
    readonly parent: JsxFragment;
}

export interface JsxFragment extends PrimaryExpression {
    readonly kind: SyntaxKind.JsxFragment;
    readonly openingFragment: JsxOpeningFragment;
    readonly children: NodeArray<JsxChild>;
    readonly closingFragment: JsxClosingFragment;
}

export interface JsxText extends LiteralLikeNode {
    readonly kind: SyntaxKind.JsxText;
    readonly parent: JsxElement | JsxFragment;
    readonly containsOnlyTriviaWhiteSpaces: boolean;
}

export interface JsxExpression extends Expression {
    readonly kind: SyntaxKind.JsxExpression;
    readonly parent: JsxElement | JsxFragment | JsxAttributeLike;
    readonly dotDotDotToken?: Token<SyntaxKind.DotDotDotToken>;
    readonly expression?: Expression;
}

export type JsxChild =
    | JsxText
    | JsxExpression
    | JsxElement
    | JsxSelfClosingElement
    | JsxFragment;

export interface JsxClosingElement extends Node {
    readonly kind: SyntaxKind.JsxClosingElement;
    readonly parent: JsxElement;
    readonly tagName: JsxTagNameExpression;
}

export interface JsxElement extends PrimaryExpression {
    readonly kind: SyntaxKind.JsxElement;
    readonly openingElement: JsxOpeningElement;
    readonly children: NodeArray<JsxChild>;
    readonly closingElement: JsxClosingElement;
}

export interface JsxOpeningElement extends Expression {
    readonly kind: SyntaxKind.JsxOpeningElement;
    readonly parent: JsxElement;
    readonly tagName: JsxTagNameExpression;
    readonly typeArguments?: NodeArray<TypeNode>;
    readonly attributes: JsxAttributes;
}

export type JsxOpeningLikeElement =
    | JsxSelfClosingElement
    | JsxOpeningElement;

export interface JsxAttributes extends PrimaryExpression, Declaration {
    readonly properties: NodeArray<JsxAttributeLike>;
    readonly kind: SyntaxKind.JsxAttributes;
    readonly parent: JsxOpeningLikeElement;
}

export type JsxAttributeValue =
    | StringLiteral
    | JsxExpression
    | JsxElement
    | JsxSelfClosingElement
    | JsxFragment;

export interface JsxAttribute extends Declaration {
    readonly kind: SyntaxKind.JsxAttribute;
    readonly parent: JsxAttributes;
    readonly name: JsxAttributeName;
    /// JSX attribute initializers are optional; <X y /> is sugar for <X y={true} />
    readonly initializer?: JsxAttributeValue;
}

export interface JSDocPropertyTag extends JSDocPropertyLikeTag {
    readonly kind: SyntaxKind.JSDocPropertyTag;
}

export type VariableLikeDeclaration =
    | VariableDeclaration
    | ParameterDeclaration
    | BindingElement
    | PropertyDeclaration
    | PropertyAssignment
    | PropertySignature
    | JsxAttribute
    | ShorthandPropertyAssignment
    | EnumMember
    | JSDocPropertyTag
    | JSDocParameterTag;

export type HasInferredType =
    | Exclude<VariableLikeDeclaration, JsxAttribute | EnumMember>
    | PropertyAccessExpression
    | ElementAccessExpression
    | BinaryExpression
    | ExportAssignment;

export type Path = string & { __pathBrand: any; };

export type OrganizeImportsTypeOrder = "last" | "inline" | "first";

export interface UserPreferences {
    readonly disableSuggestions?: boolean;
    readonly quotePreference?: "auto" | "double" | "single";
    /**
     * If enabled, TypeScript will search through all external modules' exports and add them to the completions list.
     * This affects lone identifier completions but not completions on the right hand side of `obj.`.
     */
    readonly includeCompletionsForModuleExports?: boolean;
    /**
     * Enables auto-import-style completions on partially-typed import statements. E.g., allows
     * `import write|` to be completed to `import { writeFile } from "fs"`.
     */
    readonly includeCompletionsForImportStatements?: boolean;
    /**
     * Allows completions to be formatted with snippet text, indicated by `CompletionItem["isSnippet"]`.
     */
    readonly includeCompletionsWithSnippetText?: boolean;
    /**
     * Unless this option is `false`, or `includeCompletionsWithInsertText` is not enabled,
     * member completion lists triggered with `.` will include entries on potentially-null and potentially-undefined
     * values, with insertion text to replace preceding `.` tokens with `?.`.
     */
    readonly includeAutomaticOptionalChainCompletions?: boolean;
    /**
     * If enabled, the completion list will include completions with invalid identifier names.
     * For those entries, The `insertText` and `replacementSpan` properties will be set to change from `.x` property access to `["x"]`.
     */
    readonly includeCompletionsWithInsertText?: boolean;
    /**
     * If enabled, completions for class members (e.g. methods and properties) will include
     * a whole declaration for the member.
     * E.g., `class A { f| }` could be completed to `class A { foo(): number {} }`, instead of
     * `class A { foo }`.
     */
    readonly includeCompletionsWithClassMemberSnippets?: boolean;
    /**
     * If enabled, object literal methods will have a method declaration completion entry in addition
     * to the regular completion entry containing just the method name.
     * E.g., `const objectLiteral: T = { f| }` could be completed to `const objectLiteral: T = { foo(): void {} }`,
     * in addition to `const objectLiteral: T = { foo }`.
     */
    readonly includeCompletionsWithObjectLiteralMethodSnippets?: boolean;
    /**
     * Indicates whether {@link CompletionEntry.labelDetails completion entry label details} are supported.
     * If not, contents of `labelDetails` may be included in the {@link CompletionEntry.name} property.
     */
    readonly useLabelDetailsInCompletionEntries?: boolean;
    readonly allowIncompleteCompletions?: boolean;
    readonly importModuleSpecifierPreference?: "shortest" | "project-relative" | "relative" | "non-relative";
    /** Determines whether we import `foo/index.ts` as "foo", "foo/index", or "foo/index.js" */
    readonly importModuleSpecifierEnding?: "auto" | "minimal" | "index" | "js";
    readonly allowTextChangesInNewFiles?: boolean;
    readonly providePrefixAndSuffixTextForRename?: boolean;
    readonly includePackageJsonAutoImports?: "auto" | "on" | "off";
    readonly provideRefactorNotApplicableReason?: boolean;
    readonly jsxAttributeCompletionStyle?: "auto" | "braces" | "none";
    readonly includeInlayParameterNameHints?: "none" | "literals" | "all";
    readonly includeInlayParameterNameHintsWhenArgumentMatchesName?: boolean;
    readonly includeInlayFunctionParameterTypeHints?: boolean;
    readonly includeInlayVariableTypeHints?: boolean;
    readonly includeInlayVariableTypeHintsWhenTypeMatchesName?: boolean;
    readonly includeInlayPropertyDeclarationTypeHints?: boolean;
    readonly includeInlayFunctionLikeReturnTypeHints?: boolean;
    readonly includeInlayEnumMemberValueHints?: boolean;
    readonly interactiveInlayHints?: boolean;
    readonly allowRenameOfImportPath?: boolean;
    readonly autoImportFileExcludePatterns?: string[];
    readonly autoImportSpecifierExcludeRegexes?: string[];
    readonly preferTypeOnlyAutoImports?: boolean;
    /**
     * Indicates whether imports should be organized in a case-insensitive manner.
     */
    readonly organizeImportsIgnoreCase?: "auto" | boolean;
    /**
     * Indicates whether imports should be organized via an "ordinal" (binary) comparison using the numeric value
     * of their code points, or via "unicode" collation (via the
     * [Unicode Collation Algorithm](https://unicode.org/reports/tr10/#Scope)) using rules associated with the locale
     * specified in {@link organizeImportsCollationLocale}.
     *
     * Default: `"ordinal"`.
     */
    readonly organizeImportsCollation?: "ordinal" | "unicode";
    /**
     * Indicates the locale to use for "unicode" collation. If not specified, the locale `"en"` is used as an invariant
     * for the sake of consistent sorting. Use `"auto"` to use the detected UI locale.
     *
     * This preference is ignored if {@link organizeImportsCollation} is not `"unicode"`.
     *
     * Default: `"en"`
     */
    readonly organizeImportsLocale?: string;
    /**
     * Indicates whether numeric collation should be used for digit sequences in strings. When `true`, will collate
     * strings such that `a1z < a2z < a100z`. When `false`, will collate strings such that `a1z < a100z < a2z`.
     *
     * This preference is ignored if {@link organizeImportsCollation} is not `"unicode"`.
     *
     * Default: `false`
     */
    readonly organizeImportsNumericCollation?: boolean;
    /**
     * Indicates whether accents and other diacritic marks are considered unequal for the purpose of collation. When
     * `true`, characters with accents and other diacritics will be collated in the order defined by the locale specified
     * in {@link organizeImportsCollationLocale}.
     *
     * This preference is ignored if {@link organizeImportsCollation} is not `"unicode"`.
     *
     * Default: `true`
     */
    readonly organizeImportsAccentCollation?: boolean;
    /**
     * Indicates whether upper case or lower case should sort first. When `false`, the default order for the locale
     * specified in {@link organizeImportsCollationLocale} is used.
     *
     * This preference is ignored if {@link organizeImportsCollation} is not `"unicode"`. This preference is also
     * ignored if we are using case-insensitive sorting, which occurs when {@link organizeImportsIgnoreCase} is `true`,
     * or if {@link organizeImportsIgnoreCase} is `"auto"` and the auto-detected case sensitivity is determined to be
     * case-insensitive.
     *
     * Default: `false`
     */
    readonly organizeImportsCaseFirst?: "upper" | "lower" | false;
    /**
     * Indicates where named type-only imports should sort. "inline" sorts named imports without regard to if the import is
     * type-only.
     *
     * Default: `last`
     */
    readonly organizeImportsTypeOrder?: OrganizeImportsTypeOrder;
    /**
     * Indicates whether to exclude standard library and node_modules file symbols from navTo results.
     */
    readonly excludeLibrarySymbolsInNavTo?: boolean;
    readonly lazyConfiguredProjectsFromExternalProject?: boolean;
    readonly displayPartsForJSDoc?: boolean;
    readonly generateReturnInDocTemplate?: boolean;
    readonly disableLineTextInReferences?: boolean;
    /**
     * A positive integer indicating the maximum length of a hover text before it is truncated.
     *
     * Default: `500`
     */
    readonly maximumHoverLength?: number;
}

export type ResolutionMode = ModuleKind.ESNext | ModuleKind.CommonJS | undefined;

export interface ModuleSpecifierOptions {
    overrideImportMode?: ResolutionMode;
}

export interface ModulePath {
    path: string;
    isInNodeModules: boolean;
    isRedirect: boolean;
}

export interface ResolvedModuleSpecifierInfo {
    kind: "node_modules" | "paths" | "redirect" | "relative" | "ambient" | undefined;
    modulePaths: readonly ModulePath[] | undefined;
    packageName: string | undefined;
    moduleSpecifiers: readonly string[] | undefined;
    isBlockedByPackageJsonDependencies: boolean | undefined;
}

export interface ModuleSpecifierCache {
    get(fromFileName: Path, toFileName: Path, preferences: UserPreferences, options: ModuleSpecifierOptions): Readonly<ResolvedModuleSpecifierInfo> | undefined;
    set(fromFileName: Path, toFileName: Path, preferences: UserPreferences, options: ModuleSpecifierOptions, kind: ResolvedModuleSpecifierInfo["kind"], modulePaths: readonly ModulePath[], moduleSpecifiers: readonly string[]): void;
    setBlockedByPackageJsonDependencies(fromFileName: Path, toFileName: Path, preferences: UserPreferences, options: ModuleSpecifierOptions, packageName: string | undefined, isBlockedByPackageJsonDependencies: boolean): void;
    setModulePaths(fromFileName: Path, toFileName: Path, preferences: UserPreferences, options: ModuleSpecifierOptions, modulePaths: readonly ModulePath[]): void;
    clear(): void;
    count(): number;
}

export type RedirectTargetsMap = ReadonlyMap<Path, readonly string[]>;

export interface ConfigFileSpecs {
    filesSpecs: readonly string[] | undefined;
    /**
     * Present to report errors (user specified specs), validatedIncludeSpecs are used for file name matching
     */
    includeSpecs: readonly string[] | undefined;
    /**
     * Present to report errors (user specified specs), validatedExcludeSpecs are used for file name matching
     */
    excludeSpecs: readonly string[] | undefined;
    validatedFilesSpec: readonly string[] | undefined;
    validatedIncludeSpecs: readonly string[] | undefined;
    validatedExcludeSpecs: readonly string[] | undefined;
    validatedFilesSpecBeforeSubstitution: readonly string[] | undefined;
    validatedIncludeSpecsBeforeSubstitution: readonly string[] | undefined;
    validatedExcludeSpecsBeforeSubstitution: readonly string[] | undefined;
    isDefaultIncludeSpec: boolean;
}

export interface TsConfigSourceFile extends JsonSourceFile {
    extendedSourceFiles?: string[];
    /** @internal */ configFileSpecs?: ConfigFileSpecs;
}

export interface PluginImport {
    name: string;
}

export interface ProjectReference {
    /** A normalized path on disk */
    path: string;
    /** The path as the user originally wrote it */
    originalPath?: string;
    /** @deprecated */
    prepend?: boolean;
    /** True if it is intended that this reference form a circularity */
    circular?: boolean;
}

export type CompilerOptionsValue = string | number | boolean | (string | number)[] | string[] | MapLike<string[]> | PluginImport[] | ProjectReference[] | null | undefined;

export interface CompilerOptions {
    /** @internal */ all?: boolean;
    allowImportingTsExtensions?: boolean;
    allowJs?: boolean;
    /** @internal */ allowNonTsExtensions?: boolean;
    allowArbitraryExtensions?: boolean;
    allowSyntheticDefaultImports?: boolean;
    allowUmdGlobalAccess?: boolean;
    allowUnreachableCode?: boolean;
    allowUnusedLabels?: boolean;
    alwaysStrict?: boolean; // Always combine with strict property
    /** @deprecated */
    baseUrl?: string;
    /**
     * An error if set - this should only go through the -b pipeline and not actually be observed
     *
     * @internal
     */
    build?: boolean;
    /** @deprecated */
    charset?: string;
    checkJs?: boolean;
    /** @internal */ configFilePath?: string;
    /**
     * configFile is set as non enumerable property so as to avoid checking of json source files
     *
     * @internal
     */
    readonly configFile?: TsConfigSourceFile;
    customConditions?: string[];
    declaration?: boolean;
    declarationMap?: boolean;
    emitDeclarationOnly?: boolean;
    declarationDir?: string;
    /** @internal */ diagnostics?: boolean;
    /** @internal */ extendedDiagnostics?: boolean;
    disableSizeLimit?: boolean;
    disableSourceOfProjectReferenceRedirect?: boolean;
    disableSolutionSearching?: boolean;
    disableReferencedProjectLoad?: boolean;
    /** @deprecated */
    downlevelIteration?: boolean;
    emitBOM?: boolean;
    emitDecoratorMetadata?: boolean;
    exactOptionalPropertyTypes?: boolean;
    experimentalDecorators?: boolean;
    forceConsistentCasingInFileNames?: boolean;
    /** @internal */ generateCpuProfile?: string;
    /** @internal */ generateTrace?: string;
    /** @internal */ help?: boolean;
    ignoreDeprecations?: string;
    importHelpers?: boolean;
    /** @deprecated */
    importsNotUsedAsValues?: ImportsNotUsedAsValues;
    /** @internal */ init?: boolean;
    inlineSourceMap?: boolean;
    inlineSources?: boolean;
    isolatedModules?: boolean;
    isolatedDeclarations?: boolean;
    jsx?: JsxEmit;
    /** @deprecated */
    keyofStringsOnly?: boolean;
    lib?: string[];
    libReplacement?: boolean;
    /** @internal */ listEmittedFiles?: boolean;
    /** @internal */ listFiles?: boolean;
    /** @internal */ explainFiles?: boolean;
    /** @internal */ listFilesOnly?: boolean;
    locale?: string;
    mapRoot?: string;
    maxNodeModuleJsDepth?: number;
    module?: ModuleKind;
    moduleResolution?: ModuleResolutionKind;
    moduleSuffixes?: string[];
    moduleDetection?: ModuleDetectionKind;
    newLine?: NewLineKind;
    noEmit?: boolean;
    noCheck?: boolean;
    /** @internal */ noEmitForJsFiles?: boolean;
    noEmitHelpers?: boolean;
    noEmitOnError?: boolean;
    noErrorTruncation?: boolean;
    noFallthroughCasesInSwitch?: boolean;
    noImplicitAny?: boolean; // Always combine with strict property
    noImplicitReturns?: boolean;
    noImplicitThis?: boolean; // Always combine with strict property
    /** @deprecated */
    noStrictGenericChecks?: boolean;
    noUnusedLocals?: boolean;
    noUnusedParameters?: boolean;
    /** @deprecated */
    noImplicitUseStrict?: boolean;
    noPropertyAccessFromIndexSignature?: boolean;
    assumeChangesOnlyAffectDirectDependencies?: boolean;
    noLib?: boolean;
    noResolve?: boolean;
    /** @internal */
    noDtsResolution?: boolean;
    noUncheckedIndexedAccess?: boolean;
    /** @deprecated */
    out?: string;
    outDir?: string;
    outFile?: string;
    paths?: MapLike<string[]>;
    /**
     * The directory of the config file that specified 'paths'. Used to resolve relative paths when 'baseUrl' is absent.
     *
     * @internal
     */
    pathsBasePath?: string;
    /** @internal */ plugins?: PluginImport[];
    preserveConstEnums?: boolean;
    noImplicitOverride?: boolean;
    preserveSymlinks?: boolean;
    /** @deprecated */
    preserveValueImports?: boolean;
    /** @internal */ preserveWatchOutput?: boolean;
    project?: string;
    /** @internal */ pretty?: boolean;
    reactNamespace?: string;
    jsxFactory?: string;
    jsxFragmentFactory?: string;
    jsxImportSource?: string;
    composite?: boolean;
    incremental?: boolean;
    tsBuildInfoFile?: string;
    removeComments?: boolean;
    resolvePackageJsonExports?: boolean;
    resolvePackageJsonImports?: boolean;
    rewriteRelativeImportExtensions?: boolean;
    rootDir?: string;
    rootDirs?: string[];
    skipLibCheck?: boolean;
    skipDefaultLibCheck?: boolean;
    sourceMap?: boolean;
    sourceRoot?: string;
    strict?: boolean;
    strictFunctionTypes?: boolean; // Always combine with strict property
    strictBindCallApply?: boolean; // Always combine with strict property
    strictNullChecks?: boolean; // Always combine with strict property
    strictPropertyInitialization?: boolean; // Always combine with strict property
    strictBuiltinIteratorReturn?: boolean; // Always combine with strict property
    /** @internal */
    stableTypeOrdering?: boolean;
    stripInternal?: boolean;
    /** @deprecated */
    suppressExcessPropertyErrors?: boolean;
    /** @deprecated */
    suppressImplicitAnyIndexErrors?: boolean;
    /** @internal */ suppressOutputPathCheck?: boolean;
    target?: ScriptTarget;
    traceResolution?: boolean;
    useUnknownInCatchVariables?: boolean;
    noUncheckedSideEffectImports?: boolean;
    resolveJsonModule?: boolean;
    types?: string[];
    /** Paths used to compute primary types search locations */
    typeRoots?: string[];
    verbatimModuleSyntax?: boolean;
    erasableSyntaxOnly?: boolean;
    /** @internal */ version?: boolean;
    /** @internal */ watch?: boolean;
    esModuleInterop?: boolean;
    /** @internal */ showConfig?: boolean;
    /** @internal */ ignoreConfig?: boolean;
    useDefineForClassFields?: boolean;
    /** @internal */ tscBuild?: boolean;

    [option: string]: CompilerOptionsValue | TsConfigSourceFile | undefined;
}

export interface TypeAcquisition {
    enable?: boolean;
    include?: string[];
    exclude?: string[];
    disableFilenameBasedTypeAcquisition?: boolean;
    [option: string]: CompilerOptionsValue | undefined;
}

export interface WatchOptions {
    watchFile?: WatchFileKind;
    watchDirectory?: WatchDirectoryKind;
    fallbackPolling?: PollingWatchKind;
    synchronousWatchDirectory?: boolean;
    excludeDirectories?: string[];
    excludeFiles?: string[];

    [option: string]: CompilerOptionsValue | undefined;
}

export interface RepopulateModuleNotFoundDiagnosticChain {
    moduleReference: string;
    mode: ResolutionMode;
    packageName: string | undefined;
}

export type RepopulateModeMismatchDiagnosticChain = true;

export type RepopulateDiagnosticChainInfo = RepopulateModuleNotFoundDiagnosticChain | RepopulateModeMismatchDiagnosticChain;

export interface CanonicalDiagnostic {
    code: number;
    messageText: string;
}

export interface DiagnosticMessageChain {
    messageText: string;
    category: DiagnosticCategory;
    code: number;
    next?: DiagnosticMessageChain[];
    /** @internal */
    repopulateInfo?: () => RepopulateDiagnosticChainInfo;
    /** @internal */
    canonicalHead?: CanonicalDiagnostic;
}

export interface DiagnosticRelatedInformation {
    category: DiagnosticCategory;
    code: number;
    file: SourceFile | undefined;
    start: number | undefined;
    length: number | undefined;
    messageText: string | DiagnosticMessageChain;
}

export interface Diagnostic extends DiagnosticRelatedInformation {
    /** May store more in future. For now, this will simply be `true` to indicate when a diagnostic is an unused-identifier diagnostic. */
    reportsUnnecessary?: {};

    reportsDeprecated?: {};
    source?: string;
    relatedInformation?: DiagnosticRelatedInformation[];
    /** @internal */ skippedOn?: keyof CompilerOptions;
    /**
     * @internal
     * Used for deduplication and comparison.
     * Whenever it is possible for two diagnostics that report the same problem to be produced with
     * different messages (e.g. "Cannot find name 'foo'" vs "Cannot find name 'foo'. Did you mean 'bar'?"),
     * this property can be set to a canonical message,
     * so that those two diagnostics are appropriately considered to be the same.
     */
    canonicalHead?: CanonicalDiagnostic;
}

export interface ParsedCommandLine {
    options: CompilerOptions;
    typeAcquisition?: TypeAcquisition;
    fileNames: string[];
    projectReferences?: readonly ProjectReference[];
    watchOptions?: WatchOptions;
    raw?: any;
    errors: Diagnostic[];
    wildcardDirectories?: MapLike<WatchDirectoryFlags>;
    compileOnSave?: boolean;
}

export interface ResolvedProjectReference {
    commandLine: ParsedCommandLine;
    sourceFile: SourceFile;
    references?: readonly (ResolvedProjectReference | undefined)[];
}

export interface ResolvedRefAndOutputDts {
    resolvedRef: ResolvedProjectReference;
    outputDts?: string; // Not set if its a json source file
}

export interface RootFile {
    kind: FileIncludeKind.RootFile;
    index: number;
}

export interface LibFile {
    kind: FileIncludeKind.LibFile;
    index?: number;
}

export type ProjectReferenceFileKind =
    | FileIncludeKind.SourceFromProjectReference
    | FileIncludeKind.OutputFromProjectReference;

export interface ProjectReferenceFile {
    kind: ProjectReferenceFileKind;
    index: number;
}

export type ReferencedFileKind =
    | FileIncludeKind.Import
    | FileIncludeKind.ReferenceFile
    | FileIncludeKind.TypeReferenceDirective
    | FileIncludeKind.LibReferenceDirective;

export interface ReferencedFile {
    kind: ReferencedFileKind;
    file: Path;
    index: number;
}

export interface PackageId {
    /**
     * Name of the package.
     * Should not include `@types`.
     * If accessing a non-index file, this should include its name e.g. "foo/bar".
     */
    name: string;
    /**
     * Name of a submodule within this package.
     * May be "".
     */
    subModuleName: string;
    /** Version of the package, e.g. "1.2.3" */
    version: string;
    /** @internal*/ peerDependencies?: string;
}

export interface AutomaticTypeDirectiveFile {
    kind: FileIncludeKind.AutomaticTypeDirectiveFile;
    typeReference: string;
    packageId: PackageId | undefined;
}

export type FileIncludeReason =
    | RootFile
    | LibFile
    | ProjectReferenceFile
    | ReferencedFile
    | AutomaticTypeDirectiveFile;

export interface ModuleSpecifierResolutionHost {
    useCaseSensitiveFileNames(): boolean;
    fileExists(path: string): boolean;
    getCurrentDirectory(): string;
    directoryExists?(path: string): boolean;
    readFile?(path: string): string | undefined;
    realpath?(path: string): string;
    getSymlinkCache?(): SymlinkCache;
    getModuleSpecifierCache?(): ModuleSpecifierCache;
    getPackageJsonInfoCache?(): PackageJsonInfoCache | undefined;
    getGlobalTypingsCacheLocation?(): string | undefined;
    getNearestAncestorDirectoryWithPackageJson?(fileName: string, rootDir?: string): string | undefined;

    readonly redirectTargetsMap: RedirectTargetsMap;
    getRedirectFromSourceFile(fileName: string): ResolvedRefAndOutputDts | undefined;
    isSourceOfProjectReferenceRedirect(fileName: string): boolean;
    getFileIncludeReasons(): MultiMap<Path, FileIncludeReason>;
    getCommonSourceDirectory(): string;
    getDefaultResolutionModeForFile(sourceFile: SourceFile): ResolutionMode;
    getModeForResolutionAtIndex(file: SourceFile, index: number): ResolutionMode;

    getModuleResolutionCache?(): ModuleResolutionCache | undefined;
    trace?(s: string): void;
}

export interface SymbolTracker {
    // Called when the symbol writer encounters a symbol to write.  Currently only used by the
    // declaration emitter to help determine if it should patch up the final declaration file
    // with import statements it previously saw (but chose not to emit).
    trackSymbol?(symbol: Symbol, enclosingDeclaration: Node | undefined, meaning: SymbolFlags): boolean;
    reportInaccessibleThisError?(): void;
    reportPrivateInBaseOfClassExpression?(propertyName: string): void;
    reportInaccessibleUniqueSymbolError?(): void;
    reportCyclicStructureError?(): void;
    reportLikelyUnsafeImportRequiredError?(specifier: string, symbolName: string | undefined): void;
    reportTruncationError?(): void;
    moduleResolverHost?: ModuleSpecifierResolutionHost & { getCommonSourceDirectory(): string; };
    reportNonlocalAugmentation?(containingFile: SourceFile, parentSymbol: Symbol, augmentingSymbol: Symbol): void;
    reportNonSerializableProperty?(propertyName: string): void;
    reportInferenceFallback?(node: Node): void;
    pushErrorFallbackNode?(node: Declaration | undefined): void;
    popErrorFallbackNode?(): void;
}

export interface SymbolAccessibilityResult extends SymbolVisibilityResult {
    errorModuleName?: string; // If the symbol is not visible from module, module's name
}

export type EntityNameOrEntityNameExpression = EntityName | EntityNameExpression;

export type AnyImportOrJsDocImport = AnyImportSyntax | JSDocImportTag;

export type LateVisibilityPaintedStatement =
    | AnyImportOrJsDocImport
    | VariableStatement
    | ClassDeclaration
    | FunctionDeclaration
    | ModuleDeclaration
    | TypeAliasDeclaration
    | InterfaceDeclaration
    | EnumDeclaration;

export interface SymbolVisibilityResult {
    accessibility: SymbolAccessibility;
    aliasesToMakeVisible?: LateVisibilityPaintedStatement[]; // aliases that need to have this symbol visible
    errorSymbolName?: string; // Optional symbol name that results in error
    errorNode?: Node; // optional node that results in error
}

export interface EvaluatorResult<T extends string | number | undefined = string | number | undefined> {
    value: T;
    isSyntacticallyString: boolean;
    resolvedOtherFiles: boolean;
    hasExternalReferences: boolean;
}

export interface ImportTypeAssertionContainer extends Node {
    readonly kind: SyntaxKind.ImportTypeAssertionContainer;
    readonly parent: ImportTypeNode;
    /** @deprecated */ readonly assertClause: AssertClause;
    readonly multiLine?: boolean;
}

export interface ImportTypeNode extends NodeWithTypeArguments {
    readonly kind: SyntaxKind.ImportType;
    readonly isTypeOf: boolean;
    readonly argument: TypeNode;
    /** @deprecated */ readonly assertions?: ImportTypeAssertionContainer;
    readonly attributes?: ImportAttributes;
    readonly qualifier?: EntityName;
}

export interface ImportExpression extends PrimaryExpression {
    readonly kind: SyntaxKind.ImportKeyword;
}

export interface ImportDeferProperty extends MetaProperty {
    readonly keywordToken: SyntaxKind.ImportKeyword;
    readonly name: Identifier & { readonly escapedText: __String & "defer"; };
}

export interface ImportCall extends CallExpression {
    readonly expression: ImportExpression | ImportDeferProperty;
}

export interface WriterContextOut {
    /** Whether increasing the expansion depth will cause us to expand more types. */
    canIncreaseExpansionDepth: boolean;
    truncated: boolean;
}

export interface EmitResolver {
    hasGlobalName(name: string): boolean;
    getReferencedExportContainer(node: Identifier, prefixLocals?: boolean): SourceFile | ModuleDeclaration | EnumDeclaration | undefined;
    getReferencedImportDeclaration(node: Identifier): Declaration | undefined;
    getReferencedDeclarationWithCollidingName(node: Identifier): Declaration | undefined;
    isDeclarationWithCollidingName(node: Declaration): boolean;
    isValueAliasDeclaration(node: Node): boolean;
    isReferencedAliasDeclaration(node: Node, checkChildren?: boolean): boolean;
    isTopLevelValueImportEqualsWithEntityName(node: ImportEqualsDeclaration): boolean;
    hasNodeCheckFlag(node: Node, flags: LazyNodeCheckFlags): boolean;
    isDeclarationVisible(node: Declaration | AnyImportSyntax): boolean;
    isLateBound(node: Declaration): node is LateBoundDeclaration;
    collectLinkedAliases(node: ModuleExportName, setVisibility?: boolean): Node[] | undefined;
    markLinkedReferences(node: Node): void;
    isImplementationOfOverload(node: SignatureDeclaration): boolean | undefined;
    requiresAddingImplicitUndefined(node: ParameterDeclaration, enclosingDeclaration: Node | undefined): boolean;
    isExpandoFunctionDeclaration(node: FunctionDeclaration | VariableDeclaration): boolean;
    getPropertiesOfContainerFunction(node: Declaration): Symbol[];
    createTypeOfDeclaration(declaration: HasInferredType, enclosingDeclaration: Node, flags: NodeBuilderFlags, internalFlags: InternalNodeBuilderFlags, tracker: SymbolTracker): TypeNode | undefined;
    createReturnTypeOfSignatureDeclaration(signatureDeclaration: SignatureDeclaration, enclosingDeclaration: Node, flags: NodeBuilderFlags, internalFlags: InternalNodeBuilderFlags, tracker: SymbolTracker): TypeNode | undefined;
    createTypeOfExpression(expr: Expression, enclosingDeclaration: Node, flags: NodeBuilderFlags, internalFlags: InternalNodeBuilderFlags, tracker: SymbolTracker): TypeNode | undefined;
    createLiteralConstValue(node: VariableDeclaration | PropertyDeclaration | PropertySignature | ParameterDeclaration, tracker: SymbolTracker): Expression;
    isSymbolAccessible(symbol: Symbol, enclosingDeclaration: Node | undefined, meaning: SymbolFlags | undefined, shouldComputeAliasToMarkVisible: boolean): SymbolAccessibilityResult;
    isEntityNameVisible(entityName: EntityNameOrEntityNameExpression, enclosingDeclaration: Node): SymbolVisibilityResult;
    // Returns the constant value this property access resolves to, or 'undefined' for a non-constant
    getConstantValue(node: EnumMember | PropertyAccessExpression | ElementAccessExpression): string | number | undefined;
    getEnumMemberValue(node: EnumMember): EvaluatorResult | undefined;
    getReferencedValueDeclaration(reference: Identifier): Declaration | undefined;
    getReferencedValueDeclarations(reference: Identifier): Declaration[] | undefined;
    getTypeReferenceSerializationKind(typeName: EntityName, location?: Node): TypeReferenceSerializationKind;
    isOptionalParameter(node: ParameterDeclaration): boolean;
    isArgumentsLocalBinding(node: Identifier): boolean;
    getExternalModuleFileFromDeclaration(declaration: ImportEqualsDeclaration | ImportDeclaration | ExportDeclaration | ModuleDeclaration | ImportTypeNode | ImportCall): SourceFile | undefined;
    isLiteralConstDeclaration(node: VariableDeclaration | PropertyDeclaration | PropertySignature | ParameterDeclaration): boolean;
    getJsxFactoryEntity(location?: Node): EntityName | undefined;
    getJsxFragmentFactoryEntity(location?: Node): EntityName | undefined;
    isBindingCapturedByNode(node: Node, decl: VariableDeclaration | BindingElement): boolean;
    getDeclarationStatementsForSourceFile(node: SourceFile, flags: NodeBuilderFlags, internalFlags: InternalNodeBuilderFlags, tracker: SymbolTracker): Statement[] | undefined;
    isImportRequiredByAugmentation(decl: ImportDeclaration): boolean;
    isDefinitelyReferenceToGlobalSymbolObject(node: Node): boolean;
    createLateBoundIndexSignatures(cls: ClassLikeDeclaration, enclosingDeclaration: Node, flags: NodeBuilderFlags, internalFlags: InternalNodeBuilderFlags, tracker: SymbolTracker): (IndexSignatureDeclaration | PropertyDeclaration)[] | undefined;
    symbolToDeclarations(symbol: Symbol, meaning: SymbolFlags, flags: NodeBuilderFlags, maximumLength?: number, verbosityLevel?: number, out?: WriterContextOut): Declaration[];
}

export interface BuildInfo {
    version: string;
}

export interface DiagnosticWithLocation extends Diagnostic {
    file: SourceFile;
    start: number;
    length: number;
}

export interface WriteFileCallbackData {
    /** @internal */ sourceMapUrlPos?: number;
    /** @internal */ buildInfo?: BuildInfo;
    /** @internal */ diagnostics?: readonly DiagnosticWithLocation[];
    /** @internal */ differsOnlyInMap?: true;
    /** @internal */ skippedDtsWrite?: true;
}

export type WriteFileCallback = (
    fileName: string,
    text: string,
    writeByteOrderMark: boolean,
    onError?: (message: string) => void,
    sourceFiles?: readonly SourceFile[],
    data?: WriteFileCallbackData,
) => void;

export interface Program extends TypeCheckerHost, ModuleSpecifierResolutionHost {
}

export interface EmitHost extends ScriptReferenceHost, ModuleSpecifierResolutionHost, SourceFileMayBeEmittedHost {
    getSourceFiles(): readonly SourceFile[];
    useCaseSensitiveFileNames(): boolean;
    getCurrentDirectory(): string;

    getCommonSourceDirectory(): string;
    getCanonicalFileName(fileName: string): string;

    isEmitBlocked(emitFileName: string): boolean;
    shouldTransformImportCall(sourceFile: SourceFile): boolean;
    getEmitModuleFormatOfFile(sourceFile: SourceFile): ModuleKind;

    writeFile: WriteFileCallback;
    getBuildInfo(): BuildInfo | undefined;
    getSourceFileFromReference: Program["getSourceFileFromReference"];
    readonly redirectTargetsMap: RedirectTargetsMap;
    createHash?(data: string): string;
}

export interface TransformationContext extends CoreTransformationContext {
    /** @internal */ getEmitResolver(): EmitResolver;
    /** @internal */ getEmitHost(): EmitHost;
    /** @internal */ getEmitHelperFactory(): EmitHelperFactory;

    /** Records a request for a non-scoped emit helper in the current context. */
    requestEmitHelper(helper: EmitHelper): void;

    /** Gets and resets the requested non-scoped emit helpers. */
    readEmitHelpers(): EmitHelper[] | undefined;

    /** Enables expression substitutions in the pretty printer for the provided SyntaxKind. */
    enableSubstitution(kind: SyntaxKind): void;

    /** Determines whether expression substitutions are enabled for the provided node. */
    isSubstitutionEnabled(node: Node): boolean;

    /**
     * Hook used by transformers to substitute expressions just before they
     * are emitted by the pretty printer.
     *
     * NOTE: Transformation hooks should only be modified during `Transformer` initialization,
     * before returning the `NodeTransformer` callback.
     */
    onSubstituteNode: (hint: EmitHint, node: Node) => Node;

    /**
     * Enables before/after emit notifications in the pretty printer for the provided
     * SyntaxKind.
     */
    enableEmitNotification(kind: SyntaxKind): void;

    /**
     * Determines whether before/after emit notifications should be raised in the pretty
     * printer when it emits a node.
     */
    isEmitNotificationEnabled(node: Node): boolean;

    /**
     * Hook used to allow transformers to capture state before or after
     * the printer emits a node.
     *
     * NOTE: Transformation hooks should only be modified during `Transformer` initialization,
     * before returning the `NodeTransformer` callback.
     */
    onEmitNode: (hint: EmitHint, node: Node, emitCallback: (hint: EmitHint, node: Node) => void) => void;

    /** @internal */ addDiagnostic(diag: DiagnosticWithLocation): void;
}

export type Transformer<T extends Node> = (node: T) => T;

export type TransformerFactory<T extends Node> = (context: TransformationContext) => Transformer<T>;

export type VisitResult<T extends Node | undefined> = T | readonly Node[];

export type Visitor<TIn extends Node = Node, TOut extends Node | undefined = TIn | undefined> = (node: TIn) => VisitResult<TOut>;

export type PragmaArgTypeMaybeCapture<TDesc> = TDesc extends { captureSpan: true; } ? { value: string; pos: number; end: number; } : string;

export type PragmaArgTypeOptional<TDesc, TName extends string> = TDesc extends { optional: true; } ? { [K in TName]?: PragmaArgTypeMaybeCapture<TDesc>; }
    : { [K in TName]: PragmaArgTypeMaybeCapture<TDesc>; };

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

export interface PragmaArgumentSpecification<TName extends string> {
    name: TName; // Determines the name of the key in the resulting parsed type, type parameter to cause literal type inference
    optional?: boolean;
    captureSpan?: boolean;
}

export type ArgumentDefinitionToFieldUnion<T extends readonly PragmaArgumentSpecification<any>[]> = {
    [K in keyof T]: PragmaArgTypeOptional<T[K], T[K] extends { name: infer TName; } ? TName extends string ? TName : never : never>;
}[Extract<keyof T, number>];

export interface ConcretePragmaSpecs {
    readonly "reference": {
        readonly args: readonly [{
            readonly name: "types";
            readonly optional: true;
            readonly captureSpan: true;
        }, {
            readonly name: "lib";
            readonly optional: true;
            readonly captureSpan: true;
        }, {
            readonly name: "path";
            readonly optional: true;
            readonly captureSpan: true;
        }, {
            readonly name: "no-default-lib";
            readonly optional: true;
        }, {
            readonly name: "resolution-mode";
            readonly optional: true;
        }, {
            readonly name: "preserve";
            readonly optional: true;
        }];
        readonly kind: PragmaKindFlags.TripleSlashXML;
    };
    readonly "amd-dependency": {
        readonly args: readonly [{
            readonly name: "path";
        }, {
            readonly name: "name";
            readonly optional: true;
        }];
        readonly kind: PragmaKindFlags.TripleSlashXML;
    };
    readonly "amd-module": {
        readonly args: readonly [{
            readonly name: "name";
        }];
        readonly kind: PragmaKindFlags.TripleSlashXML;
    };
    readonly "ts-check": {
        readonly kind: PragmaKindFlags.SingleLine;
    };
    readonly "ts-nocheck": {
        readonly kind: PragmaKindFlags.SingleLine;
    };
    readonly "jsx": {
        readonly args: readonly [{
            readonly name: "factory";
        }];
        readonly kind: PragmaKindFlags.MultiLine;
    };
    readonly "jsxfrag": {
        readonly args: readonly [{
            readonly name: "factory";
        }];
        readonly kind: PragmaKindFlags.MultiLine;
    };
    readonly "jsximportsource": {
        readonly args: readonly [{
            readonly name: "factory";
        }];
        readonly kind: PragmaKindFlags.MultiLine;
    };
    readonly "jsxruntime": {
        readonly args: readonly [{
            readonly name: "factory";
        }];
        readonly kind: PragmaKindFlags.MultiLine;
    };
}

export type PragmaArgumentType<KPrag extends keyof ConcretePragmaSpecs> = ConcretePragmaSpecs[KPrag] extends { args: readonly PragmaArgumentSpecification<any>[]; } ? UnionToIntersection<ArgumentDefinitionToFieldUnion<ConcretePragmaSpecs[KPrag]["args"]>>
    : never;
