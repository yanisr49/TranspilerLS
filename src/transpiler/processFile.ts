import fs from "fs";

export default (code: string) => {
    code = refactoType(code);
    code = refactoInterval(code);
    code = deleteKeywords(code);
    code = mapKeywords(code);
    code = refactoForInLoop(code);
    code = refactoPush(code);
    code = refactoTemplateLiterals(code);
    code = refactoConsoleLog(code);

    return code;
}

const keywordsToRemove = [
    "abstract "
];
const deleteKeywords = (code: string) => {
    keywordsToRemove.forEach(keyword => {
        code = code.replaceAll(keyword, "");
    });
    return code;
};


const keywordsToMap = [
    ["const ", "var "],
    ["let ", "var "],
    ["export var ", "global "],
    ["export ", ""],
    ["===", "=="],
    ["!==", "!="]
];
const mapKeywords = (code: string) => {
    keywordsToMap.forEach(map => {
        code = code.replaceAll(map[0], map[1]);
    });

    return code;
};

const typeToMap = [
    ["number", "real"]
];
const refactoType = (code: string) => {
    // Supprime le type des variable
    code.match(/\w[?!]?: [\w\[\]| ]+/g)?.forEach(typeStatement => {
        code = code.replace(typeStatement.substring(1), "");
    });

    // Refacto les constructeur de Map
    code.match(/new Map<[\s\S]+?>\(\)/g)?.forEach(statement => {
        code = code.replaceAll(statement, "[:]");
    });

    // Renomme les types qui n'existe pas en LS (type générique)
    code.match(/<[\s\S]+?>/g)?.forEach(typeStatement => {
        let newTypeStatement = typeStatement;
        typeToMap.forEach(type => {
            newTypeStatement = typeStatement.replaceAll(type[0], type[1]);
        });
        code = code.replaceAll(typeStatement, newTypeStatement);
    });

    return code;
};

// Refacto interval : [...Array(612).keys()] en [0..612]
const refactoInterval = (code: string) => {
    code.match(/\[\.{3}Array\(\d+?\)\.keys\(\)]/g)?.forEach(statement => {
        code = code.replace(statement, `[0..${statement.substring(10, statement.indexOf(")"))}]`);
    });

    return code;
};

// A faire après mapKeywoards
const refactoForInLoop = (code: string) => {
    code.match(/for \(var .* of .*\) \{/g)?.forEach(statement => {
        code = code.replace(statement, statement.replace(" of ", " in "));
    });

    return code;
};

const refactoPush = (code: string) => {
    code.match(/[a-zA-Z0-9.]+?\.push\(/g)?.forEach(statement => {
        code = code.replace(statement, "push(" + statement.replace(".push(", ", "));
    });

    return code;
};

// Fonctionne que pour les template literals sur une seule ligne
const refactoTemplateLiterals = (code: string) => {
    code.match(/`.*`/g)?.forEach(statement => {
        if (statement.includes("${")) {
            code = code.replace(statement, statement.replaceAll("`", "\"").replaceAll("${", "\" + ").replaceAll("}", " + \""));
        }
    });

    return code;
};

// Fonctionne que pour les console log sur une seule ligne
const refactoConsoleLog = (code: string) => {
    code.match(/console\.log\(.*\)/g)?.forEach(statement => {
        code = code.replace(statement, "debug" + statement.replaceAll(", ", " + \", \" + ").substring(11));
    });

    return code;
};

export const refactoEnum = (code: string) => {
    let enumCode = fs.readFileSync("./src/editor/globaux/enums.ts", {encoding: "utf8"});
    const enums: string[] = [];


    enumCode.match(/export enum \w+? \{/g)?.forEach(enumStatement => {
        const enumName = enumStatement.substring(12, enumStatement.length - 2);
        enums.push(enumName);
        const startEnumIndex = enumCode.indexOf(enumName) + enumName.length + 2;
        const endEnumIndex = enumCode.indexOf("}", startEnumIndex);
        const enumBloc = enumCode.substring(startEnumIndex, endEnumIndex);

        let i = 0;
        enumBloc.match(/\n {4}\w+/g)?.forEach(enumLine => {
            const enumValue = enumLine.substring(5);

            code = `global ${enumName}_${enumValue} = ${i++};\n` + code;
        });
    });

    enums.forEach(enumValue => {
        code = code.replaceAll(enumValue + ".", enumValue + "_");
    });

    return code;
};
