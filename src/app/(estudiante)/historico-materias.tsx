import { useState, useMemo, useEffect, useRef } from "react";
import { View, Text, BackHandler } from "react-native";
import { FlashList } from "@shopify/flash-list";
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
  const [tutorialEnCurso, setTutorialEnCurso] = useState(true)

  const { valueCarrera } = useCarreraContext();

  const { registroHistoricoQuery: data } = useRegistroHistorico({
    carrera: valueCarrera || -1,
  });

  const { canStart, start, tourKey, eventEmitter, stop } =
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
          setTutorialEnCurso(false)
          return;
        }
        if (canStart && activarTutorial) {
          start();
        }
      }
    })();
  }, [canStart, data.isLoading, data.isError]);


  const handleOnStart = () => {
    setTutorialEnCurso(true)
    listref.current?.scrollToOffset({ animated: true, offset: 0 })
  }

  const handleOnStop = () => setTutorialEnCurso(false)


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

    return () => {
      eventEmitter?.off('start', handleOnStart)
      eventEmitter?.off('stop', handleOnStop)
    }
  }, [])


  if (data.isError) return <Text className="text-white">HUBO UN ERROR..</Text>;


  return (
    <View className="flex-1 bg-white dark:bg-primario-dark">
      <FlashList
        ref={listref}
        stickyHeaderIndices={!data.isLoading ? stickyHeaderIndices : undefined}
        scrollEnabled={!tutorialEnCurso}
        data={!data.isLoading ? newRegistroHistorico : [... new Array(20).fill(0)]}
        estimatedItemSize={50}
        ItemSeparatorComponent={() => (
          <View className="border-[.5px] border-primario" />
        )}
        getItemType={(item) => {
          return typeof item === "string" ? "sectionHeader" : "row";
        }}
        renderItem={({ item, index }) => {
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
            return (
              <>

                <View className="h-12 bg-white dark:bg-secondary-dark justify-center p-4">
                  <View className="w-10" />
                  <Skeleton colorMode={'light'} width={200 + (Math.round(Math.random() * 100))} height={15} />
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
                    borderRadius={10}
                  >
                    <TourGuideZone
                      tourKey={tourKey}
                      style={{ zIndex: 2 }}
                      zone={index + 1}
                      text={tutorialHistoricoSteps[2]}
                      borderRadius={10}
                    >

                      <MateriaHistoricoItem materia={item} withTutorial />
                    </TourGuideZone>

                  </TourGuideZone>

                </>
              );
            }
            return <MateriaHistoricoItem materia={item} />
          }
        }}
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
