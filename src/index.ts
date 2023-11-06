import API from "./transpiler/request";
import "dotenv/config";
import concatFile from "./transpiler/concatFiles";
import {refactoEnum} from "./transpiler/processFile";

const main = async () => {

    const api: API = new API();

    await api.login();

    if(!process.env.ABSOLUTE_PATH_TO_SOURCES) {
        console.error("Aucun path vers les sources n'a été fournis")
    }
    let code = concatFile(process.env.ABSOLUTE_PATH_TO_SOURCES!, [process.env.ABSOLUTE_PATH_TO_SOURCES!]);
    code = refactoEnum(code);

    if(process.env.PRINT_TO_CONSOLE) {
        console.log(code);
    }

    if (process.env.ENABLE_SAVE && process.env.FILE_NAME) {
        let rootFileId = await api.getAiId(process.env.FILE_NAME);

        if (rootFileId >= 0) {
            await api.updateCodeAI(rootFileId, code);
        }
    }
};

main().then();
