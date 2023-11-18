import { useState, useEffect, useRef, memo, useMemo, useCallback } from "react";
import { KeyboardAvoidingView, View } from "react-native";
import { router } from "expo-router";
import { AntDesign, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { CustomBottomSheetModal, CustomSkeleton, Texto } from "@/ui";
import { ISemestre } from "@/types";
import { useBoleta, useCarreraContext, useMateriasProyeccion, useProyeccionesContext, useSearchMateria, useThemeColor } from "@/hooks";
import { SwiperV2Ref } from "@/components/SwiperV2";
import { CustomBottomSheetRef } from "@/ui/CustomBottomSheetModal";
import { BottomSheetFlatList, BottomSheetTextInput, TouchableOpacity } from '@gorhom/bottom-sheet'
import MateriaProyeccionesItem from "./MateriaProyeccionesItem";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import clsx from "clsx";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { COLORS } from "~/constants";
import { Spacer } from "@/components";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import SelectTurnos from "../SelectTurnos";

interface Props {
    semestre: ISemestre;
    modulo: number;
    withSearch?: boolean
}


const SemestreProyeccionItem: React.FC<Props> = ({ semestre, modulo, withSearch }) => {
    const [enabled, setEnabled] = useState(false);
    const swiperRef = useRef<SwiperV2Ref>(null);
    const bottomSheetRef = useRef<CustomBottomSheetRef>(null);
    const isDark = useThemeColor() === "dark";

    const [filterText, setFilterText] = useState("")


    const { valueCarrera } = useCarreraContext();
    const { handleSemestre, handleBoleta, selectedTurns } = useProyeccionesContext()
    /*   const { getItem, setItem } = useAsyncStorage('selected-turns'); */

    const { data: dataSearchMateria, getData, isLoading } = useSearchMateria()
    const [selectedItem, setSelectedItem] = useState<null | { id: string }>(null)
    const [inputText, setInputText] = useState("")

    const sugerencias = useMemo(() => dataSearchMateria.map((x) => ({ id: x.id + "", title: x.nombre })), [dataSearchMateria])

    const onChangeText = (q: string) => {
        setInputText(q)
        if (q != "") {
            getData(q, valueCarrera || -1)
        }
    }

    const { materiasProyeccionQuery: data, materiaProyeccionCreateMutation } =
        useMateriasProyeccion({
            carrera: valueCarrera || -1,
            enabled,
            modulo: modulo,
            semestre: semestre.id,
            buscarMateria: Number(selectedItem?.id || 0),
        });

    const { boletaQuery } = useBoleta({ carrera: valueCarrera || -1 });

    const content = (

        <View className={
            clsx([
                "flex-row  bg-primario p-3 dark:bg-secondary-dark",
                {
                    "justify-between": !withSearch,
                    "items-center justify-center": withSearch
                }
            ]
            )
        }>

            {withSearch && <AntDesign
                name="search1"
                color={"#FFF"}
                size={20}
                style={{ marginRight: 5 }}
            />
            }
            <Texto className="text-white font-bold">{withSearch ? "Buscar Materia" : semestre.nombre}</Texto>


            {!withSearch && <FontAwesome
                name={enabled ? "chevron-down" : "chevron-up"}
                size={20}
                color="#fff"
            />}
        </View>


    );



    const filterData = useMemo(() => {
        if (data.isLoading || data.isError) return []

        let filteredData = data.data.data
        if (selectedTurns.length) {
            filteredData = data.data.data.filter((item) => selectedTurns.includes(item.turno))
        }

        if (!filterText) return filteredData

        const normalizeString = (str: string) =>
            str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

        const filterTextNormalized = normalizeString(filterText);

        const filterTextArray = filterTextNormalized.split(" ");

        return filteredData.filter((item) => {
            return filterTextArray.every((word) => {
                const materiaNormalized = normalizeString(item.materia);
                const carreraNormalized = normalizeString(item.carrera);

                return (
                    materiaNormalized.includes(word) ||
                    carreraNormalized.includes(word)
                );
            });
        });
    }, [filterText, selectedTurns, data.data])

    useEffect(() => {
        if (boletaQuery.data && boletaQuery.data.info.boleta) {
            handleBoleta(boletaQuery.data.info.boleta)
        }
    }, [boletaQuery.data?.info.boleta])


    return (
        <CustomBottomSheetModal
            ref={bottomSheetRef}
            content={content}
            onPressButton={() => {
                setEnabled(true)
                handleSemestre(semestre.id)
            }}
            withoutScrollView
            onCloseModal={() => setEnabled(false)}
            snapPointsProp={(!data.isLoading && !data.isError && data.data.data.length > 5) ? ["50%", "90%"] : []}
        >


            {!data.isError ?
                <View className="flex-1 ">
                    <BottomSheetFlatList
                        //data={filterData}
                        ListHeaderComponent={<>
                            {withSearch
                                ?
                                <View>
                                    <AutocompleteDropdown
                                        dataSet={sugerencias}
                                        closeOnBlur={true}
                                        useFilter={false}
                                        clearOnFocus={false}
                                        textInputProps={{
                                            placeholder: 'Busca una materia....',
                                            style: { color: isDark ? "#FFF" : "#000" },
                                            autoFocus: true,

                                        }}
                                        onSelectItem={setSelectedItem}
                                        loading={isLoading}
                                        onChangeText={onChangeText}
                                        suggestionsListTextStyle={{
                                            color: isDark ? '#FFF' : "#000",

                                        }}

                                        containerStyle={{
                                            zIndex: -1, margin: 10,
                                            marginBottom: 15,
                                        }}
                                        suggestionsListContainerStyle={{ backgroundColor: isDark ? COLORS.dark.secondary : "#FFF" }}
                                        onClear={() => setInputText("")}
                                        inputContainerStyle={{ backgroundColor: isDark ? COLORS.dark.secondary : "#FFF", borderColor: "#000", borderWidth: .5 }}
                                        debounce={600}
                                        EmptyResultComponent={<Texto className='text-black dark:text-white p-3 text-center'>{isLoading ? "Buscando Materia..." : inputText.length === 0 ? "Busca una materia para tu proyeccion" : "No se ha encontrado la materia o no esta disponible en tu plan de estudio"}</Texto>}
                                    />
                                </View>
                                :
                                <BottomSheetTextInput
                                    value={filterText}
                                    onChangeText={e => setFilterText(e)}
                                    style={{
                                        margin: 15,
                                        borderRadius: 10,
                                        backgroundColor: isDark ? COLORS.dark.secondary : "rgb(243 244 246)",
                                        padding: 10,
                                        color: isDark ? "#FFF" : "#000",
                                    }}
                                    placeholder="Buscar materia...."
                                    placeholderTextColor={"#ccc"}
                                    className={`rounded-2xl border bg-gray-100 p-4 text-gray-700 dark:bg-primario-dark dark:text-white`} />
                            }


                            <SelectTurnos />

                            {!data.isLoading && !!!filterData.length && <View className="items-center bg-primario dark:bg-secondary-dark p-4 rounded-2xl m-4">
                                <Texto className="text-white">
                                    No hay datos que mostrar :(
                                </Texto>
                            </View>}
                        </>}
                        data={!data.isLoading ? filterData : [... new Array(5).fill(0)]}
                        renderItem={({ item }) => {
                            if (typeof item === "number") {
                                return (
                                    <View className="h-16 bg-white dark:bg-secondary-dark justify-center p-4">
                                        <View className="flex-row justify-between items-center">
                                            <View>
                                                <CustomSkeleton width={150 + (Math.round(Math.random() * 100))} height={10} />
                                                <Spacer height={5} />
                                                <CustomSkeleton width={100} height={10} />
                                            </View>

                                            <CustomSkeleton width={50} height={15} />
                                        </View>
                                    </View>
                                );
                            }
                            return <MateriaProyeccionesItem materia={item} withModulo={withSearch} />
                        }
                        }
                        ItemSeparatorComponent={() => (
                            <View className="border-[.5px] border-primario" />
                        )}
                    />
                </View>

                :
                <>
                    <Texto>CARGANDO...</Texto>
                </>}
        </CustomBottomSheetModal>

    );
}
export default SemestreProyeccionItem;

