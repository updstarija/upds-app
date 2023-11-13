import {
  createContext,
  useState,
} from 'react';

interface ProyeccionesContext {
  carrera: number,
  modulo: number,
  semestre: number,
  boleta: number,
  handleCarrera: Function
  handleModulo: Function
  handleSemestre: Function
  handleBoleta: Function
}
export const ProyeccionesContext = createContext<ProyeccionesContext>(
  {} as ProyeccionesContext,
);

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const ProyeccionesProvider: React.FC<Props> = ({ children }) => {
  const [carrera, setCarrera] = useState(-1)
  const [modulo, setModulo] = useState(-1)
  const [semestre, setSemestre] = useState(-1)
  const [boleta, setBoleta] = useState(-1)

  const handleCarrera = (id: number) => {
    setCarrera(id)
  }
  const handleModulo = (id: number) => {
    setModulo(id)
  }
  const handleSemestre = (id: number) => {
    setSemestre(id)
  }
  const handleBoleta = (id: number) => {
    setBoleta(id)
  }

  return (
    <ProyeccionesContext.Provider
      value={{
        carrera,
        modulo,
        semestre,
        boleta,
        handleCarrera,
        handleModulo,
        handleSemestre,
        handleBoleta,
      }}>
      {children}
    </ProyeccionesContext.Provider>
  );
};
