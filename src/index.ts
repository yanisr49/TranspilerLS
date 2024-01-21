import 'dotenv/config';
import {getAllFiles, watchDirectory} from './transpiler/utils';
import API from './transpiler/lsCommunications/request';
import {initData} from './transpiler/lsCommunications/lsCommunications';
import {Folder} from './transpiler/lsCommunications/treeStructure';
import {Context, processFolder} from './transpiler/transpiler/utils/context';

const main = async () => {
    const fileName = process.env.FILE_NAME;
    const sourcesPath = process.env.ABSOLUTE_PATH_TO_SOURCES;

    if (!fileName || !sourcesPath) {
        throw Error('Aïe Aïe Aïe');
    }

    const api: API = new API();
    await api.login();
    await api.setInterceptor();

    const allFilePaths = getAllFiles(sourcesPath, sourcesPath, []);

    const sourceFolder: Folder = await initData(api, fileName, allFilePaths);

    let ai = sourceFolder.ais.find(ai => ai.name === 'includes');
    if (!ai) {
        ai = await api.createFile('includes', sourceFolder);
    }
    await api.saveFile(ai, allFilePaths.map(p => `include('${p}');`).join('\n'));

    const context: Context = {
        classes: [],
        interfaces: [],
        types: [],
        enums: [],
    };

    processFolder(sourcesPath, allFilePaths, context);
    watchDirectory(api, sourcesPath, sourceFolder, context);

    // console.log(transformToLeekScript(path.join(sourcesPath, 'entities/AbstractEntity.ts')));
    // main.ts
};

main().then();
