import axios, {AxiosInstance} from 'axios';
import {addChildAIs, addChildFolders, AI, Folder} from './treeStructure';
import {sleep} from '../utils';

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

    /**
     * Sets an interceptor for handling responses in the API instance.
     * If the response data is 'Too Many Requests', it will wait for 50ms and retry the original request.
     *
     * @return {Promise} - A promise that resolves when the interceptor is set.
     */
    public async setInterceptor(): Promise<any> {
        this.instance.interceptors.response.use(undefined, async error => {
            if (error.response.data === 'Too Many Requests') {
                console.error('TOO MANY REQUEST');
                await sleep(500);
                return this.instance(error.config);
            }

            return Promise.reject(error);
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
                version: 4,
                name: fileName,
            })
            .then(data => {
                return {
                    id: data.data.ai.id,
                    name: data.data.ai.name,
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

    public async saveFile(ai: AI, code: string) {
        await this.instance
            .post('/ai/save', {
                ai_id: ai.id,
                code: code,
            })
            .then(res => {
                // console.log(res.data);
            });
    }
}
