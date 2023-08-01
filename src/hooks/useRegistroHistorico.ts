import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPlanEstudio, getRegistroHistorico } from "@/api";
import { useAuthContext } from "./useAuthContext";

interface Params {
    carrera: number
}

export const useRegistroHistorico = ({ carrera}: Params) => {
    const registroHistoricoQuery = useQuery(
        ['registro-historico', carrera],
        () => getRegistroHistorico(carrera),
        {
            staleTime: 1000 * 60 
        }
    )

    return {
        registroHistoricoQuery
    }
}