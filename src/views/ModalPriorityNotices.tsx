import { useState } from "react";
import {
  Pressable,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import PaginationDot from "react-native-animated-pagination-dot";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { useNoticias } from "@/hooks";
import { CustomModal, Texto } from "@/ui";
import { COLORS } from "~/constants";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import { usePopupWindowStore } from "@/store/usePopupWindow.store";

const ModalPriorityNotices = () => {
  const { isAlertsOpen, openAlerts } = usePopupWindowStore();

  const { width } = useWindowDimensions();

  const [activeIndex, setActiveIndex] = useState(0);

  const { announcementsPriorityQuery } = useAnnouncements({
    params: {
      type: "superpriority",
      limitResults: 3,
    },
  });

  const isLoading = announcementsPriorityQuery.isLoading;
  const data = announcementsPriorityQuery.data ?? [];

  if (isLoading || data.length == 0) return null;
  if (announcementsPriorityQuery.isError) return null;

  return (
    <>
      <CustomModal isVisible={isAlertsOpen}>
        <View className="max-w-lg mx-auto w-full">
          <View className="">
            <Carousel
              style={{
                width: "100%",
                justifyContent: "center",
                maxWidth: width,
                alignItems: "center",
              }}
              vertical
              mode="vertical-stack"
              // onProgressChange={(_, absoluteProgress) => (progressValue.value = absoluteProgress)}
              modeConfig={{
                snapDirection: "left",
                stackInterval: 18,
                scaleInterval: 0.08,
                moveSize: width + 100,
              }}
              loop
              width={width > 1000 ? width : width - 40}
              height={width > 1000 ? width : width - 40}
              autoPlay
              data={data}
              autoPlayInterval={data.length == 1 ? 999999 : 3000}
              scrollAnimationDuration={1500}
              onSnapToItem={(index) => setActiveIndex(index)}
              renderItem={({ index, item }) => (
                <Link href={`/announcements/${item.id}`} asChild>
                  <Pressable
                    className="flex-1"
                    onPress={() => openAlerts(false)}
                  >
                    <View className="flex-1 relative">
                      <Image
                        source={item?.images[0]?.url ?? null}
                        className="w-full h-full opacity-100 rounded-lg"
                        contentFit="cover"
                      />

                      <View className="absolute bottom-0 left-0 bg-black/60 w-full p-3 rounded-lg rounded-t-none ">
                        <Texto
                          numberOfLines={2}
                          weight="Bold"
                          className="text-white uppercase"
                        >
                          {item.title}
                        </Texto>
                      </View>
                    </View>
                  </Pressable>
                </Link>
              )}
            />
          </View>
          <View className="absolute top-[-10] z-10 right-[-10] ">
            <TouchableOpacity
              onPress={() => {
                openAlerts(false);
              }}
            >
              <View className="rounded-full border-[0.5px] border-black/10 bg-black/40">
                <AntDesign
                  name="closecircle"
                  size={30}
                  color={"#FFF"}
                  backgroundColor={"transparent"}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View className="items-center">
            <PaginationDot
              activeDotColor={COLORS.light.background}
              inactiveDotColor="#ccc"
              curPage={activeIndex}
              maxPage={data.length}
            />
          </View>
        </View>
      </CustomModal>
    </>
  );
};

export default ModalPriorityNotices;
