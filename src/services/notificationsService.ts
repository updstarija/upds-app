import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { INotificacionNotice } from "@/types";
import { IAnnouncement } from "@/types/announcement";
import { QueryFunctionContext } from "@tanstack/react-query";

const db = firestore();

const DB_ANNOUNCEMENT_KEY = "NOTIFICATIONS";

type GetAllDataProps = {
  category?: string;
  limitResults?: number;
  q?: string;
};

type QueryContext = QueryFunctionContext<(string | GetAllDataProps)[], any>;

export const getAllData = async (context: QueryContext) => {
  try {
    const { pageParam = undefined, queryKey } = context;
    const [, , args] = queryKey;
    const { category, limitResults, q } = args as GetAllDataProps;

    let query = db
      .collection(DB_ANNOUNCEMENT_KEY)
      .where("date", "<=", new Date())
      .orderBy("date", "desc");

    if (category) {
      query = query.where("category", "==", category);
    }

    if (pageParam) {
      query = query.startAfter(pageParam);
    }

    if (limitResults) {
      query = query.limit(limitResults || 1);
    }

    const snapshot = await query.get();

    const data: IAnnouncement[] = snapshot.docs.map((doc) => {
      const dataDoc = doc.data() as IAnnouncement;

      return {
        ...dataDoc,
        //@ts-ignore
        date: new Date(dataDoc.date.toDate()),
        id: doc.id,
      };
    });

    const lastDoc = snapshot.docs[snapshot.docs.length - 1];

    return {
      data,
      lastDoc,
    };
  } catch (e: any) {
    console.log(e);
    throw new Error(e);
  }
};

/* export const getAllData = async ({
  category,
  limitResults,
  q,
}: GetAllDataProps) => {
  try {
    let query = db
      .collection(DB_ANNOUNCEMENT_KEY)
      .where("date", "<=", new Date())
      .orderBy("date", "desc");

    if (category) {
      query = query.where("category", "==", category);
    }

    if (limitResults) {
      console.log(limitResults);
      query = query.limit(limitResults || 1);
    }

    const snapshot = await query.get();

    const data: IAnnouncement[] = snapshot.docs.map((doc) => {
      const dataDoc = doc.data() as IAnnouncement;

      return {
        ...dataDoc,
        //@ts-ignore
        date: new Date(dataDoc.date.toDate()),
        id: doc.id,
      };
    });

    return data;
  } catch (e: any) {
    console.log(e);
    throw new Error(e);
  }
};
 */
export const getData = async (id: string): Promise<IAnnouncement> => {
  try {
    const snapshot = await db.collection(DB_ANNOUNCEMENT_KEY).doc(id).get();
    const data = snapshot.data() as IAnnouncement;
    return {
      ...data,
      //@ts-ignore
      date: new Date(data.date.toDate()),
      id: snapshot.id,
    };
  } catch (e: any) {
    console.log(e);
    throw new Error(e);
  }
};

export const getTopPriority = async () => {
  const snapshot = await db
    .collection(DB_ANNOUNCEMENT_KEY)
    .orderBy("date", "desc")
    .where("superpriority", "==", true)
    .limit(5)
    .get();

  const data: INotificacionNotice[] = snapshot.docs.map((doc) => ({
    ...(doc.data() as INotificacionNotice),
    id: doc.id,
  }));

  return data;
};

export default {
  getAllData,
  getData,
  getTopPriority,
};
