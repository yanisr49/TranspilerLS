import axios, {AxiosInstance} from 'axios';
import {AI} from './treeStructureOld';
import {FileC, FolderC, IData, IFileFolder} from './treeStructure';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

/**
 * Sleeps for the given amount of time.
 *
 * @param {number} time - The amount of time to sleep, in milliseconds.
 * @return {Promise} - A Promise that resolves after the specified time has elapsed.
 */
export function sleep(time: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, time));
}

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

    public async getTreeStructure() {
        const data = await this.instance.get('/ai/get-farmer-ais');

        return data.data as IData;
    }

    public async createFolder(folder: FolderC): Promise<void> {
        await this.instance
            .post('/ai-folder/new-name', {
                folder_id: folder.parentFolder?.id ?? 0,
                name: folder.name,
            })
            .then(data => {
                folder.id = data.data.id;
                folder.toBeCreated = false;
            });
    }

    public async deleteFolder(folder: FolderC) {
        return this.instance.delete('/ai-folder/delete', {
            data: {
                folder_id: folder.id,
            },
        });
    }

    public async createFile(file: FileC): Promise<void> {
        await this.instance
            .post('/ai/new-name', {
                folder_id: file.parentFolder?.id,
                version: 4,
                name: file.name,
            })
            .then(data => {
                file.toBeCreated = false;
                file.id = (data.data.ai as IFileFolder).id;
            });
    }

    public async deleteFile(file: FileC) {
        return this.instance.delete('/ai/delete', {
            data: {
                ai_id: file.id,
            },
        });
    }

    public async saveFile(file: FileC, code: string) {
        return this.instance
            .post('/ai/save', {
                ai_id: file.id,
                code: code,
            })
            .then(res => {
                // console.log(res.data);
            });
    }

    public async getCode(ai: AI): Promise<string> {
        return this.instance.get(`ai/get/${ai.id}`).then(res => res.data.ai.code);
    }
}
