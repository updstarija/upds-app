import { ICalendarioAcademico, TTypeCalendar } from "@/types";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { startOfMonth } from "date-fns";

const DB_CALENDAR_KEY = "ACADEMIC_CALENDAR";

type GetAllDataQueryParams = {
  typeCalendar?: TTypeCalendar;
  selectedDate?: Date;
};

const getAllDataQuery = async ({
  typeCalendar,
  selectedDate,
}: GetAllDataQueryParams = {}) => {
  try {
    let query1 = firestore().collection(
      DB_CALENDAR_KEY
    ) as FirebaseFirestoreTypes.Query;

    // let query2 = firestore().collection(
    //   DB_CALENDAR_KEY
    // ) as FirebaseFirestoreTypes.Query;

    if (typeCalendar && typeCalendar !== "Todos") {
      query1 = query1.where("typeCalendar", "array-contains", typeCalendar);
      // query2 = query2.where("typeCalendar", "array-contains", typeCalendar);
    }

    if (selectedDate) {
      const startDate = startOfMonth(selectedDate);

      query1 = query1.where("startDetail.year", "==", startDate.getFullYear());
      //  .where("startDetail.month", "==", startDate.getMonth());

      // query2 = query2
      //   .where("endDetail.year", "==", startDate.getFullYear())
      //   .where("endDetail.month", "==", startDate.getMonth());
    }

    const querySnapshot1 = await query1.get();
    const data1: ICalendarioAcademico[] = querySnapshot1.docs.map((doc) => {
      const dataDoc = doc.data() as ICalendarioAcademico;

      return {
        ...dataDoc,
        //@ts-ignore
        start: new Date(dataDoc.start.toDate()),
        //@ts-ignore
        end: new Date(dataDoc.end.toDate()),
        color: "#" + dataDoc.color,
        id: doc.id,
      };
    });

    // const querySnapshot2 = await query2.get();
    // const data2: ICalendarioAcademico[] = querySnapshot2.docs.map((doc) => {
    //   const dataDoc = doc.data() as ICalendarioAcademico;

    //   return {
    //     ...dataDoc,
    //     //@ts-ignore
    //     start: new Date(dataDoc.start.toDate()),
    //     //@ts-ignore
    //     end: new Date(dataDoc.end.toDate()),
    //     color: "#" + dataDoc.color,
    //     id: doc.id,
    //   };
    // });

    // console.log({
    //   selectedDate,
    //   data1,
    //   data2,
    // });
    return data1;
  } catch (e: any) {
    console.log(e);
    throw new Error(e);
  }
};

export default {
  getAllDataQuery,
};
