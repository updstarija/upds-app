import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBoleta, deleteMateriaProyeccion, getBoletaEstudiante } from "@/api";
import Toast from "react-native-toast-message";

interface Params {
    carrera: number
}

export const useBoleta = ({ carrera }: Params) => {
    const client = useQueryClient();

    const boletaQuery = useQuery(
        ['boleta-proyecciones', carrera],
        () => getBoletaEstudiante(carrera)
    )

    const materiaProyeccionDeleteMutation = useMutation(deleteMateriaProyeccion, {
        onSuccess: () => {
            Toast.show({
                type: "success",
                text1: "Bien",
                text2: "Se ha eliminado la materia con exito"
            })
            client.invalidateQueries(['boleta-proyecciones'])
        },
        onError: (error: any) => {
            console.log('errrrrrrrrrrror ', JSON.stringify(error.response))
        }
    })


    const boletaCreateMutation = useMutation(createBoleta, {
        onSuccess: () => {
            Toast.show({
                type: "success",
                text1: "Bien",
                text2: "Se ha generado la boleta con exito"
            })
            client.invalidateQueries(['boleta-proyecciones'])
        },
        onError: (error: any) => {
            console.log('errrrrrrrrrrror ', JSON.stringify(error.response))
        }
    })


    return {
        boletaQuery,
        materiaProyeccionDeleteMutation,
        boletaCreateMutation
    }
}