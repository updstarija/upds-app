import { StyleSheet, View } from "react-native";

import { CustomSkeleton } from "@/ui";

const SocialNetworkSkeleton = () => {
  return (
    <View
      style={styles.cardContainer}
      className="bg-white dark:bg-secondary-dark flex-col justify-between  "
    >
      <CustomSkeleton width={"100%"} height={200} />

      <View className="p-2 flex-1">
        <CustomSkeleton width={"100%"} height={30} />
      </View>
      <View className="p-2">
        <CustomSkeleton width={"100%"} height={40} />
      </View>
    </View>
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

export default SocialNetworkSkeleton;
