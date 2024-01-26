import ts, {SyntaxKind} from 'typescript';
import {getLeadingWhitespace, getLeadingWhitespaceInLine} from '../utils/utils';

export function expressionMapper(node: ts.Node, sourceFile: ts.SourceFile, visitNode: (node: ts.Node) => string, typeChecker: ts.TypeChecker) {
    const fullWhitespaces = getLeadingWhitespace(node, sourceFile);
    const lineWhitespaces = getLeadingWhitespaceInLine(node, sourceFile);

    if (ts.isCallExpression(node)) {
        if (node.questionDotToken) {
            throw new Error("la syntax '?.' ne peut pas être utilisé en leekscript");
        }

        if (ts.isPropertyAccessExpression(node.expression)) {
            switch (typeChecker.getTypeAtLocation(node.expression.expression).symbol.escapedName) {
                case 'Map':
                    switch (node.expression.name.getText()) {
                        case 'get':
                            return `mapGet(${visitNode(node.expression.expression)}, ${visitNode(node.arguments[0])})`;
                        case 'set':
                            return `mapPut(${visitNode(node.expression.expression)}, ${visitNode(node.arguments[0])}, ${visitNode(node.arguments[1])})`;
                        case 'delete':
                            return `mapRemove(${visitNode(node.expression.expression)}, ${visitNode(node.arguments[0])})`;
                        default:
                            throw new Error(`Leekscript 4 ne supporte pas la méthode ${node.expression.name.getText()} sur une map`);
                    }
                case 'Array':
                    switch (node.expression.name.getText()) {
                        case 'push':
                            return `push(${visitNode(node.expression.expression)}, ${visitNode(node.arguments[0])})`;
                        default:
                            throw new Error(`Leekscript 4 ne supporte pas la méthode ${node.expression.name.getText()} sur une map`);
                    }
                default:
                    break;
            }
        }

        return `${visitNode(node.expression)}(${node.arguments.map(a => visitNode(a)).join(', ')})`;
    } else if (ts.isNewExpression(node)) {
        // new Object()
        if (node.getText().startsWith('new Map')) {
            return '[:]';
        }

        if (node.typeArguments?.length) {
            throw new Error('TODO type arguments (isNewExpression)');
        }

        const constructorArguments = node.arguments?.map(visitNode).join(', ') ?? '';

        return `new ${visitNode(node.expression)}(${constructorArguments})`;
    } else if (ts.isBinaryExpression(node)) {
        // a == b
        return `${visitNode(node.left)} ${visitNode(node.operatorToken)} ${visitNode(node.right)}`;
    } else if (ts.isPropertyAccessExpression(node)) {
        // a.b
        if (ts.SymbolFlags.EnumMember === typeChecker.getSymbolAtLocation(node)?.flags) {
            return `${node.expression.getText().toUpperCase()}_${node.name.getText().toUpperCase()}`;
        }
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
    } else if (ts.isObjectLiteralExpression(node)) {
        const properties = node.properties.map(visitNode).join(',\n');

        const matchedWhitespace = properties.split('\n').pop()?.match(/^\s*/);

        return `{\n${properties}\n${matchedWhitespace?.length ? matchedWhitespace[0].slice(0, -4) : ''}}`;
    } else if (ts.isAsExpression(node)) {
        return visitNode(node.expression);
    } else if (ts.isExpressionWithTypeArguments(node)) {
        if (node.typeArguments?.length) {
            throw new Error("TODO : Type arguments d'une isExpressionWithTypeArguments à implémenter");
        }
        return visitNode(node.expression);
    }

    return undefined;
}
