import { useRef, useState } from "react";
import {
  View,
  Pressable,
  useWindowDimensions,
  Button,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { FlashList } from "@shopify/flash-list";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { COLORS } from "~/constants";
import { LayoutScreen } from "@/layout/LayoutScreen";
import { useThemeColor } from "@/hooks";
import { Spinner } from "@/components";
import { Texto } from "@/ui";
import { categorias } from "@/data";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import { AnnouncementCard } from "@/components/announcement/AnnouncementCard";
import AnnouncementSkeleton from "@/components/announcement/AnnouncementSkeleton";
import CustomDropdown from "@/ui/CustomDropDown";
import { Image } from "expo-image";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { IAnnouncement } from "@/types";

const Comunicados = () => {
  const { width, height } = useWindowDimensions();
  const [category, setCategory] = useState("");

  const { announcementsQuery } = useAnnouncements({
    params: {
      category,
      limitResults: 2,
    },
    query: ["announcementsQuery"],
  });

  const announcements =
    announcementsQuery.data?.pages?.flatMap((page) => page.data) ?? [];

  const flatListRef = useRef<FlashList<IAnnouncement>>(null);

  const scroll = useSharedValue(0);

  const stylesAnimated = useAnimatedStyle(() => {
    return {
      opacity: 1,
      right: 30,
      bottom: withSpring(
        interpolate(scroll.value, [100, 500], [-100, 30], Extrapolation.CLAMP)
      ),
    };
  });

  return (
    <LayoutScreen title="Comunicados">
      <View className="flex-1">
        <Animated.View
          style={[
            stylesAnimated,
            {
              position: "absolute",
              zIndex: 30,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() =>
              flatListRef.current?.scrollToOffset({
                offset: 0,
                animated: true,
              })
            }
            className="bg-primario w-16 h-16 rounded-full items-center justify-center"
          >
            <AntDesign name="up" size={20} color={"#FFF"} />
          </TouchableOpacity>
        </Animated.View>

        <FlashList
          //data={[]}
          ref={flatListRef}
          onScroll={(x) => {
            scroll.value = x.nativeEvent.contentOffset.y;
          }}
          refreshControl={
            <RefreshControl
              refreshing={announcementsQuery.isRefetching}
              onRefresh={announcementsQuery.refetch}
            />
          }
          ListHeaderComponent={
            <View className="mb-2">
              <CustomDropdown
                data={categorias}
                labelField={"label"}
                valueField={"value"}
                search
                value={category}
                onChange={(e) => setCategory(e.value)}
              />
            </View>
          }
          contentContainerStyle={{
            padding: 5,
            paddingBottom: 15,
          }}
          data={announcements}
          ListEmptyComponent={
            <>
              {!announcementsQuery.isLoading && (
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
                  <Texto className="text-center">
                    No se han encontrado resultados
                  </Texto>
                </View>
              )}
            </>
          }
          ListHeaderComponentStyle={{ marginTop: 5 }}
          numColumns={width > 1000 ? 2 : 1}
          onEndReachedThreshold={0.8}
          onEndReached={announcementsQuery.fetchNextPage}
          //   keyExtractor={(item) => item.id}
          ListFooterComponent={
            announcementsQuery.isFetchingNextPage ||
            announcementsQuery.isLoading ? (
              <View className="flex-col gap-2">
                {Array(announcements?.length > 2 ? 1 : 3)
                  .fill(0)
                  .map((x, i) => (
                    <View className="" key={`skeleton-announcement-${i}`}>
                      <AnnouncementSkeleton />
                    </View>
                  ))}
              </View>
            ) : (
              <View />
            )
          }
          showsVerticalScrollIndicator={false}
          estimatedItemSize={300}
          ItemSeparatorComponent={() => <View className="h-2" />}
          renderItem={({ item, index }) => (
            <>
              <Link
                /* @ts-ignore */
                href={`/announcements/${item.id}`}
                asChild
                className="w-full"
              >
                <Pressable>
                  <View
                    style={{
                      marginRight: width > 1000 ? (index % 2 == 0 ? 10 : 0) : 0,
                    }}
                  >
                    <AnnouncementCard announcement={item} />
                    {/* <NoticeCard {...item} /> */}
                  </View>
                </Pressable>
              </Link>
            </>
          )}
        />
      </View>
    </LayoutScreen>
  );
};

export default Comunicados;
