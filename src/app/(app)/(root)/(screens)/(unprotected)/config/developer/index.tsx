import { View, Text, Button } from "react-native";
import React from "react";
import { keysStorage } from "@/data/storage/keys";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Developer = () => {
  const removeItem = async (x: string) => {
    await AsyncStorage.removeItem(x);
  };
  return (
    <View>
      {Object.keys(keysStorage).map((x) => (
        <Button
          onPress={() => removeItem(x)}
          title={`REMOVE  -> ${x}`}
          key={x}
        />
      ))}
    </View>
  );
};

export default Developer;
