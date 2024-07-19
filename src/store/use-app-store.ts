import { StateCreator, create } from "zustand";

type Store = {
  isEnabledProjections: boolean;
};

type Actions = {
  setEnabledProjections: (value: boolean) => void;
};

type AppStore = Store & Actions;

const initialState: Store = {
  isEnabledProjections: true,
};

const storeData: StateCreator<Store & Actions> = (set) => ({
  ...initialState,
  setEnabledProjections: (value) =>
    set(() => ({ isEnabledProjections: value })),
});

export const useAppStore = create<AppStore>()(storeData);
