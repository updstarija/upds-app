import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  ScrollView,
  View,
  Platform,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore from "@react-native-firebase/firestore";
import Share from "react-native-share";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Redirect, Stack, router, useLocalSearchParams } from "expo-router";
import { openBrowserAsync } from "expo-web-browser";
import { COLORS } from "~/constants";
import { useNoticias, useThemeColor } from "@/hooks";
import { Button, IconLabel, Spacer, Spinner } from "@/components";
import { INotificacionNotice } from "@/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomSkeleton, Texto } from "@/ui";
import { FloatingAction, IActionProps } from "react-native-floating-action";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import { Image } from "expo-image";
import Carousel from "react-native-reanimated-carousel";
import { formatDateForDisplay } from "@/helpers/formatDateForDisplay";
import { StatusBar } from "expo-status-bar";
import RenderHTML from "react-native-render-html";
import AnnouncementDetailSkeleton from "@/components/announcement/AnnouncementDetailSkeleton";
import { extractPlainText } from "@/helpers/extractPlainText";
import { useImageDimensions } from "@react-native-community/hooks";
import PaginationDot from "react-native-animated-pagination-dot";
import { openURL, canOpenURL } from "expo-linking";
import { sleep } from "@/helpers";
import { rateApp } from "@/modules/store-review/lib/rate-app";

const actionsFloatButton: IActionProps[] = [
  {
    text: "Compartir",
    name: "share",
    icon: <AntDesign name="sharealt" size={20} color={"#FFF"} />,
  },
  {
    text: "Más Información",
    name: "more-info",
    icon: <FontAwesome name="send" color="#fff" size={20} />,
  },
];

const MemoizedRenderHtml = React.memo(RenderHTML);

const defaultAnnouncement = {
  title: "",
  description: "",
  category: "",
  images: [],
  date: new Date(),
  like: 0,
  moreInfoUrl: "",
  priority: "",
  superpriority: "",
  isLiked: false,
};

