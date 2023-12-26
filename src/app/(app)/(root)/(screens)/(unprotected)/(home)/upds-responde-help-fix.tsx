import {
  StyleSheet,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { LayoutScreen } from "@/layout/LayoutScreen";
import { Texto } from "@/ui";


const UpdsResponde = () => {
  return (
    <LayoutScreen title="Responde upds">
      <View className="items-center justify-center flex gap-20 flex-1">
        {/* <View style={styles.boxStyle}>
            <Text>Horario de atencion</Text>
          </View> */}

        <Link href="/chat">
          <View style={styles.touchableStyle}>
            <View
              className="bg-primario dark:bg-secondary-dark"
              style={styles.buttonStyle}
            >
              <MaterialIcons name="support-agent" size={100} color={"#fff"} />
            </View>

            <Texto className="text-xl  text-primario dark:text-white" weight="Bold">
              UPDS CHAT
            </Texto>
          </View>
        </Link>

        <View style={styles.touchableStyle}>
          <View
            className="bg-primario dark:bg-secondary-dark"
            style={styles.buttonStyle}
          >
            <MaterialIcons name="dvr" size={100} color="#FFF" />
          </View>
          <Texto className="text-xl text-primario dark:text-white" weight="Bold">
            PREGUNTAS FRECUENTES
          </Texto>
        </View>
      </View>
    </LayoutScreen>
  );
};

const styles = StyleSheet.create({
  touchableStyle: {
    alignItems: "center",
  },
  buttonStyle: {
    padding: 20,
    borderRadius: 150,
    marginBottom: 10,
    shadowColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
});

export default UpdsResponde;
