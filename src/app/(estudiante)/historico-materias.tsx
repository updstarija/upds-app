import { useState, useMemo, useEffect } from "react";
import { View, Text, Platform } from "react-native";
import { FlashList } from "@shopify/flash-list";
import {
  TooltipProps,
  TourGuideZone,
  useTourGuideController,
} from "rn-tourguide";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCarreraContext, useRegistroHistorico } from "@/hooks";
import { verTutorial } from "@/helpers";
import { DetalleMateriaV2 } from "@/views/historico-materias";
import { Spinner } from "@/components";
import { Texto } from "@/ui";
import { IRegistroHistorico } from "@/types";

const HistoricoMaterias = () => {
  const { valueCarrera } = useCarreraContext();

  const [blockScroll, setBlockScroll] = useState(true);

  const { registroHistoricoQuery: data } = useRegistroHistorico({
    carrera: valueCarrera || -1,
  });

  const { canStart, start, getCurrentStep, tourKey } =
    useTourGuideController("t-historico-materias");

  useEffect(() => {
    (async () => {
      if (!data.isLoading && !data.isError) {
        if (canStart && (await verTutorial("t-historico-materias"))) {
          start();
          //setTutorialEnCurso(true)

          setTimeout(() => {
            setBlockScroll(false);
          }, 1000);
        } else {
          //setTutorialEnCurso(false)
          setBlockScroll(false);
        }
      }
    })();
  }, [canStart, data.isLoading, data.isError]); // 👈 don't miss it!

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

  if (data.isLoading) return <Spinner />;
  if (data.isError) return <Text className="text-white">HUBO UN ERROR..</Text>;

  const stickyHeaderIndices = newRegistroHistorico
    .map((item, index) => {
      if (typeof item === "string") {
        return index;
      } else {
        return null;
      }
    })
    .filter((item) => item !== null) as number[];

  return (
    <View className="flex-1 bg-white dark:bg-primario-dark">
      <FlashList
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={stickyHeaderIndices}
        scrollEnabled={!blockScroll}
        data={newRegistroHistorico}
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
              <View className="bg-white dark:bg-secondary-dark p-5 shadow">
                <Texto className="text-black dark:text-white text-center">
                  {item}
                </Texto>
              </View>
            );
          } else {
            if (index == 1 || index == 2) {
              let text = "";
              if (index == 1) {
                text =
                  "Presiona en el registro para obtener mas informacion acerca de la materia";
              } else if (index == 2) {
                text = "Desliza para obtener acceso a mas funciones";
              }
              return (
                <>
                  <TourGuideZone

                    tourKey={tourKey}
                    style={{ zIndex: 2 }}
                    zone={index}
                    /*   text={<View className="">
                        <Image
                          source={require(`~/assets/tutoriales/historico-materias-detalle.gif`)}
                          className="w-full h-full"
  
                          contentFit="contain"
                        />
  
                        <Texto>{text}</Texto>
  
                      </View>} */
                    text={text}
                    borderRadius={10}
                  >
                    <DetalleMateriaV2 materia={item} view="detalle-materia" />
                  </TourGuideZone>
                </>
              );
            }
            return <DetalleMateriaV2 materia={item} view="detalle-materia" />;
          }
        }}
      />
    </View>
  );
};

//-145
const App = () => {
  const isIos = Platform.OS === "ios";
  const [tutorialEnCurso, setTutorialEnCurso] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const onSkipOrFinishTutorial = async (x: TooltipProps) => {
    //@ts-ignore
    x?.handleStop();
    setTutorialEnCurso(false);
    await AsyncStorage.setItem("t-historico-materias", "true");
  };

  return (
    <>
      {/* <TourGuideProvider {...{ borderRadius: 16 }} backdropColor="#000000b3" verticalOffset={isIos ? -50 - CONSTANS.statusBarHeight + 6 : -105} preventOutsideInteraction tooltipComponent={(x) => (
        <View className="bg-primario dark:bg-secondary-dark p-2 rounded-xl w-72">
          <Texto className="text-white mb-4 text-center mt-2"> {x.currentStep.text}</Texto>

          <View className="flex-row gap-4 justify-evenly">
            {!x.isLastStep && <TouchableOpacity onPress={() => onSkipOrFinishTutorial(x)}>
              <Texto className="text-white">Saltar</Texto>
            </TouchableOpacity>}

            {!x.isFirstStep && <TouchableOpacity onPress={x.handlePrev}>
              <Texto className="text-white">Anterior</Texto>
            </TouchableOpacity>}

            {!x.isLastStep ? <TouchableOpacity onPress={x.handleNext}>
              <Texto className="text-white">Siguiente</Texto>
            </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => onSkipOrFinishTutorial(x)}>
                <Texto className="text-white">Terminar</Texto>
              </TouchableOpacity>}
          </View>

        </View>)}>
      </TourGuideProvider> */}

      <HistoricoMaterias />
    </>
  );
};

export default App;
