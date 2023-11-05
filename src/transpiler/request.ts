import axios, {AxiosInstance} from "axios";

axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

interface File {
    id: number;
    name: string;
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

    public async updateCodeAI(fileAI: number, code: string) {
        setTimeout(() => {}, 1000);
        await this.instance.post("/ai/save", {
            ai_id: fileAI,
            code: code
        }).then(data => {
            // return data.data.id;
        });
    }
}
