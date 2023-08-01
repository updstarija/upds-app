import { IResponseRegistroHistorico } from "@/types";
import { updsApi } from "./config";

export const getRegistroHistorico = async (carrera = 0, semestre = 0) => {
    const { data } = await updsApi<IResponseRegistroHistorico>("/registrohistorico", {
        params: { carrera }
    });
   // console.log('llamando api', carrera, semestre)

    return data
}
