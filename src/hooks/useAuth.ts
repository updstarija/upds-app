import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { updsApi } from "@/api";
import { IFormLogin, IResponseLogin } from "@/types";
import { useAuthContext } from "./useAuthContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import authService from "@/services/authService";

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
      onError: () => {
        logout();
        Toast.show({
          type: "error",
          text1: "Algo salio mal",
          text2: "Usuario o contrasena incorrectos :(",
        });
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
    refetchInterval: 100000,
    enabled: !!token,
  });

  console.log(token);

  const signOut = () => {
    logout();
  };
  return {
    signIn,
    refreshSession,
    signOut,
  };
};
