import { formatDateForDisplay } from "@/helpers/formatDateForDisplay";
import { useThemeColor } from "@/hooks";
import { CustomBottomSheetModal, CustomSkeleton, Texto } from "@/ui";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import clsx from "clsx";
import { View, TouchableOpacity } from "react-native";
import { Button } from "../Button";
import Spacer from "../Spacer";

const NotificationSkeleton = () => {
  const isDark = useThemeColor() === "dark";

  return (
    <View
      className={clsx(["bg-gray-200 dark:bg-[#0a1f4a]  rounded-lg px-4 py-2"])}
    >
      <View className="flex-row justify-between items-center ">
        <TouchableOpacity className="flex-1 mr-4">
          <CustomSkeleton width={100} height={15} />

          <Spacer />
          <CustomSkeleton width={200} height={15} />
          <Spacer />

          <CustomSkeleton width={80} height={15} />
        </TouchableOpacity>

        <View className="p-2  items-center justify-center">
          <CustomSkeleton width={30} height={15} />
        </View>
      </View>
    </View>
  );
};
export default NotificationSkeleton;
