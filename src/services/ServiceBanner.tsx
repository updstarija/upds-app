import firestore from '@react-native-firebase/firestore';
import {DocumentSnapshot} from 'firebase/firestore';
import {Banner} from '../types/banner';
const db = firestore();

export const getBanners = async () => {
  const data = db.collection('Banner');
  const snapshot = await data.get();

  const valores: Banner[] = snapshot.docs.map(doc => ({
    id: doc.id,
    enlace: doc.data().enlace,
    estado: doc.data().estado,
    fecha: doc.data().fecha,
    hora: doc.data().hora,
    imagen: doc.data().imagen,
    posicion: doc.data().posicion,
  }));
  return valores;
};
