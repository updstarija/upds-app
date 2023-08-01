import { useQuery } from "@tanstack/react-query";
import { getCarrerasEstudiante } from "@/api";


interface Params {
    enabled?: boolean
}

export const useCarreras = (enabled: boolean = true) => {
    const carrerasQuery = useQuery(
        ['carreras-estudiante'],
        getCarrerasEstudiante,
        {
            enabled
        }
    )


    return {
        carrerasQuery
    }
}