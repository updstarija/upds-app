import { useContext } from "react";
import { CarreraContext } from "@/context/CarreraContext";

export const useCarreraContext = () => {
  const context = useContext(CarreraContext);
  if (!context) throw new Error("Carrera Provider is missing");

  return context;
};
