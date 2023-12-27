import { CustomBottomSheetRef } from "@/ui/CustomBottomSheetModal";
import { IResponseLogin } from "../responses";
import { CallBackUrlType } from "@/context";

export type AuthContextType = {
  user: IResponseLogin["data"];
  status: LoginStatus;
  login: Function;
  logout: Function;
  welcomeScreen: {
    isLoading: boolean,
    value: boolean | null,
    completeWelcome: Function
  }
  token: string | null;
  modalAuthRef: React.RefObject<CustomBottomSheetRef>
  callBack: {
    value: CallBackUrlType | null;
    clearCallback: () => void
    setCallback: (url: CallBackUrlType) => void
  }
  // mostrarBtnBackLogin: boolean;
  //  setMostrarBtnBackLogin: Function;
  // setNombreUsuarioNoAuth: Function;
};

export type LoginStatus =
  | "pending"
  | "authenticated"
  | "no-authenticated"
  | "guest";
