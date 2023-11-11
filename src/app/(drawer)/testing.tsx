import { MateriaState, SwiperV2 } from "@/components";
import { isMateriaInRangeMonths } from "@/helpers/isMateriaInRangeMonths";
import { IRegistroHistorico } from "@/types";
import { Texto } from "@/ui";
import { MateriaHistoricoItem } from "@/views";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { LayoutAnimation, View } from "react-native";

const tasks = [
    { id: 1, description: "Tarea 1" },
    { id: 2, description: "Tarea 2" },
    { id: 3, description: "Tarea 3" },
    { id: 4, description: "Tarea 4" },
    { id: 5, description: "Tarea 5" },
    { id: 6, description: "Tarea 6" },
    { id: 7, description: "Tarea 7" },
    { id: 8, description: "Tarea 8" },
    { id: 9, description: "Tarea 9" },
    { id: 10, description: "Tarea 10" },
    { id: 11, description: "Tarea 1" },
    { id: 21, description: "Tarea 2" },
    { id: 31, description: "Tarea 3" },
    { id: 41, description: "Tarea 4" },
    { id: 51, description: "Tarea 5" },
    { id: 61, description: "Tarea 6" },
    { id: 71, description: "Tarea 7" },
    { id: 81, description: "Tarea 8" },
    { id: 91, description: "Tarea 9" },
    { id: 13, description: "Tarea 10" },
    { id: 12, description: "Tarea 1" },
    { id: 22, description: "Tarea 2" },
    { id: 32, description: "Tarea 3" },
    { id: 42, description: "Tarea 4" },
    { id: 52, description: "Tarea 5" },
    { id: 62, description: "Tarea 6" },
    { id: 72, description: "Tarea 7" },
    { id: 82, description: "Tarea 8" },
    { id: 92, description: "Tarea 9" },
    //
    { id: 102, description: "Tarea 10" },
    { id: 112, description: "Tarea 1" },
    { id: 212, description: "Tarea 2" },
    { id: 312, description: "Tarea 3" },
    { id: 412, description: "Tarea 4" },
    { id: 512, description: "Tarea 5" },
    { id: 612, description: "Tarea 6" },
    { id: 712, description: "Tarea 7" },
    { id: 812, description: "Tarea 8" },
    { id: 912, description: "Tarea 9" },
    { id: 132, description: "Tarea 10" },
    { id: 122, description: "Tarea 1" },
    { id: 222, description: "Tarea 2" },
    { id: 322, description: "Tarea 3" },
    { id: 422, description: "Tarea 4" },
    { id: 522, description: "Tarea 5" },
    { id: 622, description: "Tarea 6" },
    { id: 722, description: "Tarea 7" },
    { id: 822, description: "Tarea 8" },
    { id: 922, description: "Tarea 9" },
    { id: 104, description: "Tarea 10" },
    { id: 114, description: "Tarea 1" },
    { id: 214, description: "Tarea 2" },
    { id: 314, description: "Tarea 3" },
    { id: 414, description: "Tarea 4" },
    { id: 514, description: "Tarea 5" },
    { id: 614, description: "Tarea 6" },
    { id: 714, description: "Tarea 7" },
    { id: 814, description: "Tarea 8" },
    { id: 914, description: "Tarea 9" },
    { id: 134, description: "Tarea 10" },
    { id: 124, description: "Tarea 1" },
    { id: 224, description: "Tarea 2" },
    { id: 324, description: "Tarea 3" },
    { id: 424, description: "Tarea 4" },
    { id: 524, description: "Tarea 5" },
    { id: 624, description: "Tarea 6" },
    { id: 724, description: "Tarea 7" },
    { id: 824, description: "Tarea 8" },
    { id: 924, description: "Tarea 9" },

    { id: 1029, description: "Tarea 10" },
    { id: 1129, description: "Tarea 1" },
    { id: 2129, description: "Tarea 2" },
    { id: 3129, description: "Tarea 3" },
    { id: 4129, description: "Tarea 4" },
    { id: 5129, description: "Tarea 5" },
    { id: 6129, description: "Tarea 6" },
    { id: 7129, description: "Tarea 7" },
    { id: 8129, description: "Tarea 8" },
    { id: 9129, description: "Tarea 9" },
    { id: 1329, description: "Tarea 10" },
    { id: 1229, description: "Tarea 1" },
    { id: 2229, description: "Tarea 2" },
    { id: 3229, description: "Tarea 3" },
    { id: 4229, description: "Tarea 4" },
    { id: 5229, description: "Tarea 5" },
    { id: 6229, description: "Tarea 6" },
    { id: 7229, description: "Tarea 7" },
    { id: 8229, description: "Tarea 8" },
    { id: 9229, description: "Tarea 9" },
    { id: 1049, description: "Tarea 10" },
    { id: 1149, description: "Tarea 1" },
    { id: 2149, description: "Tarea 2" },
    { id: 3149, description: "Tarea 3" },
    { id: 4149, description: "Tarea 4" },
    { id: 5149, description: "Tarea 5" },
    { id: 6149, description: "Tarea 6" },
    { id: 7149, description: "Tarea 7" },
    { id: 8149, description: "Tarea 8" },
    { id: 9149, description: "Tarea 9" },
    { id: 1349, description: "Tarea 10" },
    { id: 1249, description: "Tarea 1" },
    { id: 2249, description: "Tarea 2" },
    { id: 3249, description: "Tarea 3" },
    { id: 4249, description: "Tarea 4" },
    { id: 5249, description: "Tarea 5" },
    { id: 6249, description: "Tarea 6" },
    { id: 7249, description: "Tarea 7" },
    { id: 8249, description: "Tarea 8" },
    { id: 9249, description: "Tarea 9" },
];


