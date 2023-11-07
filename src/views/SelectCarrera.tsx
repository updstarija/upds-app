import { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { useCarreraContext, useCarreras, useThemeColor } from '@/hooks';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from '~/constants';
import { Texto } from '@/ui';

export const SelectCarrera = () => {
    const isDarkMode = useThemeColor() === "dark"

    const {
        valueCarrera,
        setValueCarrera,
    } = useCarreraContext();

    const [openCarrera, setOpenCarrera] = useState(false);


    const { carrerasQuery } = useCarreras()

    if (carrerasQuery.isLoading) return <Texto>CARGANDO</Texto>
    if (carrerasQuery.isError) return <Texto>ERROR</Texto>

    return (
        <DropDownPicker
            open={openCarrera}
            value={valueCarrera}
            // @ts-ignore
            items={carrerasQuery.data}
            setOpen={setOpenCarrera}
            setValue={setValueCarrera}
            placeholder="Selecciona la carrera"
            zIndex={1}
            ArrowDownIconComponent={() => (
                <FontAwesome
                    size={18}
                    color={isDarkMode ? "#fff" : "#000"}
                    style={{ paddingHorizontal: 5 }}
                    name="angle-down"
                />
            )}
            ArrowUpIconComponent={() => (
                <FontAwesome
                    size={18}
                    color={isDarkMode ? "#fff" : "#000"}
                    style={{ paddingHorizontal: 5 }}
                    name="angle-up"
                />
            )}
            TickIconComponent={() => (
                <FontAwesome
                    size={18}
                    color={isDarkMode ? "#fff" : "#000"}
                    style={{ paddingHorizontal: 5 }}
                    name="check"
                />
            )}
            schema={{
                label: "nombre",
                value: "id",
            }}
            textStyle={{ color: isDarkMode ? "#fff" : "#000", fontSize: 13 }}
            style={
                isDarkMode
                    ? { backgroundColor: COLORS.dark.secondary }
                    : { backgroundColor: "#fff" }
            }
            dropDownContainerStyle={
                isDarkMode && { backgroundColor: COLORS.dark.secondary }
            }
        />
    );
}

