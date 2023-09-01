import { useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Toast from "react-native-toast-message"
import { updsApi } from "@/api"
import { IFormLogin, IResponseLogin } from "@/types"

export const useAuth = () => {
    const [isLoading, setIsLoading] = useState(false)

    const login = async (dataUser: IFormLogin) => {
        setIsLoading(true)

        try {
            console.log('start-fetch')
            const data = fetch("https://tarija.upds.edu.bo/ApiProyecciones/api/auth/login", {
                body: JSON.stringify(dataUser),
                method: "POST"
            }).then(() => {
                console.log('--------------------------------------------------------')
                console.log('SE COMPLETO EL FETCH')
                console.log('--------------------------------------------------------')

            })
        } catch {
            console.error('HUBO UN ERROR')
        }


        try {
            const { data } = await updsApi.post<IResponseLogin>("/auth/login", dataUser)

            await AsyncStorage.setItem('usuario', JSON.stringify(data.data));
            await AsyncStorage.setItem('bienvenida', 'true');



            Toast.show({
                type: "success",
                text1: "Bien",
                text2: "Has iniciado sesion correctamente :)"
            })

            return data.data
        } catch (e: any) {
            Toast.show({
                type: "error",
                text1: "Algo salio mal",
                text2: "Usuario o contrasena incorrectos :("
            })
        }
        finally {
            setIsLoading(false)
        }

        return null
    }

    const refreshLogin = async () => {
        setIsLoading(true)
        try {
            const { data } = await updsApi<IResponseLogin>("/auth/perfil")

            await AsyncStorage.setItem('usuario', JSON.stringify(data.data));
          
            Toast.show({
                type: "success",
                text1: "Bien",
                text2: "Bienvenido nuevamente :)"
            })

            return data.data
        } catch (e: any) {
            
            Toast.show({
                type: "warning",
                text1: "Sesion caducada",
                text2: "Inicia sesion nuevamente"
            })
        }
        finally {
            setIsLoading(false)
        }

        return null
    }

    return {
        refreshLogin,
        isLoading,
        login
    }
}