const mockupData: IRegistroHistorico[] = [
    {
        "estado": {
            "id": 0,
            "nombre": "Pendiente"
        },
        "fechaRegistro": "2023-10-27T11:22:40",
        "grupo": 32821,
        "grupoMaestro": 6371,
        "id": 600101,
        "moodle": 40297,
        "nombre": "Investigación Operativa I (MAT-0300)",
        "nota": 0
    },
    {
        "estado": {
            "id": 1,
            "nombre": "Aprobado"
        },
        "fechaRegistro": "2023-09-28T12:27:33",
        "grupo": 32639,
        "grupoMaestro": 6326,
        "id": 596301,
        "moodle": 39603,
        "nombre": "Programación IV (SIS-0124)",
        "nota": 93
    },
    {
        "estado": {
            "id": 1,
            "nombre": "Aprobado"
        },
        "fechaRegistro": "2023-08-29T18:03:16",
        "grupo": 32434,
        "grupoMaestro": 6195,
        "id": 592111,
        "moodle": 38391,
        "nombre": "Tecnología Web I (SIS-0150)",
        "nota": 97
    },
    {
        "estado": {
            "id": 1,
            "nombre": "Aprobado"
        },
        "fechaRegistro": "2023-08-02T15:54:18",
        "grupo": 32255,
        "grupoMaestro": 6074,
        "id": 588484,
        "moodle": 37580,
        "nombre": "Programación Web II (SIS-0301)",
        "nota": 100
    },
    {
        "estado": {
            "id": 1,
            "nombre": "Aprobado"
        },
        "fechaRegistro": "2023-08-02T15:53:14",
        "grupo": 32290,
        "grupoMaestro": 5993,
        "id": 588483,
        "moodle": 37220,
        "nombre": "Diseño Web II (SIS-0141)",
        "nota": 100
    },
    {
        "estado": {
            "id": 1,
            "nombre": "Aprobado"
        },
        "fechaRegistro": "2023-07-03T17:23:18",
        "grupo": 32141,
        "grupoMaestro": 5938,
        "id": 585629,
        "moodle": 36531,
        "nombre": "Cálculo I (MAT-0120)",
        "nota": 92
    },
    {
        "estado": {
            "id": 1,
            "nombre": "Aprobado"
        },
        "fechaRegistro": "2023-06-05T10:23:18",
        "grupo": 31795,
        "grupoMaestro": 5733,
        "id": 582551,
        "moodle": 35191,
        "nombre": "Base de Datos II (SIS-0126)",
        "nota": 96
    },
    {
        "estado": {
            "id": 1,
            "nombre": "Aprobado"
        },
        "fechaRegistro": "2023-05-08T09:07:59",
        "grupo": 31702,
        "grupoMaestro": 5626,
        "id": 578993,
        "moodle": 34445,
        "nombre": "Estadística Inferencial (MAT-0210)",
        "nota": 94
    },
    {
        "estado": {
            "id": 1,
            "nombre": "Aprobado"
        },
        "fechaRegistro": "2023-04-05T16:31:50",
        "grupo": 31467,
        "grupoMaestro": 5449,
        "id": 575068,
        "moodle": 32841,
        "nombre": "Programación Web I (SIS-0300)",
        "nota": 100
    },
    {
        "estado": {
            "id": 1,
            "nombre": "Aprobado"
        },
        "fechaRegistro": "2023-03-30T07:23:54",
        "grupo": 31489,
        "grupoMaestro": 5392,
        "id": 573919,
        "moodle": 32783,
        "nombre": "Estructuras de Datos (SIS-0130)",
        "nota": 100
    },
    {
        "estado": {
            "id": 1,
            "nombre": "Aprobado"
        },
        "fechaRegistro": "2023-03-09T08:12:46",
        "grupo": 31237,
        "grupoMaestro": 5288,
        "id": 570937,
        "moodle": 31888,
        "nombre": "Sistemas Operativos II (SIS-0211)",
        "nota": 100
    },
    {
        "estado": {
            "id": 1,
            "nombre": "Aprobado"
        },
        "fechaRegistro": "2023-02-05T16:25:28",
        "grupo": 31063,
        "grupoMaestro": 5143,
        "id": 566083,
        "moodle": 30732,
        "nombre": "Desarrollo de Sistemas I (SIS-0145)",
        "nota": 91
    },
    {
        "estado": {
            "id": 1,
            "nombre": "Aprobado"
        },
        "fechaRegistro": "2022-12-24T04:06:53",
        "grupo": 30769,
        "grupoMaestro": 4894,
        "id": 562084,
        "moodle": 29293,
        "nombre": "Estadística Descriptiva (MAT-0200)",
        "nota": 97
    },
    {
        "estado": {
            "id": 1,
            "nombre": "Aprobado"
        },
        "fechaRegistro": "2022-12-24T03:56:43",
        "grupo": 30737,
        "grupoMaestro": 4979,
        "id": 562083,
        "moodle": 29382,
        "nombre": "Inglés II  (LIN-0201)",
        "nota": 85
    },
    {
        "estado": {
            "id": 1,
            "nombre": "Aprobado"
        },
        "fechaRegistro": "2022-10-31T12:48:23",
        "grupo": 30423,
        "grupoMaestro": 4657,
        "id": 557366,
        "moodle": 27553,
        "nombre": "Diseño Web I (SIS-0140)",
        "nota": 93
    },
    {
        "estado": {
            "id": 1,
            "nombre": "Aprobado"
        },
        "fechaRegistro": "2022-10-15T07:48:16",
        "grupo": 30393,
        "grupoMaestro": 4722,
        "id": 555270,
        "moodle": 27733,
        "nombre": "Programación III (SIS-0123)",
        "nota": 100
    },
    {
        "estado": {
            "id": 1,
            "nombre": "Aprobado"
        },
        "fechaRegistro": "2022-10-03T10:19:54",
        "grupo": 30262,
        "grupoMaestro": 4584,
        "id": 554152,
        "moodle": 26919,
        "nombre": "Sistemas Digitales II (ELC-0120)",
        "nota": 100
    },
    {
        "estado": {
            "id": 1,
            "nombre": "Aprobado"
        },
        "fechaRegistro": "2022-09-04T16:01:26",
        "grupo": 30029,
        "grupoMaestro": 4389,
        "id": 550164,
        "moodle": 25743,
        "nombre": "Base de Datos I (SIS-0125)",
        "nota": 95
    },
    {
        "estado": {
            "id": 1,
            "nombre": "Aprobado"
        },
        "fechaRegistro": "2022-08-05T09:42:05",
        "grupo": 29831,
        "grupoMaestro": 4264,
        "id": 545812,
        "moodle": 24899,
        "nombre": "Taller de Sistemas Operativos I (SIS-0210)",
        "nota": 84
    },
    {
        "estado": {
            "id": 1,
            "nombre": "Aprobado"
        },
        "fechaRegistro": "2022-06-30T05:10:20",
        "grupo": 29612,
        "grupoMaestro": 4108,
        "id": 541839,
        "moodle": 23831,
        "nombre": "Programación II (SIS-0122)",
        "nota": 97
    },
    {
        "estado": {
            "id": 1,
            "nombre": "Aprobado"
        },
        "fechaRegistro": "2022-05-05T14:29:26",
        "grupo": 29106,
        "grupoMaestro": 3697,
        "id": 535629,
        "moodle": 21737,
        "nombre": "Deontología y Prosocialidad (LIN-0110)",
        "nota": 84
    },
    {
        "estado": {
            "id": 1,
            "nombre": "Aprobado"
        },
        "fechaRegistro": "2022-05-05T06:14:06",
        "grupo": 29165,
        "grupoMaestro": 3776,
        "id": 535065,
        moodle: 993,
        nombre: "NOSE",
        nota: 999
    }
]

