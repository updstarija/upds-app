import { useContext } from "react";
import { PopupWindowContext } from "@/context/PopupWindowContext";

export const usePopupWindowContext = () => {
  const context = useContext(PopupWindowContext);

  if (!context) {
    throw new Error("PopupWindowProvider is missing");
  }

  return context;
};
