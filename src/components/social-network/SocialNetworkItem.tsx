import { useThemeColor } from "@/hooks";
import { TouchableOpacity } from "react-native-gesture-handler";
import Share from "react-native-share";
import { openURL } from "expo-linking";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Texto } from "@/ui";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "~/constants";

type Props = {
  url: string;
  image: string;
  description: string;
  showImageReplace?: boolean;
};

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const SocialNetworkItem: React.FC<Props> = ({
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
      //console.log("Error al compartir la imagen:", error);
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

const styles = StyleSheet.create({
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
});

export default SocialNetworkItem;
