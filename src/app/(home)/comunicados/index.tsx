import { useEffect, useState } from "react";
import { View, Pressable, useWindowDimensions } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { FlashList } from "@shopify/flash-list";
import { FontAwesome } from '@expo/vector-icons';
import { Link } from "expo-router";
import { COLORS } from '~/constants';
import { useNoticias } from "@/hooks";
import { LayoutScreen } from "@/layout/LayoutScreen";
import { useThemeColor } from '@/hooks';
import { INotificacionNotice } from "@/types";
import { NoticeCard, Spinner } from "@/components";
import { Texto } from "@/ui";
import { categorias } from "@/data";

const Comunicados = () => {
  const { width } = useWindowDimensions()
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
          numColumns={width > 1000 ? 2 : 1}
          onEndReachedThreshold={0.1}
          onEndReached={getNoticias}
          keyExtractor={(item) => item.id}
          ListFooterComponent={isLoading ? <Spinner showText text="Cargando comunicados" classNameContainer="p-4 items-center" size={25} /> : <View />}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={100}
          ItemSeparatorComponent={() => <View className="h-2" />}
          renderItem={({ item, index }) => (
            <>
              <Link href={`/(home)/comunicados/${item.id}`} asChild className="w-full" >
                <Pressable >
                  <View style={{
                    marginRight: width > 1000 ? index % 2 == 0 ? 10 : 0 : 0
                  }}>
                    <NoticeCard {...item} />
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
