import ts, {SyntaxKind} from 'typescript';

export function getComments(node: ts.Node, indentLevel: string, sourceFile: ts.SourceFile) {
    const commentRanges = [...(ts.getLeadingCommentRanges(sourceFile.text, node.pos) || []), ...(ts.getTrailingCommentRanges(sourceFile.text, node.end) || [])];

    return commentRanges.map(range => sourceFile.text.substring(range.pos, range.end)).join('\n');
}

export function getLeadingWhitespace(node: ts.Node, sourceFile: ts.SourceFile): string {
    const fullStart = node.getFullStart();
    const start = node.getStart(sourceFile);
    const leadingTrivia = sourceFile.text.substring(fullStart, start);
    // Use regex to get only whitespace. This will remove any comments in the trivia
    return leadingTrivia; //.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '');
}

export function getLeadingWhitespaceInLine(node: ts.Node, sourceFile: ts.SourceFile): string {
    const start = node.getStart(sourceFile);
    const fullText = sourceFile.getFullText();
    // Find the start of the line where the node begins
    const startOfLine = fullText.lastIndexOf('\n', start);
    const leadingTrivia = fullText.substring(startOfLine + 1, start);
    // Use regex to get only whitespace. This will remove any comments in the trivia
    return leadingTrivia.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '');
}

export function mapModifier(modifiers: ts.NodeArray<ts.ModifierLike> | undefined): string {
    if (!modifiers) {
        return '';
    }

    const result = modifiers
        .filter(m => {
            switch (m.kind) {
                case SyntaxKind.AbstractKeyword:
                    return false;
                default:
                    return true;
            }
        })
        .map(m => {
            switch (m.kind) {
                case SyntaxKind.AbstractKeyword:
                case SyntaxKind.ExportKeyword:
                    return '';
                case SyntaxKind.PublicKeyword:
                case SyntaxKind.PrivateKeyword:
                case SyntaxKind.ProtectedKeyword:
                case SyntaxKind.StaticKeyword:
                    return m.getText();
                default:
                    console.log(`TODO mapModifier ${m.kind}`);
                    return `TODO mapModifier ${m.kind}`;
            }
        })
        .join(' ');

    return result ? result + ' ' : '';
}

export function getKind(node: ts.Node) {
    for (const enumMember in ts.SyntaxKind) {
        if (ts.SyntaxKind[enumMember] === ts.SyntaxKind[node.kind]) {
            return ts.SyntaxKind[enumMember];
        }
    }
    return '';
}

export const inferredTypeNameFromNode = (node: ts.Node, typeChecker: ts.TypeChecker, visitNode: (node: ts.Node) => string, type?: ts.TypeNode) => {
    const result = inferredTypeNameFromType(typeChecker.getTypeAtLocation(node), typeChecker);
    if (['__type'].includes(result) && type) {
        return visitNode(type);
    }
    return result;
};

export const inferredTypeNameFromType = (type: ts.Type, typeChecker: ts.TypeChecker) => {
    if (type?.aliasSymbol?.flags === ts.SymbolFlags.TypeAlias) {
        // Inferred alias type
        return `any /* ${type.aliasSymbol.escapedName} */`;
    }

    let name = type.symbol?.name ?? '';

    if (type.isUnion()) {
        return [...new Set(type.types.map(t => inferredTypeNameFromType(t, typeChecker)).sort((a, b) => (a === 'null' ? 1 : b === 'null' ? -1 : a - b)))].join(' | ');
    }

    if (!name) {
        name = typeChecker.typeToString(type);
    }

    if (name === 'undefined') {
        return 'null';
    }

    if (name === 'unknown') {
        return 'any';
    }

    if (name === 'number') {
        return 'any /* number */';
    }

    if (name === 'Array') {
        return `Array<${inferredTypeNameFromType((type as ts.TypeReference).typeArguments![0], typeChecker)}>`;
    }

    if (type.isNumberLiteral()) {
        return 'any /* number */';
    }

    if (type.isStringLiteral()) {
        return 'string';
    }

    if (type.isTypeParameter()) {
        name = type.getConstraint() ? inferredTypeNameFromType(type.getConstraint()!, typeChecker) : 'any';
    }

    let typeArguments = '';
    // Les types génériques sont seuelemtn autorisé sur les Map en LS
    if ((type as ts.TypeReference).typeArguments?.length && type.symbol?.escapedName === 'Map') {
        typeArguments = `<${(type as ts.TypeReference).typeArguments!.map(typeArgument => inferredTypeNameFromType(typeArgument, typeChecker)).join(', ')}>`;
    }

    return `${name}${typeArguments}`;
};

export const throwError = (message: string, node: ts.Node) => {
    const lignes = node
        .getSourceFile()
        .getText()
        .slice(0, node.pos + node.getText().split('\n')[0].length)
        .split('\n');
    const ligneNumber = lignes.length;
    const caracterNumber = lignes[ligneNumber - 1].indexOf(node.getText().split('\n')[0]);
    const filepath = node.getSourceFile().fileName;

    throw new Error(`${message}\n    at (${filepath}:${ligneNumber}:${caracterNumber}) : node.getText().split('\\n')[0]`);
};
