import { useEffect } from "react";
import { View, TouchableOpacity, FlatList, Pressable } from "react-native";
import { NoticeCard } from "@/components/NoticeCard";
import { LoadingNotice } from "@/components/LoadingNotice";
import { useNoticias } from "@/hooks";
import { INotificacionNotice } from "@/types/typeNotice";
import { LayoutScreen } from "@/layout/LayoutScreen";
import { Link } from "expo-router";
import { Texto } from "@/components";
import { FlashList } from "@shopify/flash-list";
import Spinner from "@/components/ui/Spinner";

const Comunicados = () => {
  const { data, isLoading, getData } = useNoticias();

  useEffect(() => {
    getData();
  }, []);

  return (
    <LayoutScreen title="Comunicados">
      <View className="flex-1 mx-1">
        <FlashList
          data={data}
          ListHeaderComponentStyle={{ margin: 3 }}
          onEndReachedThreshold={0}
          onEndReached={getData}
          keyExtractor={(item) => item.id}
          ListFooterComponent={isLoading ? <Spinner showText text="Cargando Noticias" classNameContainer="p-4 items-center" size={25} /> : <View />}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={100}
          ItemSeparatorComponent={() => <View className="mb-1" />}
          renderItem={({ item }) => (
            <>
              {/*
            <TouchableOpacity
              onPress={() => handleNoticePress(item)}
              className="mb-1 px-1"
            >
            </TouchableOpacity>
            */}
              {/* <View className="bg-primario p-2 mb-2 rounded-xl">
              <Texto>HOLA</Texto>
            </View> */}
              <Link href={`/(home)/comunicados/${item.id}`} asChild>
                <Pressable>
                  <NoticeCard {...item} />
                </Pressable>
              </Link>
            </>
          )}
        />

        <Texto>HOLA</Texto>
      </View>
    </LayoutScreen>
  );
};

export default Comunicados;
