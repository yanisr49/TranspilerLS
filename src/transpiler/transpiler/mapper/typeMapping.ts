import ts from 'typescript';
import {getLeadingWhitespace, getLeadingWhitespaceInLine} from '../utils/utils';

export function typeMapper(node: ts.Node, sourceFile: ts.SourceFile, visitNode: (node: ts.Node) => string, typeChecker: ts.TypeChecker) {
    const fullWhitespaces = getLeadingWhitespace(node, sourceFile);
    const lineWhitespaces = getLeadingWhitespaceInLine(node, sourceFile);

    if (ts.isArrayTypeNode(node)) {
        return `Array<${visitNode(node.elementType)}>`;
    } else if (ts.isUnionTypeNode(node)) {
        return node.types.map(visitNode).join(' | ');
    } else if (ts.isParenthesizedTypeNode(node)) {
        return `${visitNode(node.type)}`;
    } else if (ts.isFunctionTypeNode(node)) {
        // Remplace les types generique sur les fonctions par any : <T> (a: T) => {}
        const typeParameters = node.typeParameters?.map(t => t.name.getText());
        const parameters = node.parameters.map(p => (p.type && typeParameters?.includes(p.type.getText()) ? 'any' : visitNode(p)));

        return `Function<${parameters.join(', ')} => ${visitNode(node.type)}>`;
    } else if (ts.isParameter(node)) {
        const type = node.type ? visitNode(node.type) : 'any';
        const name = ts.isFunctionTypeNode(node.parent) ? '' : ` ${node.name.getText()}`;
        return `${type}${name}`;
    } else if (ts.isTypeReferenceNode(node)) {
        const typeArguments = node.typeArguments ? `<${node.typeArguments?.map(t => visitNode(t)).join(', ')}>` : '';
        return `${visitNode(node.typeName)}${typeArguments}`;
    } else if (ts.isPropertyAssignment(node)) {
        return `${lineWhitespaces}${visitNode(node.name)}: ${visitNode(node.initializer)}`;
    }

    return undefined;
}
