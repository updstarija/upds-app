import { IResponseMateriaProyecion } from "@/types";
import { updsApi } from "./config";

export const getMateriasProyeccion = async (carrera: number, semestre: number, modulo: number, buscarMateria: number = 0) => {
    const { data } = await updsApi<IResponseMateriaProyecion>("/materia/proyeccion", {
        params: {
            carreraId: carrera,
            semestreId: semestre,
            moduloId: modulo,
            buscarMateria
        }
    });
    return data
}

interface Params {
    materiaId: number,
    boletaId: number
}

export const addMateriaProyeccion = async (body: Params) => {
    try {
        const { data } = await updsApi.post("/proyeccion/materia", body);
        return data
    }
    catch (error: any) {
        throw new Error(error?.response?.data?.msg)
    }
}

interface ParamsDelete {
    detalleBoletaId: number,
    boletaId: number
}

export const deleteMateriaProyeccion = async (body: ParamsDelete) => {
    const { data } = await updsApi.delete("/proyeccion/materia", { data: body });
    return data
}
