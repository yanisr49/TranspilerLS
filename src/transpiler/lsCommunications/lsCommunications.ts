import API from './request';
import {AI, Folder, isFolder} from './treeStructure';
import path from 'path';
import {transformToLeekScript} from '../transpiler/transpiler';
import {Context} from '../transpiler/utils/context';

export async function initData(api: API, fileName: string, allFilePaths: string[]) {
    console.log('Start init data ...');
    // Récupère le dossier root, le créer si il n'existe pas
    const sourceFolder = await api.getFarmerTreeStructure(fileName);

    for (const f of allFilePaths) {
        await updateTreeStructure(api, f, sourceFolder);
    }

    await deleteOutdatedRessources(api, sourceFolder);

    console.log('End init data !');

    return sourceFolder;
}

export async function updateTreeStructure(api: API, filepath: string, sourceFolder: Folder) {
    let currentFolder = sourceFolder;
    currentFolder.toBeDeleted = false;
    const pathParts = filepath.split('\\');

    for (const pathPart of pathParts) {
        if (pathPart === pathParts[pathParts.length - 1]) {
            let ai = currentFolder.ais.find(ai => ai.name === pathPart);
            if (ai) {
                ai.toBeDeleted = false;
            } else {
                // Créer le fichier
                ai = await api.createFile(pathPart, currentFolder);
                currentFolder.ais.push(ai);
            }
        } else if (!currentFolder.folders.some(f => f.name === pathPart)) {
            // Créer le dossier
            const newFolder = await api.createFolder(pathPart, currentFolder.id);
            currentFolder.folders.push(newFolder);
            currentFolder = newFolder;
        } else {
            // on passe au prochain
            currentFolder = currentFolder.folders.find(f => f.name === pathPart)!;
            currentFolder.toBeDeleted = false;
        }
    }
}

export async function saveFileWithFolderPath(api: API, filePath: string, sourceFolder: Folder, sourcesPath: string, context: Context) {
    const pathParts = filePath.split('\\');
    let currentFolder = sourceFolder;

    for (const pathPart of pathParts) {
        if (pathPart === pathParts[pathParts.length - 1]) {
            // C'est une partie de fichier
            let existingFile = currentFolder.ais.find(f => f.name === pathPart);
            if (!existingFile) {
                // Créer le fichier seulement s'il n'existe pas
                existingFile = await api.createFile(pathPart, currentFolder);
                currentFolder.ais.push(existingFile);
            }

            await api.saveFile(existingFile, transformToLeekScript(path.join(sourcesPath, filePath), context));
        } else {
            // C'est une partie de dossier
            let folder = currentFolder.folders.find(f => f.name === pathPart);

            if (!folder) {
                // Créer le dossier seulement s'il n'existe pas
                folder = await api.createFolder(pathPart, currentFolder.id);
                currentFolder.folders.push(folder);
            }

            currentFolder = folder;
        }
    }
}

export async function deleteOutdatedRessources(api: API, ressource: Folder | AI) {
    if (isFolder(ressource)) {
        if (ressource.toBeDeleted) {
            await api.deleteFolder(ressource);
        } else {
            ressource.ais.forEach(ai => deleteOutdatedRessources(api, ai));
            ressource.folders.forEach(f => deleteOutdatedRessources(api, f));
        }
    } else {
        if (ressource.toBeDeleted) {
            await api.deleteFile(ressource);
        }
    }
}
