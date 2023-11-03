import { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
//import Collapsible from 'react-native-collapsible';

import { useCarreraContext, usePlanEstudio } from '@/hooks';
import { Texto } from '../ui';
import { Button } from '@/components';
import { ISemestre } from '@/types';
import { FontAwesome } from '@expo/vector-icons';

interface Props {
    semestre: ISemestre;
    active: boolean;
    onChangeSemestre: Function;
}

export const SemestresCollapsed: React.FC<Props> = ({ semestre, active, onChangeSemestre }) => {
    const { id, nombre } = semestre;

    const { valueCarrera } = useCarreraContext();
    //const [collapsed, setCollapsed] = useState(true);

    const { planEstudioQuery: data } = usePlanEstudio({
        carrera: valueCarrera || -1,
        semestre: id,
        enabled: active,
    });

    const getDetalle = () => {
        if (data.isLoading)
            return <ActivityIndicator size="large" color="#223B82" className="p-4" />;

        if (data.isError) return <Texto>HUBO UN ERROR AL CARGAR EL DETALLE</Texto>;

        if (data.data.data.length === 0) return <Texto>NADA QUE MOSTRAR</Texto>;

        return (
            <View>
                {data.data.data.map(plan => (
                    <View key={plan.id} /> /* <DetalleMateria plan={plan} key={plan.id} /> */
                ))}
            </View>
        );
    };

    return (
        <View>
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
