import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import mmkvMiddleware from "@/lib/storage/mmkv.middleware";

export type TStatus = "authenticated" | "no-authenticated" | "pending" | null;

type Store = {
  status: TStatus;
  usuario: any;
  token: string | null;
};

type Actions = {
  setUser: (usuario: any) => void;
  setLogin: (data: any) => void;
  setLogout: () => void;
  setStatus: (status: TStatus) => void;
};

type AuthStore = Store & Actions;

const initialState: Store = {
  status: null,
  token: null,
  usuario: {} as any,
};

const storeData: StateCreator<Store & Actions> = (set) => ({
  ...initialState,
  setUser: () => set((state) => ({})),
  setLogin: () => set((state) => ({})),
  setLogout: () => set((state) => ({})),
  setStatus: () => set((state) => ({})),
});

export const useAuthStore = create<AuthStore>()(
  persist(storeData, {
    name: "authStore",
    storage: mmkvMiddleware,
    partialize: ({ token, usuario }) => ({ token, usuario }),
  })
);
