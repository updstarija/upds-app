import { StateCreator, create } from "zustand";

type CallbackUrl = {
  auth: string;
  prev: string;
};

type Url = CallbackUrl | null;

type Store = {
  url?: Url;
};

type Actions = {
  setUrl: (url: Url) => void;
  clearUrl: () => void;
};

type CallbackUrlStore = Store & Actions;

const initialState: Store = {
  url: null,
};

const storeData: StateCreator<Store & Actions> = (set) => ({
  ...initialState,
  setUrl: (url) => set(() => ({ url })),
  clearUrl: () => set(() => initialState),
});

export const useCallbackUrlStore = create<CallbackUrlStore>()(storeData);
