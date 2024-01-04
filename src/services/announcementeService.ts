import firestore from "@react-native-firebase/firestore";
import { INotificacionNotice } from "@/types";
import { IAnnouncement } from "@/types/announcement";
import { QueryFunctionContext } from "@tanstack/react-query";
import { sleep } from "@/helpers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { keysStorage } from "@/data/storage/keys";

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
      .where("date", "<=", new Date())
      .orderBy("date", "desc")
      .orderBy("priority", "desc")

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

    const dataPromises = snapshot.docs.map(async (doc) => {
      const dataDoc = doc.data() as IAnnouncement;

      const likedAnnouncements = await getLikedAnnouncements()

      const isLiked = likedAnnouncements.includes(doc.id);

      return {
        ...dataDoc,
        //@ts-ignore
        date: new Date(dataDoc.date.toDate()),
        isLiked,
        id: doc.id,
      };
    });

    const lastDoc = snapshot.docs[snapshot.docs.length - 1];

    const data = await Promise.all(dataPromises)

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

    const likedAnnouncements = await getLikedAnnouncements()

    const isLiked = likedAnnouncements.includes(data.id);
    console.log(likedAnnouncements)
    return {
      ...data,
      //@ts-ignore
      date: new Date(data.date.toDate()),
      id: snapshot.id,
      isLiked
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

const updateData = async (data: Partial<IAnnouncement>) => {
  try {
    const docRef = firestore().collection(DB_ANNOUNCEMENT_KEY).doc(data.id);

    await docRef
      .update(data)

  } catch (error) {

  }
}


const getLikedAnnouncements = async () => {
  const announcements = await AsyncStorage.getItem(
    keysStorage.LIKED_ANNOUNCEMENTS
  );

  if (!announcements) return [];

  return JSON.parse(announcements) as string[];
};

export default {
  getAllData,
  getData,
  getTopPriority,
  updateData
};
