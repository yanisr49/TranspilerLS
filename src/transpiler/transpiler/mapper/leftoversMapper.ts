import ts from 'typescript';
import {Context} from '../utils/context';

export function leftoversMapper(node: ts.Node, sourceFile: ts.SourceFile, visitNode: (node: ts.Node) => string, context: Context) {
    if (ts.isArrowFunction(node)) {
        return `(${node.parameters.map(p => visitNode(p))}) => ${visitNode(node.body)}`;
    } else if (ts.isImportDeclaration(node)) {
        return `// ${node.getText()}`;
    }

    return undefined;
}
