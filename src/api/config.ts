import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { keysStorage } from "@/data/storage/keys";

export const updsApi = axios.create({
  baseURL: "https://tarija.upds.edu.bo/ApiProyecciones/api",
  /* headers: {
        "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiYXNlV2ViQXBpU3ViamVjdCIsImp0aSI6IjUxMTNhOTQ5LTk0YmUtNDJlOC1iNTQxLTNiNGNmN2VjYjQzNyIsImlhdCI6IjEwLzA3LzIwMjMgNDo1Mzo1MyIsIklkIjoiMTIwOTcyIiwiRG9jdW1lbnRvSWRlbnRpZGFkIjoiMTI3NTU2MTEiLCJleHAiOjE2OTE2NDMyMzMsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcwMDgvIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzAwOC8ifQ.7ymtzSW1tScHmpYsucydYffCnPxAO9QPjIghGL87d6U"
    } */
});

updsApi.interceptors.request.use(
  async (config) => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem(keysStorage.JWT_TOKEN);
      return token;
    };

    const token = await getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  //     if (token) config.headers["Authorization"] = `Bearer ${token}`
  (error) => {
    console.log("ERROR EN REQUEST", error.response);
    Toast.show({
      type: "error",
      text1: "Error",
      text2:
        error?.response?.data?.msg ||
        "Si el problema persiste contacta con soporte",
    });

    return Promise.reject(error);
  }
);

updsApi.interceptors.response.use(
  (config) => config,
  (error: AxiosError<any>) => {
    console.log("ERROR EN RESPONSE", error.code);

    if (error.code === "ERR_CANCELED") {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
      });
    } else if (error.code === "ERR_NETWORK") {
      Toast.show({
        type: "error",
        text1: "Error",
        text2:
          "No tienes conexión a internet, conéctate e intentalo nuevamente.",
      });
    }

    if (error?.response?.status === 401) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Necesitas inicar sesion",
      });

      AsyncStorage.removeItem(keysStorage.JWT_TOKEN);
    } else if (error?.response?.status === 500) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2:
          error?.response?.data?.msg ||
          "Si el problema persiste contacta con soporte",
      });
    }

    return Promise.reject(error);
  }
);
