import { Dispatch, useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { FontAwesome } from '@expo/vector-icons';
import { useModulos, useThemeColor } from '@/hooks';
import { Texto } from '@/ui';
import { COLORS } from '~/constants';

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
            setTimeout(() => {
                setOpenModulo(true)
            }, 1500);

            animationInterval = setInterval(() => {
                setTimeout(() => {
                    setOpenModulo(true)
                }, 1500);

                setTimeout(() => {
                    setOpenModulo(false)
                }, 3500);
            }, 6000);
        };

        const stopAnimation = () => {
            setOpenModulo(false)
            clearInterval(animationInterval);
        };

        if (tutorial?.inCourse && tutorial.step === 5) {
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
                isDark
                    ? { backgroundColor: COLORS.dark.secondary }
                    : { backgroundColor: "#fff" }
            }
            dropDownContainerStyle={
                isDark && { backgroundColor: COLORS.dark.secondary }
            }
        />
    )
}
export default SelectModulos