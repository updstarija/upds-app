import { Dispatch, useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { FontAwesome } from '@expo/vector-icons';
import { useModulos, useThemeColor } from '@/hooks';
import { Texto } from '@/ui';
import { COLORS } from '~/constants';
import { View } from 'react-native';

interface Props {
    valueModulo: number
    setvalueModulo: React.Dispatch<React.SetStateAction<number>>
    tutorial?: {
        inCourse: boolean;
        step: number;
    };
}

const SelectModulos: React.FC<Props> = ({ setvalueModulo, valueModulo, tutorial }) => {
    const isDark = useThemeColor() === "dark";

    const [openModulo, setOpenModulo] = useState(false);

    const { modulosQuery } = useModulos();


    useEffect(() => {
        let animationInterval: NodeJS.Timeout;

        const startAnimation = () => {

            if (!modulosQuery.data?.data) return
            animationInterval = setInterval(() => {
                setvalueModulo(modulosQuery.data.data[Math.floor(Math.random() * modulosQuery.data.data.length)].id || modulosQuery.data.data[0].id)
            }, 2000);
        };

        const stopAnimation = () => {
            if (modulosQuery.data?.data) {
                setvalueModulo(modulosQuery.data.data[0].id)
            }

            clearInterval(animationInterval);
        };

        if (tutorial?.inCourse && tutorial.step === 8) {
            stopAnimation();
            startAnimation();
        } else {
            stopAnimation();

        }

        return stopAnimation;
    }, [tutorial?.inCourse, tutorial?.step]);


    useEffect(() => {
        if (modulosQuery.data?.data && !valueModulo) {
            setvalueModulo(modulosQuery.data.data[0].id);
        }

    }, [modulosQuery.data?.data])

    if (modulosQuery.isLoading) return <Texto>CARGANDO MODULOS..</Texto>;
    if (modulosQuery.isError) return <Texto>HUBO UN ERROR MODYLO..</Texto>;


    return (
        <View style={{ zIndex: 999999 }}>
            <DropDownPicker
                listMode='SCROLLVIEW'
                open={openModulo}
                value={valueModulo}
                maxHeight={400}
                // @ts-ignore
                items={modulosQuery.data.data}
                setOpen={setOpenModulo}
                setValue={setvalueModulo}
                placeholder="Selecciona el modulo"
                zIndex={99999999}
                schema={{
                    label: "nombre",
                    value: "id",
                }}
                ArrowDownIconComponent={() => (
                    <FontAwesome
                        size={18}
                        color={isDark ? "#fff" : "#000"}
                        style={{ paddingHorizontal: 5 }}
                        name="angle-down"
                    />
                )}
                textStyle={{ color: isDark ? "#fff" : "#000" }}
                ArrowUpIconComponent={() => (
                    <FontAwesome
                        size={18}
                        color={isDark ? "#fff" : "#000"}
                        style={{ paddingHorizontal: 5 }}
                        name="angle-up"
                    />
                )}
                TickIconComponent={() => (
                    <FontAwesome
                        size={18}
                        color={isDark ? "#fff" : "#000"}
                        style={{ paddingHorizontal: 5 }}
                        name="check"
                    />
                )}
                style={
                    [isDark
                        ? { backgroundColor: COLORS.dark.secondary }
                        : { backgroundColor: "#fff" },
                    { zIndex: 99999 }]
                }
                containerStyle={{ zIndex: 99999 }}
                dropDownContainerStyle={
                    [
                        isDark && { backgroundColor: COLORS.dark.secondary }
                        ,
                        { zIndex: 99999 }
                    ]
                }
            />
        </View>
    )
}
export default SelectModulos