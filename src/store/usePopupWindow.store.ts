import { CustomBottomSheetRef } from "@/ui/CustomBottomSheetModal";
import { createRef } from "react";
import { StateCreator, create } from "zustand";

type Store = {
  isAlertsOpen: boolean;
  authModalRef: React.MutableRefObject<CustomBottomSheetRef | null>;
};

let authModalRef =
  createRef<CustomBottomSheetRef | null>() as React.MutableRefObject<CustomBottomSheetRef | null>;
authModalRef.current = null;

type Actions = {
  openAlerts: (value?: boolean) => void;
};

type PopupWindowStore = Store & Actions;

const initialState: Store = {
  isAlertsOpen: true,
  authModalRef,
};

const storeData: StateCreator<Store & Actions> = (set) => ({
  ...initialState,
  openAlerts: (value) =>
    set((state) => ({
      isAlertsOpen: value == undefined ? !state.isAlertsOpen : value,
    })),
});

export const usePopupWindowStore = create<PopupWindowStore>()(storeData);
