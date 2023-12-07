import fs from "fs";
import processFile from "./processFile";
import nodePath from "node:path";

const concatFile = (path: string, filesIncluded: string[]) => {
    let code = fs.readFileSync(`${path}`, {encoding: "utf8"});

    code = processFile(code);

    code.match(/import [\s\S]*?;/g)?.forEach(importStatement => {

        if (/\.\//g.test(importStatement)) {
            importStatement = importStatement.replaceAll('\'', '\"');

            const newPath = nodePath.join(path.substring(0, path.lastIndexOf("\\")), importStatement.substring(importStatement.lastIndexOf("\".") + 1, importStatement.lastIndexOf("\";"))) + ".ts";

            if (filesIncluded.includes(newPath)) {
                code = code.replace(`${importStatement}\r\n`, "");
            } else {
                if (newPath.search("globaux") === -1) {
                    filesIncluded.push(newPath);
                    code = code.replace(importStatement, concatFile(newPath, filesIncluded));
                } else {
                    code = code.replace(`${importStatement}\r\n`, "");
                }
            }
        } else {
            code = code.replace(`${importStatement}\r\n`, "");
        }
    });

    return code;
};

export default concatFile;
