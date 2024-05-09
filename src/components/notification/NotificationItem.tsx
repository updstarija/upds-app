import { formatDateForDisplay } from "@/helpers/formatDateForDisplay";
import { useThemeColor } from "@/hooks";
import { INotification } from "@/types";
import { CustomBottomSheetModal, Texto } from "@/ui";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import clsx from "clsx";
import { View, Text, TouchableOpacity } from "react-native";
import { Button } from "../Button";
import { useNotifications } from "@/hooks/useNotifications";
import { useRef } from "react";
import { CustomBottomSheetRef } from "@/ui/CustomBottomSheetModal";

type Props = {
  notification: INotification;
  onPress?: Function;
};
const NotificationItem: React.FC<Props> = ({ notification, onPress }) => {
  const isDark = useThemeColor() === "dark";

  const {
    markAsUnreadMutation,
    markAsReadMutation,
    deleteNotificationMutation,
  } = useNotifications({
    params: {},
  });

  const ref = useRef<CustomBottomSheetRef>(null);

  const onDelete = async () => {
    await deleteNotificationMutation.mutateAsync(notification.id);
    ref.current?.close();
  };

  const onMark = async () => {
    if (notification.type === "unread") {
      await markAsUnreadMutation.mutateAsync(notification.id);
    } else if (notification.type === "read") {
      await markAsReadMutation.mutateAsync(notification.id);
    }
    ref.current?.close();
  };

  const asChild = onPress ? true : false;

  const Content = (
    <>
      <Texto
        className="text-black dark:text-white text-base"
        weight="Bold"
        numberOfLines={1}
      >
        {notification.title}
      </Texto>
      <Texto
        numberOfLines={2}
        className="text-black dark:text-white my-1 text-xs"
      >
        {notification.body}
      </Texto>
      <Texto className="text-gray-400 text-xs" weight="Bold">
        {formatDateForDisplay(notification.date)}
      </Texto>
    </>
  );

  return (
    <View
      className={clsx([
        "px-2 py-1",
        {
          "bg-gray-100 dark:bg-secondary-dark/20   rounded-lg px-4 py-2":
            notification.type == "read",
          "bg-gray-300 dark:bg-[#0a1f4a]  rounded-lg px-4 py-2":
            notification.type != "read",
        },
      ])}
    >
      <View className="flex-row justify-between items-center ">
        {asChild ? (
          <TouchableOpacity
            onPress={() => onPress && onPress(notification)}
            className="flex-1 mr-4"
          >
            {Content}
          </TouchableOpacity>
        ) : (
          <View className="flex-1 mr-4">{Content}</View>
        )}

        <CustomBottomSheetModal
          ref={ref}
          content={
            <View className="p-2  items-center justify-center">
              <FontAwesome5
                name="ellipsis-h"
                color={isDark ? "#FFF" : "#000"}
                size={20}
              />
            </View>
          }
        >
          <View className="">
            <Button
              onPress={onDelete}
              classNameBtn="bg-primario p-4 rounded-xl flex-row justify-between items-center"
            >
              <Texto className="text-white ">Eliminar Notificacion</Texto>
              <Feather name="delete" color={"#fff"} size={20} />
            </Button>

            <Button
              onPress={onMark}
              classNameBtn="bg-primario p-4 rounded-xl flex-row justify-between items-center mt-1"
            >
              <Texto className="text-white">
                {notification.type == "read"
                  ? "Marcar como no leido"
                  : "Marcar como leido"}
              </Texto>
              <Feather
                name={notification.type == "read" ? "eye-off" : "eye"}
                color={"#fff"}
                size={20}
              />
            </Button>
          </View>
        </CustomBottomSheetModal>
      </View>
    </View>
  );
};
export default NotificationItem;
