import firestore from '@react-native-firebase/firestore';
import { INotificacionNotice } from '@/types';

const db = firestore();

export const getNoticias = async () => {
    const data = db.collection('Noticia');
    const snapshot = await data.get();

    const valores: INotificacionNotice[] = snapshot.docs.map(doc => ({
        ...doc.data() as INotificacionNotice, id: doc.id,
    }));
    return valores;
}

export const getPaginatedNotice = async (len: number, categoria: string = "") => {
    let snapshot;

    if (categoria == "") {
        snapshot = await db.collection('Noticia')
            .orderBy('prioridad', "desc").orderBy("fecha", "desc").limit(len + 3).get();
    } else {
        snapshot = await db.collection('Noticia')
            .where("categoria", "==", categoria)
            .orderBy('prioridad', "desc").orderBy("fecha", "desc").limit(len + 3).get();
    }

    const data: INotificacionNotice[] = snapshot.docs.map(doc => ({
        ...doc.data() as INotificacionNotice, id: doc.id,
    }));
    return data;
}

export const getOneNotice = async (id: string) => {
    const snapshot = await db.collection("Noticia").doc(id).get();

    if (snapshot.exists) {
        return {
            id: snapshot.id,
            ...snapshot.data()
        }
    }

    return null


}

export const getTopPriority = async () => {

    const snapshot = await db.collection('Noticia')
        .orderBy("fecha", "desc")
        .where("superprioridad", "==", true).get();

    const data: INotificacionNotice[] = snapshot.docs.map(doc => ({
        ...doc.data() as INotificacionNotice, id: doc.id,
    }));

    return data
}


export default {
    getTopPriority
}