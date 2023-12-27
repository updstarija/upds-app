import React, { useEffect } from "react";
import { Redirect, Slot } from "expo-router";
import { useAuth, useAuthContext } from "@/hooks";
import { useStorageState } from "@/hooks/useStorageState";
import { keysStorage } from "@/data/storage/keys";
import { Texto } from "@/ui";

const AppLayout = () => {
  const { signOut, refreshLogin } = useAuth();
  const { welcomeScreen } = useAuthContext();

  const [[isLoadingToken, token], setToken] = useStorageState(
    keysStorage.JWT_TOKEN
  );

  useEffect(() => {
    if (!token) signOut();
    else {
      refreshLogin();
    }
  }, [token]);

  if (isLoadingToken) return <Texto>CARGANDO TOKEN</Texto>;

  return <Slot />;
};

export default AppLayout;
