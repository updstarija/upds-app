import { View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Checkbox from "expo-checkbox";
import { Texto } from "@/ui";
import { COLORS } from "~/constants";

type Tutoriales =
  | "t-boleta"
  | "t-historico-materias"
  | "i-materias"
  | "no-mostrar-confirmacion-eliminacion-materia";

const Guides = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [tutoriales, setTutoriales] = useState({
    tutoBoleta: false,
    tutoHistorico: false,
  });

  const [informaciones, setInformaciones] = useState({
    materias: false,
  });

  const [confirmaciones, setConfirmaciones] = useState({
    eliminacionMateria: false,
  });

  const deleteTutoStorage = async (key: Tutoriales) => {
    await AsyncStorage.removeItem(key);
  };

  const setTutoStorage = async (key: Tutoriales) => {
    await AsyncStorage.setItem(key, "true");
  };

  useEffect(() => {
    (async () => {
      const tutoBoleta = await AsyncStorage.getItem("t-boleta");
      const tutoHistorico = await AsyncStorage.getItem("t-historico-materias");

      const iMaterias = await AsyncStorage.getItem("i-materias");

      const cConfirmacionEliminacion = await AsyncStorage.getItem(
        "no-mostrar-confirmacion-eliminacion-materia"
      );

      setTutoriales({
        ...tutoriales,
        tutoBoleta: !Boolean(tutoBoleta),
        tutoHistorico: !Boolean(tutoHistorico),
      });

      setInformaciones({
        materias: !Boolean(iMaterias),
      });

      setConfirmaciones({
        eliminacionMateria: !Boolean(cConfirmacionEliminacion),
      });
    })();
  }, []);
  return (
    <View className="bg-white dark:bg-primario-dark flex-1">
      <Texto className="m-4 mb-0 dark:text-white">
        Activa las opciones si deseas ver las acciones nuevamente.
      </Texto>

      <View className="m-4">
        <Texto className="text-primario" weight="Bold">
          Guias
        </Texto>

        <View className="mt-3 py-1 flex-row items-center justify-between">
          <Texto className="text-black dark:text-white">
            Boleta de Proyecciones
          </Texto>

          <Checkbox
            value={tutoriales.tutoBoleta}
            className="mr-1"
            onValueChange={(x) => {
              if (x) deleteTutoStorage("t-boleta");
              else setTutoStorage("t-boleta");

              setTutoriales({ ...tutoriales, tutoBoleta: x });
            }}
            color={COLORS.light.background}
          />
        </View>

        <View className="mt-3 py-1 flex-row items-center justify-between">
          <Texto className="text-black dark:text-white">
            Registro Histórico
          </Texto>

          <Checkbox
            value={tutoriales.tutoHistorico}
            className="mr-1"
            onValueChange={(x) => {
              if (x) deleteTutoStorage("t-historico-materias");
              else setTutoStorage("t-historico-materias");

              setTutoriales({ ...tutoriales, tutoHistorico: x });
            }}
            color={COLORS.light.background}
          />
        </View>
      </View>

      <View className="m-4">
        <Texto className="text-primario" weight="Bold">
          Informaciones
        </Texto>

        <View className="mt-3 py-1 flex-row items-center justify-between">
          <View className="flex-1">
            <Texto className="text-black dark:text-white">Materia</Texto>
            <Texto className="text-xs text-gray-400">
              Información que se muestra el estado de la materia seleccionada en
              el apartado de proyecciones
            </Texto>
          </View>

          <Checkbox
            value={informaciones.materias}
            className="mr-1"
            onValueChange={(x) => {
              if (x) deleteTutoStorage("i-materias");
              else setTutoStorage("i-materias");

              setInformaciones({ ...informaciones, materias: x });
            }}
            color={COLORS.light.background}
          />
        </View>
      </View>

      <View className="m-4">
        <Texto className="text-primario" weight="Bold">
          Confirmaciones
        </Texto>

        <View className="mt-3 py-1 flex-row items-center justify-between">
          <View className="flex-1">
            <Texto className="text-black dark:text-white">
              Eliminacion de Materia
            </Texto>
            <Texto className="text-xs text-gray-400">
              Confirmación antes de eliminar una materia de la boleta de
              proyecciones
            </Texto>
          </View>

          <Checkbox
            value={confirmaciones.eliminacionMateria}
            className="mr-1"
            onValueChange={(x) => {
              if (x)
                deleteTutoStorage(
                  "no-mostrar-confirmacion-eliminacion-materia"
                );
              else
                setTutoStorage("no-mostrar-confirmacion-eliminacion-materia");

              setConfirmaciones({ ...confirmaciones, eliminacionMateria: x });
            }}
            color={COLORS.light.background}
          />
        </View>
      </View>
    </View>
  );
};

export default Guides;
