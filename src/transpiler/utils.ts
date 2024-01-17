import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import chokidar from 'chokidar';
import API from './lsCommunications/request';
import {debounce} from 'lodash';

dotenv.config();

interface Action {
    filename: string;
    action: 'add' | 'unlink' | 'change' | 'addDir' | 'unlinkDir';
}

/**
 * Watches a directory for changes and logs the actions taken.
 * @param {API} api - The API object.
 * @param {string} directoryPath - The path of the directory to watch.
 * @return {void}
 */
export function watchDirectory(api: API, directoryPath: string): void {
    let actions: Action[] = [];

    const test = debounce(() => {
        console.log(actions);
        actions = [];
    }, 1000);

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

        test();
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
