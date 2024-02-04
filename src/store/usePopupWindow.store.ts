import { StateCreator, create } from "zustand";

type Store = {
  isAlertsOpen: boolean;
};

type Actions = {
  openAlerts: (value?: boolean) => void;
};

type PopupWindowStore = Store & Actions;

const initialState: Store = {
  isAlertsOpen: true,
};

const storeData: StateCreator<Store & Actions> = (set) => ({
  ...initialState,
  openAlerts: (value) =>
    set((state) => ({
      isAlertsOpen: value == undefined ? !state.isAlertsOpen : value,
    })),
});

export const usePopupWindowStore = create<PopupWindowStore>()(storeData);
