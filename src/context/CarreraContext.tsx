import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { ICarrera } from "@/types"; //mport {useAuthContext, useCarreras} from '@/hooks';

interface CarreraContext {
  valueCarrera: number;
  carreras: ICarrera[];
  setValueCarrera: Dispatch<SetStateAction<number>>;
  boleta: number;
  setBoleta: Dispatch<SetStateAction<number>>;
}
export const CarreraContext = createContext<CarreraContext>(
  {} as CarreraContext
);

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const CarreraProvider: React.FC<Props> = ({ children }) => {
  const { user } = useAuthContext();

  const [valueCarrera, setValueCarrera] = useState<number>(-1);
  const [boleta, setBoleta] = useState<number>(-1);

  const carreras = user.carreras;

  useEffect(() => {
    if (
      (valueCarrera === -1 && carreras.length) ||
      (carreras.length &&
        !carreras.map((carr) => carr.id).includes(valueCarrera))
    ) {
      setValueCarrera(user.carreras[0].id);
    }
  }, [user.carreras]);

  return (
    <CarreraContext.Provider
      value={{
        valueCarrera,
        carreras,
        setValueCarrera,
        boleta,
        setBoleta,
      }}
    >
      {children}
    </CarreraContext.Provider>
  );
};
