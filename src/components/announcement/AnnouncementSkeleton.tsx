import { CustomSkeleton } from "@/ui";
import { View, Text, useWindowDimensions } from "react-native";
import { IconLabel } from "../IconLabel";
import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Icon, IconType } from "../Icon";
const AnnouncementSkeleton = () => {
  const { width, height } = useWindowDimensions();

  return (
    <View
      className="bg-primario dark:bg-secondary-dark  rounded-xl  overflow-hidden"
      style={{
        position: "relative",
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.19,
        shadowRadius: 5.62,
        elevation: 6,
      }}
    >
      <View>
        <CustomSkeleton width={width} height={200} radius={0} />
      </View>

      <View className="p-2 bg-white dark:bg-secondary-dark rounded-xl  rounded-t-none">
        <CustomSkeleton
          width={100 + Math.round(Math.random() * 100)}
          height={20}
        />

        <View className="flex-row items-center   mt-2 ">
          <Icon
            icon={{
              type: IconType.MaterialCommunityIcons,
              name: "view-dashboard",
            }}
          />
          <CustomSkeleton width={150} height={15} />
        </View>

        <View className="flex-row justify-between mt-2">
          <View className="flex-row items-center    ">
            <Icon
              icon={{
                type: IconType.AntDesign,
                name: "like2",
              }}
            />

            <CustomSkeleton width={40} height={15} />
          </View>

          <View className="flex-row items-center">
            <Icon
              icon={{
                type: IconType.AntDesign,
                name: "calendar",
              }}
            />
            <CustomSkeleton width={80} height={15} />
          </View>
        </View>
      </View>
    </View>
  );
};
export default AnnouncementSkeleton;
