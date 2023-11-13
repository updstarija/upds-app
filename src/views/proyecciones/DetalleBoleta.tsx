import {
  View,
  ActivityIndicator,
} from "react-native";
import { useBoleta } from "@/hooks";
import { Card, DeleteActions, Swiper } from "@/components";
import { useEffect } from "react";
import { Texto } from "@/ui";

interface Props {
  carrera: number;
  empezarTutorial?: any
  setEmpezarTutorial: React.Dispatch<React.SetStateAction<{
    carreras: boolean;
    boleta: boolean;
    semestres: boolean;
    modulos: boolean;
  }>>
  tutorialEnCurso: boolean
}

const DetalleBoleta: React.FC<Props> = ({ carrera, tutorialEnCurso, setEmpezarTutorial }) => {
  const { boletaQuery, materiaProyeccionDeleteMutation } = useBoleta({
    carrera,
  });

  useEffect(() => {
    if (!boletaQuery.isLoading && !boletaQuery.isError) {
      setEmpezarTutorial((prev) => ({ ...prev, boleta: true }))
    }
  }, [boletaQuery.isLoading, boletaQuery.isError, boletaQuery.isFetching])


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



  if (tutorialEnCurso) return (<Card classNameCard="my-4 flex">
    <Texto className="mt-2 text-center text-white">BOLETA DE PROYECCION</Texto>
  </Card>)


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

