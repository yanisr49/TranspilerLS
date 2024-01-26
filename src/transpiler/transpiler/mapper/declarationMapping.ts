import ts from 'typescript';
import {getLeadingWhitespace, getLeadingWhitespaceInLine, inferredTypeNameFromNode} from '../utils/utils';

export function declarationMapper(node: ts.Node, sourceFile: ts.SourceFile, visitNode: (node: ts.Node) => string, typeChecker: ts.TypeChecker) {
    const fullWhitespaces = getLeadingWhitespace(node, sourceFile);
    const lineWhitespaces = getLeadingWhitespaceInLine(node, sourceFile);

    if (ts.isVariableDeclarationList(node)) {
        return visitNode(node.declarations[0]);
    } else if (ts.isVariableDeclaration(node)) {
        // const a: TYPE = xxx
        const type = node.type ? visitNode(node.type) : inferredTypeNameFromNode(node, typeChecker);
        const initializer = node.initializer ? ` = ${visitNode(node.initializer)}` : '';

        return `${type} ${visitNode(node.name)}${initializer}`;
    } else if (ts.isEnumDeclaration(node)) {
        if (node.members?.some(m => !m.initializer !== !node.members[0].initializer)) {
            throw new Error(`Tous les membres de l'énumération ${node.name.getText()} n'ont pas le même type`);
        }

        const name = node.name.getText().toUpperCase();

        const members = node.members
            .map((m, idx) => {
                const memberName = visitNode(m.name).toUpperCase();
                const type = m.initializer ? inferredTypeNameFromNode(m.initializer, typeChecker) : 'real';
                const initializer = m.initializer ? ` = ${visitNode(m.initializer)};` : ` = ${idx};`;
                return `global ${type} ${name}_${memberName}${initializer}`;
            })
            .join('\n');

        return `${fullWhitespaces}// Enum ${visitNode(node.name)} :\n${members}`;
    } else if (ts.isTypeAliasDeclaration(node)) {
        return `${fullWhitespaces}/* ${node.getText()} */`;
    }

    return undefined;
}
