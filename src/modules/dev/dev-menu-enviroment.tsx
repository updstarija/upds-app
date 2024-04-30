import { CustomBottomSheetModal, CustomButton, Texto } from "@/ui";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text } from "react-native";
const DevMenuEnviroment = () => {
  const env = process.env;

  const envObj: any = {
    EXPO_PUBLIC_APP_NAME: process.env.EXPO_PUBLIC_APP_NAME,
    EXPO_PUBLIC_API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL,

    EXPO_PUBLIC_MODE: process.env.EXPO_PUBLIC_MODE,
    EXPO_PUBLIC_DEV: process.env.EXPO_PUBLIC_DEV,
    EXPO_PUBLIC_PROD: process.env.EXPO_PUBLIC_PROD,
  };
  return (
    <View>
      <CustomBottomSheetModal
        content={
          <View className="absolute bottom-10 left-3 bg-primario p-4 rounded-full w-14 h-14 items-center justify-center">
            <Texto>
              <MaterialCommunityIcons name="code-tags" color="#FFF" size={20} />
            </Texto>
          </View>
        }
      >
        {Object.keys(envObj).map((key) => (
          <View key={key} className="flex-row justify-between items-center p-4">
            <Texto>{key.replace("EXPO_PUBLIC_", "")}</Texto>
            <Texto className="">{envObj[key]}</Texto>
          </View>
        ))}
      </CustomBottomSheetModal>
    </View>
  );
};
export default DevMenuEnviroment;
