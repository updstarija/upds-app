import { useEffect, useState } from "react";
import { Text, View, useWindowDimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";
import { IconLabel } from "../IconLabel";
import { INotificacionNotice } from "@/types";
import { IAnnouncement } from "@/types/announcement";
import { Image } from "expo-image";
import Carousel from "react-native-reanimated-carousel";
import { formatDateForDisplay } from "@/helpers/formatDateForDisplay";

type Props = {
  announcement: IAnnouncement;
};
export const AnnouncementCard: React.FC<Props> = ({ announcement }) => {
  const { title, like, date, images, id, category, isLiked } = announcement;

  const { width } = useWindowDimensions();

  return (
    <View
      className="border border-opacity-0 border-transparent rounded-xl"
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,

        elevation: 6,
      }}
    >
      <View className=" dark:bg-secondary-dark rounded-xl  overflow-hidden">
        <View className="">
          {!!images.length && (
            <View className="h-[200]">
              <Image
                style={{
                  maxWidth: width,
                  width: "auto",
                }}
                className="h-full w-full rounded-t-xl"
                source={images[0].url}
              />
            </View>

            /*  <Carousel
            style={{
              maxWidth: 500,
            }}
            loop
            autoPlay
            width={width}
            height={200}
            data={images}
            autoPlayInterval={3000}
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => setActiveIndex(index)}
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
                    contentFit="cover"
                  />
                </>
              );
            }}
          /> */
          )}
        </View>

        <View className="p-2 bg-white dark:bg-secondary-dark rounded-xl rounded-t-none">
          <Text
            className="text-black dark:text-white text-2xl font-bold"
            numberOfLines={1}
          >
            {title}
          </Text>

          <View className="flex-row  mt-2">
            <IconLabel iconName={"view-dashboard"} textButton={category} />
          </View>

          <View className="flex-row justify-between mt-2">
            <IconLabel
              iconName={isLiked ? "like1" : "like2"}
              textButton={(like || 0) + " likes"}
            />

            <IconLabel
              iconName="calendar"
              textButton={formatDateForDisplay(date)}
            />
          </View>
        </View>

        {(announcement.priority || announcement.superpriority) && (
          <>
            <View
              style={{
                borderBottomColor: announcement.superpriority
                  ? "#f1e72c"
                  : "#3498db",
                //  borderRadius:1,
                borderRightWidth: 40,
                borderBottomWidth: 40,
                width: 0,
                height: 0,
                backgroundColor: "transparent",
                borderStyle: "solid",
                borderLeftWidth: 0,
                borderLeftColor: "transparent",
                borderRightColor: "transparent",
                position: "absolute",
                top: 0,
                right: 0,
                transform: [{ rotate: "180deg" }],
              }}
            />

            <View style={{ position: "absolute", top: 5, right: 5, zIndex: 1 }}>
              <FontAwesome name={"star"} color={"#FFF"} size={15} />
            </View>
          </>
        )}
      </View>
    </View>
  );
};
