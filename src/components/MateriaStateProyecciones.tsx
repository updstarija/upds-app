import { View } from "react-native";
import { etiquetas } from "@/data";
import { Texto } from "@/ui";
import { IEstado, MateriaProyeccion } from "@/types";
import { FontAwesome } from "@expo/vector-icons";

interface Props {
    materia: MateriaProyeccion;
    withModulo?: boolean
}
const MateriaState: React.FC<Props> = ({ materia, withModulo = false }) => {
    const isElectiva = materia.materia.startsWith("Electiva - ")
    const isPendiente = materia.estado.id == 0;
    const isAprobado = materia.estado.id == 1;
    const isReprobado = materia.estado.id == 2;


    const isValidStatus = isPendiente || isAprobado || isReprobado || isElectiva
    return (
        <View>
            <View className=" bg-white dark:bg-secondary-dark p-4 relative overflow-hidden">
                <View className="flex-row items-center justify-between ">
                    <View className="w-3/4">
                        <Texto className={`text-black dark:text-white`} weight="Bold">
                            {materia.materia}
                        </Texto>
                        <Texto className={`text-xs text-gray-400`}>{materia.carrera}</Texto>
                        {withModulo && <Texto className={`text-xs text-gray-400`}>{materia.modulo}</Texto>}
                    </View>
                    <Texto className={`text-black dark:text-white`}>{materia.turno}</Texto>
                </View>
            </View>

            {isValidStatus && (
                <>
                    <View
                        style={{
                            borderBottomColor: etiquetas[isElectiva ? 3 : materia.estado.id].color,
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
                        <FontAwesome name={etiquetas[isElectiva ? 3 : materia.estado.id].icon} color={"#FFF"} />
                    </View>
                </>
            )}
        </View>
    );
};
export default MateriaState;
