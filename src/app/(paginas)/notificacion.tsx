import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getNotificaciones } from '@/services'
import { BottomSheet, Button, Texto } from '../../components'
import { INotificacion } from '@/types'
import { FlashList } from '@shopify/flash-list'
import { Link, useRouter } from 'expo-router'
import { Feather, FontAwesome5 } from '@expo/vector-icons'
import { useThemeColor } from '@/hooks'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { formatFecha } from '@/helpers'
const Notificacion
  = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [limit, setLimit] = useState(0)
    const isDarkMode = useThemeColor() === "dark"
    const router = useRouter()

    const [notificaciones, setNotificaciones] = useState<INotificacion[]>([])


    const deleteNotificacion = async (id: string) => {
      const dataStorage = await AsyncStorage.getItem('notificaciones-eliminadas')

      let notificacionesStorage: string[] = []

      if (dataStorage) {
        notificacionesStorage = JSON.parse(dataStorage)
      }

      notificacionesStorage.push(id)

      await AsyncStorage.setItem('notificaciones-eliminadas', JSON.stringify(notificacionesStorage))


      const newNotis = notificaciones.filter((noti) => noti.id !== id)
      setNotificaciones(newNotis)
    }

    const navigation = async (item: INotificacion) => {
      await marcarComoLeido(item.id)

      if (item.to && item.param) {
        router.push({
          pathname: `/(home)/comunicados/[id]`, params: {
            id: item.param
          }
        })
      }
    }

    const marcarComoLeido = async (id: string) => {
      const dataStorage = await AsyncStorage.getItem('notificaciones-leidas')

      let notificacionesStorage: string[] = []

      if (dataStorage) {
        notificacionesStorage = JSON.parse(dataStorage)
      }

      if (notificacionesStorage.includes(id)) return;

      notificacionesStorage.push(id)

      await AsyncStorage.setItem('notificaciones-leidas', JSON.stringify(notificacionesStorage))


      const newNotis = notificaciones.filter((noti) => {
        if (noti.id == id) {
          noti.type = "read"

          return noti;
        }

        return noti
      })
      setNotificaciones(newNotis)
    }

    const marcarComoNoLeido = async (id: string) => {
      const dataStorage = await AsyncStorage.getItem('notificaciones-leidas')

      let notificacionesStorage: string[] = []

      if (dataStorage) {
        notificacionesStorage = JSON.parse(dataStorage)
      }

      if (!notificacionesStorage.includes(id)) return;

      const newIds = notificacionesStorage.filter(x => x !== id)

      await AsyncStorage.setItem('notificaciones-leidas', JSON.stringify(newIds))

      const newNotis = notificaciones.filter((noti) => {
        if (noti.id == id) {
          noti.type = ""

          return noti;
        }

        return noti
      })
      setNotificaciones(newNotis)


    }

    const NotificacionItem = (item: INotificacion) => {



      return (
        <TouchableOpacity onPress={() => navigation(item)} className='px-2 py-1 ' style={{ backgroundColor: item.type == "read" ? isDarkMode ? "" : "#FFF" : isDarkMode ? "" : "rgba(34,59,130 / .2)" }}>

          <View className='flex-row justify-between items-center '>
            <View className='flex-1 mr-4'>
              <Texto className='text-black dark:text-white text-lg' weight='Bold'>{item.titulo}</Texto>
              <Texto numberOfLines={2} className='text-black dark:text-white my-1' weight='Light'>{item.mensaje}</Texto>
              <Texto className='text-gray-400 text-xs' weight='Bold'>hace {formatFecha(item.fecha + "")}</Texto>
            </View>

            <BottomSheet content={<FontAwesome5 name='ellipsis-h' color={isDarkMode ? "#FFF" : "#000"} size={20} />} snapPointsProp={["40%"]}>
              <View className='p-2'>
                <View className=''>
                  <Texto className='text-center text-xl' weight='Bold'>{item.titulo}</Texto>
                  <Texto className='text-center' numberOfLines={10}>{item.mensaje}</Texto>
                </View>

                <View className='mt-3'>
                  <Button onPress={() => deleteNotificacion(item.id)} classNameBtn='bg-primario p-4 rounded-xl flex-row justify-between items-center'>

                    <Texto className='text-white'>Eliminar Notificacion</Texto>
                    <Feather name='delete' color={"#fff"} size={20} />

                  </Button>


                  <Button onPress={() => item.type == "read" ? marcarComoNoLeido(item.id) : marcarComoLeido(item.id)} classNameBtn='bg-primario p-4 rounded-xl flex-row justify-between items-center mt-1'>

                    <Texto className='text-white'>{item.type == "read" ? "Marcar como no leido" : "Marcar como leido"}</Texto>
                    <Feather name={item.type == "read" ? "eye-off" : "eye"} color={"#fff"} size={20} />

                  </Button>
                </View>
              </View>
            </BottomSheet>
          </View>

        </TouchableOpacity>
      )
    }


    const getData = async () => {

      const data = await getNotificaciones(limit + 10)
      setLimit(limit + 10)


      // setNotificaciones(data)

      let storageEliminados = await AsyncStorage.getItem("notificaciones-eliminadas")

      let idsEliminados: string[] = []
      if (storageEliminados) {
        idsEliminados = JSON.parse(storageEliminados) as string[]
      }

      let storageLeidos = await AsyncStorage.getItem("notificaciones-leidas")


      let idsLeidos: string[] = []
      if (storageLeidos) {
        idsLeidos = JSON.parse(storageLeidos) as string[]
      }

      const newData = data.map((not) => {
        return {
          ...not,
          type: idsEliminados.includes(not.id) ? "delete" : idsLeidos.includes(not.id) ? "read" : ""
        }
      })

      const newDataWithoutDeletes = newData.filter((x) => x.type !== "delete")

      //@ts-ignore
      setNotificaciones(newDataWithoutDeletes)
      setIsLoading(false)
    }


    useEffect(() => {
      /*
       (
         async () => {
           setIsLoading(true)
           const data = await getNotificaciones()
           // setNotificaciones(data)
 
           let storageEliminados = await AsyncStorage.getItem("notificaciones-eliminadas")
 
           let idsEliminados: string[] = []
           if (storageEliminados) {
             idsEliminados = JSON.parse(storageEliminados) as string[]
           }
 
           let storageLeidos = await AsyncStorage.getItem("notificaciones-leidas")
 
 
           let idsLeidos: string[] = []
           if (storageLeidos) {
             idsLeidos = JSON.parse(storageLeidos) as string[]
           }
 
           const newData = data.map((not) => {
             return {
               ...not,
               type: idsEliminados.includes(not.id) ? "delete" : idsLeidos.includes(not.id) ? "read" : ""
             }
           })
 
           const newDataWithoutDeletes = newData.filter((x) => x.type !== "delete")
 
           //@ts-ignore
           setNotificaciones(newDataWithoutDeletes)
           setIsLoading(false)
         }
       )()
      */
      getData()
    }, [])



    return (
      <View className='bg-white dark:bg-primario-dark flex-1'>
        {isLoading
          ? <Texto>CARGANDO</Texto>
          : <FlashList
            renderItem={({ item }) => <NotificacionItem {...item} />}
            estimatedItemSize={100}
            data={notificaciones}
            onEndReached={getData}
            onEndReachedThreshold={0.5}
            ItemSeparatorComponent={() => (<View className='border-[0.4px] border-secondary-dark' />)}
          />}

      </View>
    )
  }



export default Notificacion
