import { Text, View, Image, Dimensions } from "react-native";
import { IconLabel } from "./IconLabel";
import { INotificacionNotice } from "@/types/typeNotice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export const NoticeCard = (noticia: INotificacionNotice) => {
  const { titulo, texto, like, fecha, imagen, id } = noticia;

  const { width } = Dimensions.get("screen");

  const [isLiked, setIsLiked] = useState(false)

  const checkIfLiked = async () => {
    //FIX ID
    const liked = await AsyncStorage.getItem(`liked_noticia_${id}`);

    if (liked === 'true') {
      setIsLiked(true)
    }
  };

  useEffect(() => {
    checkIfLiked()
  }, [])


  return (
    <View
      className="bg-primario dark:bg-secondary-dark shadow rounded-2xl dark:border-[#0e285b]"

    >
      <View className="">
        <Image
          className="h-56 rounded-xl rounded-b-none"  //h56
          source={{ uri: imagen }} />
      </View>

      <View className="p-2 bg-white dark:bg-secondary-dark rounded-xl border-secondary-dark border border-t-0 rounded-t-none">
        <Text className="text-black dark:text-white text-2xl font-bold" numberOfLines={1}>
          {titulo}
        </Text>
        <Text className="text-black dark:text-white text-xs " numberOfLines={1}>
          {texto}
        </Text>

        <View className="flex-row mt-2">
          <IconLabel iconName={isLiked ? "like1" : "like2"} textButton={like + " likes"} />
          <IconLabel iconName="calendar" textButton={fecha.toString()} />
        </View>
      </View>
    </View>
  );
};
