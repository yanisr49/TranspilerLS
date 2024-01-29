import path from 'path';

export interface AI {
    id: number;
    name: string;
    valid?: number;
    version?: number;
    strict?: false;
    total_lines?: number;
    total_chars?: number;
    entrypoint?: false;
    toBeDeleted: boolean;
}

export interface Folder {
    id: number;
    name: string;
    ais: AI[];
    folders: Folder[];
    toBeCreated: boolean;
    toBeDeleted: boolean;
    path: string;
}

export const isFolder = (folder): folder is Folder => {
    return 'ais' in folder;
};

export const addChildFolders = (folder: Folder, foldersRaw: any) => {
    (foldersRaw as any[]).forEach(fRaw => {
        if (fRaw.folder === folder.id) {
            const newFolder: Folder = {
                id: fRaw.id,
                name: fRaw.name,
                ais: [],
                folders: [],
                toBeCreated: false,
                toBeDeleted: true,
                path: path.join(folder.path, fRaw.name),
            };

            folder.folders.push(newFolder);
            addChildFolders(newFolder, foldersRaw);
        }
    });
};

export const addChildAIs = (folder: Folder, ais: any) => {
    (ais as any[]).forEach(ai => {
        if (ai.folder === folder.id && !folder.ais.some(a => a.id === ai.id)) {
            const newAI: AI = {
                id: ai.id,
                name: ai.name,
                valid: ai.valid,
                version: ai.version,
                strict: ai.strict,
                total_lines: ai.total_lines,
                total_chars: ai.total_chars,
                entrypoint: ai.entrypoint,
                toBeDeleted: true,
            };

            folder.ais.push(newAI);
            folder.folders.forEach(f => addChildAIs(f, ais));
        }
    });
};
