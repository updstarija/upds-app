import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IResponseLogin } from "@/types";
import { yaPasoLaBienvenida } from "@/helpers";
import { useQueryClient, QueryClient } from '@tanstack/react-query';

export type LoginStatus =
  | "pendiente"
  | "autenticado"
  | "no-autenticado"
  | "nuevo";

interface AuthContext {
  userAuth: IResponseLogin["data"];
  status: LoginStatus;
  login: Function;
  logout: Function;
  mostrarBtnBackLogin: boolean;
  setMostrarBtnBackLogin: Function;
  setNombreUsuarioNoAuth: Function
}
export const AuthContext = createContext<AuthContext>({} as AuthContext);

interface Props {
  children: JSX.Element | JSX.Element[];
}

const initialState = {
  usuario: {
    id: -1,
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    documentoIdentidad: "",
    fechaNacimiento: "",
    celular: "",
    direccion: "",
    sexo: "",
    tipoSangre: "",
    estadoCivil: "",
    nacionalidad: "",
    emailOffice365: "",
    email: "",
    telefonoReferencia: "",
    sede: "",
    fechaRegistro: "",
    colegio: "",
    anioEgresoBachiller: -1,
  },
  token: "",
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [mostrarBtnBackLogin, setMostrarBtnBackLogin] = useState(true);
  const [status, setStatus] = useState<LoginStatus>("pendiente");
  const [userAuth, setUserAuth] =
    useState<IResponseLogin["data"]>(initialState);

  const getUserAuthStorage = async () => {
    const data = await AsyncStorage.getItem("usuario");

    if (data) {
      setUserAuth(JSON.parse(data));
      setStatus("autenticado");
      return;
    }
    setStatus("no-autenticado");

    /*   setUserAuth({
      token: 'awdawd',
      usuario: {
        nombre: 'DANTE',
        apellidoMaterno: 'Tarifga',
        apellidoPaterno: 'Arias',
        documentoIdentidad: '123545',
      },
    });

    setStatus('autenticado'); */
  };

  const verificarScreenBienvenida = async () => {
    if (await yaPasoLaBienvenida()) setMostrarBtnBackLogin(false);
  };

  const login = async (user: IResponseLogin["data"]) => {
    setUserAuth(user);
    setStatus("autenticado");
  };

  const logout = async () => {
    await AsyncStorage.removeItem("usuario");
    AsyncStorage.removeItem("usuario").then((x) => {
      console.log("DELETE INFP USER ", x)
    })

    const queryClient = useQueryClient()
    await queryClient.invalidateQueries()
    setUserAuth(initialState);
    setStatus("no-autenticado")

  };

  const setNombreUsuarioNoAuth = (nombre: string) => {
    setUserAuth({
      ...userAuth, usuario: {
        ...userAuth.usuario,
        nombre
      }
    })
  }


  useEffect(() => {
    verificarScreenBienvenida();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        status,
        mostrarBtnBackLogin,
        userAuth,
        login,
        logout,
        setMostrarBtnBackLogin,
        setNombreUsuarioNoAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
