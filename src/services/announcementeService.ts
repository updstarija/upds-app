import firestore from "@react-native-firebase/firestore";
import { INotificacionNotice } from "@/types";
import { IAnnouncement } from "@/types/announcement";
import { QueryFunctionContext } from "@tanstack/react-query";
import { sleep } from "@/helpers";

const db = firestore();

const DB_ANNOUNCEMENT_KEY = "ANNOUNCEMENTS";

type GetAllDataProps = {
  category?: string;
  limitResults?: number;
  q?: string;
};

type QueryContext = QueryFunctionContext<(string | GetAllDataProps)[], any>;

export const getAllData = async (context: QueryContext) => {
  try {
    const Filter = firestore.Filter;
    const { pageParam = undefined, queryKey } = context;
    const [, , args] = queryKey;
    const { category, limitResults, q } = args as GetAllDataProps;

    let query = db
      .collection(DB_ANNOUNCEMENT_KEY)
      .orderBy("priority", "desc")
      .orderBy("date", "desc");
    // .where("date", "<=", new Date())

    if (category) {
      query = query.where(Filter("category", "==", category));
    }

    //query = query.where("date", "<=", new Date())

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

type GetTopPriorityProps = {
  type?: "superpriority" | "priority";
  limitResults?: number;
};

export const getTopPriority = async ({
  type = "priority",
  limitResults = 5,
}: GetTopPriorityProps) => {
  try {
    const Filter = firestore.Filter;

    let query = db.collection(DB_ANNOUNCEMENT_KEY).orderBy("date", "desc");

    query = query.where(Filter(type, "==", true));

    query = query.limit(limitResults);

    const snapshot = await query.get();

    const data: IAnnouncement[] = snapshot.docs.map((doc) => ({
      ...(doc.data() as IAnnouncement),
      id: doc.id,
    }));

    return data;
  } catch (e: any) {
    console.log(e);

    throw new Error(e);
  }
};

export default {
  getAllData,
  getData,
  getTopPriority,
};
