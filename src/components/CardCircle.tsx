import { StyleSheet, View } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Texto } from "../ui";
import { COLORS } from "~/constants";
import { useThemeColor } from "@/hooks";

interface Props {
    icon: any;
    title: string;
}

export const CardCircle: React.FC<Props> = ({ icon, title }) => {
    const isDark = useThemeColor() === "dark"

    return (
        <View style={styles.touchableStyle}>
            <View
                className="bg-primario dark:bg-secondary-dark w-48 h-48"
                style={styles.buttonStyle}
            >
                {icon === "dollar" ? (
                    <>
                        <FontAwesome
                            //@ts-ignore
                            name={icon}
                            size={110}
                            color="#FFF"
                        />
                    </>
                ) : (
                    <MaterialIcons
                        //@ts-ignore
                        name={icon}
                        size={120}
                        color="#FFF"
                    />
                )}
            </View>

            <Texto className="text-xl text-center  text-primario dark:text-white" weight="Bold">
                {title}
            </Texto>
        </View>
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
