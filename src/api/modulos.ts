import { IResponseModuloProyeccion } from "@/types/responses/moduloProyeccion";
import { updsApi } from "./config";

export const getModulos = async () => {
    const { data } = await updsApi<IResponseModuloProyeccion>("/materia/modulos");
    return data
}
