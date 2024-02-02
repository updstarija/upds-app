import Toast from "react-native-toast-message";
import { IFormLogin } from "@/types";
import { useAuthContext } from "./useAuthContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import authService from "@/services/authService";
import axios, { AxiosError } from "axios";
import { updsApi } from "@/api";
import { useEffect } from "react";

export const useAuth = () => {
  const { logout, token, login, status } = useAuthContext();

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
        console.log(error.response.status, "ERRORRRRR");
        if (error && error.message && error.message.includes("CanceledError")) {
          Toast.show({
            type: "error",
            text1: "Algo salio mal",
            text2:
              "La solicitud fue cancelada debido a una alta demanda con el servidor",
          });
        } else if ([400, 401, 403].includes(error?.response?.status || 0)) {
          console.log("XDD");
          Toast.show({
            type: "error",
            text1: "Algo salio mal",
            text2:
              error.response.data.msg || "Usuario o contrasena incorrectos :(",
          });
        }
      },
    }
  );

  const refreshSession = useQuery(["auth", "session"], () => 1, {
    onSuccess: (response) => {
      //login(response.data);
    },
    onError: () => {
      // console.log("ERROR REFRESH LOGOUT");
      // logout();
    },
    retry: false,
    refetchInterval: token ? 1000000 : false,
    enabled: !!token,
  });

  const refreshSessionTestOffice = useQuery(
    ["auth", "session", "officece"],
    authService.getProfileTestOffice,
    {
      onSuccess: (response) => {
        console.log("🚀 ~ useAuth ~ response:", response);
        login(response.data);
      },
      onError: () => {
        console.log("ERROR REFRESH LOGOUT");
        logout();
      },
      retry: false,
      refetchInterval: token ? 1000000 : false,
      enabled: !!token,
    }
  );
  const signOut = () => {
    logout();
  };

  useEffect(() => {
    updsApi.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          console.log("LOGOUNT INTERCEPTROS");
          logout();
        }
        return Promise.reject(error);
      }
    );
  }, []);

  return {
    signIn,
    refreshSession,
    signOut,
    refreshSessionTestOffice,
  };
};
