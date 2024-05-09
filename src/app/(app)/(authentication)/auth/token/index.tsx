import { useAuth } from "@/hooks";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { View, Text } from "react-native";
import Toast from "react-native-toast-message";
const Token = () => {
  const params = useLocalSearchParams<{ token: string }>();
  const { setToken } = useAuth();

  useEffect(() => {
    if (params?.token) {
      setToken(params.token);
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No se pudo autenticar con office 365",
      });
    }
  }, []);

  return (
    <View>
      <Text>Token</Text>
    </View>
  );
};
export default Token;
