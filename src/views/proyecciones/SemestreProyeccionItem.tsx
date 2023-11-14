import { useState, useEffect, useRef, memo, useMemo, useCallback } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { CustomBottomSheetModal, CustomSkeleton, Texto } from "@/ui";
import { ISemestre } from "@/types";
import { useBoleta, useCarreraContext, useMateriasProyeccion, useProyeccionesContext, useThemeColor } from "@/hooks";
import { SwiperV2Ref } from "@/components/SwiperV2";
import { CustomBottomSheetRef } from "@/ui/CustomBottomSheetModal";
import { BottomSheetFlatList, BottomSheetTextInput, TouchableOpacity } from '@gorhom/bottom-sheet'
import MateriaProyeccionesItem from "./MateriaProyeccionesItem";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import clsx from "clsx";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { COLORS } from "~/constants";
import { Spacer } from "@/components";




interface Props {
    semestre: ISemestre;
    modulo: number;
}


const SemestreProyeccionItem: React.FC<Props> = ({ semestre, modulo }) => {
    const [enabled, setEnabled] = useState(false);
    const swiperRef = useRef<SwiperV2Ref>(null);
    const bottomSheetRef = useRef<CustomBottomSheetRef>(null);
    const isDark = useThemeColor() === "dark";

    const [filterText, setFilterText] = useState("")
    const [selectedTurns, setSelectedTurns] = useState<string[]>([])

    const handleClose = () => {
        swiperRef.current?.close();
    };

    const { valueCarrera } = useCarreraContext();
    const { handleSemestre, handleBoleta } = useProyeccionesContext()
    /*   const { getItem, setItem } = useAsyncStorage('selected-turns'); */

    const { materiasProyeccionQuery: data, materiaProyeccionCreateMutation } =
        useMateriasProyeccion({
            carrera: valueCarrera || -1,
            enabled,
            modulo: modulo,
            semestre: semestre.id,
        });
    const { boletaQuery } = useBoleta({ carrera: valueCarrera || -1 });

    const content = (
        <View className="flex-row justify-between bg-primario p-3 dark:bg-secondary-dark flex-1 ">
            <Texto className="text-white font-bold">{semestre.nombre}</Texto>

            <FontAwesome
                name={enabled ? "chevron-down" : "chevron-right"}
                size={20}
                color="#fff"
            />
        </View>
    );

    const handleFilterTurn = async (turn: string) => {
        if (selectedTurns.includes(turn)) {
            setSelectedTurns(selectedTurns.filter(item => item != turn))
            return;
        }

        setSelectedTurns([...selectedTurns, turn])
    }

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
            snapPointsProp={!data.isLoading && !data.isError && data.data.data.length > 5 ? ["50%", "90%"] : []}
        >


            {!data.isError ?
                <View className="flex-1 ">

                    <BottomSheetFlatList
                        //data={filterData}
                        ListHeaderComponent={<>
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

                            <Texto className="px-4 pb-2">Turno:</Texto>

                            <View className=' items-center justify-center mb-5'>
                                <FlatList
                                    data={["Mañana", "Medio Día", "Tarde", "Noche"]}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={{ paddingHorizontal: 10 }}
                                    ItemSeparatorComponent={() => (
                                        <View className="w-2" />
                                    )}
                                    extraData={selectedTurns}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => handleFilterTurn(item)}>
                                            <View className={
                                                clsx([
                                                    "rounded-full py-2 px-4 border-[.5px] border-primario",
                                                    {
                                                        "bg-primario dark:bg-secondary-dark text-white": selectedTurns.includes(item)
                                                    }
                                                ])
                                            }>
                                                <Texto className={
                                                    clsx([
                                                        "'text-black dark:text-white'",
                                                        {
                                                            "text-white": selectedTurns.includes(item)
                                                        }
                                                    ])
                                                }>{item}</Texto>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>

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
                            return <MateriaProyeccionesItem materia={item} semestre={semestre} />
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

