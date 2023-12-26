import { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Platform,
    UIManager,
    Dimensions,
} from 'react-native';
import RenderHTML from 'react-native-render-html';
import { LayoutScreen } from '@/layout/LayoutScreen';
import { COLORS } from '~/constants';
import { Spinner } from '@/components';
import { useFaq, useThemeColor } from '@/hooks';
import { FlashList } from '@shopify/flash-list';
import DropDownPicker from 'react-native-dropdown-picker';
import { IFaq } from '@/types';
import { FontAwesome } from '@expo/vector-icons';
import { categorias, categoriasFaq } from '@/data';
import { Texto } from '@/ui';


if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

const MacCard: React.FC<{ faq: IFaq }> = ({
    faq
}) => {
    const isDark = useThemeColor() === "dark"
    const [openCollapsed, setOpenCollapsed] = useState(false)

    const width = Dimensions.get("window").width

    const { categoria, descripcion, titulo } = faq
    return (
        <View style={styles.cardContainer}>
            <View style={styles.windowContainer} className='bg-white dark:bg-secondary-dark border'>

                <View className='bg-primario flex-row justify-between h-8 items-center p-2'>
                    <Texto className='text-white text-sm' weight='Bold'>{categoria}</Texto>
                    <View className='flex-row'>
                        <View style={styles.titleBarButton} />
                        <View style={styles.titleBarButton} />
                        <View style={styles.titleBarButton} />
                    </View>
                </View>
                <TouchableOpacity style={styles.content} onPress={() => setOpenCollapsed(!openCollapsed)}>
                    <View className='flex flex-row justify-between items-center'>
                        <Texto className='text-black dark:text-white text-lg mb-2 flex-1 mr-2' weight='Bold'>{titulo}</Texto>
                        <FontAwesome
                            name={!openCollapsed ? 'chevron-down' : 'chevron-up'}
                            size={20}
                            color="#fff"
                        />
                    </View>
                    {/*  <Texto style={styles.cardText} className='text-black dark:text-white'>{detail}</Texto> */}
                    {openCollapsed && <RenderHTML baseStyle={{ color: isDark ? "#FFF" : "#000" }} contentWidth={width} source={{ html: descripcion }} />}
                </TouchableOpacity>
            </View>
        </View>
    );
};
``
const Faq = () => {
    const { isLoading, getFaqs, getFaqsV2, data: dataV2, setLastDocument, setData: setDataV2 } = useFaq()
    const isDark = useThemeColor() === "dark"
    const [data, setData] = useState<IFaq[]>([])

    const [openCategoria, setOpenCategoria] = useState(false);
    const [valueCategoria, setvalueCategoria] = useState("")




    useEffect(() => {
        getFaqsV2(valueCategoria)
    }, [valueCategoria]);

    const renderContent = () => {

        return (
            <FlashList
                ListEmptyComponent={<Texto className="text-center dark:text-white">{!isLoading && 'No se han encontrado comunicados'}</Texto>}
                ListHeaderComponentStyle={{ marginTop: 5 }}
                onEndReachedThreshold={0.1}
                //  onEndReached={getNoticias}
                onEndReached={() => {
                    if (!isLoading) getFaqsV2(valueCategoria)
                }}
                keyExtractor={(item) => item.id}
                ListFooterComponent={isLoading ? <Spinner showText text="Cargando comunicados" classNameContainer="p-4 items-center" size={25} /> : <View />}
                showsVerticalScrollIndicator={false}
                data={dataV2}
                estimatedItemSize={600}

                renderItem={({ item }) => (
                    <MacCard faq={item} />
                )} />
        )
        /* return <View style={styles.container}>
            {data.map((item, index) => (
                <TouchableOpacity key={item.titulo}>
                    <MacCard key={index} title={item.titulo} detail={item.descripcion} />
                </TouchableOpacity>
            ))}
        </View> */
    }

    const SelectCategorias = () => {
        return <DropDownPicker
            open={openCategoria}
            value={valueCategoria}
            searchable
            searchPlaceholder="Busca una categoria"
            searchTextInputStyle={{ color: isDark ? "#fff" : "#000" }}
            //@ts-ignore
            items={categoriasFaq}
            onSelectItem={(x) => {
                if (x.value != valueCategoria) {
                    setLastDocument(undefined)
                    setDataV2([])
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
            containerStyle={{ paddingVertical: 5 }}
            textStyle={{ color: isDark ? "#fff" : "#000", fontSize: 13 }}
            style={
                [isDark
                    ? { backgroundColor: COLORS.dark.secondary, }
                    : { backgroundColor: "#fff", }]
            }
            dropDownContainerStyle={
                [isDark && { backgroundColor: COLORS.dark.secondary }]
            }
        />
    }

    /*     const getNoticias = () => {
            getFaqs(valueCategoria).then((x) => {
                setData(x)
            })
        }
    
        useEffect(() => {
            getNoticias()
        }, [valueCategoria]); */



    return (
        <LayoutScreen title="Preguntas Frecuentes">
            <View className="flex-1 mx-1">

                <SelectCategorias />

                {renderContent()}
            </View>

        </LayoutScreen >
    );
};

export default Faq
const styles = StyleSheet.create({
    titleFaq: {
        color: COLORS.light.background,
        fontSize: 20,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,

    },
    cardContainer: {
        marginVertical: 10,
    },
    windowContainer: {
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 5,
    },
    titleBar: {
        flexDirection: 'row',
        height: 30,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    titleBarButton: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: 'white',
        marginLeft: 5,
    },
    content: {
        padding: 20,
    },
    cardTitle: {
        marginBottom: 10,
    },
    cardTextContainer: {
        maxHeight: 80,
    },
    cardText: {
        fontSize: 12,
    },
});

// import React, { useState,Component } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import Collapsible from 'react-native-collapsible';
// import Accordion from 'react-native-collapsible/Accordion';
// import { StyleSheet } from 'react-native/Libraries/StyleSheet/StyleSheet';

// export const FaqScreen = () => {
//     const [isExpanded, setIsExpanded] = useState(false);

//     const [open, setopen] = useState(false);

//     const SECTIONS = [
//         {
//           title: 'First',
//           content: 'Lorem ipsum...',
//         },
//         {
//           title: 'Second',
//           content: 'Lorem ipsum...',
//         },
//       ];

//     return (
//         <View>
//             <View style={{ backgroundColor: '#F0F0F0', borderColor: '#0000FF', borderWidth: 1, marginBottom: 10 }}>
//                 <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)} style={{ backgroundColor: '#0000FF' }}>
//                     <Text style={{ color: '#FFFFFF', padding: 10 }}>{"TITULO 0"}</Text>
//                 </TouchableOpacity>
//                 {isExpanded && (
//                     <View style={{ backgroundColor: '#FFFFFF' }}>
//                         <Text style={{ padding: 10 }}>{"Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic ut optio corporis tempore eos, qui numquam omnis laborum exercitationem praesentium veniam iure error, deserunt inventore eaque, soluta cum nesciunt eius."}</Text>
//                     </View>
//                 )}
//             </View>

//             <View style={{ backgroundColor: '#F0F0F0', borderColor: '#0000FF', borderWidth: 1, marginBottom: 10 }}>
//                 <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)} style={{ backgroundColor: '#0000FF' }}>
//                     <Text style={{ color: '#FFFFFF', padding: 10 }}>{"TITULO 1"}</Text>
//                 </TouchableOpacity>
//                 {isExpanded && (
//                     <View style={{ backgroundColor: '#FFFFFF' }}>
//                         <Text style={{ padding: 10 }}>{"Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic ut optio corporis tempore eos, qui numquam omnis laborum exercitationem praesentium veniam iure error, deserunt inventore eaque, soluta cum nesciunt eius."}</Text>
//                     </View>
//                 )}
//             </View>

//             <View style={{ backgroundColor: '#F0F0F0', borderColor: '#0000FF', borderWidth: 1, marginBottom: 10 }}>
//                 <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)} style={{ backgroundColor: '#0000FF' }}>
//                     <Text style={{ color: '#FFFFFF', padding: 10 }}>{"TITULO 2"}</Text>
//                 </TouchableOpacity>
//                 {isExpanded && (
//                     <View style={{ backgroundColor: '#FFFFFF' }}>
//                         <Text style={{ padding: 10 }}>{"Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic ut optio corporis tempore eos, qui numquam omnis laborum exercitationem praesentium veniam iure error, deserunt inventore eaque, soluta cum nesciunt eius."}</Text>
//                     </View>
//                 )}
//             </View>
//         </View>
//     );
// };
