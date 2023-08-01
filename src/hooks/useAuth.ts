import { useState } from "react"
import Toast from "react-native-toast-message"
import { IFormLogin, IResponseLogin } from "@/types"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { updsApi } from "@/api"
import { Alert } from "react-native"

export const useAuth = () => {
    const [isLoading, setIsLoading] = useState(false)

    const login = async (dataUser: IFormLogin) => {
        setIsLoading(true)

        try {
            console.log('start-fetch')
            const data = fetch("https://tarija.upds.edu.bo/ApiProyecciones/api/auth/login", {
                body: JSON.stringify(dataUser),
                method: "POST"
            })

            data.then((x) => {
                console.log('Se completo el fetch', x)
                console.log('--------------------------------------------------------')
            })

        } catch {
            Alert.alert("ERRROR EN FECTCH")
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

    return {
        isLoading,
        login
    }
}