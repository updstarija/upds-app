import configScreen from "@/helpers/configScreen";
import { Stack } from "expo-router";

const UnprotectedLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(home)" options={{ headerShown: false }} />

      <Stack.Screen
        name="academic-calendar/index"
        options={configScreen.Stack("CALENDARIO ACADÉMICO")}
      />

      <Stack.Screen
        name="carrer/index"
        options={configScreen.Stack("CARRERAS")}
      />

      <Stack.Screen
        name="config/about/index"
        options={configScreen.Stack("ACERCA DE")}
      />

      <Stack.Screen
        name="config/guides/index"
        options={configScreen.Stack("GUIAS")}
      />

      <Stack.Screen
        name="config/notifications/index"
        options={configScreen.Stack("NOTIFICACIONES")}
      />

      <Stack.Screen
        name="config/privacy-policy/index"
        options={configScreen.Stack("POLÍTICAS DE PRIVACIDAD")}
      />

      <Stack.Screen
        name="config/terms-of-service/index"
        options={configScreen.Stack("TÉRMINOS DE USO")}
      />

      <Stack.Screen
        name="config/theme/index"
        options={configScreen.Stack("TEMA")}
      />

      <Stack.Screen
        name="faq/index"
        options={configScreen.Stack("PREGUNTAS FRECUENTES")}
      />

      <Stack.Screen
        name="tutorial/index"
        options={configScreen.Stack("NOTIFICACIONES")}
      />

      <Stack.Screen
        name="web/e-libro/index"
        options={configScreen.Stack("NOTIFICACIONES")}
      />

      <Stack.Screen
        name="web/evaluacion-docente/index"
        options={configScreen.Stack("NOTIFICACIONES")}
      />

      <Stack.Screen
        name="web/moodle/index"
        options={configScreen.Stack("NOTIFICACIONES")}
      />

      <Stack.Screen
        name="web/upds-net/index"
        options={configScreen.Stack("NOTIFICACIONES")}
      />
    </Stack>
  );
};

export default UnprotectedLayout;
