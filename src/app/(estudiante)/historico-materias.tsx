import { useState, useMemo, useEffect } from 'react';
import { View, Text, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  TooltipProps,
  TourGuideProvider,
  TourGuideZone,
  useTourGuideController,
} from 'rn-tourguide'
import { FlashList } from '@shopify/flash-list';
import CONSTANS from 'expo-constants'
import { useCarreraContext, useRegistroHistorico } from '@/hooks';
import { Texto } from '../../components';
import Spinner from '@/components/ui/Spinner';
import { DetalleMateriaV2 } from '@/views/historico-materias';
import { IRegistroHistorico } from '@/types';
import { verTutorial } from '@/helpers';

const HistoricoMaterias = () => {
  const { valueCarrera } = useCarreraContext();

  const [blockScroll, setBlockScroll] = useState(true)

  const { registroHistoricoQuery: data } = useRegistroHistorico({
    carrera: valueCarrera || -1
  })

  const {
    canStart,
    start,
    tourKey,

  } = useTourGuideController()

  useEffect(() => {
    (async () => {
      if (!data.isLoading && !data.isError) {
        if (canStart && await verTutorial("t-historico-materias")) {

          start()
          //setTutorialEnCurso(true)

          setTimeout(() => {
            setBlockScroll(false)
          }, 1000);
        } else {
          //setTutorialEnCurso(false)
          setBlockScroll(false)

        }
      }
    })()
  }, [canStart, data.isLoading, data.isError]) // 👈 don't miss it!


  const newRegistroHistorico = useMemo(() => {
    if (data.isLoading || data.isError) return []

    let newData: (string | IRegistroHistorico)[] = []
    data.data.data.forEach(item => {
      newData.push(item.carrera);
      item.materias.forEach(materia => {
        newData.push(materia);
      });
    });

    return newData
  }, [data?.data?.data])

  const stickyHeaderIndices = newRegistroHistorico.map((item, index) => {
    if (typeof item === "string") {
      return index;
    } else {
      return null;
    }
  }).filter((item) => item !== null) as number[];

  if (data.isLoading) return <Spinner />;
  if (data.isError) return <Text className='text-white'>HUBO UN ERROR..</Text>;



  return (
    <View className='flex-1'>
      <FlashList
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={stickyHeaderIndices}
        scrollEnabled={!blockScroll}
        data={newRegistroHistorico}
        estimatedItemSize={200}
        ItemSeparatorComponent={() => <View className='border-[.5px] border-primario' />}
        getItemType={(item) => {
          return typeof item === "string" ? "sectionHeader" : "row";
        }}
        renderItem={({ item, index }) => {
          if (typeof item === "string") {
            return <View className='bg-white dark:bg-secondary-dark p-5 shadow'><Texto className='text-black dark:text-white text-center'>{item}</Texto></View>;
          } else {
            if (index == 1 || index == 2) {
              let text = ""
              if (index == 1) {
                text = "Presiona en el registro para obtener mas informacion acerca de la materia"
              } else if (index == 2) {
                text = "Desliza para obtener acceso a mas funciones"
              }
              return <>
                <TourGuideZone style={{ zIndex: 2 }} zone={index} text={text} borderRadius={10} >
                  <DetalleMateriaV2 materia={item} />
                </TourGuideZone>
              </>
            }
            return <DetalleMateriaV2 materia={item} />
          }
        }} />
    </View>
  );
};

const App = () => {
  const isIos = Platform.OS === "ios";
  const [tutorialEnCurso, setTutorialEnCurso] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  const onSkipOrFinishTutorial = async (x: TooltipProps) => {
    //@ts-ignore
    x?.handleStop()
    setTutorialEnCurso(false)
    await AsyncStorage.setItem("t-historico-materias", "true")
  }

  return (
    <>
      {/*  <TourGuideProvider {...{ borderRadius: 16 }} backdropColor="#000000b3" verticalOffset={isIos ? -50 - CONSTANS.statusBarHeight + 6 : -105} preventOutsideInteraction tooltipComponent={(x) => (
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
  )
}

export default App;

