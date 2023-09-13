import { Text, View } from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks";

interface Props {
  iconName: string;
  textButton: string;
}

export const IconLabel: React.FC<Props> = ({ iconName, textButton }) => {
  const isDarkMode = useThemeColor() === "dark"
  return (
    <>
      <View className="flex-row mr-2">

        {iconName == "view-dashboard"
          ? <MaterialCommunityIcons
            //@ts-ignore
            name={iconName}
            size={16}
            color={isDarkMode ? "#FFF" : "#000"}
            style={{ marginRight: 2 }}
          />
          :
          <AntDesign
            //@ts-ignore
            name={iconName}
            size={16}
            color={isDarkMode ? "#FFF" : "#000"}
            style={{ marginRight: 2 }}
          />
        }


        <Text className="text-black dark:text-white text-xs">{textButton}</Text>
      </View>
    </>
  );
};
