import { useQuery } from "@tanstack/react-query";
import { getMateriaRequisito } from "@/api";


interface Params {
    materia: number
    carrera: number
    enabled?: boolean
}

export const useMateriaRequisito = ({ carrera, materia, enabled = true }: Params) => {
    const materiaRequisitoQuery = useQuery(
        ['materia-requisito', materia, carrera],
        () => getMateriaRequisito(materia, carrera),
        {
            staleTime: 10000 * 60 * 60 ,
            enabled
        }
    )

    return {
        materiaRequisitoQuery
    }
}