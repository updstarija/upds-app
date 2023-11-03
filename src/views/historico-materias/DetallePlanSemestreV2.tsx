import { View, useWindowDimensions } from "react-native";
import { useCarreraContext, usePlanEstudio } from "@/hooks";
import { Button, Spinner } from "@/components";
import { ISemestre } from "@/types";
import { FontAwesome } from "@expo/vector-icons";
import DetalleMateriaV2 from "./DetalleMateriaV2";
import { Texto } from "@/ui";
import { FlashList } from "@shopify/flash-list";
import { FlatList } from "react-native-gesture-handler";
import DetalleMateriaV3 from "./DetalleMateriaV3";

interface Props {
  semestre: ISemestre;
  active: boolean;
  onChangeSemestre: Function;
}

const mock = [
  {
    estado: {
      id: 2,
      nombre: "awd",
    },
    fechaRegistro: "",
    grupo: 2343,
    grupoMaestro: 343,
    id: 554,
    moodle: 34,
    nombre: "AWD'",
    nota: 99,
  },
  {
    estado: {
      id: 2,
      nombre: "awd",
    },
    fechaRegistro: "",
    grupo: 2343,
    grupoMaestro: 343,
    id: 40,
    moodle: 34,
    nombre: "AWD'",
    nota: 99,
  },
  {
    estado: {
      id: 2,
      nombre: "awd",
    },
    fechaRegistro: "",
    grupo: 2343,
    grupoMaestro: 343,
    id: 48,
    moodle: 34,
    nombre: "AWD'",
    nota: 99,
  },
  {
    estado: {
      id: 2,
      nombre: "awd",
    },
    fechaRegistro: "",
    grupo: 2343,
    grupoMaestro: 343,
    id: 46,
    moodle: 34,
    nombre: "AWD'",
    nota: 99,
  },
  {
    estado: {
      id: 2,
      nombre: "awd",
    },
    fechaRegistro: "",
    grupo: 2343,
    grupoMaestro: 343,
    id: 45,
    moodle: 34,
    nombre: "AWD'",
    nota: 99,
  },
  {
    estado: {
      id: 2,
      nombre: "awd",
    },
    fechaRegistro: "",
    grupo: 2343,
    grupoMaestro: 343,
    id: 34,
    moodle: 34,
    nombre: "AWD'",
    nota: 99,
  },
]
export const DetallePlanSemestreV2: React.FC<Props> = ({
  semestre,
  active,
  onChangeSemestre,
}) => {
  const { id, nombre } = semestre;
  const { width, height } = useWindowDimensions()

  const getDetalle = () => {
    return (
      <View className="h-full w-full flex-1" style={{ width }}>
        {/*     <FlatList
          data={mock}
          // estimatedItemSize={30}
          renderItem={({ item }) => (
            <DetalleMateriaV3
              materia={item}
              view="requisitos"
            />
          )}
        /> */}

        {mock.map(x => (
          <DetalleMateriaV3
            materia={x}
            key={x.id}
            view="requisitos"
          />
        ))}
      </View>
    );
  };

  return (
    <View className="">
      <Button onPress={() => onChangeSemestre(semestre.id)}>
        <View className="flex-row justify-between bg-[#223B82] p-3 dark:bg-[#0D1F46]">
          <Texto className="uppercase text-white" weight="Bold">
            {nombre}
          </Texto>

          <FontAwesome
            name={!active ? "chevron-down" : "chevron-right"}
            size={20}
            color="#fff"
          />
        </View>
      </Button>

      {active && <View className="bg-[#183064]">{getDetalle()}</View>}
    </View>
  );
};
