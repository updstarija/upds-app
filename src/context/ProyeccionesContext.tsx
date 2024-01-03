import { ISemestre } from "@/types";
import { FlashList } from "@shopify/flash-list";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useRef,
  useState,
} from "react";
import { FlatList } from "react-native";

type TutorialProyeccionesReady = {
  carreras: false;
  boleta: false;
  modulos: false;
  semestres: false;
};

type TutorialInfo = {
  inCourse: boolean;
  step: number;
};
interface ProyeccionesContext {
  carrera: number;
  modulo: number;
  semestre: number;
  boleta: number;
  tutorialBoletaReady: TutorialProyeccionesReady;
  tutorialEnCurso: TutorialInfo;
  listref: React.MutableRefObject<FlashList<any> | null>;
  selectedTurns: string[];
  handleCarrera: Function;
  handleModulo: Function;
  handleSemestre: Function;
  handleBoleta: Function;
  setTutorialBoletaReady: Function;
  setTutorialEnCurso: Dispatch<SetStateAction<TutorialInfo>>;
  scrollToTop: Function;
  handleFilterTurn: (turn: string) => void;
}
export const ProyeccionesContext = createContext<ProyeccionesContext>(
  {} as ProyeccionesContext
);

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const ProyeccionesProvider: React.FC<Props> = ({ children }) => {
  const listref = useRef<FlashList<any> | null>(null);

  const [carrera, setCarrera] = useState(-1);
  const [modulo, setModulo] = useState(-1);
  const [semestre, setSemestre] = useState(-1);
  const [boleta, setBoleta] = useState(-1);

  const [tutorialBoletaReady, setTutorialBoletaReady] =
    useState<TutorialProyeccionesReady>({
      carreras: false,
      boleta: false,
      modulos: false,
      semestres: false,
    });

  const [tutorialEnCurso, setTutorialEnCurso] = useState<TutorialInfo>({
    inCourse: false,
    step: 1,
  });

  const [selectedTurns, setSelectedTurns] = useState<string[]>([]);

  const handleFilterTurn = async (turn: string) => {
    if (selectedTurns.includes(turn)) {
      setSelectedTurns(selectedTurns.filter((item) => item != turn));
      return;
    }

    setSelectedTurns([...selectedTurns, turn]);
  };

  const handleCarrera = (id: number) => {
    setCarrera(id);
  };
  const handleModulo = (id: number) => {
    setModulo(id);
  };
  const handleSemestre = (id: number) => {
    setSemestre(id);
  };
  const handleBoleta = (id: number) => {
    setBoleta(id);
  };

  const scrollToTop = () => {
    listref.current?.scrollToOffset({ offset: 0, animated: true });
  };

  return (
    <ProyeccionesContext.Provider
      value={{
        carrera,
        modulo,
        semestre,
        boleta,
        tutorialBoletaReady,
        tutorialEnCurso,
        listref,
        selectedTurns,
        handleCarrera,
        handleModulo,
        handleSemestre,
        handleBoleta,
        setTutorialBoletaReady,
        setTutorialEnCurso,
        scrollToTop,
        handleFilterTurn,
      }}
    >
      {children}
    </ProyeccionesContext.Provider>
  );
};
