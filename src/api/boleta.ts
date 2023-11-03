import { IResponseDetalleBoleta } from "@/types";
import { updsApi } from "./config";

export const getBoletaEstudiante = async (carrera: number) => {
    const { data } = await updsApi<IResponseDetalleBoleta>("/proyeccion/boleta", { params: { carrera } });
    return data
}

export const createBoleta = async (carrera: number) => {
    const { data } = await updsApi.post("/proyeccion/boleta", {}, { params: { carrera } });
    return data
}
