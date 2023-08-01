import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";

import { useBoleta, useCarreraContext } from "@/hooks";
import { Card, DeleteActions, Swiper, Texto } from "../../components";
import { useEffect } from "react";

interface TestMateria {
  id: number;
  materia: string;
  turno: string;
}

interface Props {
  carrera: number;
  empezarTutorial?: any
  setEmpezarTutorial?: Function
}

const DetalleBoleta: React.FC<Props> = ({ carrera, empezarTutorial, setEmpezarTutorial }) => {
  const { boletaQuery, materiaProyeccionDeleteMutation } = useBoleta({
    carrera,
  });

  const { setBoleta, boleta } = useCarreraContext();

  useEffect(() => {
    if (empezarTutorial && !empezarTutorial.boleta && !boletaQuery.isLoading) {
      if (setEmpezarTutorial) setEmpezarTutorial((prev: any) => ({ ...prev, boleta: true }))
    }
  }, [empezarTutorial.boleta, boletaQuery.isLoading])

  if (boletaQuery.isLoading)
    return (
      <Card classNameCard="my-4 flex">
        <ActivityIndicator size="large" color="#ffffff" />
        <Texto className="mt-2 text-center text-white">Cargando Boleta</Texto>
      </Card>
    );

  if (boletaQuery.isError)
    return (
      <Texto className="text-black">
        Hubo un error al cargal la boleta....
      </Texto>
    );



  const onDelete = async (detalleBoletaId: number, boletaId: number) => {
    await materiaProyeccionDeleteMutation.mutateAsync({
      detalleBoletaId,
      boletaId,
    });
  };

  const renderContent = () => {
    if (boletaQuery.data.info.boleta === -1)
      return (
        <Card classNameCard="">
          <Texto className="text-center text-white">
            Sin Boleta. Por favor genera una nueva
          </Texto>
        </Card>
      );

    return (
      <>
        <View className="flex-row justify-between bg-primario p-4">
          <Texto className="text-white">Modulo</Texto>
          <Texto className="text-white">Materia</Texto>
          <Texto className="text-white">Semestre</Texto>
        </View>

        {boletaQuery.data.data.length == 0 && (
          <View className="border border-t-0 border-primario">
            <Texto className=" p-5 text-center text-black dark:text-white">
              Agrega materias a tu boleta
            </Texto>
          </View>
        )}

        {boletaQuery.data.data.map((materia, index) => (
          <Swiper
            key={materia.id}
            onRighOpen={() =>
              onDelete(materia.id, boletaQuery.data.info.boleta)
            }
            renderRightActions={DeleteActions}
            closeOnSwipe
          >
            <View
              className={`flex-row justify-between  border-[0.4px] border-primario p-4 ${index % 2 == 0
                ? "bg-[#e5e5e5] dark:bg-[#1c2e55] "
                : "bg-white dark:bg-[#253a68]"
                }`}
            >
              <Texto className="text-black dark:text-white">
                {materia.modulo}
              </Texto>
              <Texto className="text-black dark:text-white">
                {materia.materia}
              </Texto>
              <Texto className="text-black dark:text-white">
                {materia.turno}
              </Texto>
            </View>
          </Swiper>
        ))}
      </>
    );
  };

  return (
    <View className="my-5">
      <View className="">{renderContent()}</View>
    </View>
  );
};
export default DetalleBoleta;

const alertIndex = (value: any) => {
  Alert.alert(`id detalle produccion ${value.id}`);
};

const materia = (data: TestMateria, index: number) => {
  return (
    <TouchableOpacity onPress={() => alertIndex(data)}>
      <Text className="text-center text-black dark:text-white">
        {data.materia}
      </Text>
    </TouchableOpacity>
  );
};
