import "dotenv/config";
import * as ts from 'typescript';
import {SyntaxKind} from 'typescript';
import API from "./transpiler/request";
import concatFile from "./transpiler/concatFiles";
import {refactoEnum} from "./transpiler/processFile";
import fs from "fs";

const main = async () => {

    function getFiles(dir, files: any[] = []) {
        // Get an array of all files and directories in the passed directory using fs.readdirSync
        const fileList = fs.readdirSync(dir)
        // Create the full path of the file/directory by concatenating the passed directory and file/directory name
        for (const file of fileList) {
            const name = `${dir}/${file}`
            // Check if the current file/directory is a directory using fs.statSync
            if (fs.statSync(name).isDirectory()) {
                // If it is a directory, recursively call the getFiles function with the directory path and the files array
                getFiles(name, files)
            } else {
                // If it is a file, push the full path to the files array
                files.push(name)
            }
        }
        return files
    }


    console.log(getFiles("C:\\Users\\yrichard\\Documents\\EditorSave\\src\\", []));

/*
    function transformToLeekScript(sourceCode: string): string {
        const sourceFile = ts.createSourceFile(
            'temp.ts',
            sourceCode,
            ts.ScriptTarget.Latest,
            true
        );

        const program = ts.createProgram([sourceFile.fileName], {});
        const typeChecker = program.getTypeChecker();

        function visitNode(node: ts.Node): string {


            // if(ts.isExpressionStatement(node)) {
            //     if(ts.isCallExpression(node.expression)) {
            //         if(ts.isPropertyAccessExpression(node.expression.expression)) {
            //             console.log(node.expression.expression.expression.getText());
            //         }
            //     }
            // }

            if (ts.isArrowFunction(node)) {
                return `(${node.parameters.map(visitNode)}) => ${visitNode(node.body)}`;
            } else if (ts.isParameter(node)) {
                if (node.type) {
                    return `${formatType(node.type)} ${node.name.getText()}`;
                } else {
                    return node.name.getText();
                }
            } else if (ts.isNewExpression(node)) {
                if (node.getText().startsWith("new Map")) {
                    return "[:]"
                }
                return "TODO";
            } else if (ts.isBinaryExpression(node)) {
                return `${visitNode(node.left)} ${visitNode(node.operatorToken)} ${visitNode(node.right)}`
            } else if (ts.isBinaryOperatorToken(node)) {
                return node.getText().replace("===", "==").replace("!==", "!=");
            }
                ////////////////////////
                // /!\ VARIABLES /!\ //
            ////////////////////////
            else if (ts.isVariableStatement(node)) {
                return visitNode(node.declarationList) + ";";
            } else if (ts.isVariableDeclarationList(node)) {
                return visitNode(node.declarations[0]);
            } else if (ts.isVariableDeclaration(node)) {
                let result = "";

                if (node.type) {
                    result += `${formatType(node.type)} ${node.name.getText()}`;
                } else {
                    result += `any ${node.name.getText()}`;
                }

                if (node.initializer) {
                    result += ` = ${visitNode(node.initializer)}`;
                }

                return result;
            }
                ////////////////////////
                // /!\ BOUCLE FOR /!\ //
            ////////////////////////
            else if (ts.isForStatement(node)) {
                const body = ts.isBlock(node.statement) ? node.statement : ts.factory.createBlock([node.statement]);
                const transformedBody = body.statements.map(visitNode).join('\n');

                return `for (${visitNode(node.initializer!)}; ${visitNode(node.condition!)}; ${visitNode(node.incrementor!)}) {${transformedBody}}`;
            }
                // else if (ts.isVariableDeclaration(node)) {
                //     const variableName = node.name.getText();
                //     const variableType = getTypeOfNode(node);
                //
                //     // Convertir le type TypeScript en LeekScript
                //     const leekScriptType = convertToLeekScriptType(variableType);
                //
                //     return `var ${variableName}: ${leekScriptType} = ${visitNode(node.initializer!)};`;
                // } else if (ts.isBinaryExpression(node)) {
                //     const left = visitNode(node.left);
                //     const operator = node.operatorToken.getText();
                //     const right = visitNode(node.right);
                //
                //     return `${left} ${operator} ${right}`;
                // } else if (ts.isNumericLiteral(node) || ts.isStringLiteral(node)) {
                //     return node.getText();
                // } else if (ts.isNewExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === 'Map') {
                //     // Gérer la déclaration de Map
                //     return 'new Map()';
            // }
            else if (ts.isStringLiteral(node)) {
                return node.getText();
            } else if (ts.isToken(node)) {
                return node.getText();
            } else if (ts.isIdentifier(node)) {
                return node.getText();
            } else if (ts.isExpression(node)) {
                return node.getText();
            }  else if (ts.isExpressionStatement(node)) {
                return node.getText();
            } else {
                console.log("XXXXXX", getKind(node), node.getText());
            }

            return '';
        }

        function getTypeOfNode(node: ts.Node): string {
            const type = typeChecker.getTypeAtLocation(node);
            return typeChecker.typeToString(type);
        }

        function getTypeOfExpression(expression: ts.Expression): string {
            const type = typeChecker.getContextualType(expression);
            return type ? typeChecker.typeToString(type) : "nop";
        }

        function getTypeOfSymbol(expression: ts.Expression) {
            const type = typeChecker.getSymbolAtLocation(expression);
            console.log(type)
        }

        function formatType(node: ts.TypeNode | ts.Node) {
            if (ts.isArrayTypeNode(node)) {
                return `Array<${formatType(node.elementType)}>`;
            }

            if (ts.isFunctionTypeNode(node) || ts.isArrowFunction(node)) {
                let type = node.parameters.map(p => p.type).map(t => {
                    return t ? formatType(t) : "any";
                }).join(", ");

                return `Function<${type} => ${node.type ? formatType(node.type) : "void"}>`;
            }

            if (node.getChildCount()) {
                return node.getChildren().map(child => formatType(child)).join("");
            }


            if (node.getText() === "number") {
                return "real";
            }

            if (node.getText() === "undefined") {
                return "null";
            }

            if (["(", ")"].includes(node.getText())) {
                return "";
            }

            return node.getText();
        }

        function getKind(node: ts.Node) {
            for (let enumMember in ts.SyntaxKind) {
                if (ts.SyntaxKind[enumMember] === ts.SyntaxKind[node.kind]) {
                    return ts.SyntaxKind[enumMember];
                }
            }
            return "";
        }

        return sourceFile.statements.map(visitNode).join('\n');
    }


    const tsCode =
        `
    let toto = 1;
    const ttt = (a: Map<string, (undefined | number)[]>): string => "5";
    let ddd: (a: undefined, b: Map<string, (undefined | number)[]>) => string = (a: undefined, b) => "5";
    let myMap: Map<string, (undefined | number)[]> = new Map<string, number[]>();
    for (let i = 0; i < 5; i++) {
        myMap.set(\`key\${i}\`, i);
    }
    abstract class Test {
    
    }
`;

    const leekScriptCode = transformToLeekScript(tsCode);

    console.log(`
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////    
`);


    console.log(leekScriptCode);
*/


    const api: API = new API();

    await api.login();

    if(!process.env.ABSOLUTE_PATH_TO_SOURCES) {
        console.error("Aucun path vers les sources n'a été fournis")
    }
    let code = concatFile(process.env.ABSOLUTE_PATH_TO_SOURCES!, [process.env.ABSOLUTE_PATH_TO_SOURCES!]);
    code = refactoEnum(code);

    if(process.env.PRINT_TO_CONSOLE) {
        // console.log(code);
    }

    if (process.env.ENABLE_SAVE && process.env.FILE_NAME) {
        let rootFileId = await api.getAiId(process.env.FILE_NAME);

        for(let i=0; i<30; i++) {
            if (rootFileId >= 0) {
                if(i % 1 === 0) {

                    await new Promise((resolve) => {
                        setTimeout(resolve, 25);
                    });
                }
                await api.updateCodeAI(rootFileId, code);
            }
        }
    }

};

main().then();
