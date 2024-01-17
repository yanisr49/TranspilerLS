import API from './request';
import {AI, Folder, isFolder} from './treeStructure';

export async function initData(api: API, fileName: string, sourcesPath: string, allFilePaths: string[]) {
    // Récupère le dossier root, le créer si il n'existe pas
    const sourceFolder = await api.getFarmerTreeStructure(fileName);

    for (const f of allFilePaths) {
        await updateTreeStructure(api, f, sourceFolder);
    }

    await deleteOutdatedRessources(api, sourceFolder.folders[0]);

    console.log('fini');
}

export async function updateTreeStructure(api: API, path: string, sourceFolder: Folder) {
    let folder = sourceFolder;
    folder.toBeDeleted = false;
    const pathParts = path.split('\\');

    for (const pathPart of pathParts) {
        if (pathPart === pathParts[pathParts.length - 1]) {
            if (!folder.ais.some(f => f.name === pathPart)) {
                // Créer le fichier
                const newFile = await api.createFile(pathPart, folder);
                folder.ais.push(newFile);
            } else {
                const ai = folder.ais.find(ai => ai.name === pathPart);
                if (ai) {
                    ai.toBeDeleted = false;
                }
            }
        } else if (!folder.folders.some(f => f.name === pathPart)) {
            // Créer le dossier
            const newFolder = await api.createFolder(pathPart, folder.id);
            folder.folders.push(newFolder);
            folder = newFolder;
        } else {
            // on passe au prochain
            folder = folder.folders.find(f => f.name === pathPart)!;
            folder.toBeDeleted = false;
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
