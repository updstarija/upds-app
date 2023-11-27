import { useState, useEffect, useRef, useMemo } from "react";
import { View } from "react-native";
import { AntDesign, FontAwesome, } from "@expo/vector-icons";
import { CustomBottomSheetModal, CustomSkeleton, Texto } from "@/ui";
import { ISemestre } from "@/types";
import { useBoleta, useCarreraContext, useMateriasProyeccion, useProyeccionesContext, useSearchMateria, useThemeColor } from "@/hooks";
import { SwiperV2Ref } from "@/components/SwiperV2";
import { CustomBottomSheetRef } from "@/ui/CustomBottomSheetModal";
import { BottomSheetFlatList, BottomSheetTextInput, TouchableOpacity } from '@gorhom/bottom-sheet'
import MateriaProyeccionesItem from "./MateriaProyeccionesItem";
import clsx from "clsx";
import { COLORS } from "~/constants";
import { Spacer } from "@/components";
import SelectTurnos from "../SelectTurnos";

interface Props {
    semestre: ISemestre;
    modulo: number;
    withSearch?: boolean;
    tutorial?: {
        inCourse: boolean;
        step: number;
    };
}


const SemestreProyeccionItem: React.FC<Props> = ({ semestre, modulo, withSearch, tutorial }) => {
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

    useEffect(() => {
        let animationInterval: NodeJS.Timeout;
        const startAnimation = async () => {
            setEnabled(true)
            handleSemestre(semestre.id)

            setTimeout(() => {
                bottomSheetRef.current?.open();
            }, 3000);

        };

        const stopAnimation = () => {
            clearInterval(animationInterval);
        };

        if (tutorial?.inCourse && tutorial.step === 11) {
            stopAnimation();
            startAnimation();
        } else {
            stopAnimation();
        }

        return stopAnimation;
    }, [tutorial?.inCourse, tutorial?.step]);

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

