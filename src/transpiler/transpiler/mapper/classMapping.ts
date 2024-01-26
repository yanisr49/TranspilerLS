import ts from 'typescript';
import {getLeadingWhitespace, getLeadingWhitespaceInLine, inferredTypeNameFromType, mapModifier} from '../utils/utils';

export function classMapper(node: ts.Node, sourceFile: ts.SourceFile, visitNode: (node: ts.Node) => string, typeChecker: ts.TypeChecker) {
    const fullWhitespaces = getLeadingWhitespace(node, sourceFile);
    const lineWhitespaces = getLeadingWhitespaceInLine(node, sourceFile);

    if (ts.isClassDeclaration(node)) {
        const heritageClauses = node.heritageClauses?.length ? `${node.heritageClauses?.map(visitNode).join(', ')} ` : '';
        const statements = node.members.map(visitNode).join('');

        return `${fullWhitespaces}class ${node.name!.getText()} ${heritageClauses}{${statements}\n${lineWhitespaces}}`;
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

        let returnType = node.type ? visitNode(node.type) : 'any';
        const parameters = node.parameters.map(p => visitNode(p));
        const body = node.body ? visitNode(node.body) : '';

        if (!node.type && typeChecker.getSignatureFromDeclaration(node)) {
            returnType = inferredTypeNameFromType(typeChecker.getReturnTypeOfSignature(typeChecker.getSignatureFromDeclaration(node)!), typeChecker);
        }

        return `${fullWhitespaces}${mapModifier(node.modifiers)}${returnType} ${visitNode(node.name)}(${parameters}) {${body}\n${lineWhitespaces}}`;
    } else if (ts.isHeritageClause(node)) {
        if (node.token === ts.SyntaxKind.ImplementsKeyword) {
            throw new Error("Le mot clé implements n'est pas pris en charge par leekscript");
        }

        return `extends ${node.types.map(visitNode).join(', ')}`;
    }

    return undefined;
}
