import { CustomSkeleton } from "@/ui";
import { View, Text, useWindowDimensions } from "react-native";
import Spacer from "../Spacer";
import { IconLabel } from "../IconLabel";
import { Icon, IconType } from "../Icon";
import { useThemeColor } from "@/hooks";

const AnnouncementDetailSkeleton = () => {
  const { width, height } = useWindowDimensions();
  const isDark = useThemeColor() === "dark";
  return (
    <View className="flex-1 bg-white dark:bg-secondary-dark">
      <View className="">
        <CustomSkeleton width={width} height={400} />

        <Spacer height={20} />

        <View className="mb-10 ">
          <View className="flex-row justify-evenly">
            <View className="flex-row items-center   ">
              <Icon
                icon={{
                  type: IconType.AntDesign,
                  name: "like2",
                }}
                color={isDark ? "#FFF" : "#000"}
                size={25}
              />
              <CustomSkeleton width={50} height={15} />
            </View>

            <View className="flex-row items-center  ">
              <Icon
                icon={{
                  type: IconType.AntDesign,
                  name: "calendar",
                }}
                size={25}
                color={isDark ? "#FFF" : "#000"}
              />
              <CustomSkeleton width={80} height={15} />
            </View>
          </View>
        </View>
      </View>

      <View
        className={`flex-1 bg-white dark:bg-secondary-dark border border-gray-100 dark:border-primario shadow-sm shadow-primario `}
        style={{
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          elevation: 40,
          borderBottomWidth: 0,
        }}
      >
        <View className=" w-80 rounded-xl p-2  mt-[-20px] relative mx-auto">
          <CustomSkeleton
            width={"100%"}
            colors={["#243E89", "#2F489C", "#0e2264"]}
          />
        </View>

        <View className="p-4">
          <IconLabel
            iconName={"view-dashboard"}
            textButton={"TEXT"}
            loader={<CustomSkeleton width={100} height={20} />}
          />

          <Spacer height={20} />
          <CustomSkeleton width={"100%"} height={50} />
        </View>
      </View>
    </View>
  );
};
export default AnnouncementDetailSkeleton;
