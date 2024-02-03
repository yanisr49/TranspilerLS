import ts, {SyntaxKind} from 'typescript';
import {inferredTypeNameFromNode, throwError} from '../utils/utils';

const tokenMap: Record<number, string> = {
    [SyntaxKind.UndefinedKeyword]: 'null',
    [SyntaxKind.NumberKeyword]: 'any /* number */',
    [SyntaxKind.StringKeyword]: 'string',
    [SyntaxKind.EqualsEqualsEqualsToken]: '==',
    [SyntaxKind.ExclamationEqualsEqualsToken]: '!=',
};

const tokensReturningText = [
    SyntaxKind.NumericLiteral,
    SyntaxKind.ThisKeyword,
    SyntaxKind.VoidKeyword,
    SyntaxKind.AsteriskAsteriskToken,
    SyntaxKind.PlusToken,
    SyntaxKind.PlusPlusToken,
    SyntaxKind.PlusEqualsToken,
    SyntaxKind.MinusToken,
    SyntaxKind.MinusMinusToken,
    SyntaxKind.MinusEqualsToken,
    SyntaxKind.SlashToken,
    SyntaxKind.SuperKeyword,
    SyntaxKind.ExclamationToken,
    SyntaxKind.EqualsEqualsToken,
    SyntaxKind.ExclamationEqualsToken,
    SyntaxKind.EqualsToken,
    SyntaxKind.FirstBinaryOperator,
    SyntaxKind.FalseKeyword,
    SyntaxKind.TrueKeyword,
    SyntaxKind.PercentToken,
    SyntaxKind.GreaterThanEqualsToken,
    SyntaxKind.LessThanEqualsToken,
    SyntaxKind.NullKeyword,
    SyntaxKind.AsteriskToken,
    SyntaxKind.AmpersandAmpersandToken,
    SyntaxKind.BarBarToken,
    SyntaxKind.ContinueStatement,
    SyntaxKind.GreaterThanToken,
    SyntaxKind.LessThanToken,
    SyntaxKind.InKeyword,
];

export function tokenMapper(node: ts.Node, sourceFile: ts.SourceFile, visitNode: (node: ts.Node) => string, typeChecker: ts.TypeChecker) {
    const result = tokenMap[node.kind];

    if (result) {
        return result;
    } else if (tokensReturningText.includes(node.kind) || ts.isStringLiteral(node) || ts.isTypeLiteralNode(node)) {
        return node.getText();
    } else if (ts.isBigIntLiteral(node)) {
        return node.getText().replace('n', '');
    }

    if (ts.isIdentifier(node)) {
        if (node.getText() === 'undefined') {
            return 'null';
        } else if (typeChecker.getSymbolAtLocation(node)?.flags === ts.SymbolFlags.TypeAlias) {
            // Type alias
            return `any /* ${node.getText()} */`;
        } else if (
            (typeChecker.getTypeAtLocation(node)?.flags & ts.TypeFlags.EnumLiteral) === ts.TypeFlags.EnumLiteral &&
            ((typeChecker.getSymbolAtLocation(node)?.flags ?? 0) & ts.SymbolFlags.Alias) === ts.SymbolFlags.Alias
        ) {
            const finalType = inferredTypeNameFromNode(node, typeChecker, visitNode);
            const formerType = node.getText();
            return `${finalType} /* ${formerType} */`;
        }

        return node.getText();
    } else if (node.kind === SyntaxKind.TildeToken) {
        throw throwError("Le token '~' n'est pas pris en charge par Leekscript", node);
    } else if (ts.isTemplateSpan(node)) {
        return `${visitNode(node.expression)}${visitNode(node.literal)}`;
    } else if (ts.isTemplateHead(node)) {
        return `"${node.rawText}" + `;
    } else if (ts.isTemplateMiddle(node)) {
        return ` + "${node.rawText}" + `;
    } else if (ts.isTemplateTail(node)) {
        return ` + "${node.rawText}"`;
    }

    return undefined;
}
