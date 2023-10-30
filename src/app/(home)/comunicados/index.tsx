import { useEffect } from "react";
import { View, Pressable } from "react-native";
import { NoticeCard } from "@/components/NoticeCard";
import { useNoticias } from "@/hooks";
import { LayoutScreen } from "@/layout/LayoutScreen";
import { Link } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import Spinner from "@/components/ui/Spinner";
import React, { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { useThemeColor } from '@/hooks';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from '~/constants';
import { categorias, categoriasFaq } from "@/data";
import { INotificacionNotice } from "@/types";
import { Texto } from "../../../components";



const Comunicados = () => {
  const isDarkMode = useThemeColor() === "dark"
  const { isLoading, getData } = useNoticias();
  const [data, setData] = useState<INotificacionNotice[]>([])

  const [openCategoria, setOpenCategoria] = useState(false);
  const [valueCategoria, setvalueCategoria] = useState("")

  const SelectCategorias = () => {
    return <DropDownPicker
      open={openCategoria}
      value={valueCategoria}
      searchable

      searchPlaceholder="Busca una categoria"
      searchTextInputStyle={{ color: isDarkMode ? "#fff" : "#000" }}
      items={categorias}
      onSelectItem={(x) => {
        if (x.value != valueCategoria) {
          setData([])
        }
      }}
      setOpen={setOpenCategoria}
      setValue={setvalueCategoria}
      placeholder="Filtrar por categoria"
      zIndex={1}
      ArrowDownIconComponent={() => (
        <FontAwesome
          size={18}
          color={isDarkMode ? "#fff" : "#000"}
          style={{ paddingHorizontal: 5 }}
          name="angle-down"
        />
      )}
      ArrowUpIconComponent={() => (
        <FontAwesome
          size={18}
          color={isDarkMode ? "#fff" : "#000"}
          style={{ paddingHorizontal: 5 }}
          name="angle-up"
        />
      )}
      TickIconComponent={() => (
        <FontAwesome
          size={18}
          color={isDarkMode ? "#fff" : "#000"}
          style={{ paddingHorizontal: 5 }}
          name="check"
        />
      )}
      containerStyle={{ paddingVertical: 5 }}
      textStyle={{ color: isDarkMode ? "#fff" : "#000", fontSize: 13 }}
      style={
        [isDarkMode
          ? { backgroundColor: COLORS.dark.secondary, }
          : { backgroundColor: "#fff", }]
      }
      dropDownContainerStyle={
        [isDarkMode && { backgroundColor: COLORS.dark.secondary }]
      }
    />
  }

  const getNoticias = () => {
    getData(valueCategoria).then((x) => {
      setData(x)
    })
  }

  useEffect(() => {
    getNoticias()
  }, [valueCategoria]);

  return (
    <LayoutScreen title="Comunicados">
      <View className="flex-1 mx-1">

        <SelectCategorias />

        <FlashList
          data={data}
          ListEmptyComponent={<Texto className="text-center">{!isLoading && 'No se han encontrado comunicados'}</Texto>}
          ListHeaderComponentStyle={{ marginTop: 5 }}
          onEndReachedThreshold={1}
          onEndReached={getNoticias}
          keyExtractor={(item) => item.id}
          ListFooterComponent={isLoading ? <Spinner showText text="Cargando comunicados" classNameContainer="p-4 items-center" size={25} /> : <View />}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={100}
          ItemSeparatorComponent={() => <View className="mb-3" />}
          renderItem={({ item }) => (
            <>
              <Link href={`/(home)/comunicados/${item.id}`} asChild>
                <Pressable>
                  <NoticeCard {...item} />
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
