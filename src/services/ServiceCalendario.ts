import firestore from "@react-native-firebase/firestore";
import { ICalendarioAcademico, INotificacionNotice } from "@/types";

const db = firestore();

const DB_CALENDAR_KEY = "ACADEMIC_CALENDAR";

export const getEventosCalendario = async () => {
  const data = db.collection(DB_CALENDAR_KEY);

  const snapshot = await data.get();

  const valores: ICalendarioAcademico[] = snapshot.docs.map((doc) => {
    const data = doc.data() as ICalendarioAcademico;

    return {
      ...data,
      //@ts-ignore
      start: new Date(data.start.toDate()),
      //@ts-ignore
      end: new Date(data.end.toDate()),
      color: "#" + data.color,
      id: doc.id,
    };
  });

  return valores;
};
