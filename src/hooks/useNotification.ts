import { useEffect, useState } from 'react';
import notificationService from '@/services/ServiceNotification';
import { INotificacion } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const useNotification = () => {
    const [data, setData] = useState<INotificacion[]>([])
    const [isLoading, setisLoading] = useState(false)
    const [lastDocument, setLastDocument] = useState<any>(undefined)


    const getNotifications = async () => {
        setisLoading(true)

        const responseData = await notificationService.getAllData({
            lastDoc: lastDocument,
            limit: 5,
        })

        const { data: newData, snapshot } = responseData

        let storageEliminados = await AsyncStorage.getItem(
            "notificaciones-eliminadas"
        );

        let idsEliminados: string[] = [];
        if (storageEliminados) {
            idsEliminados = JSON.parse(storageEliminados) as string[];
        }

        let storageLeidos = await AsyncStorage.getItem("notificaciones-leidas");

        let idsLeidos: string[] = [];
        if (storageLeidos) {
            idsLeidos = JSON.parse(storageLeidos) as string[];
        }

        const newNotifications: INotificacion[] = newData.map((not) => {
            return {
                ...not,
                type: idsEliminados.includes(not.id)
                    ? "delete"
                    : idsLeidos.includes(not.id)
                        ? "read"
                        : "",
            };
        });

        const newDataWithoutDeletes = newNotifications.filter((x) => x.type !== "delete");

        if (snapshot.size > 0) {
            setData([...data, ...newDataWithoutDeletes])
            setLastDocument(snapshot.docs[snapshot.docs.length - 1])
        }
        setisLoading(false)

        return responseData
    }

    const marcarComoLeido = async (id: string) => {
        const dataStorage = await AsyncStorage.getItem("notificaciones-leidas");

        let notificacionesStorage: string[] = [];

        if (dataStorage) {
            notificacionesStorage = JSON.parse(dataStorage);
        }

        if (notificacionesStorage.includes(id)) return;

        notificacionesStorage.push(id);

        await AsyncStorage.setItem(
            "notificaciones-leidas",
            JSON.stringify(notificacionesStorage)
        );

        const newNotis = data.filter((noti) => {
            if (noti.id == id) {
                noti.type = "read";

                return noti;
            }

            return noti;
        });

        setData(newNotis);
    };

    const marcarComoNoLeido = async (id: string) => {
        const dataStorage = await AsyncStorage.getItem("notificaciones-leidas");

        let notificacionesStorage: string[] = [];

        if (dataStorage) {
            notificacionesStorage = JSON.parse(dataStorage);
        }

        if (!notificacionesStorage.includes(id)) return;

        const newIds = notificacionesStorage.filter((x) => x !== id);

        await AsyncStorage.setItem("notificaciones-leidas", JSON.stringify(newIds));

        const newNotis = data.filter((noti) => {
            if (noti.id == id) {
                noti.type = "";

                return noti;
            }

            return noti;
        });
        setData(newNotis);
    };

    const deleteNotificacion = async (id: string) => {
        const dataStorage = await AsyncStorage.getItem("notificaciones-eliminadas");

        let notificacionesStorage: string[] = [];

        if (dataStorage) {
            notificacionesStorage = JSON.parse(dataStorage);
        }

        notificacionesStorage.push(id);

        await AsyncStorage.setItem(
            "notificaciones-eliminadas",
            JSON.stringify(notificacionesStorage)
        );

        const newNotis = data.filter((noti) => noti.id !== id);
        setData(newNotis);
    };
    useEffect(() => {
        getNotifications()
    }, [])

    return {
        data,
        isLoading,
        lastDocument,
        setData,
        setLastDocument,
        getNotifications,
        marcarComoLeido,
        marcarComoNoLeido,
        deleteNotificacion
    }
}