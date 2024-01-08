import configScreen from "@/helpers/configScreen";
import { Stack } from "expo-router";

const UnprotectedLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        options={configScreen.Stack("Comunicados")}
        name="(home)/announcements/index"
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="(home)/announcements/[id]"
      />

      <Stack.Screen
        name="(home)/social-networks/index"
        options={configScreen.Stack("Redes Sociales")}
      />

      <Stack.Screen
        name="(home)/upds/index"
        options={configScreen.Stack("Upds Tarija")}
      />

      <Stack.Screen
        name="(home)/upds-responde/index"
        options={configScreen.Stack("UPDS Responde")}
      />

      <Stack.Screen
        name="(home)/vocational-test/index"
        options={configScreen.Stack("Test Vocacional")}
      />

      {/* FIN HOME */}
      {/* <Stack.Screen name="(home)" options={{ headerShown: false }} /> */}

      <Stack.Screen
        name="academic-calendar/index"
        options={configScreen.Stack("Calendario Académico")}
      />

      <Stack.Screen
        name="carrer/index"
        options={configScreen.Stack("Carreras")}
      />
      <Stack.Screen
        name="carrer/[id]"
        options={configScreen.Stack("Carrera")}
      />

      <Stack.Screen
        name="config/about/index"
        options={configScreen.Stack("Acerca de")}
      />

      <Stack.Screen
        name="config/guides/index"
        options={configScreen.Stack("Guias")}
      />

      <Stack.Screen
        name="config/notifications/index"
        options={configScreen.Stack("Notificaciones")}
      />

      <Stack.Screen
        name="config/privacy-policy/index"
        options={configScreen.Stack("Políticas de Privacidad")}
      />

      <Stack.Screen
        name="config/terms-of-service/index"
        options={configScreen.Stack("Términos de Uso")}
      />

      <Stack.Screen
        name="config/theme/index"
        options={configScreen.Stack("Tema")}
      />

      <Stack.Screen
        name="config/developer/index"
        options={configScreen.Stack("Developer")}
      />

      <Stack.Screen
        name="faq/index"
        options={configScreen.Stack("Preguntas Frecuentes")}
      />

      <Stack.Screen
        name="notifications/index"
        options={configScreen.Stack("Notificaciones")}
      />

      <Stack.Screen
        name="tutorial/index"
        options={configScreen.Stack("Tutoriales")}
      />

      <Stack.Screen
        name="web/e-libro/index"
        options={configScreen.Stack("Biblioteca UPDS")}
      />

      <Stack.Screen
        name="web/evaluacion-docente/index"
        options={configScreen.Stack("Evaluacion Docente")}
      />

      <Stack.Screen
        name="web/evaluacion-docente/[id]"
        options={configScreen.Stack("Evaluacion Docente")}
      />

      <Stack.Screen
        name="web/moodle/index"
        options={configScreen.Stack("Moodle")}
      />
      <Stack.Screen
        name="web/moodle/[id]"
        options={configScreen.Stack("Aula")}
      />

      <Stack.Screen
        name="web/upds-net/index"
        options={configScreen.Stack("Upds Net")}
      />

      <Stack.Screen
        name="(student)/help/index"
        options={configScreen.Stack("Ayuda")}
      />

      <Stack.Screen
        name="(student)/services/index"
        options={configScreen.Stack("Registro y Pagos")}
      />
    </Stack>
  );
};

export default UnprotectedLayout;
