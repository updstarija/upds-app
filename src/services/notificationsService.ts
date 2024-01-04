import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { INotification } from "@/types";
import { IAnnouncement } from "@/types/announcement";
import { QueryFunctionContext } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { keysStorage } from "@/data/storage/keys";

const db = firestore();

const DB_NOTIFICATION_KEY = "NOTIFICATIONS";

type GetAllDataProps = {
  limitResults?: number;
  q?: string;
};

type QueryContext = QueryFunctionContext<(string | GetAllDataProps)[], any>;

export const getAllData = async (context: QueryContext) => {
  try {
    const { pageParam = undefined, queryKey } = context;
    const [, , args] = queryKey;
    const { limitResults, q } = args as GetAllDataProps;

    let query = db.collection(DB_NOTIFICATION_KEY)
      .where("date", "<=", new Date())
      .orderBy("date", "desc");

    if (pageParam) {
      query = query.startAfter(pageParam);
    }

    if (limitResults) {
      query = query.limit(limitResults || 1);
    }

    const snapshot = await query.get();

    const dataPromises = snapshot.docs.map(
      async (doc): Promise<INotification> => {
        const dataDoc = doc.data() as INotification;
        const deleteNotifications = await deletedNotificationsStorage();
        const readNotifications = await readNotificationsStorage();

        const isRead = readNotifications.includes(doc.id);
        const isDeleted = deleteNotifications.includes(doc.id);

        return {
          ...dataDoc,
          //@ts-ignore
          date: new Date(dataDoc.date.toDate()),
          id: doc.id,
          type: isDeleted ? "deleted" : isRead ? "read" : "unread",
        };
      }
    );

    const data: INotification[] = await Promise.all(dataPromises);

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

const readNotificationsStorage = async () => {
  const notifications = await AsyncStorage.getItem(
    keysStorage.READ_NOTIFICATIONS
  );

  if (!notifications) return [];

  return JSON.parse(notifications) as string[];
};

const deletedNotificationsStorage = async () => {
  const notifications = await AsyncStorage.getItem(
    keysStorage.DELETED_NOTIFICATIONS
  );

  if (!notifications) return [];

  return JSON.parse(notifications) as string[];
};

export default {
  getAllData,
};
