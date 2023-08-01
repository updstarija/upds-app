import { useState } from "react"
import { IMateriaBase, IResponseMateriaBase, IResponseMateriaRequisito } from "@/types"
import { updsApi } from "@/api"


export const useSearchMateria = () => {
    const [data, setData] = useState<IMateriaBase[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const getData = async (q: string, carreraId:number) => {
        setIsLoading(true)

        try {
            const {data} = await updsApi<IResponseMateriaBase>("/materia", {
                params: {
                    q,
                    carreraId
                }
            })

            setData(data.data)
        } catch (e: any) {
         console.log(e)
        }
        finally {
            setIsLoading(false)
        }

       
    }

    return {
        isLoading,
        getData,
        data
    }
}