import ts from 'typescript';
import {typeToNode} from '../utils/utils';

export function variableMapper(node: ts.Node, sourceFile: ts.SourceFile, visitNode: (node: ts.Node) => string, typeChecker: ts.TypeChecker) {
    if (ts.isVariableDeclarationList(node)) {
        return visitNode(node.declarations[0]);
    } else if (ts.isVariableDeclaration(node)) {
        const type = node.type ? visitNode(node.type) : typeToNode(typeChecker.getTypeAtLocation(node), typeChecker);
        const initializer = node.initializer ? ` = ${visitNode(node.initializer)}` : '';

        return `${type} ${node.name.getText()}${initializer}`;
    }

    return undefined;
}
