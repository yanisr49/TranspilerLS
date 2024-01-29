import path from 'path';

export interface IFileFolder {
    id: number;
    name: string;
    folder: number;
}

export interface IData {
    ais: IFileFolder[];
    folders: IFileFolder[];
}

export class FileFolder {
    public id?: number;
    public name: string;
    public toBeCreated: boolean;
    public toBeDeleted: boolean;
    public parentFolder?: FolderC;

    constructor(id: number | undefined, name: string, toBeCreated: boolean, toBeDeleted: boolean, parentFolder?: FolderC) {
        this.id = id;
        this.name = name;
        this.toBeCreated = toBeCreated;
        this.toBeDeleted = toBeDeleted;
        this.parentFolder = parentFolder;
    }

    public getPath(p = '') {
        if (!this.parentFolder) {
            return p;
        }

        return this.parentFolder.getPath(path.join(this.name, p));
    }
}

export class FileC extends FileFolder {
    public toBeSaved: boolean;
    constructor(id: number | undefined, name: string, toBeCreated: boolean, toBeDeleted: boolean, toBeSaved: boolean, parentFolder?: FolderC) {
        super(id, name, toBeCreated, toBeDeleted, parentFolder);
        this.toBeSaved = toBeSaved;
    }
}

export class FolderC extends FileFolder {
    folders: FolderC[] = [];
    ais: FileC[] = [];

    constructor(id: number | undefined, name: string, toBeCreated: boolean, toBeDeleted: boolean, parentFolder?: FolderC) {
        super(id, name, toBeCreated, toBeDeleted, parentFolder);
    }

    public constructTree(data: IData) {
        data.ais.forEach(ai => {
            if (ai.folder === this.id) {
                this.ais.push(new FileC(ai.id, ai.name, false, true, false, this));
            }
        });

        data.folders.forEach(folder => {
            if (folder.folder === this.id) {
                const newFolder = new FolderC(folder.id, folder.name, false, true, this);
                newFolder.constructTree(data);
                this.folders.push(newFolder);
            }
        });
    }

    public updateTreeStructureFileToBeSaved(pathParts: string[]) {
        this.toBeDeleted = false;

        if (pathParts.length === 1) {
            const newAI = this.ais.find(ai => ai.name === pathParts[0]);
            if (newAI) {
                newAI.toBeSaved = true;
                newAI.toBeDeleted = false;
            } else {
                const newAI = new FileC(undefined, pathParts[0], true, false, true, this);
                this.ais.push(newAI);
            }
        } else {
            const newFolder = this.folders.find(folder => folder.name === pathParts[0]);
            if (newFolder) {
                newFolder.updateTreeStructureFileToBeSaved(pathParts.slice(1));
            } else {
                const newFolder = new FolderC(undefined, pathParts[0], true, false, this);
                this.folders.push(newFolder);
                newFolder.updateTreeStructureFileToBeSaved(pathParts.slice(1));
            }
        }
    }

    public updateTreeStructureDirToBeSaved(pathParts: string[]) {
        this.toBeDeleted = false;

        if (pathParts.length === 1) {
            if (!this.folders.some(folder => folder.name === pathParts[0])) {
                const newFolder = new FolderC(undefined, pathParts[0], true, false, this);
                this.folders.push(newFolder);
            }
        } else {
            const newFolder = this.folders.find(folder => folder.name === pathParts[0]);
            if (newFolder) {
                newFolder.updateTreeStructureDirToBeSaved(pathParts.slice(1));
            } else {
                const newFolder = new FolderC(undefined, pathParts[0], true, false, this);
                this.folders.push(newFolder);
                newFolder.updateTreeStructureDirToBeSaved(pathParts.slice(1));
            }
        }
    }

    public getFileFolderToBeSaved(fileFolder: FileFolder[] = []) {
        if (this.toBeCreated) {
            fileFolder.push(this);
        }

        this.folders.forEach(folder => {
            folder.getFileFolderToBeSaved(fileFolder);
        });

        this.ais.forEach(ai => {
            if (ai.toBeSaved) {
                fileFolder.push(ai);
            }
        });

        return fileFolder;
    }

    public getFileFolderToBeDeleted(fileFolder: FileFolder[] = []) {
        this.folders.forEach(folder => {
            if (folder.toBeDeleted) {
                console.log(folder.getPath());
                fileFolder.push(folder);
            } else {
                folder.getFileFolderToBeSaved(fileFolder);
            }
        });

        this.ais.forEach(ai => {
            if (ai.toBeDeleted) {
                fileFolder.push(ai);
            }
        });

        return fileFolder;
    }
}
