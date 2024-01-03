import { StyleSheet, View, TouchableOpacity } from "react-native";
import { openURL } from "expo-linking";
import { FontAwesome } from "@expo/vector-icons";
import { Texto } from "@/ui";

type Props = {
  url: string;
};

const SocialNetworkViewMore: React.FC<Props> = ({ url }) => {
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

export default SocialNetworkViewMore;
