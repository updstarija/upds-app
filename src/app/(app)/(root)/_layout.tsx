import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import configScreen from "@/helpers/configScreen";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="(drawer)"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="(screens)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default RootLayout;
