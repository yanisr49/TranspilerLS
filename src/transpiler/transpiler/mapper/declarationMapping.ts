import ts from 'typescript';
import {getLeadingWhitespace, getLeadingWhitespaceInLine, inferredTypeNameFromNode, throwError} from '../utils/utils';

export function declarationMapper(node: ts.Node, sourceFile: ts.SourceFile, visitNode: (node: ts.Node) => string, typeChecker: ts.TypeChecker) {
    const fullWhitespaces = getLeadingWhitespace(node, sourceFile);
    const lineWhitespaces = getLeadingWhitespaceInLine(node, sourceFile);

    if (ts.isVariableDeclarationList(node)) {
        return visitNode(node.declarations[0]);
    } else if (ts.isVariableDeclaration(node)) {
        // const a: TYPE = xxx
        const type = inferredTypeNameFromNode(node, typeChecker, visitNode, node.type);
        const initializer = node.initializer ? ` = ${visitNode(node.initializer)}` : '';

        if (node.initializer?.getText() === 'bar') {
            const symbol = typeChecker.getSymbolAtLocation(node.name);
            //console.log(typeChecker.getFullyQualifiedName(symbol!));
            console.log(typeChecker.typeToString(typeChecker.getTypeOfSymbolAtLocation(symbol!, symbol!.declarations![0])));
        }
        return `${type} ${visitNode(node.name)}${initializer}`;
    } else if (ts.isEnumDeclaration(node)) {
        if (node.members?.some(m => !m.initializer !== !node.members[0].initializer)) {
            throw throwError(`Tous les membres de l'énumération ${node.name.getText()} n'ont pas le même type`, node);
        }

        const name = node.name.getText().toUpperCase();

        const members = node.members
            .map((m, idx) => {
                const memberName = visitNode(m.name).toUpperCase();
                const type = m.initializer ? inferredTypeNameFromNode(m.initializer, typeChecker, visitNode) : 'any /* number */';
                const initializer = m.initializer ? ` = ${visitNode(m.initializer)};` : ` = ${idx};`;
                return `global ${type} ${name}_${memberName}${initializer}`;
            })
            .join('\n');

        return `${fullWhitespaces}// Enum ${visitNode(node.name)} :\n${members}`;
    } else if (ts.isTypeAliasDeclaration(node)) {
        return `${fullWhitespaces}/* ${node.getText()} */`;
    } else if (ts.isFunctionDeclaration(node)) {
        if (node.asteriskToken) {
            throw throwError('Les fonctions générateurs ne sont pas supportées par Leek script', node);
        }

        const name = node.name ? visitNode(node.name) : '';
        const parameters = node.parameters.map(p => visitNode(p)).join(', ');
        const body = node.body ? visitNode(node.body) : '';

        return `${fullWhitespaces}function ${name}(${parameters}) {${body}\n${lineWhitespaces}}`;
    }

    return undefined;
}
