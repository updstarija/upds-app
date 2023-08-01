import { View, Text, ScrollView } from 'react-native';
import { DetalleMateria, DetalleMateriaV2, DetallePlanSemestre } from '@/views/historico-materias';
import { useCarreraContext, useRegistroHistorico, useSemestres } from '@/hooks';
import { useState } from 'react';
import { Texto } from '@/components';
import { FlashList } from '@shopify/flash-list';

const HistoricoMaterias = () => {
  const { valueCarrera } = useCarreraContext();

  const [semestreOpen, setSemestreOpen] = useState(-1)

  const onChangeSemestre = (val: number) => {
    if (val === semestreOpen) {
      setSemestreOpen(-1);
      return;
    }
    setSemestreOpen(val);
  };

  const { registroHistoricoQuery: data } = useRegistroHistorico({
    carrera: valueCarrera || -1
  })

  if (data.isLoading) return <Text>CARGANDO REGISTRO..</Text>;
  if (data.isError) return <Text>HUBO UN ERROR..</Text>;

  return (
    <FlashList
      showsVerticalScrollIndicator={false}
      data={data.data.data}
      estimatedItemSize={100}
      ItemSeparatorComponent={() => <View className='border-[.5px] border-primario' />}
      renderItem={({ item }) => (
        <DetalleMateriaV2 materia={item} />
      )} />
  );
};

export default HistoricoMaterias;
