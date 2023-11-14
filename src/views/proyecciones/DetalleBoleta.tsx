import {
  View,
  ActivityIndicator,
  Alert
} from "react-native";
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
    step: number
  },
}

const DetalleBoleta: React.FC<Props> = ({ carrera, tutorial }) => {
  const isDark = useThemeColor() === "dark"
  const swiperRef = useRef<SwiperV2Ref>(null);
  const [deleteTutorial, setDeleteTutorial] = useState(false)

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



  if ((tutorial?.inCourse && ![2, 3, 4].includes(tutorial.step)) || (tutorial?.inCourse && !boletaQuery.data.data)) return (<Card classNameCard=" flex">
    <Texto className="mt-2 text-center text-white">BOLETA DE PROYECCION</Texto>
  </Card>)

  const noMostrarMas = async () => {
    await AsyncStorage.setItem(`no-mostrar-confirmacion-eliminacion-materia`, 'true')
  }

  const handleDeleteMateria = async (detalleBoletaId: number, boletaId: number) => {

    if (detalleBoletaId == -1 || boletaId == -1) {
      setDeleteTutorial(true)
      return
    };

    await materiaProyeccionDeleteMutation.mutateAsync({
      detalleBoletaId,
      boletaId,
    });
  };


  const confirmationDelete = async (detalleBoletaId: number, boletaId: number) => {
    const mostrar = await AsyncStorage.getItem(`no-mostrar-confirmacion-eliminacion-materia`)
    if (mostrar == 'true') {
      handleDeleteMateria(detalleBoletaId, boletaId)
      return;
    }



    Alert.alert("Alerta",
      `Estas a punto de eliminar una materia. \n\nEstas seguro?`
      ,
      [{
        text: 'Si', onPress: () => {
          handleDeleteMateria(detalleBoletaId, boletaId)
        }
      }, {
        text: "Si, no quiero volver a realizar la confirmacion", onPress: () => {
          handleDeleteMateria(detalleBoletaId, boletaId)
          noMostrarMas()
        }
      }],
      { cancelable: true }
    )
  }


  const renderRightActions = () => {
    return <View className="bg-red-500 flex-1 items-end justify-center p-2">
      <View className="flex-row items-center">
        <Texto className="text-white">Eliminar</Texto>

        <MaterialCommunityIcons
          name="trash-can"
          size={30}
          color="#fff"

        />
      </View>
    </View>
  }

  const Tutorial = () => {
    if (!tutorial || !tutorial.inCourse) return null

    if (tutorial.step == 3) return <Animatable.View
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
        userSelect: "none"
      }}
    >
      <MaterialCommunityIcons
        name="gesture-swipe-horizontal"
        size={40}
        color={isDark ? "#FFF" : "#000"}

      />
    </Animatable.View>
  }

  const renderContent = () => {
    if (boletaQuery.data.info.boleta === -1)
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

        {boletaQuery.data.data.length == 0 && (
          <View className="border border-t-0 border-primario">
            <Texto className=" p-5 text-center text-black dark:text-white">
              Agrega materias a tu boleta
            </Texto>
          </View>
        )}



        {[2, 3, 4].includes(tutorial?.step || -1) ?
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
                onRightOpen={() => confirmationDelete(-1, -1)}
                renderRightActions={renderRightActions}
                closeOnSwipe
              >
                <View
                  className={` relative flex-row justify-between  border-[0.4px] border-primario p-4 bg-white dark:bg-[#253a68]`}
                >
                  <Texto className="text-black dark:text-white">
                    {deleteTutorial ? "x.x.xxxx" : `  1.1.${new Date().getFullYear()}`}
                  </Texto>
                  <Texto className="text-black dark:text-white text-ellipsis max-w-[60%]" numberOfLines={1}>
                    {deleteTutorial ? "XXXXXXXXX" : " Calculo III :')"}
                  </Texto>
                  <Texto className="text-black dark:text-white">
                    {deleteTutorial ? "XXXXX" : " Noche"}
                  </Texto>

                  <Tutorial />
                </View>
              </SwiperV2>
            </TourGuideZone>
          </>
          :
          <>
            {boletaQuery.data.data.map((materia, index) => (
              <SwiperV2
                key={materia.id}
                friction={1.5}
                onRightOpen={() => handleDeleteMateria(materia.id, boletaQuery.data.info.boleta)}
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
                  <Texto className="text-black dark:text-white text-ellipsis max-w-[60%]" numberOfLines={1}>
                    {materia.materia}
                  </Texto>
                  <Texto className="text-black dark:text-white">
                    {materia.turno}
                  </Texto>
                </View>
              </SwiperV2>
            ))}
          </>}
      </>
    );
  };

  /*   useEffect(() => {
      if (!tutorial?.inCourse) return
  
      if (tutorial.step == 3) {
        setTimeout(() => {
          swiperRef.current?.openRight();
        }, 1000);
      }
    }, [tutorial?.inCourse])
   */

  return (
    <View className="">
      <View className="">{renderContent()}</View>
    </View>
  );
};
export default DetalleBoleta;

