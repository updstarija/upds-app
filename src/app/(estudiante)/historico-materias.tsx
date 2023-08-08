import { View, Text, FlatList } from 'react-native';
import { DetalleMateriaV2 } from '@/views/historico-materias';
import { useCarreraContext, useRegistroHistorico } from '@/hooks';
import { useState, useMemo } from 'react';
import { FlashList } from '@shopify/flash-list';
import { Texto } from '../../components';
import Spinner from '@/components/ui/Spinner';
import { IRegistroHistorico } from '@/types';

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

  const newRegistroHistorico = useMemo(() => {
    if (data.isLoading || data.isError) return []

    let newData: (string | IRegistroHistorico)[] = []
    data.data.data.forEach(item => {
      newData.push(item.carrera);
      item.materias.forEach(materia => {
        newData.push(materia);
      });
    });

    return newData
  }, [data?.data?.data])

  if (data.isLoading) return <Spinner />;
  if (data.isError) return <Text className='text-white'>HUBO UN ERROR..</Text>;



  const stickyHeaderIndices = newRegistroHistorico
    .map((item, index) => {
      if (typeof item === "string") {
        return index;
      } else {
        return null;
      }
    })
    .filter((item) => item !== null) as number[];

  return (
    <View className='flex-1'>
      {/*   {data.data.data.map((info) => (
        <>
          <View className='flex-1 bg-white dark:bg-secondary-dark' key={info.carrera}>
            <Texto className='p-2 text-white text-center'>{info.carrera}</Texto>
            <FlashList
              ListHeaderComponent={() => (<Texto>HOLA</Texto>)}
              showsVerticalScrollIndicator={false}
              stickyHeaderIndices={[0]}
              StickyHeaderComponent={() => (<Texto>HOLA</Texto>)}
              data={info.materias}
              estimatedItemSize={100}
              nestedScrollEnabled
              ItemSeparatorComponent={() => <View className='border-[.5px] border-primario' />}
              renderItem={({ item }) => (

                <DetalleMateriaV2 materia={item} />
              )} />
          </View>


        </>
      ))} */}

      <FlashList
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={stickyHeaderIndices}
        data={newRegistroHistorico}
        estimatedItemSize={100}
        ItemSeparatorComponent={() => <View className='border-[.5px] border-primario' />}
        getItemType={(item) => {
          return typeof item === "string" ? "sectionHeader" : "row";
        }}
        renderItem={({ item }) => {
          if (typeof item === "string") {
            return <View className='bg-white dark:bg-secondary-dark'><Texto className='p-2 text-white text-center'>{item}</Texto></View>;
          } else {
            return <DetalleMateriaV2 materia={item} />
          }
        }} />

      {/* <FlatList
        data={data.data.data}
        renderItem={({ item: info }) => (
          <>

            <View className='flex-1 bg-white dark:bg-secondary-dark' key={info.carrera}>
              <Texto className='p-2 text-white text-center'>{info.carrera}</Texto>
              <FlashList
                stickyHeaderIndices={[0]}
                showsVerticalScrollIndicator={false}
                data={info.materias}
                estimatedItemSize={100}
                ItemSeparatorComponent={() => <View className='border-[.5px] border-primario' />}
                renderItem={({ item }) => (

                  <DetalleMateriaV2 materia={item} />
                )} />
            </View>

      
          </>
        )}
      /> */}

    </View>
  );
};

export default HistoricoMaterias;
