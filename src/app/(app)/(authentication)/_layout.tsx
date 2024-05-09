import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/hooks";
import { Texto } from "@/ui";
import { useOnboardingStore } from "@/store/useOnboarding.store";

const LayoutAuthentication = () => {
  const { status } = useAuth();
  const { isViewed } = useOnboardingStore();

  if (status === "pending") {
    return <Texto>VERIFING SESSION AND WELCOME SCREEN</Texto>;
  }

  if (!isViewed) {
    return <Redirect href={"/welcome"} />;
  }

  if (status === "authenticated" && isViewed) {
    return <Redirect href={"/"} />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="auth/login/index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default LayoutAuthentication;
