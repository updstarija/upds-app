import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import mmkvMiddleware from "@/lib/storage/mmkv.middleware";
import { ICarrera } from "@/types";

export type Theme = "light" | "dark" | "system";

type Store = {
  selectedCareer: number;
  careers: ICarrera[];
};

type Actions = {
  setSelectedCareer: (id: number) => void;
  setCareers: (id: ICarrera[]) => void;
  clear: () => void;
};

type CareerStore = Store & Actions;

const initialState: Store = {
  selectedCareer: 0,
  careers: [],
};

const storeData: StateCreator<Store & Actions> = (set) => ({
  ...initialState,
  setSelectedCareer: (selectedCareer) => set(() => ({ selectedCareer })),
  setCareers: (careers) => set(() => ({ careers })),
  clear: () => set(() => initialState),
});

export const useCareerStore = create<CareerStore>()(
  persist(storeData, {
    name: "careerStore",
    storage: mmkvMiddleware,
  })
);
