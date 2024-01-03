import { keysStorage } from "@/data/storage/keys";
import notificationsService from "@/services/notificationsService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

type QueryType = "notificationsQuery" | "notificationQuery";

type HookProps = {
  id?: string;
  params: {
    limitResults?: number;
    q?: string;
  };
  query?: QueryType[];
};

export const useNotifications = ({ id, params, query }: HookProps) => {
  const client = useQueryClient();

  if (!id && !params) {
    throw new Error("Id or params is missing");
  }

  const notificationsQuery = useInfiniteQuery(
    ["notifications", "infinite", params],
    notificationsService.getAllData,
    {
      getNextPageParam: (lastPage, pages) => {
        if (!lastPage?.lastDoc?.id) return;

        return lastPage.lastDoc;
      },
      enabled: query?.includes("notificationsQuery"),
    }
  );

  const markAsRead = async (id: string) => {
    const readNotifications = await AsyncStorage.getItem(
      keysStorage.READ_NOTIFICATIONS
    );
    const readNotificationsArray: string[] = readNotifications
      ? JSON.parse(readNotifications)
      : [];

    if (readNotificationsArray.includes(id)) {
      const newReadNotifications = readNotificationsArray.filter(
        (x) => x !== id
      );

      await AsyncStorage.setItem(
        keysStorage.READ_NOTIFICATIONS,
        JSON.stringify(newReadNotifications)
      );
    }
  };

  const markAsUnread = async (id: string) => {
    const readNotifications = await AsyncStorage.getItem(
      keysStorage.READ_NOTIFICATIONS
    );
    const readNotificationsArray = readNotifications
      ? JSON.parse(readNotifications)
      : [];

    if (!readNotificationsArray.includes(id)) {
      readNotificationsArray.push(id);
      await AsyncStorage.setItem(
        keysStorage.READ_NOTIFICATIONS,
        JSON.stringify(readNotificationsArray)
      );
    }
  };

  const deleteNotification = async (id: string) => {
    const deletedNotifications = await AsyncStorage.getItem(
      keysStorage.DELETED_NOTIFICATIONS
    );
    const deletedNotificationsArray = deletedNotifications
      ? JSON.parse(deletedNotifications)
      : [];

    if (!deletedNotificationsArray.includes(id)) {
      deletedNotificationsArray.push(id);
      await AsyncStorage.setItem(
        keysStorage.DELETED_NOTIFICATIONS,
        JSON.stringify(deletedNotificationsArray)
      );
    }
  };

  const markAsUnreadMutation = useMutation(markAsUnread, {
    onSuccess: async () => {
      client.invalidateQueries(["notifications"]);
    },
  });

  const markAsReadMutation = useMutation(markAsRead, {
    onSuccess: async () => {
      client.invalidateQueries(["notifications"]);
    },
  });

  const deleteNotificationMutation = useMutation(deleteNotification, {
    onSuccess: async () => {
      client.invalidateQueries(["notifications"]);
    },
  });

  return {
    notificationsQuery,
    markAsUnreadMutation,
    deleteNotificationMutation,
    markAsReadMutation,
  };
};
