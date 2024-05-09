import { Texto } from "@/ui";
import { View } from "react-native";
import { PerformanceStudent } from "../services/stats-service";

const DPoint = () => {
  return (
    <View
      className="w-3 h-3 bg-white  dark:bg-primario border rounded-full border-primario dark:border-white"
      /*   style={{
        width: 14,
        height: 14,
        backgroundColor: "white",
        borderWidth: 3,
        borderRadius: 7,
        borderColor: "#0D1F46",
      }} */
    />
  );
};

export const initialPerformance = {
  value: 0,
  labelComponent: () => <Texto>0</Texto>,
  customDataPoint: () => <DPoint />,
};

export const parsedData = (data: PerformanceStudent[]) => {
  return [
    initialPerformance,
    ...data.map((val, index) => {
      const isInitial = index === 0;
      return {
        value: val.nota,
        labelComponent: () => {
          if (isInitial) return null;

          const isEqual = data[index - 1]?.nota === val.nota;
          const isIncrement = data[index - 1]?.nota < val.nota;

          if (isEqual) return null;

          if (val.nota)
            return isIncrement ? (
              <Texto className="text-green-500" weight="Bold">
                +
              </Texto>
            ) : (
              <Texto className="text-red-500" weight="Bold">
                -
              </Texto>
            );
        },

        customDataPoint: () => <DPoint />,
        /*   dataPointLabelComponent: () => {
          return (
            <View
              style={{
                backgroundColor: "black",
                paddingHorizontal: 8,
                paddingVertical: 5,
                borderRadius: 4,
              }}
            >
              <Texto style={{ color: "white" }}>410</Texto>
            </View>
          );
        }, */
      };
    }),
  ];
};
