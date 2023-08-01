import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useCarreras } from '@/hooks/useCarreras';
import { UseQueryResult } from '@tanstack/react-query';
import { ICarrera } from '@/types'; //mport {useAuthContext, useCarreras} from '@/hooks';

interface CarreraContext {
  valueCarrera: number | null;
  carrerasQuery: UseQueryResult<ICarrera[], unknown>;
  setValueCarrera: Dispatch<SetStateAction<null | number>>;
  boleta: number | null;
  setBoleta: Dispatch<SetStateAction<null | number>>;
}
export const CarreraContext = createContext<CarreraContext>(
  {} as CarreraContext,
);

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const CarreraProvider: React.FC<Props> = ({ children }) => {
  const { status, userAuth } = useAuthContext();

  const [valueCarrera, setValueCarrera] = useState<number | null>(null);
  const [boleta, setBoleta] = useState<null | number>(null);

  const { carrerasQuery } = useCarreras(status === 'autenticado');

  useEffect(() => { }, [userAuth]);

  if (carrerasQuery.data && !valueCarrera) {
    setValueCarrera(carrerasQuery?.data[0]?.id);
  }

  return (
    <CarreraContext.Provider
      value={{
        valueCarrera,
        carrerasQuery,
        setValueCarrera,
        boleta,
        setBoleta,
      }}>
      {children}
    </CarreraContext.Provider>
  );
};
