import { ICarrera } from "@/types";
import { updsApi } from "./config";

export const getCarrerasEstudiante = async () => {
    const { data } = await updsApi<ICarrera[]>("/carrera",);
    return data
}
