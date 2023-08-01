import { IResponsePlanEstudio, ISemestre } from "@/types";
import { updsApi } from "./config";

export const getPlanEstudio = async (carrera = 0, semestre = 0) => {
    const { data } = await updsApi<IResponsePlanEstudio>("/planestudio", {
        params: { carrera, semestre }
    });
   // console.log('llamando api', carrera, semestre)

    return data
}
