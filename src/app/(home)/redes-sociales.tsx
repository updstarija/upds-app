import { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { VideoPlayer } from "@/components/VideoPlayer";
import { Video } from "@/types";
import { useRedesSociales } from "@/hooks";
import { LayoutScreen } from "@/layout/LayoutScreen";
import { COLORS } from "~/constants";
import { Texto } from "../../components";
import Spinner from "@/components/ui/Spinner";

const facebookList = [
  {
    id: "1",
    image: require("~/assets/images/pages/updsfacebook.jpeg"),
  },
  {
    id: "2",
    image: require("~/assets/images/pages/inicioclases.jpeg"),
  },
  {
    id: "3",
    image: require("~/assets/images/pages/inscribete.jpeg"),
  },
  {
    id: "4",
    image: require("~/assets/images/pages/programa.jpeg"),
  },
  {
    id: "5",
    image: require("~/assets/images/pages/inscribete.jpeg"),
  },
  {
    id: "6",
    image: require("~/assets/images/pages/programa.jpeg"),
  },
];

const RedesSociales = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const { data, isLoading, isError, getVideosYoutTube } = useRedesSociales();

  useEffect(() => {
    getVideosYoutTube();
  }, []);

  const [videoPlayer, setVideoPlayer] = useState(false);

  const handleShowModalVideo = () => {
    setVideoPlayer(true);
  };

  const handleCloseModalVideo = () => {
    setVideoPlayer(false);
  };


  const renderYt = () => {
    if (isLoading) return <Spinner style={{ height: 200 }} />
    //HUBO ERROR
    if (isError || data.length == 0) return <>
      <View style={styles.emptyContainer}>
        <Image
          source={require("~/assets/images/pages/erroryoutube.png")}
          style={styles.emptyImage}
        />
        <Texto className="text-black dark:text-white mt-4" weight="Bold">No hay videos disponibles.</Texto>
      </View>
    </>


    return <FlatList
      data={data}
      keyExtractor={item => item.id.videoId}
      contentContainerStyle={{ padding: 10 }}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      onEndReachedThreshold={1}
      onEndReached={() => { console.log('traer mas data') }}
      ItemSeparatorComponent={() => <View className="mr-2" />}
      renderItem={({ item }) => {
        return (
          <View style={styles.cardContainer} className="bg-white dark:bg-secondary-dark flex-col justify-between border-[0.5px] border-gray-100 ">
            <View className="flex-row justify-between items-center">
              <Image
                source={require('~/assets/images/pages/updsfacebook.jpeg')}
                style={styles.imagePerfil}
              />
              <Texto className="text-black dark:text-white ml-2 flex-1" weight="Bold">
                {item.snippet.channelTitle}
              </Texto>
            </View>

            <Texto className="text-black dark:text-white text-xs">{item.snippet.title}</Texto>

            <TouchableOpacity
              onPress={() => {
                setSelectedVideo(item);
                setVideoPlayer(true);
              }}>
              <Image
                source={{ uri: item.snippet.thumbnails.high.url }}
                style={styles.imageContainer}
                className="mt-1"
                resizeMode="cover"
              />
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: "space-between"
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  margin: 5,
                }}>
                <MaterialIcons
                  name="thumb-up-off-alt"
                  size={16}
                  color="#4267B2"
                />
                <Texto
                  style={{
                    fontSize: 10,
                    fontWeight: 'bold',
                    marginLeft: 5,
                  }}
                  className="text-black dark:text-white">
                  Me gusta
                </Texto>
              </View>

              <View
                style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons name="share" size={16} color="#4267B2" />
                <Texto
                  style={{
                    fontSize: 10,
                    fontWeight: 'bold',
                    marginLeft: 5,
                  }}
                  className="text-black dark:text-white">
                  Compartir
                </Texto>
              </View>
            </View>
          </View>
        );
      }}
    />
  }

  const renderFacebook = () => {
    if (isLoading) return <Spinner style={{ height: 200 }} />
    //HUBO ERROR
    if (isError || data.length == 0) return <>
      <View style={styles.emptyContainer}>
        <Image
          source={require("~/assets/images/pages/erroryoutube.png")}
          style={styles.emptyImage}
        />
        <Texto className="text-black dark:text-white mt-4" weight="Bold">No hay videos disponibles.</Texto>
      </View>
    </>


    return <FlatList
      data={facebookList}
      keyExtractor={item => item.id}
      contentContainerStyle={{ padding: 10 }}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      onEndReachedThreshold={1}
      onEndReached={() => { console.log('traer mas data') }}
      ItemSeparatorComponent={() => <View className="mr-2" />}
      renderItem={({ item }) => {
        return (
          <View style={styles.cardContainer} className="bg-white dark:bg-secondary-dark flex-col justify-between border-[0.5px] border-gray-100 ">
            <View className="flex-row justify-between items-center">
              <Image
                source={require('~/assets/images/pages/updsfacebook.jpeg')}
                style={styles.imagePerfil}
              />
              <Texto className="text-black dark:text-white ml-2 flex-1" weight="Bold">
                UPDS - Sede Tarija
              </Texto>
            </View>

            <Texto className="text-black dark:text-white text-xs" numberOfLines={5}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae unde suscipit, amet atque quaerat provident aspernatur temporibus repellendus perspiciatis nisi esse incidunt, molestiae adipisci a aliquid eveniet quisquam corporis vitae.</Texto>

            <TouchableOpacity
              onPress={() => {

              }}>
              <Image
                source={item.image}
                style={[styles.imageContainer, { maxWidth: 180 }]}
                className="mt-1"
                resizeMode="cover"
              />
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: "space-between"
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  margin: 5,
                }}>
                <MaterialIcons
                  name="thumb-up-off-alt"
                  size={16}
                  color="#4267B2"
                />
                <Texto
                  style={{
                    fontSize: 10,
                    fontWeight: 'bold',
                    marginLeft: 5,
                  }}
                  className="text-black dark:text-white">
                  Me gusta
                </Texto>
              </View>

              <View
                style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons name="share" size={16} color="#4267B2" />
                <Texto
                  style={{
                    fontSize: 10,
                    fontWeight: 'bold',
                    marginLeft: 5,
                  }}
                  className="text-black dark:text-white">
                  Compartir
                </Texto>
              </View>
            </View>
          </View>
        );
      }}
    />
  }

  const renderInstagram = () => {
    if (isLoading) return <Spinner style={{ height: 200 }} />
    //HUBO ERROR
    if (isError || data.length == 0) return <>
      <View style={styles.emptyContainer}>
        <Image
          source={require("~/assets/images/pages/erroryoutube.png")}
          style={styles.emptyImage}
        />
        <Texto className="text-black dark:text-white mt-4" weight="Bold">No hay videos disponibles.</Texto>
      </View>
    </>


    return <FlatList
      data={facebookList}
      keyExtractor={item => item.id}
      contentContainerStyle={{ padding: 10 }}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      onEndReachedThreshold={1}
      onEndReached={() => { console.log('traer mas data') }}
      ItemSeparatorComponent={() => <View className="mr-2" />}
      renderItem={({ item }) => {
        return (
          <View style={styles.cardContainer} className="bg-white dark:bg-secondary-dark flex-col justify-between border-[0.5px] border-gray-100 ">
            <View className="flex-row justify-between items-center">
              <Image
                source={require('~/assets/images/pages/updsfacebook.jpeg')}
                style={styles.imagePerfil}
              />
              <Texto className="text-black dark:text-white ml-2 flex-1" weight="Bold">
                UPDS - Sede Tarija
              </Texto>
            </View>

            <Texto className="text-black dark:text-white text-xs" numberOfLines={5}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae unde suscipit, amet atque quaerat provident aspernatur temporibus repellendus perspiciatis nisi esse incidunt, molestiae adipisci a aliquid eveniet quisquam corporis vitae.</Texto>

            <TouchableOpacity
              onPress={() => {

              }}>
              <Image
                source={item.image}
                style={[styles.imageContainer]}
                className="mt-1"
                resizeMode="cover"
              />
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: "space-between"
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  margin: 5,
                }}>
                <MaterialIcons
                  name="thumb-up-off-alt"
                  size={16}
                  color="#4267B2"
                />
                <Texto
                  style={{
                    fontSize: 10,
                    fontWeight: 'bold',
                    marginLeft: 5,
                  }}
                  className="text-black dark:text-white">
                  Me gusta
                </Texto>
              </View>

              <View
                style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons name="share" size={16} color="#4267B2" />
                <Texto
                  style={{
                    fontSize: 10,
                    fontWeight: 'bold',
                    marginLeft: 5,
                  }}
                  className="text-black dark:text-white">
                  Compartir
                </Texto>
              </View>
            </View>
          </View>
        );
      }}
    />
  }


  return (
    <LayoutScreen title="Redes Sociales">
      <VideoPlayer
        title={selectedVideo?.id.videoId || "_"}
        visible={videoPlayer}
        onClose={handleCloseModalVideo}
      />

      <ScrollView>
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
              <Texto className="text-black dark:text-white" weight="Bold">YouTube</Texto>
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
              <Texto className="text-black dark:text-white" weight="Bold">Facebook</Texto>
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
              <Texto className="text-black dark:text-white" weight="Bold">Instagram</Texto>
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
          </View>
        </View>
      </ScrollView>
    </LayoutScreen>
  );
};
// para videos de youtube : https://lonelycpp.github.io/react-native-youtube-iframe/install
//pasos: https://github.com/react-native-webview/react-native-webview/blob/master/docs/Getting-Started.md

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    width: 200,
    padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
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

    height: 90,
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
