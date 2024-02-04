import { View, Text } from "react-native";
import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuthContext } from "@/hooks";
import { Texto } from "@/ui";
import LoaderSplash from "@/components/LoaderSplash";
import { useOnboardingStore } from "@/store/useOnboarding.store";

const ExtraLayout = () => {
  const { status, welcomeScreen } = useAuthContext();
  const { isViewed } = useOnboardingStore();

  if (status === "pending" || welcomeScreen.isLoading) {
    return <LoaderSplash />;
  }

  if (status !== "authenticated" && isViewed) {
    return <Redirect href={"/auth/login"} />;
  }

  if (isViewed) {
    return <Redirect href={"/"} />;
  }

  return (
    <Stack>
      <Stack.Screen name="welcome/index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default ExtraLayout;
