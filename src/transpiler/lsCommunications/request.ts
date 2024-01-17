import axios, {AxiosInstance} from 'axios';
import {addChildAIs, addChildFolders, AI, Folder} from './treeStructure';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

interface File {
    id: number;
    name: string;
}

export default class API {
    private instance!: AxiosInstance;

    constructor() {}

    public async login() {
        this.instance = await axios
            .post('https://leekwars.com/api/farmer/login-token', {
                login: process.env.LOGIN,
                password: process.env.PASSWORD,
            })
            .then(data => {
                return axios.create({
                    baseURL: 'https://leekwars.com/api',
                    headers: {
                        Authorization: `Bearer ${data.data.token}`,
                    },
                });
            });
    }

    public async getFarmerTreeStructure(rootDirName: string): Promise<Folder> {
        const data = await this.instance.get('/ai/get-farmer-ais');

        const rootDirAny = (data.data.folders as any[]).find(f => f.name === rootDirName);

        let sourceFolder: Folder;
        if (!rootDirAny) {
            sourceFolder = await this.createFolder(rootDirName, 0);
            return sourceFolder;
        } else {
            sourceFolder = {
                id: rootDirAny.id,
                name: rootDirAny.name,
                ais: [],
                folders: [],
                toBeDeleted: true,
            };
        }

        addChildFolders(sourceFolder, data.data.folders);
        addChildAIs(sourceFolder, data.data.ais);

        return sourceFolder;
    }

    public async updateCodeAI(fileAI: number, code: string) {
        setTimeout(() => {}, 1000);
        await this.instance
            .post('/ai/save', {
                ai_id: fileAI,
                code: code,
            })
            .then(data => {
                // return data.data.id;
            });
    }

    public async createFolder(folderName: string, parentFolderId: number): Promise<Folder> {
        return this.instance
            .post('/ai-folder/new-name', {
                folder_id: parentFolderId,
                name: folderName,
            })
            .then(data => {
                return {
                    id: data.data.id,
                    name: folderName,
                    ais: [],
                    folders: [],
                    toBeDeleted: false,
                };
            });
    }

    public async deleteFolder(folder: Folder) {
        await this.instance.delete('/ai-folder/delete', {
            data: {
                folder_id: folder.id,
            },
        });
    }

    public async createFile(fileName: string, parentFolder: Folder): Promise<AI> {
        return this.instance
            .post('/ai/new-name', {
                folder_id: parentFolder.id,
                version: 1,
                name: fileName,
            })
            .then(data => {
                // console.log(data.data);
                return {
                    id: data.data.id,
                    name: data.data.name,
                    toBeDeleted: false,
                };
            });
    }

    public async deleteFile(ai: AI) {
        await this.instance.delete('/ai/delete', {
            data: {
                ai_id: ai.id,
            },
        });
    }
}
