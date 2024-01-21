import ts from 'typescript';
import fs from 'fs';
import path from 'path';

export interface Context {
    classes: string[];
    interfaces: string[];
    types: string[];
    enums: string[];
}

function visit(node: ts.Node, collection: string[], isTargetNode: (node: ts.Node) => boolean) {
    if (
        (ts.isClassDeclaration(node) || ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node) || ts.isEnumDeclaration(node)) &&
        isTargetNode(node) &&
        node.name &&
        ts.isIdentifier(node.name)
    ) {
        collection.push(node.name!.text);
    }
    ts.forEachChild(node, child => visit(child, collection, isTargetNode));
}

function extractDeclarations(sourceFile: ts.SourceFile, context: Context) {
    visit(sourceFile, context.classes, ts.isClassDeclaration);
    visit(sourceFile, context.interfaces, ts.isInterfaceDeclaration);
    visit(sourceFile, context.types, ts.isTypeAliasDeclaration);
    visit(sourceFile, context.enums, ts.isEnumDeclaration);
}

export function processFolder(folderPath: string, tsFiles: string[], context: Context) {
    for (const file of tsFiles) {
        const sourceCode = fs.readFileSync(path.join(folderPath, file), 'utf-8');
        const sourceFile = ts.createSourceFile(file, sourceCode, ts.ScriptTarget.Latest, true);

        extractDeclarations(sourceFile, context);
    }
}
