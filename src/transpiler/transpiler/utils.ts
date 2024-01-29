/*
export const createTranspilerProgram = () => {
    const sourcePath = path.normalize(process.env.TS_CONFIG_PATH!).split('\\').slice(0, -1).join('\\');

    // Read the TypeScript configuration file
    const config = ts.readConfigFile(process.env.TS_CONFIG_PATH!, ts.sys.readFile).config;

    // Parse the configuration to get file names, options and project references
    const parseConfigHost: ts.ParseConfigFileHost = {
        useCaseSensitiveFileNames: true,
        readDirectory: ts.sys.readDirectory,
        fileExists: ts.sys.fileExists,
        readFile: ts.sys.readFile,
        getCurrentDirectory: ts.sys.getCurrentDirectory,
        onUnRecoverableConfigFileDiagnostic: console.error,
    };
    return ts.parseJsonConfigFileContent(config, parseConfigHost, sourcePath);
};


const deleteOutdatedFilesAndFolders = async (api: API, folder: Folder): Promise<any> => {
    for (const f of folder.folders.filter(f => f.toBeDeleted)) {
        await api.deleteFolder(f);
        folder.folders = folder.folders.filter(folder => folder !== f);
    }
    folder.folders = folder.folders.filter(f => !f.toBeDeleted);

    for (const f of folder.folders) {
        await deleteOutdatedFilesAndFolders(api, f);
    }

    for (const ai of folder.ais) {
        if (ai.toBeDeleted) {
            await api.deleteFile(ai);
            folder.ais = folder.ais.filter(aiNode => aiNode !== ai);
        }
    }
};

export interface Action {
    filename: string;
    action: 'save' | 'unlink' | 'unlinkDir';
}
export const checkModification = (event: any, path: string, actions: Action[]) => {
    let action: Action | undefined;
    switch (event) {
        case 'add':
        case 'change':
            action = actions.find(a => a.filename === path);
            if (action) {
                action.action = 'save';
            } else {
                actions.push({filename: path, action: 'save'});
            }
            break;
        case 'unlink':
            if (actions.some(a => path.startsWith(a.filename) && path !== a.filename)) {
                break;
            }
            action = actions.find(a => a.filename === path);
            if (action) {
                action.action = 'unlink';
            } else {
                actions.push({filename: path, action: 'unlink'});
            }
            break;
        case 'unlinkDir':
            actions = actions.filter(a => !a.filename.startsWith(path));

            action = actions.find(a => a.filename === path);
            if (action) {
                action.action = 'unlinkDir';
            } else {
                actions.push({filename: path, action: 'unlinkDir'});
            }
            break;
    }

    return actions;
};

export const updateModifications = async (api: API, actions: Action[], sourceFolder: Folder) => {
    for (const action of actions) {
        let currFolder: Folder | undefined = sourceFolder;
        const relativePath = path.relative(process.env.ABSOLUTE_PATH_TO_SOURCES!, action.filename);
        const pathSplits = relativePath.split('\\');

        while (pathSplits.length) {
            const pathSplit = pathSplits.shift();

            if (action.action === 'unlinkDir') {
                if (pathSplits.length) {
                    currFolder = currFolder.folders.find(f => f.name === pathSplit);

                    if (!currFolder) {
                        break;
                    }
                } else {
                    currFolder.toBeDeleted = true;
                }
            } else {
                if (pathSplits.length) {
                    currFolder = currFolder.folders.find(f => f.name === pathSplit);

                    if (!currFolder) {
                        throw new Error(`Le dossier ${pathSplit} est introuvable`);
                    }
                } else {
                    let ai = currFolder.ais.find(ai => ai.name === pathSplit);

                    if (action.action === 'unlink' && ai) {
                        ai.toBeDeleted = true;
                    } else if (action.action === 'save') {
                        if (!ai) {
                            ai = await api.createFile(pathSplit!, currFolder);
                            currFolder.ais.push(ai);
                        }

                        await api.saveFile(ai, await transpileFile(relativePath));
                    }
                }
            }
        }

        await deleteOutdatedFilesAndFolders(api, sourceFolder);

        let runFile = sourceFolder.ais.find(ai => ai.name === 'run');
        if (!runFile) {
            runFile = await api.createFile('run', sourceFolder);
            sourceFolder.ais.push(runFile);
        }
        await api.saveFile(runFile, constructIncludesFile(sourceFolder).join('\n'));
    }
};

const constructIncludesFile = (sourceFolder: Folder, filePath = '', includes: string[] = []) => {
    if (sourceFolder.folders.length) {
        includes.push(...sourceFolder.folders.filter(folder => !folder.toBeDeleted).flatMap(folder => constructIncludesFile(folder, `${folder.name}/`)));
    }

    sourceFolder.ais.filter(ai => !ai.toBeDeleted && (filePath !== '' || ai.name !== 'includes')).forEach(ai => includes.push(`include('${filePath}${ai.name}');`));

    return includes;
};
*/
