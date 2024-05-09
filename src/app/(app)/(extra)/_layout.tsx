import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/hooks";
import LoaderSplash from "@/components/LoaderSplash";
import { useOnboardingStore } from "@/store/useOnboarding.store";

const ExtraLayout = () => {
  const { status } = useAuth();
  const { isViewed } = useOnboardingStore();

  if (status === "pending") {
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
