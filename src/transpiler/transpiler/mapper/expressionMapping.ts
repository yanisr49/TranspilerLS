import ts, {SyntaxKind} from 'typescript';
import {typeToNode} from '../utils/utils';

export function expressionMapper(node: ts.Node, sourceFile: ts.SourceFile, visitNode: (node: ts.Node) => string, typeChecker: ts.TypeChecker) {
    if (ts.isCallExpression(node)) {
        if (node.questionDotToken) {
            throw new Error("la syntax '?.' ne peut pas être utilisé en leekscript");
        }

        if (ts.isPropertyAccessExpression(node.expression)) {
            const type = typeToNode(typeChecker.getTypeAtLocation(node.expression.expression), typeChecker);
            if (type === 'Map' || type.startsWith('Map<')) {
                switch (node.expression.name.getText()) {
                    case 'get':
                        return `mapGet(${node.expression.expression.getText()}, ${node.arguments[0].getText()})`;
                    case 'set':
                        return `mapPut(${node.expression.expression.getText()}, ${node.arguments[0].getText()}, ${node.arguments[1].getText()})`;
                    case 'delete':
                        return `mapRemove(${node.expression.expression.getText()}, ${node.arguments[0].getText()})`;
                    default:
                        throw new Error(`Leekscript 4 ne supporte pas la méthode ${node.expression.name.getText()} sur une map`);
                }
            }
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
