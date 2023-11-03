
import { View, Text, ScrollView } from 'react-native';
import { DetallePlanSemestre } from '@/views/historico-materias';
import { useCarreraContext, useSemestres } from '@/hooks';
import { useState } from 'react';
import Spinner from '@/components/Spinner';
import { SelectCarrera } from '@/views/SelectCarrera';
import { FlatList } from 'react-native-gesture-handler';
import { Texto } from '@/ui';
import { DetalleMateriasSemestre } from '@/views/proyecciones';
import { DetallePlanSemestreV2 } from '@/views/historico-materias/DetallePlanSemestreV2';

const HistoricoMaterias = () => {
    const mockup = [
        {
            id: 35,
            nombre: 'awdawd'
        },
        {
            id: 335,
            nombre: 'awzzzdawd'
        },
        {
            id: 3335,
            nombre: 'awadawddawd'
        }
    ]


    const [semestreOpen, setSemestreOpen] = useState(-1)

    const onChangeSemestre = (val: number) => {
        if (val === semestreOpen) {
            setSemestreOpen(-1);
            return;
        }
        setSemestreOpen(val);
    };


    return (
        <>
            <FlatList
                data={null}
                ListHeaderComponent={
                    <>
                        <View style={{ zIndex: 1 }}><Texto>HOLA</Texto></View>
                        <FlatList
                            data={mockup}
                            showsVerticalScrollIndicator={false}
                            renderItem={(item) => (
                                <DetallePlanSemestreV2
                                    semestre={item.item}
                                    active={item.item.id === semestreOpen}
                                    onChangeSemestre={onChangeSemestre}

                                />
                            )}
                        />
                    </>
                }
                renderItem={null}
            />
        </>
    );
};

export default HistoricoMaterias;


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
        console.log('handleSheetChanges', index);
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
                onDismiss={() => console.log('dismiss')}
                onChange={() => console.log('change')}

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