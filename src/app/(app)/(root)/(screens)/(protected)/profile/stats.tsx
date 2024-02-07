import { View, ScrollView } from "react-native";
import { Texto } from "@/ui";
import { useProgreso, usePromedio, useThemeColor } from "@/hooks";
import { SelectCarrera } from "@/views/SelectCarrera";
import { COLORS } from "~/constants";
import Counter from "@/components/Counter";
import CircularProgress from "react-native-circular-progress-indicator";
import Spinner from "@/components/Spinner";
import { useCareerStore } from "@/store/useCareers";

const Stats = () => {
  const isDarkMode = useThemeColor() === "dark";

  const { selectedCareer } = useCareerStore();

  const { promedioQuery } = usePromedio({
    carrera: selectedCareer || -1,
    tiempo: 1,
  });

  const { progresoQuery } = useProgreso({
    carrera: selectedCareer || -1,
  });

  const renderPromedio = () => {
    if (promedioQuery.isLoading)
      return (
        <Spinner style={{ height: 150 }} classNameContainer="bg-transparent" />
      );
    if (promedioQuery.isError) return null;

    return (
      <>
        <View className="items-center justify-center">
          <Counter max={promedioQuery.data.data.promedio} />
        </View>
      </>
    );
  };

  const renderProgreso = () => {
    if (progresoQuery.isLoading)
      return (
        <Spinner style={{ height: 150 }} classNameContainer="bg-transparent" />
      );
    if (progresoQuery.isError) return null;

    return (
      <>
        <View className="items-center justify-center">
          <CircularProgress
            value={progresoQuery.data.data.progreso}
            duration={1000}
            maxValue={100}
            activeStrokeColor={COLORS.light.background}
            progressValueStyle={{ fontFamily: "LatoBold" }}
            activeStrokeWidth={20}
            radius={90}
            valueSuffix="%"
            titleColor="black"
            progressValueColor={isDarkMode ? "#FFF" : "#000"}
            subtitleColor="red"
          />
          {/* <PieChart
    donut
    innerRadius={80}

    data={pieData}
    gradientCenterColor='#000'
    innerCircleColor={isDarkMode ? '#0D1F46' : '#fff'}
    centerLabelComponent={() => {
        return <View ><Texto className='text-black dark:text-white text-4xl' weight='Bold'>70%</Texto></View>;
    }}
/> */}
        </View>
      </>
    );
  };

  return (
    <View className="bg-white dark:bg-primario-dark flex-1">
      <View className="p-2 z-10">
        <SelectCarrera />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flex: 1 }}
      >
        <View className="flex-1  px-2 gap-2">
          <>
            <View
              className="bg-white dark:bg-primario-dark rounded-xl"
              style={{ elevation: 10 }}
            >
              <View className="bg-yellow-200  rounded-xl p-4 border-gray-50  border-[.5px] dark:border-[0px] ">
                <Texto className=" dark:text-black text-xs " weight="Light">
                  El promedio mostrado es una estimación o aproximación. Los
                  cálculos finales pueden variar ligeramente debido a
                  actualizaciones que puedan surgir.
                </Texto>
              </View>
            </View>
            <View
              className="bg-white dark:bg-primario-dark rounded-xl"
              style={{ elevation: 10 }}
            >
              <View className="bg-white dark:bg-secondary-dark  rounded-xl p-4 border-gray-300  border-[.5px] dark:border-[0px] ">
                <Texto
                  className="text-black dark:text-white text-center text-xl my-3"
                  weight="Bold"
                >
                  PROMEDIO
                </Texto>
                {renderPromedio()}
              </View>
            </View>

            <View
              className="bg-white dark:bg-primario-dark rounded-xl"
              style={{ elevation: 10 }}
            >
              <View className="bg-white dark:bg-secondary-dark  rounded-xl p-4 border-gray-300  border-[.5px] dark:border-[0px] ">
                <Texto
                  className="text-black dark:text-white text-center text-xl my-3"
                  weight="Bold"
                >
                  PROGRESO
                </Texto>

                {/* <SelectCarrera /> */}

                {renderProgreso()}
              </View>
            </View>

            {/*    <View className='bg-white dark:bg-primario-dark rounded-xl' style={{ elevation: 10 }}>
                            <View className='bg-white dark:bg-secondary-dark  rounded-xl p-6 border-gray-300  border-[.5px] dark:border-[0px] '>
                                <Texto className='text-black dark:text-white text-center text-xl my-3' weight='Bold'>RENDIMIENTO</Texto>

                               

                                <View className='items-center justify-center mt-10'>

                                    <LineChart
                                        width={Dimensions.get("window").width - 100}
                                        isAnimated
                                        thickness={3}
                                        color="#07BAD1"
                                        maxValue={600}
                                        noOfSections={3}
                                        animateOnDataChange
                                        animationDuration={10}
                                        onDataChangeAnimationDuration={10}
                                        areaChart
                                        yAxisTextStyle={{ color: 'lightgray' }}
                                        data={currentData == 1 ? latestData : afterData}
                                        hideDataPoints
                                        startFillColor={'rgb(84,219,234)'}
                                        endFillColor={'rgb(84,219,234)'}
                                        startOpacity={0.4}
                                        endOpacity={0.1}
                                        spacing={22}

                                        rulesColor="gray"
                                        rulesType="solid"
                                        initialSpacing={10}
                                        yAxisColor="lightgray"
                                        xAxisColor="lightgray"
                                    />
                                </View>
                            </View>
                        </View> */}
          </>
        </View>
      </ScrollView>
    </View>
  );
};

export default Stats;
