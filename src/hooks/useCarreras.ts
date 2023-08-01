import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCarrerasEstudiante } from "@/api";
import { useAuthContext } from "./useAuthContext";

interface Params {
    enabled?: boolean
}

export const useCarreras = (enabled: boolean = true) => {
    const { userAuth } = useAuthContext()

    const carrerasQuery = useQuery(
        ['carreras-estudiante', userAuth.usuario.id],
        getCarrerasEstudiante,
        {
            enabled
        }
    )


    return {
        carrerasQuery
    }
}