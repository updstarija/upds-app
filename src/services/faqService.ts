import firestore from "@react-native-firebase/firestore";
import { IFaq, INotificacionNotice } from "@/types";
import { IAnnouncement } from "@/types/announcement";
import { QueryFunctionContext } from "@tanstack/react-query";
import { sleep } from "@/helpers";

const db = firestore();

const DB_FAQ_KEY = "FAQ";

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

    let query = db.collection(DB_FAQ_KEY).orderBy("categoria", "asc");

    if (category) {
      query = query.where(Filter("categoria", "==", category));
    }

    if (pageParam) {
      query = query.startAfter(pageParam);
    }

    if (limitResults) {
      query = query.limit(limitResults || 5);
    }

    const snapshot = await query.get();

    const data: IFaq[] = snapshot.docs.map((doc) => {
      const dataDoc = doc.data() as IFaq;

      return {
        ...dataDoc,
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

export default {
  getAllData,
};
