export interface AI {
    id: number;
    name: string;
    valid?: number;
    version?: number;
    strict?: false;
    total_lines?: number;
    total_chars?: number;
    entrypoint?: false;
    includes_ais_ids?: number[];
    toBeDeleted: boolean;
}

export interface Folder {
    id: number;
    name: string;
    ais: AI[];
    folders: Folder[];
    toBeDeleted: boolean;
}

export const isFolder = (folder): folder is Folder => {
    return 'ais' in folder;
};

export const addChildFolders = (folder: Folder, folders: any) => {
    (folders as any[]).forEach(f => {
        if (f.folder === folder.id) {
            const newFolder: Folder = {
                id: f.id,
                name: f.name,
                ais: [],
                folders: [],
                toBeDeleted: true,
            };

            folder.folders.push(newFolder);
            addChildFolders(newFolder, folders);
        }
    });
};

export const addChildAIs = (folder: Folder, ais: any) => {
    (ais as any[]).forEach(ai => {
        if (ai.folder === folder.id) {
            const newAI: AI = {
                id: ai.id,
                name: ai.name,
                valid: ai.valid,
                version: ai.version,
                strict: ai.strict,
                total_lines: ai.total_lines,
                total_chars: ai.total_chars,
                entrypoint: ai.entrypoint,
                includes_ais_ids: ai.includes_ais_ids,
                toBeDeleted: true,
            };

            folder.ais.push(newAI);
            folder.folders.forEach(f => addChildAIs(f, ais));
        }
    });
};
