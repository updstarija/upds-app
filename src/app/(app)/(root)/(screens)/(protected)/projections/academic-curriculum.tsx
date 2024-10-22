import { View, Text, FlatList } from "react-native";
import { DetallePlanSemestre } from "@/views/historico-materias";
import { useSemestres } from "@/hooks";
import { useState } from "react";
import Spinner from "@/components/Spinner";
import { SelectCarrera } from "@/views/SelectCarrera";
import { Spacer } from "@/components";
import { useCareerStore } from "@/store/useCareers";

const MallaCurricular = () => {
  const { selectedCareer } = useCareerStore();

  const { semestresQuery } = useSemestres({ carrera: selectedCareer });

  const [semestreOpen, setSemestreOpen] = useState(-1);

  const onChangeSemestre = (val: number) => {
    if (val === semestreOpen) {
      setSemestreOpen(-1);
      return;
    }
    setSemestreOpen(val);
  };

  if (semestresQuery.isLoading) return <Spinner size={20} />;
  if (semestresQuery.isError) return <Text>HUBO UN ERROR..</Text>;

  return (
    <View className="bg-white flex-1 dark:bg-primario-dark ">
      <FlatList
        data={null}
        renderItem={() => null}
        ListHeaderComponent={
          <>
            <Spacer />
            <SelectCarrera />

            <Spacer />

            {semestresQuery.data.map((semestre) => (
              <View key={semestre.id} className="mb-[1px]">
                <DetallePlanSemestre
                  semestre={semestre}
                  active={semestre.id === semestreOpen}
                  onChangeSemestre={onChangeSemestre}
                />
              </View>
            ))}
          </>
        }
      />

      {/* <View className="mt-10">
                {semestresQuery.data.map(semestre => (
                    <View key={semestre.id} className="mb-1">
                        <DetallePlanSemestre semestre={semestre} active={semestre.id === semestreOpen}
                            onChangeSemestre={onChangeSemestre} />
                    </View>
                ))}
            </View> */}
    </View>
  );
};

export default MallaCurricular;
