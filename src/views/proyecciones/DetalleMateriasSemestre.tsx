import { useState } from "react";
import { ActivityIndicator, View, Alert, FlatList, TouchableOpacity, Touchable, Pressable } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";
import {
  useBoleta,
  useCarreraContext,
  useMateriasProyeccion,
  useThemeColor,
} from "../../hooks";
import { BottomSheet, Button, Spinner, Texto } from "../../components";
import { ISemestre, MateriaProyeccion } from "../../types";
import {
  AddActions,
  DeleteActions,
  InfoActions,
  Swiper,
} from "../../components/Swiper";
import { FontAwesome } from "@expo/vector-icons";
import { RequisitoMateria } from "./RequisitoMateria";
import { etiquetas } from "@/data";



interface Props {
  semestre: ISemestre;
  modulo: number;
  active: boolean;
  onChangeSemestre: Function;
  scrollToTop: Function;
}

const DetalleMateriasSemestre: React.FC<Props> = ({
  semestre,
  modulo,
  active,
  onChangeSemestre,
  scrollToTop,
}) => {
  const { id, nombre } = semestre;

  const { valueCarrera } = useCarreraContext();
  // const [collapsed, setCollapsed] = useState(!active);

  const [limit, setLimit] = useState(5);
  const [isLoadingLimit, setIsLoadingLimit] = useState(false);

  const { boletaQuery } = useBoleta({ carrera: valueCarrera || -1 });

  const { materiasProyeccionQuery: data, materiaProyeccionCreateMutation } =
    useMateriasProyeccion({
      carrera: valueCarrera || -1,
      enabled: active,
      modulo: modulo,
      semestre: id,
    });

  const onAddMateria = async (data: any) => {
    const response = await materiaProyeccionCreateMutation.mutateAsync(data);

    if (response) {
      scrollToTop();
    }
    /* if (!trabajoAcademico?.id) {
        response = await trabajosAcademicosCreateMutation.mutateAsync(data);
    } else {
        response = await trabajosAcademicosUpdateMutation.mutateAsync(data)
    } */

    /*  if (response) {
        toggleModal()
    } */
  };

  const getDetalle = () => {
    if (data.isLoading)
      return <Spinner classNameContainer="bg-white dark:bg-[#183064] p-4" />

    if (data.isError) return <Texto>HUBO UN ERROR AL CARGAR EL DETALLE</Texto>;

    if (data.data.data.length === 0)
      return (
        <View className="p-4 items-center  ">
          <Texto className="text-white text-center">NO HAY MATERIAS OFERTADAS</Texto>
        </View>
      );

    const nextPage = () => {
      setIsLoadingLimit(true);
      setLimit(limit + 5);
      setIsLoadingLimit(false);
    };



    return (
      <View style={{ zIndex: -9 }}>
        {active && (
          <FlatList
            contentContainerStyle={{ zIndex: -999 }}
            data={data.data.data.slice(0, limit)}
            initialNumToRender={5}
            onEndReached={nextPage}
            ListFooterComponent={
              isLoadingLimit ? (
                <ActivityIndicator color={"#fff"} className="p-2" />
              ) : (
                <View />
              )
            }
            renderItem={({ item, index }) => {
              const isPendiente = item.estado.id == 0
              const isAprobado = item.estado.id == 1
              const isReprobado = item.estado.id == 2
              const isValidMateria = isPendiente || isAprobado || isReprobado

              return (
                <TouchableOpacity>
                  <Swiper
                    key={item.id}
                    onRighOpen={() =>
                      onAddMateria({
                        materiaId: item.id,
                        boletaId: boletaQuery.data?.info.boleta,
                      })
                    }
                    closeOnSwipe
                    renderRightActions={AddActions}
                    enabled={!isPendiente && !isAprobado}
                  >

                    <Row item={item} enabled={!isPendiente && !isAprobado} />

                  </Swiper>
                </TouchableOpacity>
              )
            }}
            keyExtractor={(item, index) => `message ${index}`}
          />
        )}
      </View>
    );
  };

  return (
    <>
      <Button onPress={() => onChangeSemestre(semestre.id)}>
        {
          <View className="flex-row justify-between bg-primario p-3 dark:bg-secondary-dark ">
            <Texto className="text-white font-bold">{nombre}</Texto>

            <Icon
              name={active ? "chevron-down" : "chevron-right"}
              size={20}
              color="#fff"
            />
          </View>
        }
      </Button>

      {/* <Texto className="bg-red-300 p-4 text-black ">HOLA</Texto> */}
      {/* <Collapsible duration={300} collapsed={!active}>
        {active && <View className="bg-[#183064]">{getDetalle()}</View>}
      </Collapsible> */}
      {active && <View className="bg-[#183064]">{getDetalle()}</View>}
    </>
  );
};
export default DetalleMateriasSemestre;



