import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message'

export const updsApi = axios.create({
    baseURL: "https://tarija.upds.edu.bo/ApiProyecciones/api",
    headers: {
        "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiYXNlV2ViQXBpU3ViamVjdCIsImp0aSI6IjUxMTNhOTQ5LTk0YmUtNDJlOC1iNTQxLTNiNGNmN2VjYjQzNyIsImlhdCI6IjEwLzA3LzIwMjMgNDo1Mzo1MyIsIklkIjoiMTIwOTcyIiwiRG9jdW1lbnRvSWRlbnRpZGFkIjoiMTI3NTU2MTEiLCJleHAiOjE2OTE2NDMyMzMsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcwMDgvIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzAwOC8ifQ.7ymtzSW1tScHmpYsucydYffCnPxAO9QPjIghGL87d6U"
    }
})

updsApi.interceptors.request.use(
    async (config) => {
        const getToken = async () => {
            const data = await AsyncStorage.getItem('usuario');
            if (data) {
                return JSON.parse(data).token
            }
            return null
        }

        const token = await getToken()

        config.headers["Authorization"] = `Bearer ${token}`
        return config
    },
    //     if (token) config.headers["Authorization"] = `Bearer ${token}`
    (error) => {
        console.log('ERROR EN REQUEST', error.response)
        Toast.show({
            type: "error",
            text1: 'Error',
            text2: error?.response?.data?.msg || "Si el problema persiste contacta con soporte"
        })

        return Promise.reject(error)
    }
)

updsApi.interceptors.response.use(
    (config) => config,
    (error) => {
        console.log('ERROR EN RESPONSE', error.response)

        if (error.response.status === 401) {
            Toast.show({
                type: "error",
                text1: 'Error',
                text2: "Necesitas inicar sesion"
            })
        } else if (error.response.status === 500) {
            Toast.show({
                type: "error",
                text1: 'Error',
                text2: error?.response?.data?.msg || "Si el problema persiste contacta con soporte"
            })
        }

        return Promise.reject(error)
    }
)

