import firestore from '@react-native-firebase/firestore';
import { ICalendarioAcademico, INotificacionNotice } from '@/types';

const db = firestore();

export const getEventosCalendario = async () => {
    const data = db.collection('CALENDARIO/2023-Presencial/actividades');
    const snapshot = await data.get();

    const valores: ICalendarioAcademico[] = snapshot.docs.map(doc => ({
        ...doc.data() as ICalendarioAcademico, id: doc.id,
    }));
    return valores;
}

