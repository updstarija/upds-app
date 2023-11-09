import { useState, useReducer } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { isMateriaInRangeMonths } from "@/helpers/isMateriaInRangeMonths";
import { MateriaState, SwiperV2 } from "@/components";
import { CustomBottomSheetModal, Texto } from "@/ui";
import { IRegistroHistorico } from "@/types";
import { useDetalleGrupoMateria, useThemeColor } from "@/hooks";
import { Skeleton } from "moti/skeleton";
import MateriaChartsDetail from "./MateriaChartsDetail";
import * as Animatable from "react-native-animatable";
import { Image } from "expo-image";

interface Props {
    materia: IRegistroHistorico;
    withTutorial?: boolean;
}

const MateriaHistoricoItem: React.FC<Props> = ({ materia, withTutorial = false }) => {
    const [enabled, setEnabled] = useState(false);
    const [dark, toggle] = useReducer((s) => !s, true);

    const colorMode = useThemeColor();
    const { detalleGrupoMateriaQuery: data } = useDetalleGrupoMateria({
        grupo: materia.grupoMaestro || materia.grupo,
        enabled,
    });

    const renderLeftActions = () => {
        const isValid = isMateriaInRangeMonths(materia.fechaRegistro || "");

        return (
            <>
                <MaterialCommunityIcons.Button
                    onPress={() => router.push(`/evaluacion/${45}`)}
                    name="clipboard-check"
                    size={30}
                    color="#fff"
                    disabled={!isValid}
                    style={{ paddingRight: 0, opacity: !isValid ? 0.5 : 1 }}
                />

                <MaterialCommunityIcons.Button
                    onPress={() => router.push(`/moodle/${54}`)}
                    name="school"
                    size={30}
                    color="#fff"
                    backgroundColor={"rgb(251 146 60)"}
                    disabled={!isValid}
                    style={{ paddingRight: 0, opacity: !isValid ? 0.5 : 1 }}
                />
            </>
        );
    };

    const renderRightActions = () => {
        return (
            <>
                <MaterialCommunityIcons.Button
                    name="eye"
                    size={30}
                    color="#fff"
                    style={{ paddingRight: 0 }}
                />
            </>
        );
    };

    const content = (
        <SwiperV2
            renderLeftActions={renderLeftActions}
            renderRightActions={renderRightActions}
        >
            <View className="relative">
                <MateriaState
                    estado={materia.estado}
                    nombre={materia.nombre}
                    nota={materia.nota}
                />
                {withTutorial && <Animatable.View
                    useNativeDriver
                    animation="pulse"
                    iterationCount={"infinite"}
                    direction="alternate"
                    style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Image
                        style={{
                            width: 30,
                            height: 30
                        }}
                        contentFit="contain"
                        source={require("~/assets/images/icons/hand.png")}
                    />
                </Animatable.View>}

                {/*     {withTutorial && <Animatable.View
                    useNativeDriver
                    animation="slideOutLeft"
                    iterationCount={"infinite"}
                    direction="alternate"
                    duration={2500}
                    style={{
                        position: "absolute",
                        top: 0,
                        right: 0,

                        alignItems: "flex-end",

                    }}
                >
                    <MaterialCommunityIcons
                        name="gesture-swipe-horizontal"
                        size={40}

                    />
                </Animatable.View>} */}
            </View>
        </SwiperV2>
    );

    const Information = () => {
        return (
            <>
                <View className="flex gap-y-3">
                    <View className="flex-row justify-between">
                        <Texto className="text-black dark:text-white" weight="Bold">
                            Materia:
                        </Texto>
                        {data.isLoading ? (
                            <Skeleton colorMode={colorMode} width={160} height={15} />
                        ) : (
                            <Texto className="text-black dark:text-white">
                                {data.data?.data.informacion.materia}
                            </Texto>
                        )}
                    </View>

                    <View className="flex-row justify-between">
                        <Texto className="text-black dark:text-white" weight="Bold">
                            Grupo:
                        </Texto>
                        {data.isLoading ? (
                            <Skeleton colorMode={colorMode} width={50} height={15} />
                        ) : (
                            <Texto className="text-black dark:text-white">
                                {data.data?.data.informacion.grupo}
                            </Texto>
                        )}
                    </View>

                    <View className="flex-row justify-between">
                        <Texto className="text-black dark:text-white" weight="Bold">
                            Horario:
                        </Texto>

                        {data.isLoading ? (
                            <Skeleton colorMode={colorMode} width={200} height={15} />
                        ) : (
                            <Texto className="text-black dark:text-white">
                                {data.data?.data.informacion.horario}
                            </Texto>
                        )}
                    </View>

                    <View className="flex-row justify-between">
                        <Texto className="text-black dark:text-white" weight="Bold">
                            Modulo:
                        </Texto>

                        {data.isLoading ? (
                            <Skeleton colorMode={colorMode} width={100} height={15} />
                        ) : (
                            <Texto className="text-black dark:text-white">
                                {data.data?.data.informacion.modulo}
                            </Texto>
                        )}
                    </View>

                    <View className="flex-row justify-between">
                        <Texto className="text-black dark:text-white" weight="Bold">
                            Docente:
                        </Texto>

                        {data.isLoading ? (
                            <Skeleton colorMode={colorMode} width={140} height={15} />
                        ) : (
                            <Texto className="text-black dark:text-white">
                                {data.data?.data.informacion.docente}
                            </Texto>
                        )}
                    </View>

                    <View className="flex-row justify-between">
                        <Texto className="text-black dark:text-white" weight="Bold">
                            Nota:
                        </Texto>

                        {data.isLoading ? (
                            <Skeleton colorMode={colorMode} width={50} height={15} />
                        ) : (
                            <Texto className="text-black dark:text-white">
                                {data.data?.data.informacion.nota}
                            </Texto>
                        )}
                    </View>
                </View>
            </>
        );
    };

    return (
        <CustomBottomSheetModal
            content={content}
            snapPointsProp={materia.estado.id == 0 ? [] : ["35%", "60%", "90%"]}
            onPressButton={() => setEnabled(true)}
        >
            <Texto
                className="text-center text-xl text-black dark:text-white mb-4"
                weight="Bold"
            >
                DETALLE DE LA MATERIA
            </Texto>

            {!data.isError ? (
                <>
                    <Information />

                    <MateriaChartsDetail materia={materia} detalleGrupo={data} />
                </>
            ) : (
                <>
                    <View className="items-center bg-primario dark:bg-secondary-dark p-4 rounded-2xl">
                        <Texto className="text-white text-center">
                            {
                                "Hubo un error al cargar el detalle :(.\nSi el problema persiste por favor reportalo con soporte"
                            }
                        </Texto>
                    </View>
                </>
            )}
        </CustomBottomSheetModal>
    );
};
export default MateriaHistoricoItem;
