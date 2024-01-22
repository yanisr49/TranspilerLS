import ts from 'typescript';
import {typeMapper} from './mapper/typeMapping';
import {variableMapper} from './mapper/variableMapping';
import {statementMapper} from './mapper/statementMapping';
import {classMapper} from './mapper/classMapping';
import {expressionMapper} from './mapper/expressionMapping';
import {tokenMapper} from './mapper/tokenMapping';
import {getKind} from './utils/utils';
import {leftoversMapper} from './mapper/leftoversMapper';
import API from '../lsCommunications/request';
import path from 'path';
import {AI, Folder} from '../lsCommunications/treeStructure';

export const createTranspilerProgram = (tsconfigPath: string, sourcePath: string) => {
    sourcePath = path.normalize(sourcePath).split('\\').slice(0, -1).join('\\');

    // Read the TypeScript configuration file
    const config = ts.readConfigFile(tsconfigPath, ts.sys.readFile).config;

    // Parse the configuration to get file names, options and project references
    const parseConfigHost: ts.ParseConfigFileHost = {
        useCaseSensitiveFileNames: true,
        readDirectory: ts.sys.readDirectory,
        fileExists: ts.sys.fileExists,
        readFile: ts.sys.readFile,
        getCurrentDirectory: ts.sys.getCurrentDirectory,
        onUnRecoverableConfigFileDiagnostic: console.error,
    };
    const parsed = ts.parseJsonConfigFileContent(config, parseConfigHost, sourcePath);

    // Create the program
    return ts.createProgram({
        rootNames: parsed.fileNames,
        options: parsed.options,
        projectReferences: parsed.projectReferences,
    });
};

export const initData = async (api: API) => {
    console.log('Start init data ...');

    if (!process.env.DIR_NAME) {
        throw new Error("Veuillez spécifier un nom de dossier dans le fichier d'environment");
    }
    if (!process.env.TS_CONFIG_PATH) {
        throw new Error("Veuillez spécifier le chemin absolu du fichier tsconfig.json dans le fichier d'environment");
    }
    if (!process.env.ABSOLUTE_PATH_TO_SOURCES) {
        throw new Error("Veuillez spécifier le chemin absolut du dossier contenant les sources à transpiler dans le fichier d'environment");
    }

    const program = createTranspilerProgram(process.env.TS_CONFIG_PATH, process.env.ABSOLUTE_PATH_TO_SOURCES);
    const typeChecker = program.getTypeChecker();

    const sourceFolder = await api.getFarmerTreeStructure(process.env.DIR_NAME);

    for (const sourceFile of program.getSourceFiles()) {
        if (path.normalize(sourceFile.fileName).startsWith(path.normalize(process.env.ABSOLUTE_PATH_TO_SOURCES!))) {
            const ai = await createFileAndFolders(api, path.relative(process.env.ABSOLUTE_PATH_TO_SOURCES, sourceFile.fileName), sourceFolder);
            console.log(`Transpilation du fichier ${path.relative(process.env.ABSOLUTE_PATH_TO_SOURCES, sourceFile.fileName)}`);
            await api.saveFile(ai!, transpile(sourceFile));
        }
    }

    await deleteOutdatedFilesAndFolders(api, sourceFolder);

    console.log('Init data over !');
    return sourceFolder;
};

export const transpileFile = async (filepath: string) => {
    console.log(`Transpiling file ${filepath}`);

    if (!process.env.DIR_NAME) {
        throw new Error("Veuillez spécifier un nom de dossier dans le fichier d'environment");
    }
    if (!process.env.TS_CONFIG_PATH) {
        throw new Error("Veuillez spécifier le chemin absolu du fichier tsconfig.json dans le fichier d'environment");
    }
    if (!process.env.ABSOLUTE_PATH_TO_SOURCES) {
        throw new Error("Veuillez spécifier le chemin absolut du dossier contenant les sources à transpiler dans le fichier d'environment");
    }

    const program = createTranspilerProgram(process.env.TS_CONFIG_PATH, process.env.ABSOLUTE_PATH_TO_SOURCES);
    const typeChecker = program.getTypeChecker();

    for (const sourceFile of program.getSourceFiles()) {
        if (path.relative(process.env.ABSOLUTE_PATH_TO_SOURCES, sourceFile.fileName) === path.normalize(filepath)) {
            return transpile(sourceFile);
        }
    }

    throw new Error('Un problème est survenu !!! (1)');
};

