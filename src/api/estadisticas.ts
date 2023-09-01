import { IResponseProgreso, IResponsePromedio, ISemestre } from "@/types";
import { updsApi } from "./config";

export const getPromedio = async (carreraId: number, tiempo = 1) => {
    const { data } = await updsApi<IResponsePromedio>(`/estudiante/promedio`, { params: { carreraId ,tiempo} });
   
    return data
}

export const getProgreso = async (carreraId: number = 0) => {
    const { data } = await updsApi<IResponseProgreso>(`/estudiante/progreso`, { params: { carreraId} });
    return data
}