const Testing = () => {
    const [data, setData] = useState(mockupData)

    /*     const deleteTask = (id: number) => {
            setData(data.filter(task => task.id !== id))
    
            listref.current?.prepareForLayoutAnimationRender();
            // After removing the item, we can start the animation.
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        } */

    const listref = useRef<FlashList<IRegistroHistorico> | null>(null);


    return (
        <View className="bg-white dark:bg-primario-dark flex-1">
            <FlashList
                ref={listref}
                estimatedItemSize={50}
                ItemSeparatorComponent={() => <View className="border-[0.5px] border-primario " />}
                data={data}
                renderItem={({ item }) => <MateriaHistoricoItem materia={item} />}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};
export default Testing;


const leftContent = () => {
    const isValid = true

    return (
        <>
            <MaterialCommunityIcons
                onPress={() => router.push(`/evaluacion/${45}`)}
                name="clipboard-check"
                size={30}
                color="#fff"
                disabled={!isValid}
                style={{ paddingRight: 0, opacity: !isValid ? 0.5 : 1 }}
            />

            <MaterialCommunityIcons.Button
                onPress={() => router.push(`/moodle/${54}`)}
                name="school"
                size={30}
                color="#fff"
                backgroundColor={"rgb(251 146 60)"}
                disabled={!isValid}
                style={{ paddingRight: 0, opacity: !isValid ? 0.5 : 1 }}
            />

        </>
    );
};
const Item = ({ item }: { item: any }) => {

    return <SwiperV2
        closeOnSwipe
        renderLeftActions={(props) => (
            <View
                className='flex-1 bg-green-400 justify-center  p-2'
            >
                <Texto style={{ fontSize: 24 }} >
                    ELIMINAR
                </Texto>
            </View>
        )}
        renderRightActions={(props) => (
            <View
                className='flex-1 bg-green-400 justify-center  p-2'
            >
                <Texto style={{ fontSize: 24 }} >
                    RIGHT
                </Texto>
            </View>
        )}
    >
        <MateriaState estado={{
            id: 3,
            nombre: "Pendiente"
        }} nombre="Programacion III" nota={99} />
    </SwiperV2>
}

/* 

import { View, Text, Button, TextInput, Alert, Pressable, StyleSheet, Platform } from "react-native";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { firebase } from "@react-native-firebase/messaging";
import Toast from "react-native-toast-message";
import messaging from "@react-native-firebase/messaging";
import WebView from "react-native-webview";
import { FontAwesome } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { INotificacionNotice } from "@/types";
import { useNoticias, useThemeColor } from "@/hooks";
import { COLORS } from "~/constants";
import { categorias } from "@/data";
import * as Animatable from "react-native-animatable";
import { Texto } from "@/ui";
import CustomButton from "@/ui/CustomButton";
import BottomSheet, { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";
import CustomBottomSheetModal from "@/ui/CustomBottomSheetModal";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Busqueda = () => {
    const isDark = useThemeColor() === "dark";
    const { isLoading, getData } = useNoticias();
    const [data, setData] = useState<INotificacionNotice[]>([]);

    const [openCategoria, setOpenCategoria] = useState(false);
    const [valueCategoria, setvalueCategoria] = useState("");

    const SelectCategorias = () => {
        return (
            <DropDownPicker
                open={openCategoria}
                value={valueCategoria}
                searchable
                searchPlaceholder="Busca una categoria"
                searchTextInputStyle={{ color: isDark ? "#fff" : "#000" }}
                //@ts-ignore
                items={categorias}
                onSelectItem={(x) => {
                    if (x.value != valueCategoria) {
                        setData([]);
                    }
                }}
                setOpen={setOpenCategoria}
                setValue={setvalueCategoria}
                placeholder="Filtrar por categoria"
                zIndex={1}
                ArrowDownIconComponent={() => (
                    <FontAwesome
                        size={18}
                        color={isDark ? "#fff" : "#000"}
                        style={{ paddingHorizontal: 5 }}
                        name="angle-down"
                    />
                )}
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
                textStyle={{ color: isDark ? "#fff" : "#000", fontSize: 13 }}
                style={
                    isDark
                        ? { backgroundColor: COLORS.dark.secondary }
                        : { backgroundColor: "#fff" }
                }
                dropDownContainerStyle={
                    isDark && { backgroundColor: COLORS.dark.secondary }
                }
            />
        );
    };




    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // variables
    const snapPoints = useMemo(() => ['25%', '50%'], []);
    const { top, bottom } = useSafeAreaInsets()
    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {
        //console.log('handleSheetChanges', index);
    }, []);

    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                opacity={1}
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={2}
            />
        ),
        [],
    );

    return (

        <View className="bg-white dark:bg-primario-dark flex-1">
        
        <View className='mt-20'>
            <Animatable.Text animation={"slideOutRight"} duration={3000} iterationDelay={1} iterationCount={"infinite"}>XDD GOLA</Animatable.Text>
        </View> 

             <Pressable
                style={({ pressed }) => [
                    {
                        padding: 20,
                        backgroundColor: isDark ? COLORS.dark.secondary : COLORS.light.background,
                        borderRadius: 6,
                    },
                    pressed ? {
                        opacity: 0.5
                    } : {},
                ]}
            >
                <View>
                    <Texto className='dark:text-white'>
                        Pressable with a cool rounded feedback
                    </Texto>
                </View>
            </Pressable> 



               <View style={styles.container}>
                <View className="flex-row items-center justify-between">
                    <CustomButton
                        onPress={() => alert("awd")}
                        style={{ marginHorizontal: 20 }}
                        variant={isDark ? 'primary-dark' : 'primary'}
                        size="small"
                    >
                        <Texto className="text-center text-white">HOLA</Texto>
                    </CustomButton>

                    <CustomButton
                        style={{ marginHorizontal: 20 }}
                        variant="primary"
                        size="small"
                    >
                        <Texto className="text-center text-white">HOLA</Texto>
                    </CustomButton>
                </View>


                                <BottomSheet

                    ref={bottomSheetRef}
                    index={1}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                    backdropComponent={renderBackdrop}
                >
                    <View style={styles.contentContainer}>
                        <Text>Awesome 🎉</Text>
                    </View>
                </BottomSheet>
            </View> 

             <Button
                onPress={handlePresentModalPress}
                title="Present Modal"
                color="black"
            />


            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={0}
                enableDynamicSizing
                enablePanDownToClose
                backdropComponent={renderBackdrop}
                //onDismiss={() => console.log('dismiss')}
                //onChange={() => console.log('change')}

                topInset={top}
                keyboardBehavior={Platform.OS === 'android' ? 'extend' : 'interactive'}
                keyboardBlurBehavior="restore"

                backgroundStyle={{
                    backgroundColor: 'red',
                }}>
                <BottomSheetView
                >
                    <Text>AWD</Text>
                </BottomSheetView>
            </BottomSheetModal> 

             <CustomBottomSheetModal content={
                <CustomButton>
                    <Texto>HOLA</Texto>
                </CustomButton>
            }>

                <Text className="text-white">awdaw</Text>
                <Text className="text-white">awdaw</Text>
                <Text className="text-white">awdaw</Text>
                <Text className="text-white">awdaw</Text>
                <Text className="text-white">awdaw</Text>
                <Text className="text-white">awdaw</Text>
                <Text className="text-white">awdaw</Text>
                <Text className="text-white">awdaw</Text>
                <Text className="text-white">awdaw</Text>
                <Text className="text-white">awdaw</Text>
                <Text className="text-white">awdaw</Text>
            </CustomBottomSheetModal> 
            </View>

            );
        };
        
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                padding: 24,
                justifyContent: 'center',
                backgroundColor: 'grey',
        
            },
            contentContainer: {
                flex: 1,
                alignItems: 'center',
        
            },
        });
        
        
        export default Busqueda;
        
*/
