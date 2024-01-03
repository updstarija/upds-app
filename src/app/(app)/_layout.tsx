import React, { useEffect } from "react";
import { Redirect, Slot } from "expo-router";
import { useAuth, useAuthContext } from "@/hooks";
import { useStorageState } from "@/hooks/useStorageState";
import { keysStorage } from "@/data/storage/keys";
import { Texto } from "@/ui";

const AppLayout = () => {
  const { signOut, refreshSession } = useAuth();
  const { welcomeScreen, status } = useAuthContext();

  const [[isLoadingToken, token], setToken] = useStorageState(
    keysStorage.JWT_TOKEN
  );

  useEffect(() => {
    if (!isLoadingToken) {
      if (!token) signOut();
    }
  }, [token, isLoadingToken]);

  console.log(status);
  if (isLoadingToken || status === "pending")
    return <Texto>CARGANDO TOKEN</Texto>;

  return <Slot />;
};

export default AppLayout;
