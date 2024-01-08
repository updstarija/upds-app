import { useThemeColor } from "@/hooks";
import { IFaq } from "@/types";
import { Texto } from "@/ui";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { View } from "react-native-animatable";
import { TouchableOpacity } from "react-native-gesture-handler";
import RenderHTML from "react-native-render-html";
import { COLORS } from "~/constants";

const FaqItem: React.FC<{ faq: IFaq }> = ({ faq }) => {
  const isDark = useThemeColor() === "dark";
  const [openCollapsed, setOpenCollapsed] = useState(false);

  const { width } = useWindowDimensions();

  const { categoria, descripcion, titulo } = faq;

  return (
    <View style={styles.cardContainer}>
      <View
        style={styles.windowContainer}
        className="bg-white dark:bg-secondary-dark"
      >
        <View className="bg-primario flex-row justify-between h-8 items-center p-2">
          <Texto className="text-white text-sm" weight="Bold">
            {categoria}
          </Texto>
          <View className="flex-row">
            <View style={styles.titleBarButton} />
            <View style={styles.titleBarButton} />
            <View style={styles.titleBarButton} />
          </View>
        </View>
        <TouchableOpacity
          style={styles.content}
          onPress={() => setOpenCollapsed(!openCollapsed)}
        >
          <View className="flex flex-row justify-between items-center">
            <Texto
              className="text-black dark:text-white text-lg mb-2 flex-1 mr-2"
              weight="Bold"
            >
              {titulo}
            </Texto>
            <FontAwesome
              name={!openCollapsed ? "chevron-down" : "chevron-up"}
              size={20}
              color="#fff"
            />
          </View>
          {openCollapsed && (
            <RenderHTML
              baseStyle={{ color: isDark ? "#FFF" : "#000" }}
              contentWidth={width}
              source={{ html: descripcion }}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FaqItem;

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
