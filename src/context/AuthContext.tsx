import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IResponseLogin } from "@/types";
import { yaPasoLaBienvenida } from "@/helpers";

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
}
export const AuthContext = createContext<AuthContext>({} as AuthContext);

interface Props {
  children: JSX.Element | JSX.Element[];
}

const initialState = {
  usuario: {
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    documentoIdentidad: "",
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
    setUserAuth(initialState);
    setStatus("no-autenticado");
    await AsyncStorage.removeItem("usuario");
    //await AsyncStorage.removeItem("bienvenida");
  };

  const logoutPRODUCCION = async () => {
    setUserAuth(initialState);
    setStatus("no-autenticado");
    await AsyncStorage.removeItem("usuario");
  };

  useEffect(() => {
    getUserAuthStorage();
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
