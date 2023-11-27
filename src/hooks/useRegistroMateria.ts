import { useQuery } from "@tanstack/react-query";
import { getMateriasRegistro } from "@/api/updsNet";


interface Params {
    inscripcionCarrera: number
    turno: number
    enabled?: boolean
}

export const useRegistroMateria = ({ inscripcionCarrera, turno }: Params) => {
    const materiaRequisitoQuery = useQuery(
        ['registro-materia', inscripcionCarrera, turno],
        () => getMateriasRegistro(inscripcionCarrera, turno),
        {
            staleTime: 1000 * 60 * 60,
        }
    )

    return {
        materiaRequisitoQuery
    }
}