import { Text, View } from 'react-native'
import React, { useState } from 'react'
import { DrawerContentScrollView, DrawerItemList, DrawerItem, DrawerView, DrawerContentComponentProps } from '@react-navigation/drawer'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

import { ThemeConfig } from '@/views'
import { useAuthContext, useThemeColor } from '@/hooks'
import { router } from 'expo-router'
import { COLORS } from '~/constants'
import { Texto } from './ui'

type MaterialComIcon = keyof typeof MaterialCommunityIcons.glyphMap;
interface Menu {
    label: string
    items?: Menu[]
    link?: string
    icon: MaterialComIcon
}


const menu: Menu[] = [
    {
        label: "Facultades", items: [
            {
                label: "Ciencias Jurídicas", items: [
                    { label: "Derecho", link: "/carrera", icon: "book" }
                ],
                icon: "folder-table"
            },
            {
                label: "Ciencias Empresariales", items: [
                    { label: "Administración de Empresas", link: "/carrera", icon: "book" },
                    { label: "Contaduría Pública", link: "/carrera", icon: "book" },
                    { label: "Ingeniería Comercial", link: "/carrera", icon: "book" },
                ],
                icon: "folder-table"
            },
            {
                label: "Ciencias Sociales", items: [
                    { label: "Ciencias de la Comunicación Social", link: "/carrera", icon: "book" },
                    { label: "Psicología", link: "/carrera", icon: "book" },
                ],
                icon: "folder-table"
            },
            {
                label: "Ingeniería", items: [
                    { label: "Ingeniería Civil", link: "/carrera", icon: "book" },
                    { label: "Ingeniería en Gestión Ambiental", link: "/carrera", icon: "book" },
                    { label: "Ingeniería en Redes y Telecomunicaciones", link: "/carrera", icon: "book" },
                    { label: "Ingeniería Industrial", link: "/carrera", icon: "book" },
                ],
                icon: "folder-table"
            },
            {
                label: "Semiprensenciales", items: [
                    { label: "Derecho", link: "/carrera", icon: "book" },
                    { label: "Adm Empresas", link: "/carrera", icon: "book" },
                ],
                icon: "folder-table"
            }
        ],
        icon: "home-group"
    },
]


const CustomDrawer = (props: DrawerContentComponentProps) => {
    const isDarkMode = useThemeColor() === "dark"
    const { status, userAuth, logout } = useAuthContext();

    const [menuActual, setMenuActual] = useState(menu)
    const [historyMenu, setHistoryMenu] = useState<any[]>([])
    const [title, setTitle] = useState("")

    const cerrarSesion = async () => {
        logout();
        router.replace('/auth/login');
    };

    const LabelSubItem = (title: string, link: string | undefined, color: string) => {
        return (<View style={{ marginLeft: -25 }} className=' flex-1 justify-between items-center flex-row'>
            <Text style={{
                color: historyMenu.length == 0 ? "#9e9d9d" : "#000",
                fontFamily: 'LatoRegular',
                fontSize: 15,
            }}>{title}</Text>

            {!link ? <Ionicons name='chevron-forward' size={15} color={"#Fff"} /> : null}



        </View>)
    }

    const handleMenuClick = (menu: any) => {


        if (menu?.items) {
            setTitle(menu.label)
            setMenuActual(menu.items)
            setHistoryMenu([...historyMenu, menu])
            if (historyMenu == null) {
            } else {
                //setHistoryMenu([...historyMenu, menu])
            }

        }
    }

    const handleBackMenuClick = () => {
        if (historyMenu?.length == 1) {
            setMenuActual(menu)
            setHistoryMenu([])
            return
        }

        //   setMenuActual(historyMenu[0])

        console.log(JSON.stringify(historyMenu[historyMenu.length - 2]))

        const newMenu = historyMenu[historyMenu.length - 2]
        // setMenuActual(historyMenu[historyMenu.length - 2].items)
        setTitle(newMenu.label)
        setMenuActual(newMenu.items)
        const newHistori = historyMenu.slice(0, historyMenu.length - 1)



        //const newHistory = [...historyMenu]
        console.log(newHistori.length)
        setHistoryMenu(newHistori)

    }

    return (
        <View className='flex-1 bg-white dark:bg-primario-dark border-r border-[.6px] border-secondary-dark'>
            <DrawerContentScrollView {...props} className=''>

                {historyMenu.length != 0 && <View className='flex-row justify-between p-4'>
                    <TouchableOpacity onPress={handleBackMenuClick}>
                        <AntDesign name='left' size={20} color={isDarkMode ? "#FFF" : "#000"} />
                    </TouchableOpacity>

                    <Texto>{title}</Texto>

                    <View />
                </View>}

                {menuActual.map((x) => (
                    <DrawerItem
                        //style={{ justifyContent: "space-between", display: "flex", flexDirection: "row", alignItems: "center", flex: 1 }}
                        key={x.label}
                        activeBackgroundColor={"#ebeffa"}
                        activeTintColor='#9e9d9d'
                        inactiveTintColor={historyMenu.length == 0 ? "#9e9d9d" : "#000"}
                        onPress={() => {
                            if (x?.link) {
                                router.push(`${x.link}/${x.label.toLowerCase().replaceAll(" ", "-")}`)
                            }
                            else handleMenuClick(x)
                        }}
                        icon={({ color, focused, size }) => {
                            {/* <Ionicons name='home-sharp' color={color} size={20} /> */ }
                            return <MaterialCommunityIcons name={x.icon} color={color} size={20} />
                        }}
                        label={({ color }) => LabelSubItem(x.label, x?.link, color)}

                    />
                ))}

                {historyMenu.length == 0 && <DrawerItemList {...props} />}
            </DrawerContentScrollView>


            <View className='px-4 mb-4'>
                <ThemeConfig />
            </View>
            <View className='border-t p-4 border-[#ccc]'>

                {status === "autenticado" ?
                    <TouchableOpacity onPress={cerrarSesion} style={{ paddingVertical: 15 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="exit-outline" size={22} color={isDarkMode ? "#FFF" : "#000"} />
                            <Text className='text-black dark:text-white ml-2'>
                                Cerrar Sesion
                            </Text>
                        </View>
                    </TouchableOpacity>
                    : <TouchableOpacity onPress={() => router.push("/auth/login")} style={{ paddingVertical: 15 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="log-in" size={22} color={isDarkMode ? "#FFF" : "#000"} />
                            <Text className='text-black dark:text-white ml-2 text-center'>
                                Iniciar Sesion
                            </Text>
                        </View>
                    </TouchableOpacity>}

            </View>
        </View>
    )
}

export default CustomDrawer