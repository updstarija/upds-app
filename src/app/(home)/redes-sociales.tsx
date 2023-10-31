import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Share from "react-native-share";
import { FontAwesome } from "@expo/vector-icons";
import { openURL } from "expo-linking";
import { FlashList } from "@shopify/flash-list";
import { Image } from 'expo-image'
import { VideoPlayer } from "@/components/VideoPlayer";
import {
  IResponseFacebook,
  IResponseInstagram,
  IResponseYoutbe,
  Video,
} from "@/types";
import { useRedesSociales, useThemeColor } from "@/hooks";
import { COLORS } from "~/constants";
import { LayoutScreen } from "@/layout/LayoutScreen";
import { Button, Texto, Spinner } from "../../components";

const RedesSociales = () => {
  const isDark = useThemeColor() === "dark";

  const instagramApi = useRedesSociales<IResponseInstagram>(
    {} as IResponseInstagram
  );
  const facebookApi = useRedesSociales<IResponseFacebook>(
    {} as IResponseFacebook
  );
  const youtubeApi = useRedesSociales<IResponseYoutbe>({} as IResponseYoutbe);

  useEffect(() => {
    instagramApi.getInstagramPosts();
  }, []);
  useEffect(() => {
    facebookApi.getFacebookPosts();
  }, []);
  useEffect(() => {
    youtubeApi.getVideosYoutTube();
  }, []);


  const [videoPlayer, setVideoPlayer] = useState(false);

  const renderYt = () => {
    if (youtubeApi.isLoading) return <Spinner style={{ height: 200 }} />;

    if (youtubeApi.isError)
      return (
        <>
          <View style={styles.emptyContainer}>
            <Image
              source={require("~/assets/images/pages/erroryoutube.png")}
              style={styles.emptyImage}
            />
            <Texto className="text-black dark:text-white mt-4" weight="Bold">
              No hay videos disponibles.
            </Texto>
          </View>
        </>
      );

    return (
      <FlashList
        data={[...youtubeApi.data.items, "VER MAS"]}
        keyExtractor={(item) => typeof item === "string" ? item : item.id.videoId}
        estimatedItemSize={250}
        contentContainerStyle={{ padding: 10 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="mr-2" />}
        renderItem={({ item }) => {
          return (
            <>
              {typeof item === "string"
                ?
                <VerMasCard url="https://www.youtube.com/@universidadprivadadomingos3411/videos" />
                :
                <CardSocial
                  description={item.snippet.title}
                  showImageReplace={item.snippet.liveBroadcastContent !== "none"}
                  url={`https://www.youtube.com/watch?v=${item.id.videoId}`}
                  image={item.snippet.thumbnails.medium.url}
                />
              }
            </>
          );
        }}
      />
    );
  };

  const renderFacebook = () => {
    if (facebookApi.isLoading) return <Spinner style={{ height: 200 }} />;

    if (facebookApi.isError || !facebookApi.data?.data)
      return (
        <>
          <View style={styles.emptyContainer}>
            <Image
              source={require("~/assets/images/pages/erroryoutube.png")}
              style={styles.emptyImage}
            />
            <Texto className="text-black dark:text-white mt-4" weight="Bold">
              No hay videos disponibles.
            </Texto>
          </View>
        </>
      );

    return (
      <FlashList
        data={[...facebookApi.data.data, "VER MAS"]}
        keyExtractor={(item) => typeof item === "string" ? item : item.id}
        estimatedItemSize={250}
        contentContainerStyle={{ padding: 10 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="mr-2" />}
        renderItem={({ item }) => {
          return (
            <>
              {typeof item === "string"
                ?
                <VerMasCard url="https://www.facebook.com/universidadprivadadomingosaviotarija" />
                :
                <CardSocial
                  description={item.message || ""}

                  url={item.permalink_url}
                  image={item.full_picture}
                />
              }
            </>

          );
        }}
      />
    );
  };

  const renderInstagram = () => {
    if (instagramApi.isLoading) return <Spinner style={{ height: 200 }} />;

    if (instagramApi.isError || instagramApi.data.data.length == 0)
      return (
        <>
          <View style={styles.emptyContainer}>
            <Image
              source={require("~/assets/images/pages/erroryoutube.png")}
              style={styles.emptyImage}
            />
            <Texto className="text-black dark:text-white mt-4" weight="Bold">
              No hay videos disponibles.
            </Texto>
          </View>
        </>
      );

    return (
      <FlashList
        data={[...instagramApi.data.data, "VER MAS"]}
        estimatedItemSize={250}
        keyExtractor={(item) => typeof item === "string" ? item : item.id}
        contentContainerStyle={{ padding: 10 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="mr-2" />}
        renderItem={({ item, index }) => {
          return (
            <>
              {typeof item === "string"
                ?
                <VerMasCard url="https://www.instagram.com/upds_tarija" />
                :
                <CardSocial
                  description={item.caption || ""}
                  showImageReplace={item.media_type === "VIDEO"}
                  url={item.permalink}
                  image={item.media_url}
                />}
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

            {/* ------------------------------------------------------------------------------------------------- */}
            {/* FACEBOOK */}
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
            {/* ------------------------------------------------------------------------------------------------- */}
            {/* INSTAGRAM */}
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
            {/* ------------------------------------------------------------------------------------------------- */}
            {/* <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 10,
                marginTop: 10,
              }}>
              <Image
                source={require('~/assets/images/pages/youtube.png')}
                style={{width: 30, height: 30}}
              />
              <Text style={{fontWeight: 'bold'}}>Youtube</Text>
            </View>

            <FlatList
              data={facebookList}
              keyExtractor={item => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => {
                return (
                  <View style={styles.cardContainer}>
                    <View style={styles.cardHeader}>
                      <Image
                        source={require('~/assets/images/pages/updsfacebook.jpeg')}
                        style={styles.imagePerfil}
                      />
                      <Text style={{fontSize: 11, marginLeft: 5}}>
                        UPDS - Sede Tarija
                      </Text>
                    </View>
                    <Text numberOfLines={1} style={{fontSize: 10}}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit
                    </Text>

                    <View>
                      <YoutubeIframe
                        height={85}
                        play={false}
                        videoId={'84WIaK3bl_s'}
                        webViewProps={{
                          mediaPlaybackRequiresUserAction: false,
                          allowsInlineMediaPlayback: false,
                          source: {
                            baseUrl: '',
                            html: `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/84WIaK3bl_s?autoplay=1&controls=2" frameborder="0" allowfullscreen></iframe>`,
                          },
                        }}
                      />
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          margin: 5,
                        }}>
                        <Icon
                          name="thumb-up-off-alt"
                          size={16}
                          color="#4267B2"
                        />
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: 'bold',
                            marginLeft: 5,
                          }}>
                          Me gusta
                        </Text>
                      </View>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Icon name="share" size={16} color="#4267B2" />
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: 'bold',
                            marginLeft: 5,
                          }}>
                          Conpartir
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              }}
            /> */}

            {/* 
            <View renderToHardwareTextureAndroid className="flex-1">
              <WebView
                containerStyle={{ flex: 1, height: 500 }}
                style={{ flex: 1, height: 500 }}
                scalesPageToFit
                source={{
                  html: `
                <blockquote class="tiktok-embed" cite="https://www.tiktok.com/@upds_tarija" data-unique-id="upds_tarija" data-embed-type="creator" style="max-width: 780px; min-width: 288px;" > <section> <a target="_blank" href="https://www.tiktok.com/@upds_tarija?refer=creator_embed">@upds_tarija</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>
                ` }}
              />

              <Texto>GOLA</Texto>
            </View> */}

            {/* <View renderToHardwareTextureAndroid className="flex-1">
              <WebView
                containerStyle={{ flex: 1, height: 500 }}
                source={{
                  html: `
    <blockquote class="tiktok-embed" cite="https://www.tiktok.com/@upds_tarija" data-unique-id="upds_tarija" data-embed-type="creator" > <section> <a target="_blank" href="https://www.tiktok.com/@upds_tarija?refer=creator_embed">@upds_tarija</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>
    ` }}
              />

              <Texto>GOLA</Texto>
            </View> */}
          </View>
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
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const CardSocial: React.FC<Props> = ({
  description,
  image,
  url,
  showImageReplace = false,
}) => {
  const isDark = useThemeColor() === "dark";
  const [isLoadingImage, setIsLoadingImage] = useState(true)

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
      console.log('Error al compartir la imagen:', error);
    }
  }


  return (
    <TouchableOpacity
      onPress={() => openURL(url)}
      style={styles.cardContainer}
      className="bg-white dark:bg-secondary-dark flex-col justify-between  "
    >

      {showImageReplace ? (
        <View
          className="flex items-center justify-center p-2"
        >
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
          <View
            className=" rounded bg-primario flex-row items-center justify-center p-1">
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
    <TouchableOpacity style={styles.cardContainer} onPress={() => openURL(url)}>
      <View className="flex-1 items-center justify-center">
        <View className="w-16 h-16 rounded-full bg-primario dark:bg-secondary-dark items-center justify-center">
          <FontAwesome name="plus" color={"#FFF"} size={30} />
        </View>

        <Texto className="dark:text-white mt-4 text-xl" weight="Bold">Ver Mas</Texto>
      </View>
    </TouchableOpacity>
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
