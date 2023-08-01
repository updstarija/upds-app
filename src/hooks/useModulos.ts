import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCarrerasEstudiante, getModulos } from "@/api";

export const useModulos = () => {
    const modulosQuery = useQuery(
        ['modulos'],
        getModulos,
        {
            staleTime: 1000 * 60 * 60
        }
    )


    return {
        modulosQuery
    }
}