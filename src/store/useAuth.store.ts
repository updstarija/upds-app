import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import mmkvMiddleware from "@/lib/storage/mmkv.middleware";
import { IResponseLogin, IUser } from "@/types";

export type GuestUser = {
  fullName: string;
  deviceToken: string;
};
export type LoginStatus =
  | "authenticated"
  | "no-authenticated"
  | "guest"
  | "pending"
  | null;

type Store = {
  status: LoginStatus;
  user: IUser;
  guestUser: GuestUser;
  token: string | null;
  isRefresing: boolean;
  //
  /*   callBack: {
    value: string,
clearCallback: () => void,
setCallback: (url:string) => void,
  } */
};

type LoginData = IResponseLogin["data"];

type Actions = {
  setUser: (user: IUser) => void;
  setLogin: (data: LoginData) => void;
  setLogout: () => void;
  setToken: (token: string) => void;
  setGuestUser: (guestUser: GuestUser) => void;
};

type AuthStore = Store & Actions;

const initialState: Store = {
  status: "pending",
  isRefresing: false,
  token: null,
  user: {} as any,
  guestUser: {
    fullName: "",
    deviceToken: "",
  },
};

const storeData: StateCreator<Store & Actions> = (set) => ({
  ...initialState,
  setUser: (user) => set((state) => ({ ...state, user })),
  setLogin: (data) =>
    set((state) => ({
      user: data.usuario,
      token: data.token,
      status: "authenticated",
    })),
  setLogout: () => set(() => ({ ...initialState, status: "no-authenticated" })),
  setToken: (token) => set((state) => ({ ...state, token })),
  setGuestUser: (guestUser) =>
    set((state) => ({
      ...state,
      status: "guest",
      user: {} as any,
      token: null,
      guestUser,
    })),
});

export const useAuthStore = create<AuthStore>()(
  persist(storeData, {
    name: "authStore",
    storage: mmkvMiddleware,
    //partialize: ({ token, user }) => ({ token, user }),
  })
);
