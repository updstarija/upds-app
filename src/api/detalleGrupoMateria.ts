import { IResponseDetalleGrupo } from "@/types";
import { updsApi } from "./config";

export const getDetalleGrupoMateria = async (grupo = 0) => {
    const { data } = await updsApi<IResponseDetalleGrupo>("/planestudio/detalle-grupo", {
        params: { grupo }
    });
    //console.log('llamando api', grupo)

    return data
}
