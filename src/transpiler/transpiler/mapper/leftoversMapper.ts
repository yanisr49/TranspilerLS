import ts from 'typescript';
import {throwError} from '../utils/utils';

export function leftoversMapper(node: ts.Node, sourceFile: ts.SourceFile, visitNode: (node: ts.Node) => string, typeChecker: ts.TypeChecker) {
    if (ts.isArrowFunction(node)) {
        const parameters = node.parameters.map(p => visitNode(p)).join(', ');
        // Obligé de mettre des parenthèse autour de la function sinon LS n'aime pas this.test2 = (any a,any b) => a; dans une classe
        return `((${parameters}) => ${visitNode(node.body)})`;
    } else if (ts.isSpreadElement(node)) {
        if (node.getText().match(/^\.\.\.Array\([0-9]+\)\.keys\(\)$/g)) {
            return `0..${node.getText().slice(9, -8)}`;
        }
        throw throwError("Le spread operator n'est supporté que dans la forme [...Array(xxx).keys()] qui est alors transformé en [0..xxx]", node);
    } else if (ts.isImportDeclaration(node)) {
        return `// ${node.getText()}`;
    }

    return undefined;
}
