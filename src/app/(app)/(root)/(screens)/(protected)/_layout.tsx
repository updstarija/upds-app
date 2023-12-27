import { CarreraProvider } from "@/context";
import { ProyeccionesProvider } from "@/context/ProyeccionesContext";
import configScreen from "@/helpers/configScreen";
import { useAuthContext } from "@/hooks";
import { Redirect, Stack } from "expo-router";

const UnprotectedLayout = () => {
  const { status } = useAuthContext();
  console.log("RENDER PROYECTED LAYOUT");

  if (status !== "authenticated") {
    return <Redirect href={"/auth/login"} />;
  }

  return (
    <CarreraProvider>
      <Stack>
        <Stack.Screen
          name="historical-academic/index"
          options={configScreen.Stack("Historico Registro")}
        />

        <Stack.Screen name="profile" options={configScreen.Stack("Perfil")} />

        <Stack.Screen
          name="projections"
          options={configScreen.Stack("Proyecciones")}
        />
      </Stack>
    </CarreraProvider>
  );
};

export default UnprotectedLayout;
