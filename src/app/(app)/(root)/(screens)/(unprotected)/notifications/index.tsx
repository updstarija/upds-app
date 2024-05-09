import { View, RefreshControl, useWindowDimensions } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { CustomBottomSheetModal, Texto } from "@/ui";
import { INotification } from "@/types";
import { useNotifications } from "@/hooks/useNotifications";
import { Image } from "expo-image";
import NotificationItem from "@/components/notification/NotificationItem";
import NotificationSkeleton from "@/components/notification/NotificationSkeleton";

const Notificacion = () => {
  const { height } = useWindowDimensions();

  const { notificationsQuery, markAsUnreadMutation } = useNotifications({
    params: { limitResults: 5 },
    query: ["notificationsQuery"],
  });

  const notifications =
    notificationsQuery.data?.pages
      .flatMap((x) => x.data)
      .filter((y) => y.type !== "deleted") ?? [];

  const navigateNotification = async (item: INotification) => {
    await markAsUnreadMutation.mutateAsync(item.id);

    if (item.to) {
      router.push(item.to as any);
    }
  };

  return (
    <View className="bg-white dark:bg-primario-dark flex-1">
      <FlashList
        refreshControl={
          <RefreshControl
            refreshing={
              !notificationsQuery.isInitialLoading &&
              notificationsQuery.isRefetching
            }
            onRefresh={() => notificationsQuery.refetch()}
          />
        }
        contentContainerStyle={{
          padding: 10,
        }}
        ListFooterComponentStyle={{
          marginTop: notifications.length > 0 ? 8 : undefined,
        }}
        data={notifications}
        renderItem={({ item }) => {
          if (item.to) {
            return (
              <NotificationItem
                notification={item}
                onPress={navigateNotification}
              />
            );
          } else {
            return (
              <CustomBottomSheetModal
                content={<NotificationItem notification={item} />}
                onPressButton={() => navigateNotification(item)}
              >
                <View className="py-4">
                  <Texto className="text-center text-xl pb-4">
                    {item.title}
                  </Texto>
                  <Texto className="leading-5">{item.body}</Texto>
                </View>
              </CustomBottomSheetModal>
            );
          }
        }}
        estimatedItemSize={100}
        onEndReachedThreshold={0.8}
        onEndReached={() => notificationsQuery.fetchNextPage()}
        ListEmptyComponent={
          <>
            {!notificationsQuery.isLoading && (
              <View
                className=" items-center justify-center flex-1"
                style={{ height: height - 150 }}
              >
                <Image
                  style={{
                    width: 200,
                    height: 200,
                  }}
                  source={require("~/assets/images/icons/empty-data.png")}
                />
                <Texto className="text-center">No hay notificaciones</Texto>
              </View>
            )}
          </>
        }
        ListFooterComponent={
          notificationsQuery.isFetchingNextPage ||
          notificationsQuery.isLoading ? (
            <View className="flex-col gap-2">
              {Array(notifications.length > 2 ? 1 : 8)
                .fill(0)
                .map((x, i) => (
                  <View className="" key={`skeleton-announcement-${i}`}>
                    <NotificationSkeleton />
                  </View>
                ))}
            </View>
          ) : (
            <View />
          )
        }
        ItemSeparatorComponent={() => <View className="mb-2" />}
      />
    </View>
  );
};

export default Notificacion;
