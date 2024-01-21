import ts from 'typescript';
import fs from 'fs';
import {typeMapper} from './mapper/typeMapping';
import {variableMapper} from './mapper/variableMapping';
import {statementMapper} from './mapper/statementMapping';
import {classMapper} from './mapper/classMapping';
import {expressionMapper} from './mapper/expressionMapping';
import {tokenMapper} from './mapper/tokenMapping';
import {Context} from './utils/context';
import {getKind} from './utils/utils';
import {leftoversMapper} from './mapper/leftoversMapper';

export function transformToLeekScript(filepath: string, context: Context): string {
    console.log(`Start transpiling file at : ${filepath}`);
    const sourceCode = fs.readFileSync(filepath, 'utf8');
    const sourceFile = ts.createSourceFile(filepath, sourceCode, ts.ScriptTarget.Latest, true);

    const program = ts.createProgram([sourceFile.fileName], {});
    const typeChecker = program.getTypeChecker();

    function visitNode(node: ts.Node): string {
        if (node.getText().includes('undefined')) {
            // console.log(getKind(node), node.getText());
        }

        for (const func of [tokenMapper, typeMapper, variableMapper, expressionMapper, classMapper, statementMapper, leftoversMapper]) {
            const result = func(node, sourceFile, visitNode, context);
            if (result) {
                return result;
            }
        }

        return `TODO\n\t${getKind(node)} ===> ${node.getText()}\nFIN TODO`;
    }

    function getTypeOfNode(node: ts.Node): string {
        const type = typeChecker.getTypeAtLocation(node);
        return typeChecker.typeToString(type);
    }

    function getTypeOfExpression(expression: ts.Expression): string {
        const type = typeChecker.getContextualType(expression);
        return type ? typeChecker.typeToString(type) : 'nop';
    }

    function getTypeOfSymbol(expression: ts.Expression) {
        const type = typeChecker.getSymbolAtLocation(expression);
        console.log(type);
    }

    return sourceFile.statements.map(s => visitNode(s)).join('\n');
}
