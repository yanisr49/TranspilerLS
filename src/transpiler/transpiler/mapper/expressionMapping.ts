import ts, {SyntaxKind} from 'typescript';
import {Context} from '../utils/context';

export function expressionMapper(node: ts.Node, sourceFile: ts.SourceFile, visitNode: (node: ts.Node) => string, context: Context) {
    if (ts.isCallExpression(node)) {
        if (node.questionDotToken) {
            throw new Error("la syntax '?.' ne peut pas être utilisé en leekscript");
        }

        return `${visitNode(node.expression)}(${node.arguments.map(a => visitNode(a)).join(', ')})`;
    } else if (ts.isNewExpression(node)) {
        // new Object()
        if (node.getText().startsWith('new Map')) {
            return '[:]';
        }
        return 'TODO';
    } else if (ts.isBinaryExpression(node)) {
        // a == b
        return `${visitNode(node.left)} ${visitNode(node.operatorToken)} ${visitNode(node.right)}`;
    } else if (ts.isPropertyAccessExpression(node)) {
        // a.b
        return `${visitNode(node.expression)}.${node.name.getText()}`;
    } else if (ts.isArrayLiteralExpression(node)) {
        // [a, b, c]
        return `[${node.elements.map(e => visitNode(e)).join(', ')}]`;
    } else if (ts.isPostfixUnaryExpression(node)) {
        // i++
        let operator = '';
        if (node.operator === ts.SyntaxKind.PlusPlusToken) {
            operator = '++';
        } else if (node.operator === ts.SyntaxKind.MinusMinusToken) {
            operator = '--';
        }

        return `${visitNode(node.operand)}${operator}`;
    } else if (ts.isPrefixUnaryExpression(node)) {
        // !a, -a, ++a
        let operator = '';
        switch (node.operator) {
            case SyntaxKind.MinusMinusToken:
                operator = '--';
                break;
            case SyntaxKind.PlusPlusToken:
                operator = '++';
                break;
            case SyntaxKind.MinusToken:
                operator = '-';
                break;
            case SyntaxKind.PlusToken:
                operator = '+';
                break;
            case SyntaxKind.ExclamationToken:
                operator = '!';
                break;
            case SyntaxKind.TildeToken:
                throw new Error("Le token '~' n'est pas pris en charge par Leekscript");
        }

        return `${operator}${visitNode(node.operand)}`;
    } else if (ts.isElementAccessExpression(node)) {
        if (node.questionDotToken) {
            throw new Error("la syntax '?.' ne peut pas être utilisé en leekscript");
        }

        return `${visitNode(node.expression)}[${visitNode(node.argumentExpression)}]`;
    }

    return undefined;
}
