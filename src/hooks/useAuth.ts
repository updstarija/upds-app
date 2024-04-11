import Toast from "react-native-toast-message";
import { IFormLogin } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import authService from "@/services/authService";
import { updsApi } from "@/api";
import { useEffect, useRef } from "react";
import { useAuthStore } from "@/store/useAuth.store";
import { useCareerStore } from "@/store/useCareers";
import { CustomBottomSheetRef } from "@/ui/CustomBottomSheetModal";

export const useAuth = () => {
  const authStore = useAuthStore();
  const { setLogout, token, setLogin, user, setToken, status } = authStore;

  const { setCareers, setSelectedCareer } = useCareerStore();

  const authModalRef = useRef<CustomBottomSheetRef>(null);

  const signIn = useMutation(
    ["auth", "session"],
    (data: IFormLogin) => authService.login(data),
    {
      onSuccess: (response) => {
        const careers = response.data.usuario.carreras;
        setCareers(careers);
        setSelectedCareer(careers[0]?.id);
        setLogin(response.data);

        Toast.show({
          type: "success",
          text1: "Excelente",
          text2: "Has iniciado sesion correctamente :)",
        });
      },
      onError: (error: any) => {
        //console.log(error, "DESDE USE QUERY");
        setLogout();
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

  const refreshSession = useQuery(["auth", "session"], authService.getProfile, {
    onSuccess: (response) => {
      setLogin(response.data);
    },
    onError: () => {
      setLogout();
    },
    retry: false,
    refetchInterval: token ? 1000000 : false,
    enabled: !!token,
    //enabled: false,
  });

  const refreshSessionTestOffice = useQuery(
    ["auth", "session", "officece"],
    authService.getProfileTestOffice,
    {
      onSuccess: (response) => {
        console.log("🚀 ~ useAuth ~ response:", response);
        // login(response.data);
      },
      onError: () => {
        console.log("ERROR REFRESH LOGOUT");
        //  setLogout();
      },
      retry: false,
      refetchInterval: token ? 1000000 : false,
      //TODO: DISABLE ON SERVER
      //enabled: !!token,
      enabled: false,
    }
  );

  const signOut = () => {
    setLogout();
  };

  useEffect(() => {
    updsApi.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) setLogout();
        return Promise.reject(error);
      }
    );
  }, []);

  return {
    ...authStore,
    authModalRef,
    signIn,
    signOut,
    refreshSession,
    refreshSessionTestOffice,
  };
};
