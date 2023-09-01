import { Text, View, Image, Dimensions } from "react-native";
import { IconLabel } from "./IconLabel";
import { INotificacionNotice } from "@/types/typeNotice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

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
      style={{ position: "relative" }}
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
          <IconLabel iconName="calendar" textButton={new Date(Number(fecha)).toLocaleDateString("es-Es", { hour: "2-digit", minute: "2-digit" })} />
        </View>
      </View>

      {noticia.prioridad && <>
        <View style={{ borderBottomColor: "#3498db", borderRightWidth: 25, borderBottomWidth: 25, width: 0, height: 0, backgroundColor: "transparent", borderStyle: "solid", borderLeftWidth: 0, borderLeftColor: "transparent", borderRightColor: "transparent", position: "absolute", top: 0, right: 0, transform: [{ rotate: "180deg" }] }} />

        <View style={{ position: "absolute", top: 1, right: 1, zIndex: 1 }}>
          <FontAwesome name={"star"} color={"#FFF"} />
        </View>
      </>}
    </View>
  );
};
