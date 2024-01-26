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

export const typeToNode = (type: ts.Type, typechecker: ts.TypeChecker) => {
    let name = type.symbol?.name ?? '';

    if (type.isUnion()) {
        return type.types.map(t => typeToNode(t, typechecker)).join(' | ');
    }

    if (!name) {
        name = typechecker.typeToString(type);
    }

    if (name === 'undefined') {
        return 'null';
    }

    if (name === 'number') {
        return 'real';
    }

    if (name === 'Array') {
        return `Array<${typeToNode((type as ts.TypeReference).typeArguments![0], typechecker)}>`;
    }

    let typeArguments = '';
    if ((type as ts.TypeReference).typeArguments?.length) {
        typeArguments = `<${(type as ts.TypeReference).typeArguments!.map(typeArgument => typeToNode(typeArgument, typechecker)).join(', ')}>`;
    }

    if (type.isNumberLiteral()) {
        return 'real';
    }

    if (type.isStringLiteral()) {
        return 'string';
    }

    return `${name}${typeArguments}`;
};
