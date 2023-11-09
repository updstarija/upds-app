import { View } from "react-native";
import { etiquetas } from "@/data";
import { Texto } from "@/ui";
import { IEstado } from "@/types";
import { FontAwesome } from "@expo/vector-icons";

interface Props {
    nombre: string;
    estado: IEstado;
    nota: number;
}
const MateriaState: React.FC<Props> = ({ nombre, nota, estado }) => {
    const isPendiente = estado.id == 0;
    const isAprobado = estado.id == 1;
    const isReprobado = estado.id == 2;

    const isValidStatus = isPendiente || isAprobado || isReprobado
    return (
        <View>
            <View className="relative overflow-hidden">
                <View
                    className={`px-3 py-4 flex-row justify-between items-center bg-white dark:bg-secondary-dark`}
                >
                    <Texto className="text-center text-black dark:text-white">
                        {nombre}
                    </Texto>
                    <Texto className="text-center text-black dark:text-white">
                        {isValidStatus && nota}
                    </Texto>
                </View>
            </View>

            {isValidStatus && (
                <>
                    <View
                        style={{
                            borderBottomColor: etiquetas[estado.id].color,
                            borderRightWidth: 25,
                            borderBottomWidth: 25,
                            width: 0,
                            height: 0,
                            backgroundColor: "transparent",
                            borderStyle: "solid",
                            borderLeftWidth: 0,
                            borderLeftColor: "transparent",
                            borderRightColor: "transparent",
                            position: "absolute",
                            top: 0,
                            right: 0,
                            transform: [{ rotate: "180deg" }],
                        }}
                    />

                    <View style={{ position: "absolute", top: 1, right: 1, zIndex: 999 }}>
                        <FontAwesome name={etiquetas[estado.id].icon} color={"#FFF"} />
                    </View>
                </>
            )}
        </View>
    );
};
export default MateriaState;
