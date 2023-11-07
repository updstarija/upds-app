import firestore from '@react-native-firebase/firestore';
import { INotificacion } from '@/types';

const db = firestore();

type RedSocialType = "facebook" | "instagram" | "youtube"

export const getToken = async (redSocialType: RedSocialType) => {
    const response = await db.collection(`TOKENS`).doc(redSocialType).get()
    const data = response.data()
    const token = data?.token || ""
    return token;
}



export default {
    getToken
}