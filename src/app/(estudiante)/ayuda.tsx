import {
    Pressable,
    StyleSheet,
    Text,
    View,
    useColorScheme,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { LayoutScreen } from "@/layout/LayoutScreen";
import { Link } from "expo-router";
import { useThemeColor } from "@/hooks";
import { Texto } from "../../components";


const Ayuda = () => {
    return (
        <LayoutScreen title="Responde upds">
            <View className="items-center justify-center flex gap-20 flex-1">
                {/* <View style={styles.boxStyle}>
              <Text>Horario de atencion</Text>
            </View> */}

                <Link href="/tutorial" asChild>
                    <Pressable>
                        <View style={styles.touchableStyle}>
                            <View
                                className="bg-primario dark:bg-secondary-dark"
                                style={styles.buttonStyle}
                            >
                                <MaterialIcons name="library-books" size={100} color={"#fff"} />
                            </View>

                            <Texto className="text-xl  text-primario dark:text-white" weight="Bold">
                                TUTORIALES
                            </Texto>
                        </View>
                    </Pressable>
                </Link>

                <Link href="/faq" asChild>
                    <Pressable>
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
                    </Pressable>
                </Link>
            </View>
        </LayoutScreen>
    );
};

const styles = StyleSheet.create({
    touchableStyle: {
        alignItems: "center",
    },
    buttonStyle: {
        padding: 40,
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

export default Ayuda;
