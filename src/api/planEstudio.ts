import { IResponsePlanEstudio } from "@/types";
import { updsApi } from "./config";

export const getPlanEstudio = async (carrera = 0, semestre = 0) => {
    const { data } = await updsApi<IResponsePlanEstudio>("/planestudio", {
        params: { carrera, semestre }
    });
    return data
}