const Row = ({
  item,
  enabled,
}: {
  item: MateriaProyeccion;
  enabled: boolean;
}) => {
  const isDarkMode = useThemeColor() === "dark"
  const isElectiva = item.materia.startsWith("Electiva - ")
  const isValidMateria = item.estado.id == 0 || item.estado.id == 1 || item.estado.id == 2 || isElectiva
  const isAprobadaoEnCurso = item.estado.id == 0 || item.estado.id == 1
  const isReprobado = item.estado.id == 2

  const messageElectiva = () => {
    Alert.alert("Informacion", "Has seleccionado una materia electiva.\n\nLas materias electivas son opciones adicionales que puedes tomar para personalizar tu experiencia educativa y ampliar tus conocimientos en áreas específicas de interés.\n\nAprovecha esta oportunidad para explorar y sumergirte en nuevos temas que complementen tu formación principal.\n\nRecuerda que las materias electivas son una excelente manera de enriquecer tu aprendizaje y expandir tus horizontes académicos. \n\n¡No dudes en elegir aquellas que más te apasionen y te motiven!")
  }


  const messageDeshabilitada = () => {
    Alert.alert("Informacion", "Esta materia ya ha sido aprobada o esta en curso y, por lo tanto, no es elegible para su selección nuevamente.\n\nSi necesitas asesoramiento en cuanto a tus elecciones académicas o deseas explorar otras opciones, no dudes en ponerte en contacto con nuestro equipo educativo.\n\n¡Sigue adelante y continúa con tu excelente desempeño académico!")
  }

  const message = () => {
    Alert.alert("HOLA")
  }


  const Content = () => (
    <View>

      <View
        className={`bg-white dark:bg-[#183064] p-4 ${!enabled ? "opaci disabled" : ""
          }`}
        style={{ position: "relative", overflow: "hidden" }}
      >

        {isValidMateria && <>
          <View style={{ borderBottomColor: etiquetas[isElectiva ? 3 : item.estado.id].color, borderRightWidth: 25, borderBottomWidth: 25, width: 0, height: 0, backgroundColor: "transparent", borderStyle: "solid", borderLeftWidth: 0, borderLeftColor: "transparent", borderRightColor: "transparent", position: "absolute", top: 0, right: 0, transform: [{ rotate: "180deg" }] }} />

          <View style={{ position: "absolute", top: 1, right: 1, zIndex: 999 }}>
            <FontAwesome name={etiquetas[isElectiva ? 3 : item.estado.id].icon} color={"#FFF"} />
          </View>
        </>}

        <View className="flex-row items-center justify-between ">
          <View className="w-3/4">
            <Texto className={`text-black dark:text-white`} weight="Bold">
              {item.materia}
            </Texto>
            <Texto className={`text-xs text-gray-400`}>{item.carrera}</Texto>
          </View>
          <Texto className={`text-black dark:text-white`}>{item.turno}</Texto>
        </View>
      </View>

    </View>
  )

  return (

    <BottomSheet content={<Content />} touchableProps={{ activeOpacity: 0.8 }} snapPointsProp={["40%"]}>
      <RequisitoMateria materia={item} />
    </BottomSheet>

  );
}

