import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getDetalleGrupoMateria } from "@/api";

interface Params {
    grupo: number
    enabled: boolean
}

export const useDetalleGrupoMateria = ({ grupo, enabled }: Params) => {
    const client = useQueryClient();

    const detalleGrupoMateriaQuery = useQuery(
        ['detalle-materia', grupo],
        () => getDetalleGrupoMateria(grupo),
        {
            staleTime: 1000 * 60 * 60,
            enabled
        }
    )


    return {
        detalleGrupoMateriaQuery
    }
}