import { View, Text, Alert, FlatList } from 'react-native'
import { useMemo, useState } from 'react'
import { AutocompleteDropdown, TAutocompleteDropdownItem } from 'react-native-autocomplete-dropdown'
import { AddActions, BottomSheet, DeleteActions, Swiper, Texto } from '../../components'
import { useBoleta, useCarreraContext, useMateriasProyeccion, useSearchMateria, useThemeColor } from '@/hooks'
import { COLORS } from '~/constants'
import { FlashList } from '@shopify/flash-list'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import { RequisitoMateria } from './RequisitoMateria'
import { MateriaProyeccion } from '@/types'
import { etiquetas } from '@/data'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Spinner from '@/components/ui/Spinner'

type IconProp = keyof typeof FontAwesome.glyphMap;

interface Props {
    scrollToTop: Function
}

export const Busqueda: React.FC<Props> = ({ scrollToTop }) => {
    const isDarkMode = useThemeColor() === "dark"

    const { valueCarrera } = useCarreraContext()
    const { data, getData, isLoading } = useSearchMateria()
    const [selectedItem, setSelectedItem] = useState<null | { id: string }>(null)
    const [inputText, setInputText] = useState("")

    const sugerencias = useMemo(() => data.map((x) => ({ id: x.id + "", title: x.nombre })), [data])

    const onChangeText = (q: string) => {
        setInputText(q)
        if (q != "") {
            getData(q, valueCarrera || -1)
        }
    }
    const { boletaQuery } = useBoleta({
        carrera: valueCarrera || -1
    })

    const { materiasProyeccionQuery, materiaProyeccionCreateMutation } = useMateriasProyeccion({
        carrera: valueCarrera || 0,
        modulo: 0,
        semestre: 0,
        buscarMateria: Number(selectedItem?.id || -1),
        enabled: true
    })

    const onAddMateria = async (data: any) => {
        const response = await materiaProyeccionCreateMutation.mutateAsync(data);

        if (response) scrollToTop();
    };


    const renderMaterias = () => {
        if (!selectedItem) return <></>
        if (materiasProyeccionQuery.isLoading) return <View className="p-4 items-center  bg-secondary-dark">
            <Spinner classNameContainer='' color={"#FFF"} />
        </View>
        if (materiasProyeccionQuery.isError) return <Texto>HUBO UN ERROR</Texto>

        const isPendienteOCurso = (id: number) => id == 0 || id == 1

        if (materiasProyeccionQuery.data.data.length === 0)
            return (
                <View className="p-4 items-center  bg-secondary-dark">
                    <Texto className="text-white text-center">NO HAY MATERIAS OFERTADAS</Texto>
                </View>
            );
        return <View >
            <ScrollView style={{ maxHeight: 400 }} nestedScrollEnabled>
                {materiasProyeccionQuery.data.data.map(mat => (
                    <Swiper
                        key={mat.id}
                        onRighOpen={() =>
                            onAddMateria({
                                materiaId: mat.id,
                                boletaId: boletaQuery.data?.info.boleta,
                            })
                        }

                        renderRightActions={AddActions}
                        closeOnSwipe
                        enabled={!isPendienteOCurso(mat.estado.id)}
                    >
                        <Row item={mat} enabled={!isPendienteOCurso(mat.estado.id)} />
                    </Swiper>
                ))}
            </ScrollView>
        </View>
    }

    return (
        <View style={{ zIndex: -1 }}>
            <AutocompleteDropdown
                dataSet={sugerencias}
                closeOnBlur={true}
                useFilter={false}
                clearOnFocus={false}

                textInputProps={{
                    placeholder: 'Busca una materia....',
                    style: { color: isDarkMode ? "#FFF" : "#000" }
                }}
                onSelectItem={setSelectedItem}
                loading={isLoading}
                onChangeText={onChangeText}
                suggestionsListTextStyle={{
                    color: isDarkMode ? '#FFF' : "#000",
                }}
                containerStyle={{ zIndex: -1 }}
                suggestionsListContainerStyle={{ backgroundColor: isDarkMode ? COLORS.dark.secondary : "#FFF" }}
                onClear={() => setInputText("")}
                inputContainerStyle={{ backgroundColor: isDarkMode ? COLORS.dark.secondary : "#FFF", borderColor: "#000", borderWidth: .5 }}
                debounce={600}
                EmptyResultComponent={<Texto className='text-black dark:text-white p-3 text-center'>{isLoading ? "Buscando Materia" : inputText.length === 0 ? "Busca una materia para tu proyeccion" : "No se ha encontrado la materia o no esta disponible en tu plan de estudio"}</Texto>}
            />


            {renderMaterias()}
        </View>
    )
}




