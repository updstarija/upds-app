import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import mmkvMiddleware from "@/lib/storage/mmkv.middleware";

export type Theme = "light" | "dark" | "system";

type Store = {
  email: string;
  password: string;
  remember: boolean;
};

type Actions = {
  setCredentials: (data: Store) => void;
  clearCredentials: () => void;
};

type LoginRememberCredentialsStore = Store & Actions;

const initialState: Store = {
  email: "",
  password: "",
  remember: false,
};

const storeData: StateCreator<Store & Actions> = (set) => ({
  ...initialState,
  setCredentials: (data) => set(() => ({ ...data })),
  clearCredentials: () => set(() => initialState),
});

export const useLoginRememberCredentialsStore =
  create<LoginRememberCredentialsStore>()(
    persist(storeData, {
      name: "loginRememberCredentialsStore",
      storage: mmkvMiddleware,
    })
  );
