import Toast from "react-native-toast-message";
import { IFormLogin } from "@/types";
import { useAuthContext } from "./useAuthContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import authService from "@/services/authService";
import { AxiosError } from "axios";

export const useAuth = () => {
  const { logout, token, login } = useAuthContext();

  const signIn = useMutation(
    ["auth", "session"],
    (data: IFormLogin) => authService.login(data),
    {
      onSuccess: (response) => {
        login(response.data);

        Toast.show({
          type: "success",
          text1: "Excelente",
          text2: "Has iniciado sesion correctamente :)",
        });
      },
      onError: (error: any) => {
        //console.log(error, "DESDE USE QUERY");
        logout();
        console.log(error.response.status, "ERRORRRRR")
        if (error && error.message && error.message.includes("CanceledError")) {
          Toast.show({
            type: "error",
            text1: "Algo salio mal",
            text2:
              "La solicitud fue cancelada debido a una alta demanda con el servidor",
          });
        } else if ([400, 401, 403].includes(error?.response?.status || 0)) {
          console.log("XDD")
          Toast.show({
            type: "error",
            text1: "Algo salio mal",
            text2: error.response.data.msg || "Usuario o contrasena incorrectos :(",
          });
        }
      },
    }
  );

  const refreshSession = useQuery(["auth", "session"], authService.getProfile, {
    onSuccess: (response) => {
      login(response.data);
    },
    onError: () => {
      logout();
    },
    retry: false,

    refetchInterval: (token ? 1000000 : false),
    enabled: !!token,
  });



  const signOut = () => {
    logout();
  };

  return {
    signIn,
    refreshSession,
    signOut,
  };
};
