import ts from 'typescript';
import {getLeadingWhitespace, getLeadingWhitespaceInLine, mapModifier} from '../utils/utils';

export function classMapper(node: ts.Node, sourceFile: ts.SourceFile, visitNode: (node: ts.Node) => string) {
    const fullWhitespaces = getLeadingWhitespace(node, sourceFile);
    const lineWhitespaces = getLeadingWhitespaceInLine(node, sourceFile);

    if (ts.isClassDeclaration(node)) {
        const indexStartBloc = node.getChildren(sourceFile).findIndex(statement => statement.getText() === '{');
        const statements = node
            .getChildren(sourceFile)
            .slice(indexStartBloc + 1, -1)
            .flatMap(c => (c.kind === ts.SyntaxKind.SyntaxList ? c.getChildren(sourceFile) : c))
            .map(visitNode)
            .join('');

        return `${fullWhitespaces}class ${node.name!.getText()} {${statements}\n${lineWhitespaces}}`;
    } else if (ts.isPropertyDeclaration(node)) {
        const type = node.type ? visitNode(node.type) : 'any';
        const initializer = node.initializer ? ` = ${visitNode(node.initializer)}` : '';
        const questionToken = node.questionToken ? ' | null' : '';

        return `${fullWhitespaces}${mapModifier(node.modifiers)}${type}${questionToken} ${node.name.getText()}${initializer};`;
    } else if (ts.isConstructorDeclaration(node)) {
        const parameters = node.parameters.map(p => visitNode(p));
        const body = node.body ? visitNode(node.body) : '';

        return `${fullWhitespaces}${mapModifier(node.modifiers)}constructor(${parameters}) {${body}\n${lineWhitespaces}}`;
    } else if (ts.isMethodDeclaration(node)) {
        if (node.asteriskToken) {
            throw new Error('Les fonctions générateurs ne sont pas supportées par Leek script');
        }
        const type = node.type ? visitNode(node.type) : 'any';
        const parameters = node.parameters.map(p => visitNode(p));
        const body = node.body ? visitNode(node.body) : '';

        return `${fullWhitespaces}${mapModifier(node.modifiers)}${type} ${node.name.getText()}(${parameters}) {${body}\n${lineWhitespaces}}`;
    } else if (node.kind === ts.SyntaxKind.SyntaxList) {
        return node
            .getChildren(sourceFile)
            .map(c => visitNode(c))
            .join('');
    }

    return undefined;
}
