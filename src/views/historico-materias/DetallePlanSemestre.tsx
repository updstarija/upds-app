import { View } from 'react-native'
import { useCarreraContext, usePlanEstudio } from '@/hooks';
import { Button, Spinner } from '@/components';
import { ISemestre } from '@/types';
import { FontAwesome } from '@expo/vector-icons';
import DetalleMateriaV2 from './DetalleMateriaV2';
import { Texto } from '@/ui';

interface Props {
  semestre: ISemestre;
  active: boolean;
  onChangeSemestre: Function;
}

export const DetallePlanSemestre: React.FC<Props> = ({ semestre, active, onChangeSemestre }) => {
  const { id, nombre } = semestre;

  const { valueCarrera } = useCarreraContext();

  const { planEstudioQuery: data } = usePlanEstudio({
    carrera: valueCarrera || -1,
    semestre: id,
    enabled: active,
  });

  const getDetalle = () => {
    if (data.isLoading)
      return <Spinner classNameContainer='p-4 bg-[#183064]' />

    if (data.isError) return <Texto>HUBO UN ERROR AL CARGAR EL DETALLE</Texto>;

    if (data.data.data.length === 0) return <Texto>NADA QUE MOSTRAR</Texto>;

    return (
      <View>
        {data.data.data.map(plan => (
          <DetalleMateriaV2 materia={plan} key={plan.id} view='requisitos' />
        ))}
      </View>
    );
  };

  return (
    <View className=''>
      <Button onPress={() => onChangeSemestre(semestre.id)}>
        <View className="flex-row justify-between bg-[#223B82] p-3 dark:bg-[#0D1F46]">
          <Texto className="uppercase text-white" weight="Bold">
            {nombre}
          </Texto>

          <FontAwesome
            name={!active ? 'chevron-down' : 'chevron-right'}
            size={20}
            color="#fff"
          />
        </View>
      </Button>

      {active && <View className="bg-[#183064]">{getDetalle()}</View>}


    </View>
  );
};


