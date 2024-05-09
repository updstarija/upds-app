import { View, Text, useWindowDimensions } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { parsedData } from "../data/performance-mockup";
import { usePerformance } from "../hooks/use-stats";
import { useCareerStore } from "@/store/useCareers";
import { useMemo } from "react";
import { Spinner } from "@/components";

const PerformanceStudent = () => {
  const { width } = useWindowDimensions();

  const { selectedInscriptionCareer } = useCareerStore();

  const performanceQuerty = usePerformance({
    idInscriptionCareer: selectedInscriptionCareer,
  });

  const data = useMemo(() => {
    if (!performanceQuerty.data?.data?.length) return [];

    return parsedData(performanceQuerty.data?.data);
  }, [performanceQuerty.isLoading]);

  if (performanceQuerty.isLoading)
    return (
      <Spinner style={{ height: 250 }} classNameContainer="bg-transparent" />
    );
  if (performanceQuerty.isError) return null;

  if (!data.length)
    return (
      <View>
        <Text>No data...</Text>
      </View>
    );

  return (
    <LineChart
      width={width - 100}
      adjustToWidth
      isAnimated
      thickness={3}
      color="#223B82"
      maxValue={100}
      noOfSections={5}
      areaChart
      yAxisTextStyle={{ color: "lightgray" }}
      data={data}
      startFillColor={"rgb(34,59,130)"}
      endFillColor={"rgb(176, 193, 245)"}
      startOpacity={0.4}
      endOpacity={0.1}
      spacing={30}
      rulesColor="gray"
      rulesType="solid"
      initialSpacing={10}
      yAxisColor="lightgray"
      xAxisColor="lightgray"

      /*  pointerConfig={{
        pointerStripUptoDataPoint: true,
        pointerStripColor: "lightgray",
        pointerStripWidth: 2,
        strokeDashArray: [2, 5],
        pointerColor: "lightgray",
        radius: 4,
        pointerLabelWidth: 100,
        pointerLabelHeight: 120,
        pointerLabelComponent: (items: any) => {
          return (
            <View className="w-10 h-10 bg-secondary-dark items-center justify-center  rounded-lg">
              <Text style={{ color: "lightgray", fontSize: 12 }}>
                {items[0].value}
              </Text>
            </View>
          );
        },
      }} */
    />
  );
};
export default PerformanceStudent;
