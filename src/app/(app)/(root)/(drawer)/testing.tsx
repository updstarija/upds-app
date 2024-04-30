import { View, Button } from "react-native";
import React, { useMemo, useRef, useState } from "react";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { Texto } from "@/ui";
import StoreReviewButton from "@/modules/testing/store-review";

const InputComponent = () => {
  const [title, setTitle] = useState("");
  return (
    <BottomSheetTextInput
      style={{
        borderBottomWidth: 1,
      }}
      placeholder="Title"
      value={title}
      onChangeText={(text) => setTitle(text)}
    />
  );
};

const Index = () => {
  const snapPoints = useMemo(() => ["25%", "60%", "80%"], []);
  const itemRef = useRef<BottomSheetModalMethods>(null);
  return (
    <>
      <StoreReviewButton />

      <View
        style={{
          flex: 1,
        }}
      >
        <Button onPress={() => itemRef.current?.present()} title="open modal" />
      </View>
      <BottomSheetModal
        snapPoints={snapPoints}
        index={1}
        backdropComponent={BottomSheetBackdrop}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        ref={itemRef}
      >
        <View
          style={{
            paddingHorizontal: 20,
          }}
        >
          <InputComponent />
          <Texto>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis
            non nostrum iure repellendus hic obcaecati ratione! Explicabo at
            voluptatibus molestias, minima numquam commodi modi sit libero
            reprehenderit nisi voluptate quidem.
          </Texto>
          <Texto>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis
            non nostrum iure repellendus hic obcaecati ratione! Explicabo at
            voluptatibus molestias, minima numquam commodi modi sit libero
            reprehenderit nisi voluptate quidem.
          </Texto>
          <Texto>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis
            non nostrum iure repellendus hic obcaecati ratione! Explicabo at
            voluptatibus molestias, minima numquam commodi modi sit libero
            reprehenderit nisi voluptate quidem.
          </Texto>
          <Texto>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis
            non nostrum iure repellendus hic obcaecati ratione! Explicabo at
            voluptatibus molestias, minima numquam commodi modi sit libero
            reprehenderit nisi voluptate quidem.
          </Texto>
          <Texto>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis
            non nostrum iure repellendus hic obcaecati ratione! Explicabo at
            voluptatibus molestias, minima numquam commodi modi sit libero
            reprehenderit nisi voluptate quidem.
          </Texto>
          <Texto>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis
            non nostrum iure repellendus hic obcaecati ratione! Explicabo at
            voluptatibus molestias, minima numquam commodi modi sit libero
            reprehenderit nisi voluptate quidem.
          </Texto>
          <Texto>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis
            non nostrum iure repellendus hic obcaecati ratione! Explicabo at
            voluptatibus molestias, minima numquam commodi modi sit libero
            reprehenderit nisi voluptate quidem.
          </Texto>
          <Texto>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis
            non nostrum iure repellendus hic obcaecati ratione! Explicabo at
            voluptatibus molestias, minima numquam commodi modi sit libero
            reprehenderit nisi voluptate quidem.
          </Texto>
          <Texto>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis
            non nostrum iure repellendus hic obcaecati ratione! Explicabo at
            voluptatibus molestias, minima numquam commodi modi sit libero
            reprehenderit nisi voluptate quidem.
          </Texto>
          <Texto>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis
            non nostrum iure repellendus hic obcaecati ratione! Explicabo at
            voluptatibus molestias, minima numquam commodi modi sit libero
            reprehenderit nisi voluptate quidem.
          </Texto>
          <Texto>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis
            non nostrum iure repellendus hic obcaecati ratione! Explicabo at
            voluptatibus molestias, minima numquam commodi modi sit libero
            reprehenderit nisi voluptate quidem.
          </Texto>
          <Texto>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis
            non nostrum iure repellendus hic obcaecati ratione! Explicabo at
            voluptatibus molestias, minima numquam commodi modi sit libero
            reprehenderit nisi voluptate quidem.
          </Texto>
          <Texto>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis
            non nostrum iure repellendus hic obcaecati ratione! Explicabo at
            voluptatibus molestias, minima numquam commodi modi sit libero
            reprehenderit nisi voluptate quidem.
          </Texto>
          <Texto>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis
            non nostrum iure repellendus hic obcaecati ratione! Explicabo at
            voluptatibus molestias, minima numquam commodi modi sit libero
            reprehenderit nisi voluptate quidem.
          </Texto>
          <Texto>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis
            non nostrum iure repellendus hic obcaecati ratione! Explicabo at
            voluptatibus molestias, minima numquam commodi modi sit libero
            reprehenderit nisi voluptate quidem.
          </Texto>
          <Texto>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis
            non nostrum iure repellendus hic obcaecati ratione! Explicabo at
            voluptatibus molestias, minima numquam commodi modi sit libero
            reprehenderit nisi voluptate quidem.
          </Texto>
          <Texto>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis
            non nostrum iure repellendus hic obcaecati ratione! Explicabo at
            voluptatibus molestias, minima numquam commodi modi sit libero
            reprehenderit nisi voluptate quidem.
          </Texto>
        </View>
      </BottomSheetModal>
    </>
  );
};

export default Index;
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
