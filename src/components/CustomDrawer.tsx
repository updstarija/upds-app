import { Text, View } from 'react-native'
import React, { useState } from 'react'
import { DrawerContentScrollView, DrawerItemList, DrawerItem, DrawerView, DrawerContentComponentProps } from '@react-navigation/drawer'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AntDesign, Ionicons } from '@expo/vector-icons'

import { ThemeConfig } from '@/views'
import { useAuthContext, useThemeColor } from '@/hooks'
import { router } from 'expo-router'
import { COLORS } from '~/constants'




const CustomDrawer = (props: DrawerContentComponentProps) => {
    const isDarkMode = useThemeColor() === "dark"
    const { status, userAuth, logout } = useAuthContext();


    const cerrarSesion = async () => {
        router.push('/auth/login');
        logout();
    };

    const [subItem, setSubItem] = useState(-1)
    const [subSubItem, setSubSubItem] = useState(-1)
    const [activeItem, setActiveItem] = useState("")

    const LabelSubItem = (title: string, indexItem: number, color: string) => {
        return (<View style={{ marginLeft: -25 }} className='flex-row justify-between items-center'>
            <Text style={{
                color: "#9e9d9d",
                fontFamily: 'LatoRegular',
                fontSize: 15,
            }}>{title}</Text>

            {subItem == indexItem ? <Ionicons name='chevron-up' size={15} /> : <Ionicons name='chevron-down' size={15} />}
        </View>)
    }

    const LabelSubSubItem = (title: string, indexItem: number, color: string) => {
        return (<View style={{ marginLeft: -25 }} className='flex-row justify-between items-center'>
            <Text style={{
                color,
                fontFamily: 'LatoRegular',
                fontSize: 15,
            }}>{title}</Text>

            {subSubItem == indexItem ? <Ionicons name='chevron-up' size={15} /> : <Ionicons name='chevron-down' size={15} />}
        </View>)
    }


    const data = [
        {
            title: "Facultades",

            children: subItem == 1 ? [
                {
                    title: "Ingenieria",
                    children: subSubItem == 1 ? [{ title: "TEXT" }] : []
                },
                {
                    title: "Ciencias Empresariales",
                    children: []
                }
            ] : []
        },
        {
            title: "Otra cosa",

            children: subItem == 2 ? [
                {
                    title: "Ingenieria",

                },
                {
                    title: "Ciencias Empresariales",

                }
            ] : []
        }
    ]
    return (
        <View className='flex-1 bg-white dark:bg-primario-dark border-r border-[.6px] border-secondary-dark'>
            <DrawerContentScrollView {...props} className=''>

                {/*   {data.map((x, indexx) => (
                    <>
                        <DrawerItem
                            key={x.title}
                            activeBackgroundColor={"#ebeffa"}
                            activeTintColor='#9e9d9d'
                            inactiveTintColor='#9e9d9d'
                            focused={subItem == indexx + 1}
                            onPress={() => {
                                setSubItem(subItem == 1 ? -1 : 1)
                            }}

                            icon={({ color, focused, size }) => <Ionicons name='home-sharp' color={color} size={20} />}
                            label={({ color }) => LabelSubItem(x.title, 1, color)}

                        />

                        {x.children.map((y, index) => (
                            <View style={{ marginLeft: 15 }}>
                                <DrawerItem
                                    key={y.title}
                                    activeBackgroundColor={"#ebeffa"}
                                    activeTintColor='#9e9d9d'
                                    inactiveTintColor='#9e9d9d'
                                    focused={subSubItem == index + 1}
                                    onPress={() => {
                                        setSubSubItem(subSubItem == 1 ? -1 : 1)
                                    }}

                                    icon={({ color, focused, size }) => <Ionicons name='home-sharp' color={color} size={20} />}
                                    label={({ color }) => LabelSubItem(y.title, 1, color)}

                                />

                                {y.children.map(z => (
                                    <View style={{ marginLeft: 15 }}>
                                        <DrawerItem
                                            key={z.title}
                                            activeBackgroundColor={"#ebeffa"}
                                            activeTintColor='#9e9d9d'
                                            inactiveTintColor='#9e9d9d'

                                            onPress={() => {
                                                //  setSubSubItem(subSubItem == 1 ? -1 : 1)
                                            }}

                                            icon={({ color, focused, size }) => <Ionicons name='home-sharp' color={color} size={20} />}
                                            label={z.title}

                                        />
                                    </View>
                                ))}
                            </View>
                        ))}
                    </>


                ))} */}



                <DrawerItem
                    activeBackgroundColor={"#ebeffa"}
                    activeTintColor='#9e9d9d'
                    inactiveTintColor='#9e9d9d'
                    focused={subItem == 1}
                    onPress={() => {
                        setSubItem(subItem == 1 ? -1 : 1)
                    }}

                    icon={({ color, focused, size }) => <Ionicons name='home-sharp' color={color} size={20} />}
                    label={({ color }) => LabelSubItem("Facultades", 1, color)}

                />


                {subItem === 1 && <View style={{ marginLeft: 15 }}>
                    <DrawerItem
                        focused={subSubItem == 1}
                        activeBackgroundColor={"#ebeffa"}
                        activeTintColor='#9e9d9d'
                        inactiveTintColor='#9e9d9d'
                        onPress={() => {
                            setSubSubItem(subSubItem == 1 ? -1 : 1)
                        }}
                        label={({ color }) => LabelSubSubItem("Ingenieria", 1, color)}
                        icon={({ color, focused, size }) => <Ionicons name='home-sharp' color={color} size={20} />} />

                    {subSubItem === 1 && <View style={{ marginLeft: 15 }}>
                        <DrawerItem
                            activeBackgroundColor={"#ebeffa"}
                            activeTintColor='#9e9d9d'
                            inactiveTintColor='#9e9d9d'
                            onPress={() => {
                                router.push("carrera/Ing-Sistemas")
                            }}
                            label={({ color, focused }) => <Text style={{ color, marginLeft: -25 }}>Ing. Sistemas</Text>}
                            icon={({ color, focused, size }) => <Ionicons name='home-sharp' color={color} size={20} />} />


                        <DrawerItem

                            activeBackgroundColor={"#ebeffa"}
                            activeTintColor='#9e9d9d'
                            inactiveTintColor='#9e9d9d'
                            onPress={() => {
                                router.push("carrera/Ing-Redes")
                            }}
                            labelStyle={{ marginLeft: -25 }}
                            label={"Ing. Redes y Comunicaciones"}
                            icon={({ color, focused, size }) => <Ionicons name='home-sharp' color={color} size={20} />} />
                    </View>}

                    <DrawerItem
                        activeBackgroundColor={"#ebeffa"}
                        activeTintColor='#9e9d9d'
                        inactiveTintColor='#9e9d9d'
                        onPress={() => {
                            setSubSubItem(subSubItem == 2 ? -1 : 2)
                        }}
                        labelStyle={{ marginLeft: -25 }}
                        label={({ color }) => LabelSubSubItem("Ciencias Empresariales", 1, color)}
                        icon={({ color, focused, size }) => <Ionicons name='home-sharp' color={color} size={20} />} />


                    {subSubItem === 2 && <View style={{ marginLeft: 15 }}>
                        <DrawerItem
                            activeBackgroundColor={"#ebeffa"}
                            activeTintColor='#9e9d9d'
                            inactiveTintColor='#9e9d9d'
                            onPress={() => {

                            }}
                            label={({ color, focused }) => <Text style={{ color, marginLeft: -25 }}>Derecho</Text>}
                            icon={({ color, focused, size }) => <Ionicons name='home-sharp' color={color} size={20} />} />


                        <DrawerItem

                            activeBackgroundColor={"#ebeffa"}
                            activeTintColor='#9e9d9d'
                            inactiveTintColor='#9e9d9d'
                            onPress={() => {

                            }}
                            labelStyle={{ marginLeft: -25 }}
                            label={"Adm. Empresas"}
                            icon={({ color, focused, size }) => <Ionicons name='home-sharp' color={color} size={20} />} />
                    </View>}


                </View>}
                <DrawerItemList {...props} />
            </DrawerContentScrollView>


            <View className='px-4 mb-4'>
                <ThemeConfig />
            </View>

            <View className='border-t p-4 border-[#ccc]'>

                <TouchableOpacity onPress={() => { }} style={{ paddingVertical: 15 }}>
                    <View className='flex-row items-center'>
                        <AntDesign name="questioncircleo" size={22} color={isDarkMode ? "#FFF" : "#000"} />
                        <Text className='text-black dark:text-white ml-2'>
                            Acerca de
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={cerrarSesion} style={{ paddingVertical: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="exit-outline" size={22} color={isDarkMode ? "#FFF" : "#000"} />
                        <Text className='text-black dark:text-white ml-2'>
                            Cerrar Sesion
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CustomDrawer