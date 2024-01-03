import { createContext, useEffect, useRef, useState } from "react";
import { IResponseLogin, IUser } from "@/types";
import { AuthContextType, LoginStatus } from "@/types/context/auth";
import { initialStateAuthContext } from "@/data/context/auth";
import { keysStorage } from "@/data/storage/keys";
import { useStorageState } from "@/hooks/useStorageState";
import { CustomBottomSheetRef } from "@/ui/CustomBottomSheetModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

interface Props {
  children: JSX.Element | JSX.Element[];
}

export type CallBackUrlType = {
  auth: string;
  prev: string;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  //  const [mostrarBtnBackLogin, setMostrarBtnBackLogin] = useState(true);
  const modalAuthRef = useRef<CustomBottomSheetRef>(null);
  const [callbackUrl, setCallbackUrl] = useState<CallBackUrlType | null>(null);

  const [
    [isLoadingShowWelcomeScreen, showWelcomeScreen],
    setShowWelcomeScreen,
  ] = useStorageState<boolean>(keysStorage.SAW_WELCOME_SCREEN);

  const [[isLoadingToken, token], setToken] = useStorageState(
    keysStorage.JWT_TOKEN
  );

  const [status, setStatus] = useState<LoginStatus>("pending");
  const [user, setUser] = useState<IUser>(initialStateAuthContext);

  const verificarScreenBienvenida = async () => {
    //if (await yaPasoLaBienvenida()) setMostrarBtnBackLogin(false);
  };

  const setNameGuestUser = (nombre: string) => {
    setStatus("guest");
    setUser({
      ...user,
      nombre,
    });
  };

  const login = async (data: IResponseLogin["data"]) => {
    setUser(data.usuario);
    setToken(data.token);
    setStatus("authenticated");
  };

  const logout = async () => {
    setStatus("no-authenticated");
    setUser(initialStateAuthContext);
    setToken(null);
  };

  const completeWelcome = () => {
    setShowWelcomeScreen(true);
  };

  const clearCallback = () => setCallbackUrl(null);
  const setCallback = (urls: CallBackUrlType) => setCallbackUrl(urls);

  return (
    <AuthContext.Provider
      value={{
        status,
        user,
        login,
        logout,
        welcomeScreen: {
          isLoading: isLoadingShowWelcomeScreen,
          value: showWelcomeScreen,
          completeWelcome,
        },
        token,
        modalAuthRef,
        callBack: {
          value: callbackUrl,
          clearCallback,
          setCallback,
        },
        setNameGuestUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
