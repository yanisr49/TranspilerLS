import ts from 'typescript';

export function variableMapper(node: ts.Node, sourceFile: ts.SourceFile, visitNode: (node: ts.Node) => string, typeChecker: ts.TypeChecker) {
    if (ts.isVariableDeclarationList(node)) {
        return visitNode(node.declarations[0]);
    } else if (ts.isVariableDeclaration(node)) {
        let result = '';

        if (node.type) {
            result += `${visitNode(node.type)} ${node.name.getText()}`;
        } else {
            result += `any ${node.name.getText()}`;
        }

        if (node.initializer) {
            result += ` = ${visitNode(node.initializer)}`;
        }

        return result;
    }

    return undefined;
}
