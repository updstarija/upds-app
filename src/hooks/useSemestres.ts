import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBoletaEstudiante, getCarrerasEstudiante, getSemestresPlan } from "@/api";

interface Params {
    carrera: number
    proyeccion?: boolean
}

export const useSemestres = ({ carrera, proyeccion = false }: Params) => {
    const client = useQueryClient();

    const semestresQuery = useQuery(
        ['semestres', carrera, proyeccion],
        () => getSemestresPlan(carrera, proyeccion),
        {
            staleTime: 1000 * 60 * 60
        }
    )


    return {
        semestresQuery
    }
}