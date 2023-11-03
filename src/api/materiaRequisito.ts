import { IResponseMateriaRequisito } from "@/types";
import { updsApi } from "./config";

export const getMateriaRequisito = async (materiaId: number, carreraId: number) => {
    const { data } = await updsApi<IResponseMateriaRequisito>("/materia/requisito", {
        params: {
            materiaId,
            carreraId
        }
    });

    return data
}
