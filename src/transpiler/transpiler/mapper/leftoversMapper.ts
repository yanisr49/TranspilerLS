import ts from 'typescript';

export function leftoversMapper(node: ts.Node, sourceFile: ts.SourceFile, visitNode: (node: ts.Node) => string, typeChecker: ts.TypeChecker) {
    if (ts.isArrowFunction(node)) {
        return `(${node.parameters.map(p => visitNode(p))}) => ${visitNode(node.body)}`;
    } else if (ts.isSpreadElement(node)) {
        if (node.getText().match(/^\.\.\.Array\([0-9]+\)\.keys\(\)$/g)) {
            return `0..${node.getText().slice(9, -8)}`;
        }
        throw new Error("Le spread operator n'est supporté que dans la forme [...Array(xxx).keys()] qqui est alors transformé en [0..xxx]");
    } else if (ts.isImportDeclaration(node)) {
        return `// ${node.getText()}`;
    }

    return undefined;
}