/**
 * Creates files and folders at a given destination path using the provided API.
 *
 * @param {API} api - The API used to create files and folders.
 * @param {string} filepath - The destination file or folder path.
 * @param {Folder} sourceFolder - The source folder where the file or folder will be created.
 * @returns {Promise<void>} - A promise that resolves once the files and folders are created.
 */
const createFileAndFolders = async (api: API, filepath: string, sourceFolder: Folder): Promise<AI | undefined> => {
    let currFolder = sourceFolder;
    const pathSplits = filepath.split('\\');
    let ai: AI | undefined = undefined;

    while (pathSplits.length) {
        const pathSplit: string = pathSplits.shift()!;

        if (pathSplits.length) {
            // C'est un dossier
            let folder = currFolder.folders.find(f => f.name === pathSplit);
            if (!folder) {
                folder = await api.createFolder(pathSplit, currFolder.id);
                currFolder.folders.push(folder);
            }

            folder.toBeDeleted = false;
            currFolder = folder;
        } else {
            // C'est un fichier
            ai = currFolder.ais.find(ai => ai.name === pathSplit);

            if (!ai) {
                ai = await api.createFile(pathSplit, currFolder);
                currFolder.ais.push(ai);
            }

            ai.toBeDeleted = false;
        }
    }

    return ai;
};

/**
 * Deletes outdated files and folders recursively within the given folder using the provided API.
 * @param {API} api - The API object used to delete files and folders.
 * @param {Folder} folder - The root folder from which to start deleting.
 * @returns {Promise} - A promise that resolves when all outdated files and folders have been deleted.
 */
const deleteOutdatedFilesAndFolders = async (api: API, folder: Folder): Promise<any> => {
    for (const f of folder.folders) {
        if (f.toBeDeleted) {
            await api.deleteFolder(f);
        } else {
            await deleteOutdatedFilesAndFolders(api, f);
        }
    }

    for (const ai of folder.ais) {
        if (ai.toBeDeleted) {
            await api.deleteFile(ai);
        }
    }
};

const transpile = (sourceFile: ts.SourceFile) => {
    const visitNode = (node: ts.Node): string => {
        if (node.getText().includes('undefined')) {
            // console.log(getKind(node), node.getText());
        }

        let result: string | undefined;

        for (const func of [tokenMapper, typeMapper, variableMapper, expressionMapper, classMapper, statementMapper, leftoversMapper]) {
            result = func(node, sourceFile, visitNode);
            if (result) {
                break;
            }
        }

        return result ?? `TODO\n\t${getKind(node)} ===> ${node.getText()}\nFIN TODO`;
    };

    return sourceFile.statements.map(visitNode).join('');
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
                    await api.deleteFolder(currFolder);
                }
            } else {
                if (pathSplits.length) {
                    currFolder = currFolder.folders.find(f => f.name === pathSplit);

                    if (!currFolder) {
                        break;
                    }
                } else {
                    let ai = currFolder.ais.find(ai => ai.name === pathSplit);

                    if (action.action === 'unlink' && ai) {
                        await api.deleteFolder(currFolder);
                    } else if (action.action === 'save') {
                        if (!ai) {
                            ai = await api.createFile(pathSplit!, currFolder);
                        }

                        await api.saveFile(ai, await transpileFile(relativePath));
                    }
                }
            }
        }
    }
};
