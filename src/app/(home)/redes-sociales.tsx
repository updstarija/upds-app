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

const RedesSociales = () => {
  const { youtubeQuery, facebookQuery, instagramQuery } = useRedesSociales()
  const { detalleGrupoMateriaQuery } = useFaq()



  const renderYt = () => {
    if (youtubeQuery.isLoading) return <Spinner style={{ height: 200 }} />;

    if (youtubeQuery.isError)
      return (
        <ErrorCard />
      );

    return (
      <FlashList
        data={[...youtubeQuery.data.items, "VER MAS"]}
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
                <CardSocial
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
    );
  };

  const renderFacebook = () => {
    if (facebookQuery.isLoading) return <Spinner style={{ height: 200 }} />;

    if (facebookQuery.isError || !facebookQuery.data?.data.length)
      return (
        <ErrorCard />
      );

    return (
      <FlashList
        data={[...facebookQuery.data.data, "VER MAS"]}
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
                <CardSocial
                  description={item.message || ""}
                  url={item.permalink_url}
                  image={item.full_picture}
                />
              )}
            </>
          );
        }}
      />
    );
  };

  const renderInstagram = () => {
    if (instagramQuery.isLoading) return <Spinner style={{ height: 200 }} />;

    if (instagramQuery.isError || !instagramQuery.data?.data.length)
      return (
        <ErrorCard />
      );

    return (
      <FlashList
        data={[...instagramQuery.data.data, "VER MAS"]}
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
                <CardSocial
                  description={item.caption || ""}
                  showImageReplace={item.media_type === "VIDEO" && !item.thumbnail_url}
                  url={item.permalink}
                  image={item.media_product_type == "FEED" ? item.media_url + "" : item.thumbnail_url + ""}
                />
              )}
            </>
          );
        }}
      />
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

        <View>
          <Texto>{detalleGrupoMateriaQuery.isLoading ? "ESTA CARGANDO" : "NO ESTA CARGANDO"}</Texto>
          <Texto>{detalleGrupoMateriaQuery.isFetching ? "ESTA FETCHIN" : "NO ESTA FETCHIN"}</Texto>
          <Texto>{detalleGrupoMateriaQuery.isError ? "ESTA ERROR" : "NO ESTA ERROR"}</Texto>

          {detalleGrupoMateriaQuery.data?.map((x) => (
            <Texto key={x.id}>{x.descripcion}</Texto>
          ))}
        </View>
      </ScrollView>
    </LayoutScreen>
  );
};

interface Props {
  url: string;
  image: string;
  description: string;
  showImageReplace?: boolean;
}

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const CardSocial: React.FC<Props> = ({
  description,
  image,
  url,
  showImageReplace = false,
}) => {
  const isDark = useThemeColor() === "dark";

  const compartirPost = async () => {
    try {
      const shareOptions = {
        message: `
${description}
${url}
`,
      };

      await Share.open(shareOptions);
    } catch (error) {
      console.log("Error al compartir la imagen:", error);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => openURL(url)}
      style={styles.cardContainer}
      className="bg-white dark:bg-secondary-dark flex-col justify-between  "
    >
      {showImageReplace ? (
        <View className="flex items-center justify-center p-2">
          {isDark ? (
            <Image
              source={require(`~/assets/images/app/logo-dark.png`)}
              style={[{ width: 200, height: 190 }]}
              contentFit="contain"
            />
          ) : (
            <Image
              source={require(`~/assets/images/app/logo-light.png`)}
              style={[{ width: 200, height: 190 }]}
              contentFit="contain"
            />
          )}
        </View>
      ) : (
        <Image
          source={image}
          //   defaultSource={require(`~/assets/images/app/logo-dark.png`)}
          className="w-full h-52 rounded-t-md"
          contentFit="cover"
          //placeholder={require(`~/assets/images/app/logo-dark.png`)}
          placeholder={blurhash}
        />
      )}

      <View className="p-2 flex-1">
        <Texto
          className="text-black dark:text-white text-xs flex-1"
          numberOfLines={4}
        >
          {description}
        </Texto>

        <TouchableOpacity onPress={compartirPost}>
          <View className=" rounded bg-primario flex-row items-center justify-center p-1">
            <Texto className="text-center text-lg text-white mr-2">
              COMPARTIR
            </Texto>

            <FontAwesome name="share-alt" size={20} color={"#FFF"} />
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const VerMasCard: React.FC<{ url: string }> = ({ url }) => {
  return (
    <TouchableOpacity className="bg-white dark:bg-primario-dark flex-col justify-between  " style={styles.cardContainer} onPress={() => openURL(url)}>
      <View className="flex-1 items-center justify-center">
        <View className="w-16 h-16 rounded-full bg-primario dark:bg-secondary-dark items-center justify-center">
          <FontAwesome name="plus" color={"#FFF"} size={30} />
        </View>

        <Texto className="dark:text-white mt-4 text-xl" weight="Bold">
          Ver Mas
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
  )
}

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
