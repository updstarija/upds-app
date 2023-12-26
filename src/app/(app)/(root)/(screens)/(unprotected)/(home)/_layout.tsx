import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { configStack } from "@/helpers";
import configScreen from "@/helpers/configScreen";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        options={configScreen.Stack("Comunicados")}
        name="announcements/index"
      />

      <Stack.Screen
        options={configScreen.Stack("Comunicado")}
        name="announcements/[id]"
      />

      <Stack.Screen
        name="social-networks/index"
        options={configScreen.Stack("Redes Sociales")}
      />

      <Stack.Screen
        name="upds/index"
        options={configScreen.Stack("Upds Tarija")}
      />

      <Stack.Screen
        name="upds-responde/index"
        options={configScreen.Stack("UPDS Responde")}
      />

      <Stack.Screen
        name="vocational-test/index"
        options={configScreen.Stack("Test Vocacional")}
      />
    </Stack>
  );
};

export default Layout;
