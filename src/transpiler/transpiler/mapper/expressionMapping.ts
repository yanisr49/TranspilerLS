import ts, {SyntaxKind} from 'typescript';
import {getLeadingWhitespace, getLeadingWhitespaceInLine, inferredTypeNameFromNode, throwError} from '../utils/utils';

/**
 * Maps TypeScript expressions to Leekscript expressions.
 *
 * @param {ts.Node} node - The TypeScript node to map.
 * @param {ts.SourceFile} sourceFile - The source file containing the node.
 * @param {Function} visitNode - A function to visit child nodes and map them to Leekscript expressions.
 * @param {ts.TypeChecker} typeChecker - The TypeScript type checker.
 * @returns {string|undefined} - The Leekscript expression mapped from the TypeScript expression.
 * @throws Throws an error if an unsupported syntax is encountered.
 */
export function expressionMapper(node: ts.Node, sourceFile: ts.SourceFile, visitNode: (node: ts.Node) => string, typeChecker: ts.TypeChecker): string | undefined {
    const fullWhitespaces = getLeadingWhitespace(node, sourceFile);
    const lineWhitespaces = getLeadingWhitespaceInLine(node, sourceFile);

    if (ts.isCallExpression(node)) {
        if (node.questionDotToken) {
            throw throwError("la syntax '?.' ne peut pas être utilisé en leekscript", node);
        }

        if (ts.isPropertyAccessExpression(node.expression)) {
            switch (typeChecker.getTypeAtLocation(node.expression.expression).symbol?.escapedName) {
                case 'Map':
                    switch (node.expression.name.getText()) {
                        case 'get':
                            return `mapGet(${visitNode(node.expression.expression)}, ${visitNode(node.arguments[0])})`;
                        case 'set':
                            return `mapPut(${visitNode(node.expression.expression)}, ${visitNode(node.arguments[0])}, ${visitNode(node.arguments[1])})`;
                        case 'delete':
                            return `mapRemove(${visitNode(node.expression.expression)}, ${visitNode(node.arguments[0])})`;
                        default:
                            throw throwError(`Leekscript 4 ne supporte pas la méthode ${node.expression.name.getText()} sur une map`, node);
                    }
                case 'Array':
                    switch (node.expression.name.getText()) {
                        case 'push':
                            return `push(${visitNode(node.expression.expression)}, ${visitNode(node.arguments[0])})`;
                        case 'every':
                            return `arrayEvery(${visitNode(node.expression.expression)}, ${visitNode(node.arguments[0])})`;
                        case 'includes':
                            return `search(${visitNode(node.expression.expression)}, ${visitNode(node.arguments[0])})`;
                        default:
                            throw throwError(`Leekscript 4 ne supporte pas la méthode ${node.expression.name.getText()} sur une liste`, node);
                    }
                default:
                    break;
            }

            if (inferredTypeNameFromNode(node.expression.expression, typeChecker, visitNode) === 'string') {
                switch (node.expression.name.getText()) {
                    case 'includes':
                        return `contains(${visitNode(node.expression.expression)}, ${visitNode(node.arguments[0])})`;
                    case 'slice':
                        const stringCalled = visitNode(node.expression).slice(0, -6);
                        if (node.arguments.length === 1) {
                            return `substring(${stringCalled}, ${visitNode(node.arguments[0])})`;
                        } else if (node.arguments.length === 2) {
                            if (node.arguments[1].getText().startsWith('-')) {
                                return `substring(${stringCalled}, ${visitNode(node.arguments[0])}, length(${stringCalled}) - ${visitNode(node.arguments[0])} ${visitNode(
                                    node.arguments[1]
                                )})`;
                            }
                            return `substring(${stringCalled}, ${visitNode(node.arguments[0])}, ${visitNode(node.arguments[1])} - ${visitNode(node.arguments[0])})`;
                        }
                        throw throwError(`Leekscript 4 ne supporte pas la méthode ${node.expression.name.getText()} sur un string avec autant d'argument`, node);
                    default:
                        throw throwError(`Leekscript 4 ne supporte pas la méthode ${node.expression.name.getText()} sur un string`, node);
                }
            }
        }

        if (node.expression.getText() === 'console.log') {
            return `debug(${node.arguments.map(a => visitNode(a)).join(' + " " + ')})`;
        }

        return `${visitNode(node.expression)}(${node.arguments.map(a => visitNode(a)).join(', ')})`;
    } else if (ts.isNewExpression(node)) {
        // new Object()
        if (node.getText().startsWith('new Map')) {
            return '[:]';
        }

        if (node.typeArguments?.length) {
            throw throwError('TODO type arguments (isNewExpression)', node);
        }

        const constructorArguments = node.arguments?.map(visitNode).join(', ') ?? '';

        return `new ${visitNode(node.expression)}(${constructorArguments})`;
    } else if (ts.isNullishCoalesce(node) && ts.isBinaryExpression(node)) {
        const left = visitNode(node.left);
        return `${left} != null ? ${left} : ${visitNode(node.right)}`;
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
                throw throwError("Le token '~' n'est pas pris en charge par Leekscript", node);
        }

        return `${operator}${visitNode(node.operand)}`;
    } else if (ts.isElementAccessExpression(node)) {
        if (node.questionDotToken) {
            throw throwError("la syntax '?.' ne peut pas être utilisé en leekscript", node);
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
            throw throwError("TODO : Type arguments d'une isExpressionWithTypeArguments à implémenter", node);
        }
        return visitNode(node.expression);
    } else if (ts.isParenthesizedExpression(node)) {
        return `(${visitNode(node.expression)})`;
    } else if (ts.isConditionalExpression(node)) {
        return `${visitNode(node.condition)} ? ${visitNode(node.whenTrue)} : ${visitNode(node.whenFalse)}`;
    } else if (ts.isTemplateExpression(node)) {
        return `${visitNode(node.head)}${node.templateSpans.map(visitNode).join('')}`;
    } else if (ts.isTypeOfExpression(node)) {
        return `${visitNode(node.expression)}.class`;
    }

    return undefined;
}
