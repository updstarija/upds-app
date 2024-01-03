import { View, StyleSheet, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Share from "react-native-share";
import { FlashList } from "@shopify/flash-list";
import { FontAwesome } from "@expo/vector-icons";
import { openURL } from "expo-linking";
import { Image } from "expo-image";
import { COLORS } from "~/constants";
import { useFaq, useRedesSociales, useThemeColor } from "@/hooks";
import { Spinner } from "@/components";
import { LayoutScreen } from "@/layout/LayoutScreen";
import { Texto } from "@/ui";
import SocialNetworkItem from "@/components/social-network/SocialNetworkItem";
import SocialNetworkSkeleton from "@/components/social-network/SocialNetworkSkeleton";

const RedesSociales = () => {
  const { youtubeQuery, facebookQuery, instagramQuery } = useRedesSociales();
  const { detalleGrupoMateriaQuery } = useFaq();

  const renderYt = () => {
    if (youtubeQuery.isError) return <ErrorCard />;

    return (
      <>
        {!youtubeQuery.isLoading ? (
          <FlashList
            data={[...youtubeQuery.data.items, "VER MÁS"]}
            keyExtractor={(item) =>
              typeof item === "string" ? item : item.id.videoId
            }
            estimatedItemSize={250}
            contentContainerStyle={{ padding: 10 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View className="mr-2" />}
            renderItem={({ item }) => {
              return (
                <>
                  {typeof item === "string" ? (
                    <VerMasCard url="https://www.youtube.com/@universidadprivadadomingos3411/videos" />
                  ) : (
                    <SocialNetworkItem
                      description={item.snippet.title}
                      showImageReplace={
                        item.snippet.liveBroadcastContent !== "none"
                      }
                      url={`https://www.youtube.com/watch?v=${item.id.videoId}`}
                      image={item.snippet.thumbnails.medium.url}
                    />
                  )}
                </>
              );
            }}
          />
        ) : (
          <FlashList
            data={[1, 2, 3]}
            estimatedItemSize={250}
            contentContainerStyle={{ padding: 10 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View className="mr-2" />}
            renderItem={() => <SocialNetworkSkeleton />}
          />
        )}
      </>
    );
  };

  const renderFacebook = () => {
    if (
      facebookQuery.isError ||
      (!facebookQuery.isLoading && !facebookQuery.data?.data.length)
    )
      return <ErrorCard />;

    return (
      <>
        {!facebookQuery.isLoading ? (
          <FlashList
            data={[...facebookQuery.data.data, "VER MÁS"]}
            keyExtractor={(item) => (typeof item === "string" ? item : item.id)}
            estimatedItemSize={250}
            contentContainerStyle={{ padding: 10 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View className="mr-2" />}
            renderItem={({ item }) => {
              return (
                <>
                  {typeof item === "string" ? (
                    <VerMasCard url="https://www.facebook.com/universidadprivadadomingosaviotarija" />
                  ) : (
                    <SocialNetworkItem
                      description={item.message || ""}
                      url={item.permalink_url}
                      image={item.full_picture}
                    />
                  )}
                </>
              );
            }}
          />
        ) : (
          <FlashList
            data={[1, 2, 3]}
            estimatedItemSize={250}
            contentContainerStyle={{ padding: 10 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View className="mr-2" />}
            renderItem={() => <SocialNetworkSkeleton />}
          />
        )}
      </>
    );
  };

  const renderInstagram = () => {
    if (
      instagramQuery.isError ||
      (!instagramQuery.isLoading && !instagramQuery.data?.data.length)
    )
      return <ErrorCard />;

    return (
      <>
        {!instagramQuery.isLoading ? (
          <FlashList
            data={[...instagramQuery.data.data, "VER MÁS"]}
            estimatedItemSize={250}
            keyExtractor={(item) => (typeof item === "string" ? item : item.id)}
            contentContainerStyle={{ padding: 10 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View className="mr-2" />}
            renderItem={({ item, index }) => {
              return (
                <>
                  {typeof item === "string" ? (
                    <VerMasCard url="https://www.instagram.com/upds_tarija" />
                  ) : (
                    <SocialNetworkItem
                      description={item.caption || ""}
                      showImageReplace={
                        item.media_type === "VIDEO" && !item.thumbnail_url
                      }
                      url={item.permalink}
                      image={
                        item.media_product_type == "FEED"
                          ? item.media_url + ""
                          : item.thumbnail_url + ""
                      }
                    />
                  )}
                </>
              );
            }}
          />
        ) : (
          <FlashList
            data={[1, 2, 3]}
            estimatedItemSize={250}
            contentContainerStyle={{ padding: 10 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View className="mr-2" />}
            renderItem={() => <SocialNetworkSkeleton />}
          />
        )}
      </>
    );
  };

  return (
    <LayoutScreen title="Redes Sociales">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
                marginTop: 10,
              }}
            >
              <Image
                source={require("~/assets/images/pages/youtube.png")}
                style={{ width: 30, height: 30 }}
              />
              <Texto className="text-black dark:text-white" weight="Bold">
                YouTube
              </Texto>
            </View>

            {renderYt()}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
                marginTop: 10,
              }}
            >
              <Image
                source={require("~/assets/images/pages/facebook.png")}
                style={{ width: 30, height: 30 }}
              />
              <Texto className="text-black dark:text-white" weight="Bold">
                Facebook
              </Texto>
            </View>

            {renderFacebook()}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
                marginTop: 10,
              }}
            >
              <Image
                source={require("~/assets/images/pages/instagram.png")}
                style={{ width: 20, height: 20 }}
              />
              <Texto className="text-black dark:text-white" weight="Bold">
                Instagram
              </Texto>
            </View>

            {renderInstagram()}
          </View>
        </View>
      </ScrollView>
    </LayoutScreen>
  );
};

const VerMasCard: React.FC<{ url: string }> = ({ url }) => {
  return (
    <TouchableOpacity
      className="bg-white dark:bg-primario-dark flex-col justify-between  "
      style={styles.cardContainer}
      onPress={() => openURL(url)}
    >
      <View className="flex-1 items-center justify-center">
        <View className="w-16 h-16 rounded-full bg-primario dark:bg-secondary-dark items-center justify-center">
          <FontAwesome name="plus" color={"#FFF"} size={30} />
        </View>

        <Texto className="dark:text-white mt-4 text-xl" weight="Bold">
          Ver Más
        </Texto>
      </View>
    </TouchableOpacity>
  );
};

const ErrorCard = () => {
  return (
    <View style={styles.emptyContainer}>
      <Image
        source={require("~/assets/images/pages/erroryoutube.png")}
        style={styles.emptyImage}
      />
      <Texto className="text-black dark:text-white mt-4" weight="Bold">
        Ups. Algo salio mal
      </Texto>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    height: 330,
    width: 250,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 10,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  imagePerfil: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  imageContainer: {
    height: 200,
  },
  titleNotice: {
    color: COLORS.light.background,
    fontSize: 20,
    fontWeight: "bold",
  },
  // VIDEO MODAL
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  videoContainer: {
    width: "80%",
    aspectRatio: 16 / 9,
    backgroundColor: "transparent",
  },
  // LISTA DE VIDEOS NO DISPONIBLE
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  emptyImage: {
    width: 150,
    height: 100,
    resizeMode: "contain",
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default RedesSociales;
