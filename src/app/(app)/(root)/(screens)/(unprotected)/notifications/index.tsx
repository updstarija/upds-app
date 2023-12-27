import { View, TouchableOpacity, RefreshControl } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import clsx from "clsx";
import { useNotification, useThemeColor } from "@/hooks";
import { Button, Spinner } from "@/components";
import { CustomBottomSheetModal, Texto } from "@/ui";
import { formatFecha } from "@/helpers";
import { INotificacion } from "@/types";
import { useState } from "react";

const Notificacion = () => {
  const router = useRouter();
  const isDark = useThemeColor() === "dark";

  const {
    data,
    isLoading,
    getNotifications,
    marcarComoLeido,
    marcarComoNoLeido,
    deleteNotificacion,
  } = useNotification();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  const navigation = async (item: INotificacion) => {
    await marcarComoLeido(item.id);

    if (item.to) {
      const data = item.to.split("|");
      router.push({
        pathname: `/(app)/(root)/(screens)/(unprotected)/(home)/announcements/[id]`,
        params: {
          id: data[1],
        },
      });
    }
  };

  const NotificacionItem = (item: INotificacion) => {
    return (
      <View
        className={clsx([
          "px-2 py-1",
          {
            "bg-white dark:bg-[#0a1f4a]": item.type == "read",
            "bg-[#c4cee1] dark:bg-transparent": item.type != "read",
          },
        ])}
      >
        <View className="flex-row justify-between items-center ">
          <TouchableOpacity
            onPress={() => navigation(item)}
            className="flex-1 mr-4"
          >
            <Texto
              className="text-black dark:text-white text-lg"
              weight="Bold"
              numberOfLines={1}
            >
              {item.titulo}
            </Texto>
            <Texto
              numberOfLines={2}
              className="text-black dark:text-white my-1"
            >
              {item.mensaje}
            </Texto>
            <Texto className="text-gray-400 text-xs" weight="Bold">
              hace {formatFecha(item.fecha + "")}
            </Texto>
          </TouchableOpacity>

          <CustomBottomSheetModal
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
            <View className="mb-3">
              <Texto
                className="text-center text-xl dark:text-white mb-2"
                weight="Bold"
              >
                {item.titulo}
              </Texto>

              <Texto className=" dark:text-white" numberOfLines={10}>
                {item.mensaje}
              </Texto>
            </View>

            <View className="">
              <Button
                onPress={() => deleteNotificacion(item.id)}
                classNameBtn="bg-primario p-4 rounded-xl flex-row justify-between items-center"
              >
                <Texto className="text-white ">Eliminar Notificacion</Texto>
                <Feather name="delete" color={"#fff"} size={20} />
              </Button>

              <Button
                onPress={() =>
                  item.type == "read"
                    ? marcarComoNoLeido(item.id)
                    : marcarComoLeido(item.id)
                }
                classNameBtn="bg-primario p-4 rounded-xl flex-row justify-between items-center mt-1"
              >
                <Texto className="text-white">
                  {item.type == "read"
                    ? "Marcar como no leido"
                    : "Marcar como leido"}
                </Texto>
                <Feather
                  name={item.type == "read" ? "eye-off" : "eye"}
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

  return (
    <View className="bg-white dark:bg-primario-dark flex-1">
      <FlashList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        data={data}
        renderItem={({ item }) => <NotificacionItem {...item} />}
        estimatedItemSize={100}
        onEndReachedThreshold={0.1}
        onEndReached={getNotifications}
        ListFooterComponent={
          isLoading ? (
            <Spinner
              showText
              text="Cargando notificaciones"
              classNameContainer="p-4 items-center"
              size={25}
            />
          ) : (
            <View />
          )
        }
        ItemSeparatorComponent={() => (
          <View className="border-[0.5px] border-secondary-dark" />
        )}
      />
    </View>
  );
};

export default Notificacion;
