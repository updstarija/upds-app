import {
  createContext,
  useState,
} from 'react';

type TutorialProyeccionesReady = {
  carreras: false,
  boleta: false,
  modulos: false,
  semestres: false
}


type TutorialInfo = {
  inCourse: boolean,
  step: number
}
interface ProyeccionesContext {
  carrera: number,
  modulo: number,
  semestre: number,
  boleta: number,
  tutorialBoletaReady: TutorialProyeccionesReady,
  tutorialEnCurso: TutorialInfo,
  handleCarrera: Function
  handleModulo: Function
  handleSemestre: Function
  handleBoleta: Function
  setTutorialBoletaReady: Function
  setTutorialEnCurso: Function
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

  const [tutorialBoletaReady, setTutorialBoletaReady] = useState<TutorialProyeccionesReady>({
    carreras: false,
    boleta: false,
    modulos: false,
    semestres: false
  })

  const [tutorialEnCurso, setTutorialEnCurso] = useState<TutorialInfo>({
    inCourse: false,
    step: 1
  })

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
        tutorialBoletaReady,
        tutorialEnCurso,
        handleCarrera,
        handleModulo,
        handleSemestre,
        handleBoleta,
        setTutorialBoletaReady,
        setTutorialEnCurso,
      }}>
      {children}
    </ProyeccionesContext.Provider>
  );
};
