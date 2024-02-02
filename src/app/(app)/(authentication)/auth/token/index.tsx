import { useAuthContext } from "@/hooks";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { View, Text } from "react-native";
const Token = () => {
  const params = useLocalSearchParams<{ token: string }>();
  const { setToken } = useAuthContext();

  console.log("🚀 ~ Token ~ params:", params);

  useEffect(() => {
    if (params?.token) {
      setToken(params.token);
    }
  }, []);

  return (
    <View>
      <Text>Token</Text>
    </View>
  );
};
export default Token;
