import ts, {SyntaxKind} from 'typescript';
import {inferredTypeNameFromNode} from '../utils/utils';

export function tokenMapper(node: ts.Node, sourceFile: ts.SourceFile, visitNode: (node: ts.Node) => string, typeChecker: ts.TypeChecker) {
    if (node.kind === SyntaxKind.UndefinedKeyword) {
        return 'null';
    } else if (node.kind === SyntaxKind.NumberKeyword) {
        return 'real';
    } else if (node.kind === SyntaxKind.StringKeyword) {
        return 'string';
    } else if (node.kind === SyntaxKind.NumericLiteral) {
        return node.getText();
    } else if (node.kind === SyntaxKind.ThisKeyword) {
        return node.getText();
    } else if (node.kind === SyntaxKind.VoidKeyword) {
        return node.getText();
    } else if (node.kind === SyntaxKind.SuperKeyword) {
        return node.getText();
    } else if ([SyntaxKind.EqualsEqualsEqualsToken, SyntaxKind.EqualsEqualsToken].includes(node.kind)) {
        return '==';
    } else if ([SyntaxKind.ExclamationEqualsToken, SyntaxKind.ExclamationEqualsEqualsToken].includes(node.kind)) {
        return '!=';
    } else if (node.kind === SyntaxKind.EqualsToken) {
        return node.getText();
    } else if (ts.isIdentifier(node)) {
        if (node.getText() === 'undefined') {
            return 'null';
        } else if (typeChecker.getSymbolAtLocation(node)?.flags === ts.SymbolFlags.TypeAlias) {
            // Type alias
            return `any /* ${node.getText()} */`;
        } else if (
            (typeChecker.getTypeAtLocation(node)?.flags & ts.TypeFlags.EnumLiteral) === ts.TypeFlags.EnumLiteral &&
            ((typeChecker.getSymbolAtLocation(node)?.flags ?? 0) & ts.SymbolFlags.Alias) === ts.SymbolFlags.Alias
        ) {
            const finalType = inferredTypeNameFromNode(node, typeChecker).split(' | ')[0];
            const formerType = node.getText();
            return `${finalType} /* ${formerType} */`;
        }

        return node.getText();
    } else if (ts.isStringLiteral(node)) {
        return node.getText();
    } else if (ts.isTypeLiteralNode(node)) {
        return node.getText();
    }

    return undefined;
}
