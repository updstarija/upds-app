import { useEffect, useState } from "react";
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
import { Redirect, Stack, useLocalSearchParams } from "expo-router";
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
};

export const NoticeDetail = () => {
  const params = useLocalSearchParams<any>();

  if (!params.id) return <Redirect href={"/(home)"} />;
  const { id } = params;

  const { announcementQuery } = useAnnouncements({
    id,
    params: {},
  });

  const isDark = useThemeColor() === "dark";
  const { width } = useWindowDimensions();

  const [islike, setIsLike] = useState(false);
  const [likes, setLikes] = useState(0);

  const checkIfLiked = async (): Promise<boolean> => {
    const liked = await AsyncStorage.getItem(`liked_noticia_${id}`);
    return liked === "true";
  };

  const likeNotice = async () => {
    setIsLike(!islike);
    const liked = await checkIfLiked();
    const increment = liked ? -1 : 1;

    const noticiaRef = firestore().collection("Noticia").doc(id);

    noticiaRef
      .update({
        like: firestore.FieldValue.increment(increment),
      })
      .then(async () => {
        await AsyncStorage.setItem(`liked_noticia_${id}`, (!liked).toString());
        //console.log(likes)
        setLikes(likes + increment);
      })
      .catch((error) => {
        // console.log('Error al incrementar like:', error);
      });
  };

  const isLoading = announcementQuery.isLoading;

  if (announcementQuery.isError) return <Texto>ERROR</Texto>;

  const {
    title,
    description,
    category,
    images,
    date,
    like,
    moreInfoUrl,
    priority,
    superpriority,
  } = announcementQuery.data ?? defaultAnnouncement;

  const render = () => {
    return (
      <View className="flex-1">
        <View className="">
          {announcementQuery.isLoading ? (
            <CustomSkeleton width={width} height={width} />
          ) : (
            <>
              {!!images.length ? (
                <View className="h-[400]">
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
                    maxWidth: 500,
                  }}
                  loop
                  autoPlay
                  width={width}
                  height={400}
                  data={images}
                  autoPlayInterval={3000}
                  scrollAnimationDuration={1000}
                  //  onSnapToItem={(index) => setActiveIndex(index)}
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
            </>
          )}

          <Spacer height={20} />

          <View className="mb-10 flex-1">
            <View className="flex-row justify-evenly">
              <View className="flex-row items-center">
                <TouchableOpacity
                  onPress={() => likeNotice()}
                  disabled={isLoading}
                >
                  {islike ? (
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
                    {likes}
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
            {isLoading ? (
              <View className="p-2">
                <CustomSkeleton
                  width={"100%"}
                  height={20}
                  colors={["#243E89", "#2F489C", "#3752AD"]}
                />
              </View>
            ) : (
              <Texto
                className={`text-${
                  title.length > 30 ? "xl" : "xl"
                } uppercase text-white text-center`}
                weight="Bold"
              >
                {title}
              </Texto>
            )}

            {isLoading && priority && (
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
                    color={isDark ? "#FFF" : "#3498db"}
                    size={20}
                  />
                </View>
              </>
            )}
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
              <RenderHTML
                baseStyle={{ color: isDark ? "#FFF" : "#000" }}
                contentWidth={width}
                source={{ html: description }}
                ignoredDomTags={["iframe"]}
              />
            )}
          </View>
        </View>
      </View>
    );
  };

  const compartirNoticia = async () => {
    if (!announcementQuery.data) return;
    const ImageBase64 = announcementQuery.data.images[0].url;
    try {
      const shareOptions = {
        message: `📰 *${announcementQuery.data.title}*
🗓️ *${announcementQuery.data.date.toLocaleDateString("es-ES")}*
📚 *${announcementQuery.data.category}*

${announcementQuery.data.description}

Mas Informacion: ${announcementQuery.data.moreInfoUrl}
                `,
        url: ImageBase64,
      };

      await Share.open(shareOptions);
    } catch (error) {
      //console.log('Error al compartir la imagen:', error);
    }
  };

  const actionsEvents: { [key: string]: Function } = {
    share: compartirNoticia,
    "more-info": () => {
      openBrowserAsync(announcementQuery.data?.moreInfoUrl || "");
    },
  };

  if (isLoading) return <AnnouncementDetailSkeleton />;

  return (
    <>
      {/* <StatusBar hidden /> */}

      <View className="flex-1 bg-white dark:bg-secondary-dark">
        <ScrollView
          style={{ flex: 1 }}
          scrollsToTop
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View className="bg-white dark:bg-primario-dark flex-1">
            <View className="flex-1">{render()}</View>
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
      </View>
    </>
  );
};

export default NoticeDetail;
