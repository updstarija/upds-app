import { keysStorage } from "@/data/storage/keys";
import announcementeService from "@/services/announcementeService";
import { IAnnouncement } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import Toast from "react-native-toast-message";

type QueryType =
  | "announcementsQuery"
  | "announcementsPriorityQuery"
  | "announcementQuery";

type HookProps = {
  id?: string;
  params: {
    category?: string;
    limitResults?: number;
    q?: string;
    type?: "superpriority" | "priority";
  };
  query?: QueryType[];
};

export const useAnnouncements = ({ id, params, query }: HookProps) => {
  const client = useQueryClient();

  if (!id && !params) {
    throw new Error("Id or params is missing");
  }

  const announcementsQuery = useInfiniteQuery(
    ["announcements", "infinite", params],
    announcementeService.getAllData,
    {
      getNextPageParam: (lastPage, pages) => {
        if (!lastPage?.lastDoc?.id) return;

        return lastPage.lastDoc;
      },
      enabled: query?.includes("announcementsQuery"),
    }
  );

  const announcementsPriorityQuery = useQuery(
    ["announcements", "priority", params.type],
    () =>
      announcementeService.getTopPriority({
        type: params.type,
        limitResults: params.limitResults,
      }),
    {
      enabled: query?.includes("announcementsPriorityQuery"),
    }
  );

  const announcementQuery = useQuery(
    ["announcements", id || ""],
    () => announcementeService.getData(id || ""),
    {
      enabled: !!id,
    }
  );

  const likeAnnouncement = async (id: string) => {
    const likedAnnouncements = await AsyncStorage.getItem(
      keysStorage.LIKED_ANNOUNCEMENTS
    );

    const likedAnnouncementsArray: string[] = likedAnnouncements
      ? JSON.parse(likedAnnouncements)
      : [];

    if (!likedAnnouncementsArray.includes(id)) {
      likedAnnouncementsArray.push(id);
      await AsyncStorage.setItem(
        keysStorage.LIKED_ANNOUNCEMENTS,
        JSON.stringify(likedAnnouncementsArray)
      );
    } else {
      const newLikedAnnouncements = likedAnnouncementsArray.filter(
        (x) => x !== id
      );

      await AsyncStorage.setItem(
        keysStorage.LIKED_ANNOUNCEMENTS,
        JSON.stringify(newLikedAnnouncements)
      );
    }
  };


  const announcementUpdateMutation = useMutation((data: Partial<IAnnouncement>) => announcementeService.updateData(data), {
    onSuccess: (x, data) => {
      likeAnnouncement(data.id as string)

      client.invalidateQueries(['announcements'])
    },
    onError: (error: Error) => {
      /*  Toast.show({
         type: "warning",
         text1: 'Alerta',
         text2: error?.message || "Si el problema persiste contacta con soporte"
       }) */
    }
  })

  /* const announcementQuery = useQuery({
    queryKey: ["announcement", id || "disabled"],
    queryFn: () => announcementService.getData(id || ""),
    enabled: !!id,
  }); */

  return {
    announcementsQuery,
    announcementQuery,
    announcementsPriorityQuery,
    announcementUpdateMutation
    //  announcementQuery,
  };
};
