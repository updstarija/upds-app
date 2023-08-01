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

  const { data, isLoading, getVideosYoutTube } = useRedesSociales();

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
              <Text style={{ fontWeight: "bold" }}>YouTube</Text>
            </View>

            {/*  <FlatList
              data={data}
              keyExtractor={item => item.id.videoId}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              onEndReachedThreshold={1}
              onEndReached={getVideosYoutTube}
              renderItem={({ item }) => {
                return (
                  <View style={styles.cardContainer}>
                    <View style={styles.cardHeader}>
                      <Image
                        source={require('~/assets/images/pages/updsfacebook.jpeg')}
                        style={styles.imagePerfil}
                      />
                      <Text style={{ fontSize: 11, marginLeft: 5 }}>
                        {item.snippet.channelTitle}
                      </Text>
                    </View>
                    <Text style={{ fontSize: 10 }}>{item.snippet.title}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedVideo(item);
                        setVideoPlayer(true);
                      }}>
                      <Image
                        source={{ uri: item.snippet.thumbnails.default.url }}
                        style={styles.imageContainer}
                      />
                    </TouchableOpacity>
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
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="share" size={16} color="#4267B2" />
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: 'bold',
                            marginLeft: 5,
                          }}>
                          Compartir
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              }}
            /> */}

            <View style={styles.emptyContainer}>
              <Image
                source={require("~/assets/images/pages/erroryoutube.png")}
                style={styles.emptyImage}
              />
              <Text style={styles.emptyText}>No hay videos disponibles.</Text>
            </View>

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
              <Text style={{ fontWeight: "bold" }}>Facebook</Text>
            </View>

            <FlatList
              data={facebookList}
              keyExtractor={(item) => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <View style={styles.cardContainer}>
                    <View style={styles.cardHeader}>
                      <Image
                        source={require("~/assets/images/pages/updsfacebook.jpeg")}
                        style={styles.imagePerfil}
                      />
                      <Text style={{ fontSize: 11, marginLeft: 5 }}>
                        UPDS - Sede Tarija
                      </Text>
                    </View>
                    <Text style={{ fontSize: 10 }}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit...
                    </Text>
                    <Image source={item.image} style={styles.imageContainer} />
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          margin: 5,
                        }}
                      >
                        <MaterialIcons
                          name="thumb-up-off-alt"
                          size={16}
                          color="#4267B2"
                        />
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: "bold",
                            marginLeft: 5,
                          }}
                        >
                          Me gusta
                        </Text>
                      </View>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <MaterialIcons name="share" size={16} color="#4267B2" />
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: "bold",
                            marginLeft: 5,
                          }}
                        >
                          Conpartir
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
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
              <Text style={{ fontWeight: "bold" }}>Instagram</Text>
            </View>
            <FlatList
              data={facebookList}
              keyExtractor={(item) => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <View style={styles.cardContainer}>
                    <View style={styles.cardHeader}>
                      <Image
                        source={require("~/assets/images/pages/updsfacebook.jpeg")}
                        style={styles.imagePerfil}
                      />
                      <Text style={{ fontSize: 11, marginLeft: 5 }}>
                        UPDS - Sede Tarija
                      </Text>
                    </View>
                    <Text style={{ fontSize: 10 }}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit...
                    </Text>
                    <Image source={item.image} style={styles.imageContainer} />
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          margin: 5,
                        }}
                      >
                        <MaterialIcons
                          name="thumb-up-off-alt"
                          size={16}
                          color="#4267B2"
                        />
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: "bold",
                            marginLeft: 5,
                          }}
                        >
                          Me gusta
                        </Text>
                      </View>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <MaterialIcons name="share" size={16} color="#4267B2" />
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: "bold",
                            marginLeft: 5,
                          }}
                        >
                          Conpartir
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
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
    width: 150,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
  },
  imagePerfil: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  imageContainer: {
    width: 150,
    height: 100,
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
