import firestore from '@react-native-firebase/firestore';
import { INotificacion } from '@/types';

const db = firestore();

export const getNotificaciones = async (limite = 10) => {
    const data = await db.collection('Notificaciones').orderBy('fecha', 'desc').limit(limite).get();;

    const valores: INotificacion[] = data.docs.map(doc => ({
        ...doc.data() as INotificacion, id: doc.id,
    }));

    return valores;
}

