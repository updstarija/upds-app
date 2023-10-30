import { View, Text, Button, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'
import { Texto } from '../../components'
import { firebase } from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message'
import messaging from '@react-native-firebase/messaging';
import WebView from 'react-native-webview';
import { FontAwesome } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import { INotificacionNotice } from '@/types';
import { useNoticias, useThemeColor } from '@/hooks';
import { COLORS } from '~/constants';
import { categorias } from '@/data';
import * as Animatable from "react-native-animatable"

const Busqueda = () => {

    const isDarkMode = useThemeColor() === "dark"
    const { isLoading, getData } = useNoticias();
    const [data, setData] = useState<INotificacionNotice[]>([])

    const [openCategoria, setOpenCategoria] = useState(false);
    const [valueCategoria, setvalueCategoria] = useState("")

    const SelectCategorias = () => {
        return <DropDownPicker
            open={openCategoria}
            value={valueCategoria}
            searchable

            searchPlaceholder="Busca una categoria"
            searchTextInputStyle={{ color: isDarkMode ? "#fff" : "#000" }}
            //@ts-ignore
            items={categorias}

            onSelectItem={(x) => {
                if (x.value != valueCategoria) {
                    setData([])
                }
            }}
            setOpen={setOpenCategoria}
            setValue={setvalueCategoria}
            placeholder="Filtrar por categoria"
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
    }


    return (
        <View className='mt-20'>
            <Animatable.Text animation={"slideOutRight"} duration={3000} iterationDelay={1} iterationCount={"infinite"}>XDD GOLA</Animatable.Text>
        </View>
    )
}

export default Busqueda