import { View, Alert, TouchableOpacity } from "react-native";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  AutocompleteDropdown,
  AutocompleteDropdownRef,
} from "react-native-autocomplete-dropdown";
import {
  useCarreraContext,
  useMateriasProyeccion,
  useProyeccionesContext,
  useSearchMateria,
  useThemeColor,
} from "@/hooks";
import { COLORS } from "~/constants";
import Spinner from "@/components/Spinner";
import { Texto } from "@/ui";
import MateriaProyeccionesItem from "./MateriaProyeccionesItem";
import SelectTurnos from "../SelectTurnos";
import { ScrollView } from "react-native-gesture-handler";
import { TourGuideZone } from "rn-tourguide";
import { SwiperV2 } from "@/components";

interface Props {
  tutorial?: {
    inCourse: boolean;
    step: number;
  };
}

const materiaSearchTutorial = "Deontologia";

export const Busqueda: React.FC<Props> = ({ tutorial }) => {
  const dropwdownController = useRef<AutocompleteDropdownRef | null>(null);
  const isDarkMode = useThemeColor() === "dark";

  const { valueCarrera } = useCarreraContext();
  const { selectedTurns } = useProyeccionesContext();

  const { data, getData, isLoading } = useSearchMateria();
  const [selectedItem, setSelectedItem] = useState<null | { id: string }>(null);
  const [inputText, setInputText] = useState("");

  const sugerencias = useMemo(
    () => data.map((x) => ({ id: x.id + "", title: x.nombre })),
    [data]
  );

  const onChangeText = (q: string) => {
    setInputText(q);
    if (q != "") {
      console.log(valueCarrera);
      getData(q, valueCarrera || -1);
    }
  };

  const { materiasProyeccionQuery } = useMateriasProyeccion({
    carrera: valueCarrera || 0,
    modulo: 0,
    semestre: 0,
    buscarMateria: Number(selectedItem?.id || -1),
    enabled: true,
  });

  const renderMaterias = () => {
    if (!selectedItem && !tutorial?.inCourse) return <></>;
    if (tutorial && tutorial.inCourse && tutorial.step <= 3) return <></>;
    if (materiasProyeccionQuery.isLoading) return <Spinner className="h-28" />;
    if (materiasProyeccionQuery.isError) return <Texto>HUBO UN ERROR</Texto>;

    const isPendienteOCurso = (id: number) => id == 0 || id == 1;

    if (materiasProyeccionQuery.data.data.length === 0 && !tutorial?.inCourse)
      return (
        <View className="p-4 items-center bg-white dark:bg-secondary-dark  border-[.5px] border-t-0">
          <Texto className="dark:text-white text-center">
            NO HAY MATERIAS OFERTADAS
          </Texto>
        </View>
      );

    return (
      <View className="mt-4">
        {/* <View className="">
                    <SemestreProyeccionItem modulo={0} semestre={{ id: 0, nombre: "" }} withSearch />
                </View> */}
        <TourGuideZone
          tourKey={"t-boleta"}
          zone={5}
          text="Filtra las materias según el turno de tu preferencia"
        >
          <SelectTurnos />
        </TourGuideZone>

        {[4, 5, 6, 7, 8, 9, 10].includes(tutorial?.step || -1) &&
        tutorial?.inCourse ? (
          <>
            <TourGuideZone
              tourKey={"t-boleta"}
              zone={6}
              text="Desliza para agregar la materia a tu boleta"
            >
              <TourGuideZone
                tourKey={"t-boleta"}
                zone={7}
                text="Presiona en el registro para ver los prerequisitos y coquerequistos"
              >
                <MateriaProyeccionesItem
                  materia={{
                    carrera: "Ing. de Sistemas",
                    materia: "Fundamentos de Matemáticas",
                    estado: { id: -1, nombre: "Tutorial" },
                    id: -1,
                    materiaAdmId: 1006,
                    modulo: "1.1.1",
                    semestre: "PRIMER SEMESTRE",
                    turno: "Mañana",
                  }}
                  withModulo
                  tutorial={tutorial}
                />
              </TourGuideZone>
            </TourGuideZone>
          </>
        ) : (
          <>
            {!materiasProyeccionQuery.isLoading &&
              !!!filterData.length &&
              !tutorial?.inCourse && (
                <View className="items-center bg-primario dark:bg-secondary-dark p-4 rounded-2xl m-4">
                  <Texto className="text-white">
                    No hay datos que mostrar :(
                  </Texto>
                </View>
              )}

            <ScrollView style={{ maxHeight: 400 }} nestedScrollEnabled>
              {filterData.map((mat) => (
                <MateriaProyeccionesItem
                  key={mat.id}
                  materia={mat}
                  withModulo
                />
              ))}
            </ScrollView>
          </>
        )}
      </View>
    );
  };

  const [filterText, setFilterText] = useState("");

  const filterData = useMemo(() => {
    if (materiasProyeccionQuery.isLoading || materiasProyeccionQuery.isError)
      return [];

    let filteredData = materiasProyeccionQuery.data.data;
    if (selectedTurns.length) {
      filteredData = materiasProyeccionQuery.data.data.filter((item) =>
        selectedTurns.includes(item.turno)
      );
    }

    if (!filterText) return filteredData;

    const normalizeString = (str: string) =>
      str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

    const filterTextNormalized = normalizeString(filterText);

    const filterTextArray = filterTextNormalized.split(" ");

    return filteredData.filter((item) => {
      return filterTextArray.every((word) => {
        const materiaNormalized = normalizeString(item.materia);
        const carreraNormalized = normalizeString(item.carrera);

        return (
          materiaNormalized.includes(word) || carreraNormalized.includes(word)
        );
      });
    });
  }, [, selectedTurns, materiasProyeccionQuery.data]);

  useEffect(() => {
    if (tutorial && tutorial.step === 4) {
      const intervalId = setInterval(() => {
        if (inputText.length < materiaSearchTutorial.length) {
          setInputText((prevText) => {
            //console.log(prevText, inputText, prevText.length)
            if (prevText == materiaSearchTutorial) {
              clearInterval(intervalId);
              return prevText;
            }
            dropwdownController.current?.setInputText(
              prevText + materiaSearchTutorial[prevText.length]
            );
            return prevText + materiaSearchTutorial[prevText.length];
          });
        } else {
          clearInterval(intervalId);
        }
      }, 300);

      return () => clearInterval(intervalId);
    } else {
      setInputText("");
      dropwdownController.current?.clear();
      dropwdownController.current?.close();
    }
  }, [tutorial]);

  useEffect(() => {
    if (inputText == materiaSearchTutorial) {
      getData(inputText, valueCarrera || -1);
      dropwdownController.current?.open();

      setTimeout(() => {
        dropwdownController.current?.close();
      }, 5000);
    }
  }, [inputText]);

  return (
    <View style={{ zIndex: -1 }}>
      <TourGuideZone
        tourKey={"t-boleta"}
        zone={4}
        text="Buscador de materias para proyectar"
      >
        <AutocompleteDropdown
          dataSet={sugerencias}
          closeOnBlur={true}
          useFilter={false}
          clearOnFocus={false}
          textInputProps={{
            placeholder: "Busca una materia....",
            style: { color: isDarkMode ? "#FFF" : "#000" },
          }}
          controller={(controller) => {
            dropwdownController.current = controller;
          }}
          onSelectItem={setSelectedItem}
          loading={isLoading}
          onChangeText={onChangeText}
          suggestionsListTextStyle={{
            color: isDarkMode ? "#FFF" : "#000",
          }}
          containerStyle={{ zIndex: -1 }}
          suggestionsListContainerStyle={{
            backgroundColor: isDarkMode ? COLORS.dark.secondary : "#FFF",
          }}
          onClear={() => setInputText("")}
          inputContainerStyle={{
            backgroundColor: isDarkMode ? COLORS.dark.secondary : "#FFF",
            borderColor: "#000",
            borderWidth: 0.5,
          }}
          debounce={600}
          EmptyResultComponent={
            <Texto className="text-black dark:text-white p-3 text-center">
              {isLoading
                ? "Buscando Materia..."
                : inputText.length === 0
                ? "Busca una materia para tu proyeccion"
                : "No se ha encontrado la materia o no esta disponible en tu plan de estudio"}
            </Texto>
          }
        />
      </TourGuideZone>

      {renderMaterias()}
    </View>
  );
};
