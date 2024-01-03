import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPlanEstudio } from "@/api";
import { useAuthContext } from "./useAuthContext";

interface Params {
    carrera: number
    semestre: number
    enabled: boolean
}

export const usePlanEstudio = ({ carrera, semestre, enabled }: Params) => {
    const client = useQueryClient();

    const { user } = useAuthContext()

    const planEstudioQuery = useQuery(
        ['plan-estudio', carrera, semestre, user?.documentoIdentidad],
        () => getPlanEstudio(carrera, semestre),
        {
            staleTime: 1000 * 60,
            enabled
        }
    )


    return {
        planEstudioQuery
    }
}