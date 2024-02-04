import { persist } from "zustand/middleware";
import { StateCreator, create } from "zustand";
import mmkvMiddlewareStorage from "@/lib/storage/mmkv.middleware";
import { router } from "expo-router";

type State = {
  count: number;
};

type Actions = {
  increment: () => void;
  toLogin: () => void;
};

const storeData: StateCreator<State & Actions> = (set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  toLogin: () => router.push("/auth/login/"),
});

export const useCounter = create(
  persist(storeData, {
    name: "counter-store",
    storage: mmkvMiddlewareStorage,
  })
);
