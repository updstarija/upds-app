import { updsApi } from "@/api";
import { IFormLogin, IResponseLogin } from "@/types";


const login = async (data: IFormLogin) => {
    try {
        const response = await updsApi.post<IResponseLogin>("/auth/login", data)
        return response.data
    } catch (e: any) {
        console.log(e)
        throw new Error(e)
    }
}
const getProfile = async (): Promise<IResponseLogin["data"]> => {
    try {
        const response = await updsApi.post<IResponseLogin>("/auth/perfil")
        return response.data.data
    } catch (e: any) {
        console.log(e)
        throw new Error(e)
    }
}

export default {
    login,
    getProfile
}