import ts from 'typescript';
import {getKind, typeToNode} from '../utils/utils';

export function variableMapper(node: ts.Node, sourceFile: ts.SourceFile, visitNode: (node: ts.Node) => string, typeChecker: ts.TypeChecker) {
    if (ts.isVariableDeclarationList(node)) {
        return visitNode(node.declarations[0]);
    } else if (ts.isVariableDeclaration(node)) {
        const type = node.type ? visitNode(node.type) : typeToNode(typeChecker.getTypeAtLocation(node), typeChecker);
        const initializer = node.initializer ? ` = ${visitNode(node.initializer)}` : '';

        return `${type} ${node.name.getText()}${initializer}`;
    } else if (ts.isEnumDeclaration(node)) {
        if (node.members[0].initializer) {
            if (ts.isNumericLiteral(node.members[0].initializer)) {
                console.log('youpi');
            }
            console.log('ICI', getKind(node.members[0].initializer!));
        }
    }

    return undefined;
}
