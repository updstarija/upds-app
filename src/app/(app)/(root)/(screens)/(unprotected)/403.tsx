import { View, Text, BackHandler } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";

const NoAuth403 = () => {
  const { callbackUrl = "" } = useLocalSearchParams<{ callbackUrl: string }>();

  const handleBackButtonPress = () => {
    console.log("XDD");
    return true;
  };

  /*   useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButtonPress
    );

    return () => backHandler.remove();
  }, []); */

  return (
    <View>
      <Text>NoAuth403 {callbackUrl}</Text>
    </View>
  );
};

export default NoAuth403;
