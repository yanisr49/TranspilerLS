import ts, {SyntaxKind} from 'typescript';
import {Context} from '../utils/context';

export function tokenMapper(node: ts.Node, sourceFile: ts.SourceFile, visitNode: (node: ts.Node) => string, context: Context) {
    if (context.interfaces.includes(node.getText()) || context.types.includes(node.getText()) || context.enums.includes(node.getText())) {
        return `any /* ${node.getText()} */`;
    } else if (node.kind === SyntaxKind.UndefinedKeyword) {
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
