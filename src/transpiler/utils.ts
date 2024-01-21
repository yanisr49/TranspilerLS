import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import chokidar from 'chokidar';
import API from './lsCommunications/request';
import {debounce} from 'lodash';
import {Folder} from './lsCommunications/treeStructure';
import {deleteOutdatedRessources, saveFileWithFolderPath} from './lsCommunications/lsCommunications';
import {Context} from './transpiler/utils/context';

dotenv.config();

interface Action {
    filename: string;
    action: 'add' | 'unlink' | 'change' | 'addDir' | 'unlinkDir';
}

/**
 * Watches a directory for changes and logs the actions taken.
 * @param {API} api - The API object.
 * @param {string} directoryPath - The path of the directory to watch.
 * @param {Folder} sourceFolder - The source folder object.
 * @return {void}
 */
export function watchDirectory(api: API, directoryPath: string, sourceFolder: Folder, context: Context): void {
    let actions: Action[] = [];

    const processDebouncedActions = debounce(async () => {
        for (const action of actions) {
            const actionRelativePath = path.relative(directoryPath, action.filename);
            if (action.action === 'add') {
                await saveFileWithFolderPath(api, actionRelativePath, sourceFolder, directoryPath, context);
            } else if (action.action === 'unlink') {
                setFileFromPathForDeletion(sourceFolder, actionRelativePath);
                await deleteOutdatedRessources(api, sourceFolder);
            } else if (action.action === 'unlinkDir') {
                setFolderFromPathForDeletion(sourceFolder, actionRelativePath);
                await deleteOutdatedRessources(api, sourceFolder);
            }
        }
        actions = [];
    }, 250);

    chokidar.watch(directoryPath, {ignored: /(^|[/\\])\../}).on('all', (event, path) => {
        let action: Action | undefined;
        switch (event) {
            case 'add':
            case 'change':
                action = actions.find(a => a.filename === path);
                if (action) {
                    action.action = 'add';
                } else {
                    actions.push({filename: path, action: 'add'});
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

        processDebouncedActions();
    });
}

/**
 * Returns an array containing the paths of all files within the specified directory and its subdirectories.
 *
 * @param {string} sourceDirPath - The path of the source directory.
 * @param {string} dirPath - The path of the current directory to search for files.
 * @param {string[]} arrayOfFiles - An optional array to store the file paths. If not provided, a new array will be created.
 * @return {string[]} - An array containing the paths of all files within the specified directory and its subdirectories.
 */
export function getAllFiles(sourceDirPath: string, dirPath: string, arrayOfFiles: string[]): string[] {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(file => {
        if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
            arrayOfFiles = getAllFiles(sourceDirPath, path.join(dirPath, file), arrayOfFiles);
        } else {
            arrayOfFiles.push(path.relative(sourceDirPath, path.join(dirPath, file)));
        }
    });

    return arrayOfFiles;
}

/**
 * Sets the "toBeDeleted" flag to true for the folder specified by the given path.
 *
 * @param {Folder} sourceFolder - The source folder to start the search from.
 * @param {string} filename - The path of the folder to be marked for deletion.
 */
function setFolderFromPathForDeletion(sourceFolder: Folder, filename: string) {
    let folder = sourceFolder;
    const pathParts = filename.split('\\');

    for (const pathPart of pathParts) {
        const matchingFolder = folder.folders.find(f => f.name === pathPart);
        if (matchingFolder) {
            folder = matchingFolder;
            if (pathParts[pathParts.length - 1] === pathPart) {
                folder.toBeDeleted = true;
            }
        }
    }
}

function setFileFromPathForDeletion(sourceFolder: Folder, filename: string) {
    let folder = sourceFolder;
    const pathParts = filename.split('\\');

    for (const pathPart of pathParts) {
        if (pathParts[pathParts.length - 1] === pathPart) {
            // C'est la dernière partie du chemin donc c'est un fichier
            const file = folder.ais.find(f => f.name === pathPart);
            if (file) {
                file.toBeDeleted = true;
            }
        } else {
            // Ce n'est pas la dernière partie du chemin donc c'est un dossier
            folder = folder.folders.find(f => f.name === pathPart) || folder;
        }
    }
}

/**
 * Sleeps for the given amount of time.
 *
 * @param {number} time - The amount of time to sleep, in milliseconds.
 * @return {Promise} - A Promise that resolves after the specified time has elapsed.
 */
export function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
