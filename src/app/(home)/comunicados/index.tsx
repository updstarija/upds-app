import { useState } from "react";
import {
  View,
  Pressable,
  useWindowDimensions,
  Button,
  RefreshControl,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { FlashList } from "@shopify/flash-list";
import { FontAwesome } from "@expo/vector-icons";
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

const Comunicados = () => {
  const { width, height } = useWindowDimensions();
  const isDarkMode = useThemeColor() === "dark";
  const [category, setCategory] = useState("");

  const [openCategoria, setOpenCategoria] = useState(false);
  const [valueCategoria, setvalueCategoria] = useState("");

  const { announcementsQuery } = useAnnouncements({
    params: {
      category,
      limitResults: 2,
    },
    query: ["announcementsQuery"],
  });

  const SelectCategorias = () => {
    return (
      <DropDownPicker
        open={openCategoria}
        value={valueCategoria}
        searchable
        searchPlaceholder="Busca una categoria"
        searchTextInputStyle={{ color: isDarkMode ? "#fff" : "#000" }}
        items={categorias}
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
        style={[
          isDarkMode
            ? { backgroundColor: COLORS.dark.secondary }
            : { backgroundColor: "#fff" },
        ]}
        dropDownContainerStyle={[
          isDarkMode && { backgroundColor: COLORS.dark.secondary },
        ]}
      />
    );
  };

  const announcements =
    announcementsQuery.data?.pages?.flatMap((page) => page.data) ?? [];

  return (
    <LayoutScreen title="Comunicados">
      <View className="flex-1">
        {/*     <SelectCategorias /> */}

        <FlashList
          //data={[]}
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
                mode="modal"
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
          onEndReachedThreshold={0.1}
          onEndReached={announcementsQuery.fetchNextPage}
          //   keyExtractor={(item) => item.id}
          ListFooterComponent={
            announcementsQuery.isLoading ? (
              <View className="flex-col gap-2">
                {Array(3)
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
                href={`/(home)/comunicados/${item.id}`}
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