export const NoticeDetail = () => {
  const params = useLocalSearchParams<any>();

  if (!params.id) return <Redirect href={"/(app)/(root)/(drawer)/(tabs)/"} />;
  const { id } = params;

  const { announcementQuery, announcementUpdateMutation } = useAnnouncements({
    id,
    params: {},
  });

  const isDark = useThemeColor() === "dark";
  const { width } = useWindowDimensions();

  const [activeIndexImage, setActiveIndexImage] = useState(0);

  const likeAnnouncement = async () => {
    if (!announcementQuery.data) return;

    const { like = 0, isLiked, id } = announcementQuery.data;

    await announcementUpdateMutation.mutateAsync({
      id: announcementQuery.data.id,
      like: isLiked ? like - 1 : like + 1,
    });

    await sleep(1000);

    await rateApp();
  };

  const shareAnnouncement = async () => {
    if (!announcementQuery.data) return;
    const ImageBase64 = announcementQuery.data.images[0].url;
    try {
      const shareOptions = {
        message: `📰 *${announcementQuery.data.title}*
🗓️ *${announcementQuery.data.date.toLocaleDateString("es-ES")}*
📚 *${announcementQuery.data.category}*

${extractPlainText(announcementQuery.data.description)}

Mas Informacion: ${announcementQuery.data.moreInfoUrl}
                `,
        url: ImageBase64,
      };

      await Share.open(shareOptions);
    } catch (error) {
      console.log("Error al compartir la imagen:", error);
    }
  };

  const actionsEvents: { [key: string]: Function } = {
    share: shareAnnouncement,
    "more-info": async () => {
      if (moreInfoUrl) {
        canOpenURL(moreInfoUrl.trim()).then(() => {
          openURL(moreInfoUrl.trim()).then(() => {});
        });
      }
    },
  };

  const isLoading = announcementQuery.isLoading;

  const {
    title,
    description,
    category,
    images,
    date,
    like = 0,
    moreInfoUrl,
    priority,
    superpriority,
    isLiked,
  } = announcementQuery.data ?? defaultAnnouncement;
  const source = { uri: images[0]?.url || "" };

  const { dimensions, loading, error } = useImageDimensions(source);

  if (announcementQuery.isError) return <Texto>ERROR</Texto>;
  if (isLoading || loading || error || !dimensions)
    return <AnnouncementDetailSkeleton />;

  const { width: WIDTH_IMAGE, height } = dimensions;

  return (
    <>
      <SafeAreaView className="flex-1 bg-white dark:bg-secondary-dark ">
        <ScrollView
          style={{ flex: 1 }}
          scrollsToTop
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View className="bg-white dark:bg-primario-dark flex-1 relative">
            <View
              style={[
                {
                  position: "absolute",
                  zIndex: 30,
                  top: 10,
                  left: 5,
                },
              ]}
            >
              <TouchableOpacity
                onPress={() => router.back()}
                className="bg-black/20 w-10 h-10 rounded-full items-center justify-center"
              >
                <AntDesign name="left" size={20} color={"#FFF"} />
              </TouchableOpacity>
            </View>

            <View className="flex-1">
              <View>
                <View>
                  {images.length == 1 ? (
                    <View
                      style={{
                        height: height * (width / WIDTH_IMAGE),
                      }}
                    >
                      <Image
                        style={{
                          maxWidth: width,
                          width: "auto",
                        }}
                        className="h-full w-full" //h56
                        source={images[0].url}
                      />
                    </View>
                  ) : (
                    <Carousel
                      style={{
                        maxWidth: width,
                      }}
                      loop
                      autoPlay
                      width={width}
                      height={height * (width / WIDTH_IMAGE)}
                      data={images}
                      autoPlayInterval={3000}
                      scrollAnimationDuration={1000}
                      onSnapToItem={(index) => setActiveIndexImage(index)}
                      renderItem={({ item }) => {
                        return (
                          <>
                            <Image
                              style={{
                                maxWidth: width,
                                width: "auto",
                              }}
                              className="h-full w-full" //h56
                              source={item.url}
                              contentFit="contain"
                              contentPosition={"top"}
                            />
                          </>
                        );
                      }}
                    />
                  )}

                  <View className="absolute bottom-2 right-0 left-0 items-center justify-center">
                    <PaginationDot
                      activeDotColor={COLORS.light.background}
                      inactiveDotColor="#ccc"
                      curPage={activeIndexImage}
                      maxPage={images.length}
                    />
                  </View>
                </View>

                <Spacer height={20} />

                <View className="mb-10 flex-1">
                  <View className="flex-row justify-evenly">
                    <View className="flex-row items-center">
                      <TouchableOpacity
                        onPress={likeAnnouncement}
                        disabled={announcementUpdateMutation.isLoading}
                      >
                        {isLiked ? (
                          <AntDesign
                            name="like1"
                            size={25}
                            color={isDark ? "#FFF" : COLORS.light.background}
                          />
                        ) : (
                          <AntDesign
                            name="like2"
                            size={25}
                            color={isDark ? "#FFF" : "#000"}
                          />
                        )}
                      </TouchableOpacity>

                      {isLoading ? (
                        <View className="ml-2">
                          <CustomSkeleton width={20} height={20} />
                        </View>
                      ) : (
                        <Texto
                          className="ml-1 text-black dark:text-white"
                          weight="Bold"
                        >
                          {like}
                        </Texto>
                      )}
                    </View>

                    <View className="flex-row items-center">
                      <AntDesign
                        name="calendar"
                        size={20}
                        color={isDark ? "#FFF" : "#000"}
                      />
                      {isLoading ? (
                        <View className="ml-2">
                          <CustomSkeleton width={100} height={20} />
                        </View>
                      ) : (
                        <Texto
                          className="ml-1  text-black dark:text-white"
                          weight="Bold"
                        >
                          {formatDateForDisplay(date)}
                        </Texto>
                      )}
                    </View>
                  </View>
                </View>
              </View>

              <View
                className={`flex-1 bg-white dark:bg-secondary-dark border border-gray-100 dark:border-primario shadow-sm shadow-primario `}
                style={{
                  borderTopLeftRadius: 50,
                  borderTopRightRadius: 50,
                  elevation: 40,
                  borderBottomWidth: 0,
                }}
              >
                <View className="bg-primario w-80 rounded-xl p-1 mt-[-20px] relative mx-auto">
                  <Texto
                    className={`text-${
                      title.length > 30 ? "xl" : "xl"
                    } uppercase text-white text-center`}
                    weight="Bold"
                  >
                    {title}
                  </Texto>

                  {priority ||
                    (superpriority && (
                      <>
                        <View
                          style={{
                            position: "absolute",
                            top: -5,
                            right: -5,
                            zIndex: 1,
                          }}
                        >
                          <FontAwesome
                            name={"star"}
                            color={superpriority ? "#f1e72c" : "#3498db"}
                            size={20}
                          />
                        </View>
                      </>
                    ))}
                </View>

                <View className="p-4">
                  <IconLabel
                    iconName={"view-dashboard"}
                    textButton={category}
                    loader={
                      isLoading ? (
                        <CustomSkeleton width={100} height={20} />
                      ) : undefined
                    }
                  />

                  <Spacer height={20} />
                  {isLoading ? (
                    <CustomSkeleton width={"100%"} height={50} />
                  ) : (
                    <MemoizedRenderHtml
                      baseStyle={{ color: isDark ? "#FFF" : "#000" }}
                      contentWidth={width}
                      source={{ html: description }}
                      ignoredDomTags={["iframe"]}
                    />
                  )}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        <FloatingAction
          overlayColor="#0000006a"
          actions={actionsFloatButton}
          distanceToEdge={{ horizontal: 40, vertical: 40 }}
          onPressItem={(name) => {
            if (!name) return;

            if (Object.keys(actionsEvents).includes(name)) {
              actionsEvents[name]();
            }
          }}
        />
      </SafeAreaView>
    </>
  );
};

export default NoticeDetail;
