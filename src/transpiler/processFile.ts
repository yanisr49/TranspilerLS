import fs from 'fs';
import 'dotenv/config';

export default (code: string) => {
  code = refactoAbstract(code);
  code = refactoType(code);
  code = refactoInterval(code);
  code = mapKeywords(code);
  code = refactoForInLoop(code);
  code = refactoPush(code);
  code = refactoTemplateLiterals(code);
  code = refactoConsoleLog(code);

  return code;
};

const keywordsToMap = [
  ['abstract ', ''],
  ['const ', 'var '],
  ['let ', 'var '],
  ['export var ', 'global '],
  ['export ', ''],
  ['===', '=='],
  ['!==', '!='],
  ['! ', ' '],
  ['!.', '.'],
  ['undefined', 'null'],
  [/\.get\(([\s\S]+?)\)/g, '[$1]'],
  [/\.set\(([\s\S]+?), ([\s\S]+?)\)/g, '[$1] = $2'],
];
const mapKeywords = (code: string) => {
  keywordsToMap.forEach(map => {
    code = code.replaceAll(map[0], map[1].toString());
  });

  return code;
};

const refactoAbstract = (code: string) => {
  code.match(/.* abstract [\s\S]+?[;{]/g)?.forEach(statement => {
    if (statement.endsWith(';')) {
      code = code.replaceAll(statement, '');
    }
  });

  return code;
};

const typeToMap = [['number', 'real']];
const refactoType = (code: string) => {
  // Refacto les constructeur de Map
  code.match(/new Map<[\s\S]+?>\(\)/g)?.forEach(statement => {
    code = code.replaceAll(statement, '[:]');
  });

  // Supprime les types map des variables
  code.match(/: Map<.+?>/g)?.forEach(statement => {
    code = code.replaceAll(statement, '');
  });

  // Supprime le type des variable
  code.match(/[^ ]([!?])?: [^(){}=,;]+/g)?.forEach(typeStatement => {
    code = code.replace(typeStatement.substring(1), '');
  });

  // Renomme les types qui n'existe pas en LS (type générique)
  code.match(/<[^(){}=,]+?>/g)?.forEach(typeStatement => {
    let newTypeStatement = typeStatement;
    typeToMap.forEach(type => {
      newTypeStatement = typeStatement.replaceAll(type[0], type[1]);
    });
    code = code.replaceAll(typeStatement, newTypeStatement);
  });

  //  const test: Map<Map<number, string> CAMP_TYPE> = ...

  return code;
};

// Refacto interval : [...Array(612).keys()] en [0..612]
const refactoInterval = (code: string) => {
  code.match(/\[\.{3}Array\(\d+?\)\.keys\(\)]/g)?.forEach(statement => {
    code = code.replace(
      statement,
      `[0..${statement.substring(10, statement.indexOf(')'))}]`
    );
  });

  return code;
};

// A faire après mapKeywoards
const refactoForInLoop = (code: string) => {
  code.match(/for \(var .* of .*\) \{/g)?.forEach(statement => {
    code = code.replace(statement, statement.replace(' of ', ' in '));
  });

  return code;
};

const refactoPush = (code: string) => {
  code.match(/[a-zA-Z0-9.]+?\.push\(/g)?.forEach(statement => {
    code = code.replace(statement, 'push(' + statement.replace('.push(', ', '));
  });

  return code;
};

// Fonctionne que pour les template literals sur une seule ligne
const refactoTemplateLiterals = (code: string) => {
  code.match(/`.*`/g)?.forEach(statement => {
    if (statement.includes('${')) {
      code = code.replace(
        statement,
        statement
          .replaceAll('`', '"')
          .replaceAll('${', '" + ')
          .replaceAll('}', ' + "')
      );
    }
  });

  return code;
};

// Fonctionne que pour les console log sur une seule ligne
const refactoConsoleLog = (code: string) => {
  code.match(/console\.log\(.*\)/g)?.forEach(statement => {
    code = code.replace(
      statement,
      'debug' + statement.replaceAll(', ', ' + ", " + ').substring(11)
    );
  });

  return code;
};

export const refactoEnum = (code: string) => {
  if (!process.env.ABSOLUTE_PATH_TO_ENUMS) {
    console.error("Aucun path vers les enums sources n'a été fournis");
  }
  const enumCode = fs.readFileSync(`${process.env.ABSOLUTE_PATH_TO_ENUMS}`, {
    encoding: 'utf8',
  });
  const enums: string[] = [];

  enumCode.match(/export enum \w+? \{/g)?.forEach(enumStatement => {
    const enumName = enumStatement.substring(12, enumStatement.length - 2);
    enums.push(enumName);
    const startEnumIndex =
      enumCode.indexOf(enumStatement) + enumStatement.length;
    const endEnumIndex = enumCode.indexOf('}', startEnumIndex);
    const enumBloc = enumCode.substring(startEnumIndex, endEnumIndex);

    let i = 0;
    enumBloc.match(/[^,]+/g)?.forEach(enumLine => {
      // Remove spaces for split
      const enumLineWithoutSpaces = enumLine.replace(/\s+/g, '');

      let enumKey = enumLineWithoutSpaces;
      let enumValue = '' + i++;

      if (enumLine.includes('=')) {
        [enumKey, enumValue] = enumLineWithoutSpaces.split('=');
      }

      code = `global ${enumName}_${enumKey} = ${enumValue};\n` + code;
    });
  });

  enums.forEach(enumValue => {
    code = code.replaceAll(enumValue + '.', enumValue + '_');
  });

  return code;
};
