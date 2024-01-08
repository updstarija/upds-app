import { CustomSkeleton } from "@/ui";
import { StyleSheet } from "react-native";
import { View } from "react-native-animatable";
import { COLORS } from "~/constants";

const FaqSkeleton = () => {
  return (
    <View style={styles.cardContainer}>
      <View
        style={styles.windowContainer}
        className="bg-white dark:bg-secondary-dark "
      >
        <View className="bg-primario flex-row justify-between h-8 items-center p-2">
          <CustomSkeleton
            width={180}
            height={10}
            colors={["#243E89", "#2F489C", "#3752AD"]}
          />

          <View className="flex-row">
            <View style={styles.titleBarButton} />
            <View style={styles.titleBarButton} />
            <View style={styles.titleBarButton} />
          </View>
        </View>

        <View style={styles.content}>
          <CustomSkeleton width={"100%"} height={50} />
        </View>
      </View>
    </View>
  );
};

export default FaqSkeleton;

const styles = StyleSheet.create({
  titleFaq: {
    color: COLORS.light.background,
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
  },
  cardContainer: {
    marginVertical: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 7.68,
    elevation: 10,
  },
  windowContainer: {
    borderRadius: 10,
    overflow: "hidden",
    elevation: 5,
  },
  titleBar: {
    flexDirection: "row",
    height: 30,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  titleBarButton: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "white",
    marginLeft: 5,
  },
  content: {
    padding: 20,
  },
  cardTitle: {
    marginBottom: 10,
  },
  cardTextContainer: {
    maxHeight: 80,
  },
  cardText: {
    fontSize: 12,
  },
});
