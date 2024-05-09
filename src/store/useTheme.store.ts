import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import mmkvMiddleware from "@/lib/storage/mmkv.middleware";

export type Theme = "light" | "dark" | "system";

type Store = {
  theme: Theme;
};

type Actions = {
  changeTheme: (theme: Theme) => void;
};

type ThemeStore = Store & Actions;

const initialState: Store = {
  theme: "system",
};

const storeData: StateCreator<Store & Actions> = (set) => ({
  ...initialState,
  changeTheme: (theme) => set(() => ({ theme })),
});

export const useThemeStore = create<ThemeStore>()(
  persist(storeData, {
    name: "themeStore",
    storage: mmkvMiddleware,
  })
);
