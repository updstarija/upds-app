import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IResponseLogin } from "@/types";
import { AuthContextType, LoginStatus } from "@/types/context/auth";
import { initialStateAuthContext } from "@/data/context/auth";
import { keysStorage } from "@/data/storage/keys";
import { useStorageState } from "@/hooks/useStorageState";

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  //  const [mostrarBtnBackLogin, setMostrarBtnBackLogin] = useState(true);

  const [[isLoadingShowWelcomeScreen, showWelcomeScreen], setShowWelcomeScreen] = useStorageState<boolean>(
    keysStorage.SAW_WELCOME_SCREEN
  );

  const [status, setStatus] = useState<LoginStatus>("pending");
  const [user, setuser] = useState<IResponseLogin["data"]>(
    initialStateAuthContext
  );

  const verificarScreenBienvenida = async () => {
    //if (await yaPasoLaBienvenida()) setMostrarBtnBackLogin(false);
  };

  const login = async (user: IResponseLogin["data"]) => {
    setuser(user);
    setStatus("authenticated");
  };

  const logout = async () => {
    setStatus("no-authenticated");
    setuser(initialStateAuthContext);

    await AsyncStorage.removeItem("usuario");
    AsyncStorage.removeItem("usuario").then((x) => {
      //console.log("DELETE INFP USER ", x)
    });
  };

  const setNombreUsuarioNoAuth = (nombre: string) => {
    setuser({
      ...user,
      usuario: {
        ...user.usuario,
        nombre,
      },
    });
  };


  return (
    <AuthContext.Provider
      value={{
        status,
        user,
        login,
        logout,
        welcomeScreen: {
          isLoading: isLoadingShowWelcomeScreen,
          value: showWelcomeScreen
        }
        //  mostrarBtnBackLogin,
        //setMostrarBtnBackLogin,
        // setNombreUsuarioNoAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