const Row = ({
    item,
    enabled,
}: {
    item: MateriaProyeccion;
    enabled: boolean;
}) => {
    const isDarkMode = useThemeColor() === "dark"

    const isElectiva = item.materia.startsWith("Electiva - ")
    const isPendiente = item.estado.id == 0
    const isAprobado = item.estado.id == 1
    const isReprobado = item.estado.id == 2
    const isValidMateria = isPendiente || isAprobado || isReprobado || isElectiva

    const noMostrarMas = async () => {
        await AsyncStorage.setItem(`mostrar-detalle-materia-seleccionada-${item.estado.id}`, 'false')
    }

    const message = async () => {

        const mostrar = await AsyncStorage.getItem(`mostrar-detalle-materia-seleccionada-${item.estado.id}`)
        if (mostrar == 'false') {
            return;
        }

        let mensaje = "";
        if (isPendiente) {
            mensaje = "Has seleccionado una materia que esta pendiente.\n\nLa materia seleccionada esta pendiente, Por lo tanto, no es posible agregarla a la boleta de proyeccion."
        }
        else if (isAprobado) {
            mensaje = "Has seleccionado una materia que esta aprobada.\n\nEsta materia ya ha sido aprobada. Por lo tanto, no es elegible para su selección nuevamente.\n\n¡Sigue adelante y continúa con tu excelente desempeño académico!."
        }
        else if (isElectiva) {
            mensaje = "Has seleccionado una materia electiva.\n\nLas materias electivas son opciones adicionales que puedes tomar para personalizar tu experiencia educativa y ampliar tus conocimientos en áreas específicas de interés.\n\nAprovecha esta oportunidad para explorar y sumergirte en nuevos temas que complementen tu formación principal.\n\nRecuerda que las materias electivas son una excelente manera de enriquecer tu aprendizaje y expandir tus horizontes académicos. \n\n¡No dudes en elegir aquellas que más te apasionen y te motiven!"
        }

        Alert.alert("Informacion",
            mensaje
            ,
            [{ text: 'Ok' }, { text: "No volver a mostrar este mensaje", onPress: noMostrarMas }],
            { cancelable: true }
        )
    }


    const Content = () => (
        <View>
            <View
                className={`bg-white dark:bg-[#183064] p-4 border-gray-50 border-[.5px] dark:border-primario-dark ${!enabled ? "opaci disabled" : ""
                    }`}
                style={{ position: "relative", overflow: "hidden" }}
            >

                {isValidMateria && <>
                    <View style={{ borderBottomColor: etiquetas[isElectiva ? 3 : item.estado.id].color, borderRightWidth: 25, borderBottomWidth: 25, width: 0, height: 0, backgroundColor: "transparent", borderStyle: "solid", borderLeftWidth: 0, borderLeftColor: "transparent", borderRightColor: "transparent", position: "absolute", top: 0, right: 0, transform: [{ rotate: "180deg" }] }} />

                    <View style={{ position: "absolute", top: 1, right: 1, zIndex: 999 }}>
                        <FontAwesome name={etiquetas[isElectiva ? 3 : item.estado.id].icon} color={"#FFF"} />
                    </View>
                </>}

                {/*  {isAprobadaoEnCurso && <>
                    <View style={{ borderBottomColor: "#07bc0c", borderRightWidth: 25, borderBottomWidth: 25, width: 0, height: 0, backgroundColor: "transparent", borderStyle: "solid", borderLeftWidth: 0, borderLeftColor: "transparent", borderRightColor: "transparent", position: "absolute", top: 0, right: 0, transform: [{ rotate: "180deg" }] }} />

                    <View style={{ position: "absolute", top: 0, right: 0, zIndex: 999 }}>
                        <FontAwesome name="check" color={"#FFF"} />
                    </View>

                </>} */}





                <View className="flex-row items-center justify-between ">
                    <View className="w-3/4">
                        <Texto className={`text-black dark:text-white`} weight="Bold">
                            {item.materia}
                        </Texto>
                        <Texto className={`text-xs text-gray-400`}>{item.carrera}</Texto>
                        <Texto className={`text-xs text-gray-400`}>{item.semestre}</Texto>
                        <Texto className={`text-xs text-gray-400`}>{item.modulo}</Texto>
                    </View>
                    <Texto className={`text-black dark:text-white`}>{item.turno}</Texto>
                </View>
            </View>
        </View >
    )

    return (
        <BottomSheet content={<Content />} touchableProps={{ activeOpacity: 0.8 }} snapPointsProp={["40%"]} onClickFun={isAprobado || isElectiva || isPendiente ? message : null}>
            <RequisitoMateria materia={item} />
        </BottomSheet>
    );
}