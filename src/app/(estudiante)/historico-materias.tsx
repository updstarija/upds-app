import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { View, Text, BackHandler, FlatList, ListRenderItemInfo } from "react-native";
import {
  TourGuideZone,
  useTourGuideController,
} from "rn-tourguide";
import { useCarreraContext, useRegistroHistorico } from "@/hooks";
import { verTutorial } from "@/helpers";
import { MateriaHistoricoItem } from "@/views";
import { CustomSkeleton, Texto } from "@/ui";
import { IRegistroHistorico } from "@/types";
import { RefreshControl } from "react-native-gesture-handler";

const tutorialHistoricoSteps = {
  1: "Presiona en el registro para obtener mas información acerca de la materia",
  2: "Desliza para obtener acceso a más funcionalidades"
}

const HistoricoMaterias = () => {
  const listref = useRef<FlatList | null>(null);

  const [refreshing, setRefreshing] = useState(false)

  const [tutorialEnCurso, setTutorialEnCurso] = useState({
    inCourse: false,
    step: 1
  })


  const { valueCarrera } = useCarreraContext();

  const { registroHistoricoQuery: data, handleRefresh } = useRegistroHistorico({
    carrera: valueCarrera || -1,
  });

  const { canStart, start, tourKey, eventEmitter, stop, getCurrentStep } =
    useTourGuideController("t-historico-materias");

  const handleBackButtonPress = () => {
    return tutorialEnCurso.inCourse
  };

  useEffect(() => {
    (async () => {
      if (!data.isLoading && !data.isError) {
        const activarTutorial = await verTutorial(tourKey)

        if (!activarTutorial) {
          setTutorialEnCurso({ ...tutorialEnCurso, inCourse: false })
          return;
        }
        if (canStart && activarTutorial) {
          setTutorialEnCurso({ ...tutorialEnCurso, inCourse: true })
          listref.current?.scrollToOffset({ animated: true, offset: 0 })

          setTimeout(() => {
            start();
          }, 1000);
        }
      }
    })();
  }, [canStart, data.isLoading, data.isError]);


  const handleOnStop = () => setTutorialEnCurso({ ...tutorialEnCurso, inCourse: false })

  const handleOnStepChange = (step: any) => {
    setTutorialEnCurso({ ...tutorialEnCurso, step: step?.order || -1 })
  }

  const newRegistroHistorico = useMemo(() => {
    if (data.isLoading || data.isError) return [];

    let newData: (string | IRegistroHistorico)[] = [];
    data.data.data.forEach((item) => {
      newData.push(item.carrera);
      item.materias.forEach((materia) => {
        newData.push(materia);
      });
    });

    return newData;
  }, [data?.data?.data]);


  const stickyHeaderIndices = newRegistroHistorico
    .map((item, index) => {
      if (typeof item === "string") {
        return index;
      } else {
        return null;
      }
    })
    .filter((item) => item !== null) as number[];


  const renderListItem = useCallback(({ item, index }: ListRenderItemInfo<any>) => {
    if (typeof item === "string") {
      return (
        <>
          <View className="bg-white dark:bg-secondary-dark p-5 shadow">
            <Texto className="text-black dark:text-white text-center">
              {item}
            </Texto>
          </View>
        </>
      );

    } else if (typeof item === "number") {
      if (index == 0) {
        return (
          <>
            <View className=" bg-white dark:bg-secondary-dark justify-center p-4">

              <View className="items-center justify-center">
                <CustomSkeleton width={250} height={15} />

              </View>
            </View>

          </>)
      }
      return (
        <>
          <View className="h-12 bg-white dark:bg-secondary-dark justify-center p-4">

            <View className="flex-row items-center justify-between">
              <CustomSkeleton width={200 + (Math.round(Math.random() * 100))} height={15} />
              <CustomSkeleton width={30} height={15} />

            </View>


          </View>

        </>
      );
    } else {
      if (index == 1) {
        return (
          <>
            <TourGuideZone
              tourKey={tourKey}
              style={{ zIndex: 2 }}
              zone={index}
              text={tutorialHistoricoSteps[1]}
            >
              <TourGuideZone
                tourKey={tourKey}
                style={{ zIndex: 2 }}
                zone={index + 1}
                keepTooltipPosition
                text={tutorialHistoricoSteps[2]}
              >
                <MateriaHistoricoItem materia={item} tutorial={tutorialEnCurso} />
              </TourGuideZone>
            </TourGuideZone>
          </>
        );
      }
      return <MateriaHistoricoItem materia={item} />
    }
  }, [tutorialEnCurso]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButtonPress
    );

    return () => backHandler.remove();
  }, [tutorialEnCurso.inCourse]);

  useEffect(() => {
    eventEmitter?.on('stop', handleOnStop)
    eventEmitter?.on('stepChange', handleOnStepChange)

    return () => {
      eventEmitter?.off('stop', handleOnStop)
      eventEmitter?.off('stepChange', handleOnStepChange)
    }
  }, [tutorialEnCurso.inCourse])


  useEffect(() => {
    return () => {
      stop()
    }
  }, [])


  if (data.isError) return <Text className="text-white">HUBO UN ERROR..</Text>;


  return (
    <View className="flex-1 bg-white dark:bg-primario-dark">
      <FlatList
        // ref={listref}
        stickyHeaderIndices={!data.isLoading ? stickyHeaderIndices : undefined}
        scrollEnabled={!tutorialEnCurso.inCourse}
        data={!data.isLoading ? tutorialEnCurso.inCourse ? newRegistroHistorico.slice(0, 5) : newRegistroHistorico : [... new Array(15).fill(0)]}
        // estimatedItemSize={50}
        extraData={tutorialEnCurso}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        ItemSeparatorComponent={() => (
          <View className="border-[.5px] border-primario" />
        )}
        renderItem={renderListItem}
      />
    </View>
  );


};

export default HistoricoMaterias;
