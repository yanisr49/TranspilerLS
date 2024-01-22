import ts from 'typescript';

export function leftoversMapper(node: ts.Node, sourceFile: ts.SourceFile, visitNode: (node: ts.Node) => string) {
    if (ts.isArrowFunction(node)) {
        return `(${node.parameters.map(p => visitNode(p))}) => ${visitNode(node.body)}`;
    } else if (ts.isImportDeclaration(node)) {
        return `// ${node.getText()}`;
    }

    return undefined;
}
