import CONSTANTS, { CONSTANT_TYPE } from "@/constants/CONSTANTS";
import { CustomBottomSheetModal, CustomButton, Texto } from "@/ui";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import { FirebaseNotification } from "~/constants/Firebase";
const DevMenuEnviroment = () => {
  const env = process.env;

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
        {Object.keys(CONSTANTS).map((key) => (
          <View key={key} className="flex-row justify-between items-center p-4">
            <Texto>{key.replace("EXPO_PUBLIC_", "")}</Texto>
            <Texto className="">{CONSTANTS[key as CONSTANT_TYPE]}</Texto>
          </View>
        ))}
        <View className="flex-row justify-between items-center p-4">
          <Texto>NOTIFICATION TOPIC</Texto>
          <Texto className="">{FirebaseNotification.NOTIFICATION_TOPIC}</Texto>
        </View>
      </CustomBottomSheetModal>
    </View>
  );
};
export default DevMenuEnviroment;
