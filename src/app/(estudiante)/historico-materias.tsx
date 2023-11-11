import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { View, Text, BackHandler } from "react-native";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import {
  TourGuideZone,
  useTourGuideController,
} from "rn-tourguide";
import { Skeleton } from "moti/skeleton";
import { useCarreraContext, useRegistroHistorico } from "@/hooks";
import { verTutorial } from "@/helpers";
import { MateriaHistoricoItem } from "@/views";
import { Texto } from "@/ui";
import { IRegistroHistorico } from "@/types";

const tutorialHistoricoSteps = {
  1: "Presiona en el registro para obtener mas informacion acerca de la materia",
  2: "Desliza para obtener acceso a mas funciones"
}

const HistoricoMaterias = () => {
  const listref = useRef<FlashList<IRegistroHistorico> | null>(null);

  const [tutorialEnCurso, setTutorialEnCurso] = useState({
    inCourse: true,
    step: 1
  })


  const { valueCarrera } = useCarreraContext();

  const { registroHistoricoQuery: data } = useRegistroHistorico({
    carrera: valueCarrera || -1,
  });

  const { canStart, start, tourKey, eventEmitter, stop, getCurrentStep } =
    useTourGuideController("t-historico-materias");

  const handleBackButtonPress = () => {
    if (tutorialEnCurso) stop()
    return !tutorialEnCurso
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
          start();
        }
      }
    })();
  }, [canStart, data.isLoading, data.isError]);


  const handleOnStart = () => {
    setTutorialEnCurso({ ...tutorialEnCurso, inCourse: true })
    listref.current?.scrollToOffset({ animated: true, offset: 0 })
  }

  const handleOnStop = () => setTutorialEnCurso({ ...tutorialEnCurso, step: tutorialEnCurso.step + 1 })

  const handleOnStepChange = () => {
    setTutorialEnCurso({ ...tutorialEnCurso, step: tutorialEnCurso.step + 1 })
    //    console.log(getCurrentStep()?.order);
  }
  //console.log(getCurrentStep());
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

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButtonPress
    );

    return () => backHandler.remove();
  }, [tutorialEnCurso]);

  useEffect(() => {
    eventEmitter?.on('start', handleOnStart)
    eventEmitter?.on('stop', handleOnStop)
    eventEmitter?.on('stepChange', handleOnStepChange)

    return () => {
      eventEmitter?.off('start', handleOnStart)
      eventEmitter?.off('stop', handleOnStop)
      eventEmitter?.off('stepChange', handleOnStepChange)
    }
  }, [canStart, tutorialEnCurso])


  if (data.isError) return <Text className="text-white">HUBO UN ERROR..</Text>;

  const renderListItem = useCallback((list: ListRenderItem<any>) => {
    return <></>
  }, []);
  return (
    <View className="flex-1 bg-white dark:bg-primario-dark">
      <FlashList
        ref={listref}
        stickyHeaderIndices={!data.isLoading ? stickyHeaderIndices : undefined}
        scrollEnabled={!tutorialEnCurso}
        data={!data.isLoading ? newRegistroHistorico : [... new Array(20).fill(0)]}
        estimatedItemSize={50}
        extraData={tutorialEnCurso}
        ItemSeparatorComponent={() => (
          <View className="border-[.5px] border-primario" />
        )}
        renderItem={renderListItem}
      />
    </View>
  );


};



//-145
function App() {
  const [tutorialEnCurso, setTutorialEnCurso] = useState(false);

  return (
    <HistoricoMaterias

    />
  );
}

export default App;
