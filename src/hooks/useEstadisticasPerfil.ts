import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBoletaEstudiante, getCarrerasEstudiante, getProgreso, getPromedio, getSemestresPlan } from "@/api";

interface Params {
    carrera: number
    tiempo?: number
}

export const usePromedio = ({ carrera, tiempo= 1}: Params) => {
    const promedioQuery = useQuery(
        ['promedio', carrera,tiempo],
        () => getPromedio(carrera, tiempo),
        {
            staleTime: 10000 * 60 * 60
        }
    )


    return {
     promedioQuery
    }
}

export const useProgreso = ({ carrera }: Params) => {
    const progresoQuery = useQuery(
        ['progreso', carrera,],
        () => getProgreso(carrera),
        {
            staleTime: 10000 * 60 * 60
        }
    )


    return {
        progresoQuery
    }
}