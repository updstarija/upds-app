import { ISemestre } from "@/types";
import { updsApi } from "./config";

export const getSemestresPlan = async (carrera: number = 0, proyeccion = false) => {
    const { data } = await updsApi<ISemestre[]>(`/planestudio/semestre${proyeccion ? "-proyeccion" : ""}`, { params: { carrera } });
    console.log(proyeccion)
    console.log('FETCH a ' + `/planestudio/semestre${proyeccion ? "-proyeccion" : ""}`)
    return data
}
