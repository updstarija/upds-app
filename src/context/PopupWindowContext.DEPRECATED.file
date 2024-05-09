import { PopupWindowContextType } from "@/types/context/popup-window";
import { createContext, useState } from "react";

export const PopupWindowContext = createContext<PopupWindowContextType>(
  {} as PopupWindowContextType
);

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const PopupWindowProvider: React.FC<Props> = ({ children }) => {
  const [open, setOpen] = useState(true);

  const toggle = (val?: boolean) => {
    if (!val) return setOpen(!open);
    setOpen(val);
  };

  return (
    <PopupWindowContext.Provider
      value={{
        open,
        toggle,
      }}
    >
      {children}
    </PopupWindowContext.Provider>
  );
};
