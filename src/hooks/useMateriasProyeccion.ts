import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addMateriaProyeccion, deleteMateriaProyeccion, getMateriasProyeccion } from "@/api";
import Toast from 'react-native-toast-message'

interface Params {
    carrera: number
    semestre: number
    modulo: number
    buscarMateria?:number
    enabled: boolean
}

export const useMateriasProyeccion = ({ carrera, semestre, modulo,buscarMateria, enabled }: Params) => {
    const client = useQueryClient();

    const materiasProyeccionQuery = useQuery(
        ['materias-proyeccion', carrera, semestre, modulo,buscarMateria],
        () => getMateriasProyeccion(carrera, semestre, modulo,buscarMateria),
        {
            staleTime: 1000 * 60 * 60,
            enabled
        }
    )

    const materiaProyeccionCreateMutation = useMutation(addMateriaProyeccion, {
        onSuccess: () => {
            Toast.show({
                type: "success",
                text1: "Excelente",
                text2: "Se ha agregado la materia con exito"
            })
            client.invalidateQueries(['boleta-proyecciones'])
        },
        onError: (error: Error) => {
            //console.log('errrrrrrrrrrror ', JSON.stringify(error.response))
            Toast.show({
                type: "warning",
                text1: 'Alerta',
                text2: error?.message || "Si el problema persiste contacta con soporte"
            })
        }
    })




    return {
        materiasProyeccionQuery,
        materiaProyeccionCreateMutation
    }
}