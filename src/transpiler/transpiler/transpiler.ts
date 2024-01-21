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

        if (ts.isPropertyAccessExpression(node) && node.getText().includes('walkableCells.get')) {
            console.log(node.getText(), node.expression.getText());
            const symbol = typeChecker.getTypeAtLocation(node.expression);
            console.log(typeChecker.typeToString(symbol));
            // const symbol = typeChecker.getSymbolAtLocation(node.expression);
            //
            // if (symbol) {
            //     const {declarations} = symbol;
            //     if (declarations && declarations.length > 0) {
            //         const type = typeChecker.getTypeAtLocation(declarations[0]);
            //         console.log(node.getText(), typeChecker.typeToString(type));
            //
            //         // if the type is Map
            //         if (typeChecker.typeToString(type) === 'Map') {
            //             console.log('HOHOHOHOHO');
            //             // your code here
            //         }
            //     }
            // }
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

export function transformToLeekScript2(context: Context): string {
    // Read the TypeScript configuration file
    const config = ts.readConfigFile('C:\\Users\\yanis\\IdeaProjects\\EditorLS\\tsconfig.json', ts.sys.readFile).config;

    // Parse the configuration to get file names, options and project references
    const parseConfigHost: ts.ParseConfigFileHost = {
        useCaseSensitiveFileNames: true,
        readDirectory: ts.sys.readDirectory,
        fileExists: ts.sys.fileExists,
        readFile: ts.sys.readFile,
        getCurrentDirectory: ts.sys.getCurrentDirectory,
        onUnRecoverableConfigFileDiagnostic: console.error,
    };
    const parsed = ts.parseJsonConfigFileContent(config, parseConfigHost, 'C:\\Users\\yanis\\IdeaProjects\\EditorLS');

    console.log('tes', parsed.fileNames);

    // Create the program
    const program = ts.createProgram({
        rootNames: parsed.fileNames,
        options: parsed.options,
        projectReferences: parsed.projectReferences,
    });
    const typeChecker = program.getTypeChecker();

    // Process each file in the program
    const sourceFiles = program.getSourceFiles();

    sourceFiles.forEach(s => {
        s.fileName;
        const visitNode = (node: ts.Node): string => {
            if (node.getText().includes('undefined')) {
                // console.log(getKind(node), node.getText());
            }

            if (ts.isPropertyAccessExpression(node) && node.getText().includes('walkableCells.get')) {
                console.log(node.getText(), node.expression.getText());
                const symbol = typeChecker.getTypeAtLocation(node.expression);
                console.log(typeChecker.typeToString(symbol));
                // const symbol = typeChecker.getSymbolAtLocation(node.expression);
                //
                // if (symbol) {
                //     const {declarations} = symbol;
                //     if (declarations && declarations.length > 0) {
                //         const type = typeChecker.getTypeAtLocation(declarations[0]);
                //         console.log(node.getText(), typeChecker.typeToString(type));
                //
                //         // if the type is Map
                //         if (typeChecker.typeToString(type) === 'Map') {
                //             console.log('HOHOHOHOHO');
                //             // your code here
                //         }
                //     }
                // }
            }

            for (const func of [tokenMapper, typeMapper, variableMapper, expressionMapper, classMapper, statementMapper, leftoversMapper]) {
                const result = func(node, s, visitNode, context);
                if (result) {
                    return result;
                }
            }

            return `TODO\n\t${getKind(node)} ===> ${node.getText()}\nFIN TODO`;
        };

        s.statements.map(s => visitNode(s)).join('\n');
    });

    return '';
}

const formatHost: ts.FormatDiagnosticsHost = {
    getCanonicalFileName: path => path,
    getCurrentDirectory: () => 'C:\\Users\\yanis\\IdeaProjects\\EditorLS',
    getNewLine: () => ts.sys.newLine,
};

export function watchMain() {
    const config = ts.readConfigFile('C:\\Users\\yanis\\IdeaProjects\\EditorLS\\tsconfig.json', ts.sys.readFile).config;

    const createProgram = ts.createSemanticDiagnosticsBuilderProgram;

    // Note that there is another overload for `createWatchCompilerHost` that takes
    // a set of root files.
    const host = ts.createWatchCompilerHost('C:\\Users\\yanis\\IdeaProjects\\EditorLS\\tsconfig.json', {}, ts.sys, createProgram, reportDiagnostic, reportWatchStatusChanged);

    // You can technically override any given hook on the host, though you probably
    // don't need to.
    // Note that we're assuming `origCreateProgram` and `origPostProgramCreate`
    // doesn't use `this` at all.
    const origCreateProgram = host.createProgram;
    // @ts-ignore
    host.createProgram = (rootNames: ReadonlyArray<string>, options, host, oldProgram) => {
        console.log("** We're about to create the program! **");
        return origCreateProgram(rootNames, options, host, oldProgram);
    };
    const origPostProgramCreate = host.afterProgramCreate;

    host.afterProgramCreate = program => {
        console.log('** We finished making the program! **');
        origPostProgramCreate!(program);
    };

    // `createWatchProgram` creates an initial program, watches files, and updates
    // the program over time.
    ts.createWatchProgram(host);
}

function reportDiagnostic(diagnostic: ts.Diagnostic) {
    console.log(diagnostic.file?.fileName);
    console.error('Error', diagnostic.code, ':', ts.flattenDiagnosticMessageText(diagnostic.messageText, formatHost.getNewLine()));
}

/**
 * Prints a diagnostic every time the watch status changes.
 * This is mainly for messages like "Starting compilation" or "Compilation completed".
 */
function reportWatchStatusChanged(diagnostic: ts.Diagnostic) {
    console.log(diagnostic.file);

    console.info(ts.formatDiagnostic(diagnostic, formatHost));
}
