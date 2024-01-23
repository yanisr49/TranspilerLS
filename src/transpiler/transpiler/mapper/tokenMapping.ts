import ts, {SyntaxKind} from 'typescript';

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
    } else if (ts.isBinaryOperatorToken(node)) {
        return node.getText();
    } else if (ts.isIdentifier(node)) {
        if (node.getText() === 'undefined') {
            return 'null';
        }

        return node.getText();
    } else if (ts.isStringLiteral(node)) {
        return node.getText();
    }

    return undefined;
}
