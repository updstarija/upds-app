import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRegistroHistorico } from "@/api";

interface Params {
    carrera: number
}

export const useRegistroHistorico = ({ carrera }: Params) => {
    const client = useQueryClient();


    const registroHistoricoQuery = useQuery(
        ['registro-historico', carrera],
        () => getRegistroHistorico(carrera),
        {
            staleTime: 1000 * 60
        }
    )

    const handleRefresh = () => {
        client.invalidateQueries(['registro-historico'])
        client.invalidateQueries(['detalle-materia'])
    }

    return {
        registroHistoricoQuery,
        handleRefresh
    }
}