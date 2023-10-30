import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { IFaq } from '@/types';

const db = firestore();

interface Filters {
    lastDoc: any,
    limit: number,
    filters: {
        categoria: {
            value: string,
            matchMode: FirebaseFirestoreTypes.WhereFilterOp
        }
    }
}

export const getFaqsV2 = async (filtros: Filters) => {
    const { lastDoc, limit } = filtros

    let query = db.collection("FAQ").orderBy("categoria", "asc")

    if (lastDoc !== undefined) {
        query = query.startAfter(lastDoc)
    }

    if (filtros.filters.categoria.value !== "") {
        query = query.where("categoria", filtros.filters.categoria.matchMode, filtros.filters.categoria.value)
    }

    query = query.limit(limit)

    const snapshot = await query.get()

    const data: IFaq[] = snapshot.docs.map(doc => ({
        ...doc.data() as IFaq, id: doc.id,
    }));

    return {
        snapshot,
        data
    };
}

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
            .limit(len + 3).orderBy("categoria", "asc").get();
    } else {
        snapshot = await db.collection('FAQ')
            .where("categoria", "==", categoria)
            // .orderBy('prioridad', "desc").orderBy("fecha", "desc")
            .limit(len + 3).orderBy("categoria", "asc").get();
    }

    const data: IFaq[] = snapshot.docs.map(doc => ({
        ...doc.data() as IFaq, id: doc.id,
    }));

    return data;
}

export default {
    getFaqs,
    getPaginatedFaqs,
    getFaqsV2
}


