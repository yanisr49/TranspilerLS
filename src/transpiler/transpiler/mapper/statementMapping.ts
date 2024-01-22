import ts from 'typescript';
import {getLeadingWhitespace, getLeadingWhitespaceInLine, mapModifier} from '../utils/utils';

export function statementMapper(node: ts.Node, sourceFile: ts.SourceFile, visitNode: (node: ts.Node) => string) {
    const fullWhitespaces = getLeadingWhitespace(node, sourceFile);
    const lineWhitespaces = getLeadingWhitespaceInLine(node, sourceFile);

    if (ts.isForStatement(node)) {
        return `${fullWhitespaces}for (${visitNode(node.initializer!)}; ${visitNode(node.condition!)}; ${visitNode(node.incrementor!)}) {${visitNode(
            node.statement
        )}\n${lineWhitespaces}}`;
    } else if (ts.isDoStatement(node)) {
        return `${fullWhitespaces}do {${visitNode(node.statement)}\n${lineWhitespaces}} while(${visitNode(node.expression)});`;
    } else if (ts.isIfStatement(node)) {
        const elseStatement = node.elseStatement ? ` else {${visitNode(node.elseStatement)}\n${lineWhitespaces}}` : '';

        return `${fullWhitespaces}if(${visitNode(node.expression)}) {${visitNode(node.thenStatement)}\n${lineWhitespaces}}${elseStatement}`;
    } else if (ts.isReturnStatement(node)) {
        const expression = node.expression ? ` ${visitNode(node.expression)}` : '';
        return `${fullWhitespaces}return${expression};`;
    } else if (ts.isVariableStatement(node)) {
        const global = node.declarationList?.declarations?.[0].name.getText().startsWith('global') ? 'global ' : '';
        return `${fullWhitespaces}${global}${mapModifier(node.modifiers)}${visitNode(node.declarationList)};`;
    } else if (ts.isExpressionStatement(node)) {
        return `${fullWhitespaces}${visitNode(node.expression)};`;
    } else if (ts.isBlock(node)) {
        const statements = node.statements.map(s => visitNode(s)).join('');
        return `${fullWhitespaces}${statements}`;
    }

    return undefined;
}

function isFirstStatement(node: ts.Statement): boolean {
    const parent = node.parent;
    if (ts.isBlock(parent) || ts.isSourceFile(parent)) {
        return parent.statements[0] === node;
    }
    return false;
}
