import { CustomBottomSheetRef } from "@/ui/CustomBottomSheetModal";
import { IResponseLogin, IUser } from "../responses";
import { CallBackUrlType } from "@/context";

export type AuthContextType = {
  user: IUser;
  status: LoginStatus;
  login: (data: IResponseLogin["data"]) => void;
  logout: () => void;
  welcomeScreen: {
    isLoading: boolean;
    value: boolean | null;
    completeWelcome: Function;
  };
  token: string | null;
  modalAuthRef: React.RefObject<CustomBottomSheetRef>;
  callBack: {
    value: CallBackUrlType | null;
    clearCallback: () => void;
    setCallback: (url: CallBackUrlType) => void;
  };
  setNameGuestUser: (nombre: string) => void;
  // mostrarBtnBackLogin: boolean;
  //  setMostrarBtnBackLogin: Function;
  // setNombreUsuarioNoAuth: Function;
};

export type LoginStatus =
  | "pending"
  | "authenticated"
  | "no-authenticated"
  | "guest";
