import firestore from '@react-native-firebase/firestore';
import { IFaq } from '@/types';

const db = firestore();

export const getFaqs = async () => {
    const collection = db.collection('FAQ');
    const snapshot = await collection.get();

    const data: IFaq[] = snapshot.docs.map(doc => ({
        ...doc.data() as IFaq, id: doc.id,
    }));

    return data;
}

export const getPaginatedFaqs = async (len: number, categoria: string = "") => {
    let snapshot;

    if (categoria == "") {
        snapshot = await db.collection('FAQ')
            //.orderBy('prioridad', "desc").orderBy("fecha", "desc")
            .limit(len + 3).get();
    } else {
        snapshot = await db.collection('FAQ')
            .where("categoria", "==", categoria)
            // .orderBy('prioridad', "desc").orderBy("fecha", "desc")
            .limit(len + 3).get();
    }

    const data: IFaq[] = snapshot.docs.map(doc => ({
        ...doc.data() as IFaq, id: doc.id,
    }));
    return data;
}

export default {
    getFaqs,
    getPaginatedFaqs
}


