import firestore from '@react-native-firebase/firestore';
import { INotificacion } from '@/types';

const db = firestore();

interface Filters {
    lastDoc: any,
    limit: number,
}

export const getAllData = async (filtros: Filters) => {
    const { lastDoc, limit } = filtros

    let query = db.collection("Notificaciones").orderBy("fecha", "desc")

    if (lastDoc !== undefined) {
        query = query.startAfter(lastDoc)
    }

    query = query.limit(limit)

    const snapshot = await query.get()

    const data: INotificacion[] = snapshot.docs.map(doc => ({
        ...doc.data() as INotificacion, id: doc.id,
    }));

    return {
        snapshot,
        data
    };
}


export default {
    getAllData
}


