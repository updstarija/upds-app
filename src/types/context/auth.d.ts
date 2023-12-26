export type AuthContextType = {
  user: IResponseLogin["data"];
  status: LoginStatus;
  login: Function;
  logout: Function;
  // mostrarBtnBackLogin: boolean;
  //  setMostrarBtnBackLogin: Function;
  // setNombreUsuarioNoAuth: Function;
};

export type LoginStatus =
  | "pending"
  | "authenticated"
  | "no-authenticated"
  | "guest";
