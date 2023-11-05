import axios, {AxiosInstance} from "axios";

axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

interface File {
    id: number;
    name: string;
}

export interface LeekIdAiId {
    leekId: number;
    aiId: number;
}

export default class API {

    private instance!: AxiosInstance;

    constructor() {
    }

    public async login() {
        this.instance = await axios.post("https://leekwars.com/api/farmer/login-token", {
            login: process.env.LOGIN,
            password: process.env.PASSWORD
        }).then(data => {
            return axios.create({
                baseURL: "https://leekwars.com/api",
                headers: {
                    "Authorization": `Bearer ${data.data.token}`
                }
            });
        });
    }

    public async getAiId(name: string) {
        return this.instance.get("/ai/get-farmer-ais").then(data => {
            return Math.max(...data.data.ais.filter((file: File) => file.name === name).map((file: File) => file.id));
        });
    }


    public async createNewFolder(parentFolderId: number, name: string): Promise<number> {
        setTimeout(() => {}, 1000);
        return this.instance.post("/ai-folder/new-name", {
            folder_id: parentFolderId,
            name: name
        }).then(data => {
            return data.data.id;
        });
    }

    public async createNewFile(parentFolderId: number, name: string): Promise<number> {
        setTimeout(() => {}, 1000);
        return this.instance.post("/ai/new-name", {
            folder_id: parentFolderId,
            version: 1,
            name: name
        }).then(data => {
            return data.data.ai.id;
        });
    }

    public async updateCodeAI(fileAI: number, code: string) {
        setTimeout(() => {}, 1000);
        await this.instance.post("/ai/save", {
            ai_id: fileAI,
            code: code
        }).then(data => {
            // return data.data.id;
        });
    }

    public async deleteFolder(folderId: number) {
        setTimeout(() => {}, 1000);
        await this.instance.delete(`/ai-folder/delete`, {
            data: {folder_id: folderId},
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(data => {
            // return data.data.id;
        });
    }

    public async getLeekAIName(leekId: number): Promise<string | undefined> {
        setTimeout(() => {}, 1000);
        return this.instance.get(`/leek/get/${leekId}`, {
            data: {leek_id: leekId},
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(data => {
            return data.data.ai?.name;
        });
    }

    public async getFarmerLeeks(farmerId: number): Promise<number[]> {
        setTimeout(() => {}, 1000);
        return this.instance.get(`/farmer/get/${farmerId}`, {
            data: {farmer_id: farmerId},
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(data => {
            return Object.keys(data.data.farmer.leeks).map(id => +id);
        });
    }

    public async setLeekAI(leekId: number, aiId: number): Promise<number[]> {
        setTimeout(() => {}, 1000);
        return this.instance.post(`/leek/ai`, {
            leek_id: leekId,
            ai_id: aiId
        }).then(data => {
            return Object.keys(data.data.farmer.leeks).map(id => +id);
        });
    }


}
