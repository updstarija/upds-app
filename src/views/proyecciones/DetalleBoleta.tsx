import { View, ActivityIndicator, Alert, Platform } from "react-native";
import { useBoleta, useThemeColor } from "@/hooks";
import { Card, DeleteActions, Swiper, SwiperV2 } from "@/components";
import { useEffect, useRef, useState } from "react";
import { Texto } from "@/ui";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { TourGuideZone } from "rn-tourguide";
import * as Animatable from "react-native-animatable";
import { SwiperV2Ref } from "@/components/SwiperV2";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {
  carrera: number;
  tutorial?: {
    inCourse: boolean;
    step: number;
  };
}

const DetalleBoleta: React.FC<Props> = ({ carrera, tutorial }) => {

  let tuto1: any = null;
  let tuto2: any = null;
  let tuto3: any = null;
  let tuto4: any = null;
  const isDark = useThemeColor() === "dark";
  const swiperRef = useRef<SwiperV2Ref>(null);
  const [deleteTutorial, setDeleteTutorial] = useState(false);

  const { boletaQuery, materiaProyeccionDeleteMutation } = useBoleta({
    carrera,
  });

  /*   useEffect(() => {
      if (!boletaQuery.isLoading && !boletaQuery.isError) {
        //setEmpezarTutorial((prev) => ({ ...prev, boleta: true }))
      }
    }, [boletaQuery.isLoading, boletaQuery.isError, boletaQuery.isFetching]) */

  if (boletaQuery.isLoading)
    return (
      <Card classNameCard="my-4 flex">
        <ActivityIndicator size="large" color="#ffffff" />
        <Texto className="mt-2 text-center text-white">Cargando Boleta</Texto>
      </Card>
    );

  if (boletaQuery.isError)
    return (
      <Texto className="text-black">
        Hubo un error al cargal la boleta....
      </Texto>
    );

  const noMostrarMas = async () => {
    await AsyncStorage.setItem(
      `no-mostrar-confirmacion-eliminacion-materia`,
      "true"
    );
  };

  const handleDeleteMateria = async (
    detalleBoletaId: number,
    boletaId: number
  ) => {
    if (detalleBoletaId == -1 || boletaId == -1) {
      setDeleteTutorial(true);
      return;
    }

    await materiaProyeccionDeleteMutation.mutateAsync({
      detalleBoletaId,
      boletaId,
    });
  };

  const confirmationDelete = async (
    detalleBoletaId: number,
    boletaId: number
  ) => {
    const mostrar = await AsyncStorage.getItem(
      `no-mostrar-confirmacion-eliminacion-materia`
    );
    console.log(mostrar)
    if (mostrar == "true") {
      handleDeleteMateria(detalleBoletaId, boletaId);
      return;
    }

    Alert.alert(
      "Alerta",
      `Estas a punto de eliminar una materia. \n\nEstas seguro?`,
      [

        {
          text: "No pedirme confirmacion",
          onPress: () => {
            alert(
              "La proxima vez que elimines una materia no se te pedira confirmacion.\n\nPuedes cambiar esta configuracion desde los ajustes"
            );
            handleDeleteMateria(detalleBoletaId, boletaId);
            // noMostrarMas();
          },
        },
        {
          text: "Si",
          isPreferred: true,

          onPress: () => {
            handleDeleteMateria(detalleBoletaId, boletaId);
          },
        },
        {
          text: "No",
        },

      ],
      { cancelable: true, userInterfaceStyle: "dark" }
    );
  };

  const renderRightActions = () => {
    return (
      <View className="bg-red-500 flex-1 items-end justify-center p-2">
        <View className="flex-row items-center">
          <Texto className="text-white">Eliminar</Texto>

          <MaterialCommunityIcons name="trash-can" size={30} color="#fff" />
        </View>
      </View>
    );
  };

  const Tutorial = () => {
    if (!tutorial || !tutorial.inCourse) return null;

    if (tutorial.step == 3)
      return (
        <Animatable.View
          useNativeDriver
          animation="slideOutLeft"
          iterationCount={"infinite"}
          direction="alternate"
          duration={2500}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            alignItems: "flex-end",
            userSelect: "none",
          }}
        >
          <MaterialCommunityIcons
            name="gesture-swipe-horizontal"
            size={40}
            color={isDark ? "#FFF" : "#000"}
          />
        </Animatable.View>
      );
  };

  const renderContent = () => {
    if (tutorial?.inCourse && tutorial.step == 3) {
      tuto1 = setTimeout(() => {
        swiperRef.current?.openRight();
        // console.log("OPEN RIGHT")
      }, 2000);

      tuto2 = setTimeout(() => {
        swiperRef.current?.close();
        //console.log("CLOSE ")
      }, 4000);

      tuto3 = setTimeout(() => {
        swiperRef.current?.openRight();
        //console.log("OPEN RIGHT")
      }, 11000);

      tuto4 = setTimeout(() => {
        swiperRef.current?.close();
        //console.log("CLOSE ")
      }, 13000);
    }

    if (tutorial?.inCourse && tutorial?.step != 3) {
      clearTimeout(tuto1)
      clearTimeout(tuto2)
      clearTimeout(tuto3)
      clearTimeout(tuto4)

      tuto1 = null
      tuto2 = null
      tuto3 = null
      tuto4 = null
    }

    if (!tutorial?.inCourse && boletaQuery.data.info.boleta === -1)
      return (
        <Card classNameCard="">
          <Texto className="text-center text-white">
            Sin Boleta. Por favor genera una nueva
          </Texto>
        </Card>
      );

    return (
      <>
        <View className="flex-row justify-between bg-primario p-4">
          <Texto className="text-white">Modulo</Texto>
          <Texto className="text-white">Materia</Texto>
          <Texto className="text-white">Semestre</Texto>
        </View>

        {!tutorial?.inCourse && boletaQuery.data.data.length == 0 && (
          <View className="border border-t-0 border-primario">
            <Texto className=" p-5 text-center text-black dark:text-white">
              Agrega materias a tu boleta
            </Texto>
          </View>
        )}

        {[2, 3, 4].includes(tutorial?.step || -1) ? (
          <>
            <TourGuideZone
              tourKey={"t-boleta"}
              zone={3}
              text="Desliza para eliminar la materia de tu boleta"
            >
              <SwiperV2
                ref={swiperRef}
                friction={1}
                //       onRightOpen={() => handleDeleteMateria(-1, -1)}
                onRightOpen={() => {
                  setDeleteTutorial(true)
                }}
                renderRightActions={renderRightActions}
                closeOnSwipe={false}
              >
                <View
                  className={` relative flex-row justify-between  border-[0.4px] border-primario p-4 bg-white dark:bg-[#253a68]`}
                >
                  <Texto className="text-black dark:text-white">
                    {deleteTutorial
                      ? "x.x.xxxx"
                      : `  1.1.${new Date().getFullYear()}`}
                  </Texto>
                  <Texto
                    className="text-black dark:text-white text-ellipsis max-w-[60%]"
                    numberOfLines={1}
                  >
                    {deleteTutorial ? "XXXXXXXXX" : " Calculo :'("}
                  </Texto>
                  <Texto className="text-black dark:text-white">
                    {deleteTutorial ? "XXXXX" : " Noche"}
                  </Texto>

                  <Tutorial />
                </View>
              </SwiperV2>
            </TourGuideZone>
          </>
        ) : (
          <>
            {!tutorial?.inCourse && boletaQuery.data.data.map((materia, index) => (
              <SwiperV2
                key={materia.id}
                friction={1.5}
                onRightOpen={() =>
                  confirmationDelete(materia.id, boletaQuery.data.info.boleta)
                }
                renderRightActions={renderRightActions}
                closeOnSwipe
              >
                <View
                  className={`flex-row justify-between  border-[0.4px] border-primario p-4 ${index % 2 == 0
                    ? "bg-[#e5e5e5] dark:bg-[#1c2e55] "
                    : "bg-white dark:bg-[#253a68]"
                    }`}
                >
                  <Texto className="text-black dark:text-white">
                    {materia.modulo}
                  </Texto>
                  <Texto
                    className="text-black dark:text-white text-ellipsis max-w-[60%]"
                    numberOfLines={1}
                  >
                    {materia.materia}
                  </Texto>
                  <Texto className="text-black dark:text-white">
                    {materia.turno}
                  </Texto>
                </View>
              </SwiperV2>
            ))}
          </>
        )}
      </>
    );
  };

  /* useEffect(() => {

    if (tutorial?.inCourse && tutorial?.step != 3) {
      clearTimeout(tuto1)
      clearTimeout(tuto2)
      clearTimeout(tuto3)
      clearTimeout(tuto4)
    }
  }, [tutorial?.step]) */
  return (
    <View className="">
      {(tutorial?.inCourse && ![2, 3, 4].includes(tutorial.step)) ||
        (tutorial?.inCourse && !boletaQuery.data.data) ? (
        <Card classNameCard="">
          <Texto className="mt-2 text-center text-white">
            BOLETA DE PROYECCIÓN
          </Texto>
        </Card>
      ) : (
        <View className="">{renderContent()}</View>
      )}
    </View>
  );
};
export default DetalleBoleta;
