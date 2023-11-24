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
  valueCarrera: number;
  carreras: ICarrera[];
  setValueCarrera: Dispatch<SetStateAction<number>>;
  boleta: number;
  setBoleta: Dispatch<SetStateAction<number>>;
}
export const CarreraContext = createContext<CarreraContext>(
  {} as CarreraContext,
);

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const CarreraProvider: React.FC<Props> = ({ children }) => {
  const { userAuth } = useAuthContext();

  const [valueCarrera, setValueCarrera] = useState<number>(-1);
  const [boleta, setBoleta] = useState<number>(-1);

  useEffect(() => {
    console.log('render')
    if (valueCarrera === -1 && userAuth.usuario.carreras.length) {

      setValueCarrera(userAuth.usuario.carreras[0].id);
    }
  }, [userAuth.usuario.carreras])


  return (
    <CarreraContext.Provider
      value={{
        valueCarrera,
        carreras: userAuth.usuario.carreras,
        setValueCarrera,
        boleta,
        setBoleta,
      }}>
      {children}
    </CarreraContext.Provider>
  );
};
