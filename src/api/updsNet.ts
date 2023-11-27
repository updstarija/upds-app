import { IResponseMateriaRequisito } from "@/types";
import { updsApi } from "./config";
import { IResponseRegistroMateria } from "@/types/responses/registroMateria";

export const getMateriasRegistro = async (inscripcionCarrera: number, turno: number) => {
    const { data } = await updsApi<IResponseRegistroMateria[]>("/updsnet", {
        params: {
            inscripcionCarrera,
            turno
        }
    });

    return data
}
