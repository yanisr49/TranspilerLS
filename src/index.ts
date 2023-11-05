import API from "./transpiler/request";
import "dotenv/config";
import concatFile from "./transpiler/concatFiles";
import {refactoEnum} from "./transpiler/processFile";

const main = async () => {

    const api: API = new API();

    await api.login();

    const path = ".\\src\\editor\\main.ts";
    let code = concatFile(path, [path]);
    code = refactoEnum(code);
    console.log(code);

    if (process.env.ENABLE_SAVE && process.env.FILE_NAME) {
        let rootFileId = await api.getAiId(process.env.FILE_NAME);

        if (rootFileId >= 0) {
            await api.updateCodeAI(rootFileId, code);
        }
    }
};

main().then();
