import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import mmkvMiddleware from "@/lib/storage/mmkv.middleware";

type Store = {
  isViewed: boolean;
};

type Actions = {
  markAsViewed: () => void;
  markAsUnviewed: () => void;
};

type OnboardingStore = Store & Actions;

const initialState: Store = {
  isViewed: false,
};

const storeData: StateCreator<Store & Actions> = (set) => ({
  ...initialState,
  markAsViewed: () => set(() => ({ isViewed: true })),
  markAsUnviewed: () => set(() => ({ isViewed: false })),
});

export const useOnboardingStore = create<OnboardingStore>()(
  persist(storeData, {
    name: "onboardingStore",
    storage: mmkvMiddleware,
  })
);
