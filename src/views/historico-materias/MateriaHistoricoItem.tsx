import { useState, useReducer, useEffect, useRef, memo } from "react";
import { Pressable, View } from "react-native";
import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { isMateriaInRangeMonths } from "@/helpers/isMateriaInRangeMonths";
import { MateriaState, SwiperV2 } from "@/components";
import { CustomBottomSheetModal, CustomSkeleton, Texto } from "@/ui";
import { IRegistroHistorico } from "@/types";
import { useDetalleGrupoMateria, useThemeColor } from "@/hooks";
import MateriaChartsDetail from "./MateriaChartsDetail";
import * as Animatable from "react-native-animatable";
import { Image } from "expo-image";
import { SwiperV2Ref } from "@/components/SwiperV2";
import { CustomBottomSheetRef } from "@/ui/CustomBottomSheetModal";
import { sleep } from "@/helpers";
import { MateriaProyeccionesItem } from "../proyecciones";

interface Props {
    materia: IRegistroHistorico;
    tutorial?: {
        inCourse: boolean;
        step: number;
    };
}

const animationPulse = {
    from: {
        transform: [
            {
                scale: 1,
            },
        ],
    },
    to: {
        transform: [
            {
                scale: 1.3,
            },
        ],
    },
};

const MateriaHistoricoItem: React.FC<Props> = memo(({ materia, tutorial }) => {
    const [enabled, setEnabled] = useState(false);
    const swiperRef = useRef<SwiperV2Ref>(null);
    const bottomSheetRef = useRef<CustomBottomSheetRef>(null);
    const isDark = useThemeColor() === "dark";

    const handleClose = () => {
        swiperRef.current?.close();
    };

    const { detalleGrupoMateriaQuery: data } = useDetalleGrupoMateria({
        grupo: materia.grupoMaestro || materia.grupo,
        enabled,
    });

    const renderLeftActions = () => {
        const isValid = isMateriaInRangeMonths(materia.fechaRegistro || "");

        return (
            <>
                <MaterialCommunityIcons.Button
                    onPress={() => router.push(`/evaluacion/${materia.grupo}`)}
                    name="clipboard-check"
                    size={30}
                    color="#fff"
                    disabled={!isValid}
                    style={{ paddingRight: 0, opacity: !isValid ? 0.3 : 1 }}
                />

                <MaterialCommunityIcons.Button
                    onPress={() => router.push(`/moodle/${materia.moodle}`)}
                    name="school"
                    size={30}
                    color="#fff"
                    backgroundColor={"rgb(251 146 60)"}
                    disabled={!isValid}
                    style={{ paddingRight: 0, opacity: !isValid ? 0.3 : 1 }}
                />
            </>
        );
    };

    const renderRightActions = () => {
        return (
            <>
                <MateriaProyeccionesItem
                    showMessage={false}
                    customContent={
                        <View className="bg-yellow-500 p-2 rounded">
                            <MaterialCommunityIcons
                                name="family-tree"
                                size={30}
                                color="#fff"
                                style={{ padding: 0 }}
                            //onPress={() => handleClose()}
                            />
                        </View>
                    }
                    materia={{
                        ...materia,
                        carrera: "",
                        estado: materia.estado,
                        id: materia.id,
                        materia: materia.nombre,
                        materiaAdmId: materia.materiaId,
                        modulo: "",
                        semestre: "",
                        turno: "Mañana",
                    }}
                />
            </>
        );
    };

    const Tutorial = () => {
        if (!tutorial || !tutorial.inCourse) return null;
        const handImages = [
            require("~/assets/images/icons/hand-light.png"),
            require("~/assets/images/icons/hand-dark.png"),
        ];

        if (tutorial.step == 1)
            return (
                <Animatable.View
                    useNativeDriver
                    animation={animationPulse}
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
                            height: 30,
                        }}
                        contentFit="contain"
                        source={isDark ? handImages[1] : handImages[0]}
                    />
                </Animatable.View>
            );

        if (tutorial.step == 2)
            return (
                <Animatable.View
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
                        userSelect: "none",
                    }}
                >
                    <MaterialCommunityIcons
                        name="gesture-swipe-horizontal"
                        size={40}
                        color={isDark ? "#FFF" : "#000"}
                    />
                </Animatable.View>
            );
    };

    let tuto2: any = null;
    let tuto1: any = null;


    /*   useEffect(() => {
          if (!tutorial?.inCourse) return;
          if (tutorial.step == 2) {
              tuto2 = setTimeout(() => {
                  swiperRef.current?.openRight();
  
                  if (tutorial.step != 2) {
                      clearTimeout(tuto2)
                  }
              }, 1000);
  
              tuto2 = setTimeout(() => {
                  swiperRef.current?.openLeft();
  
                  if (tutorial.step != 2) {
                      clearTimeout(tuto2)
                  }
              }, 3000);
  
              tuto2 = setTimeout(() => {
                  swiperRef.current?.close();
  
                  if (tutorial.step != 2) {
                      clearTimeout(tuto2)
                  }
              }, 5000);
  
              tuto2 = setTimeout(() => {
                  swiperRef.current?.openRight();
  
                  if (tutorial.step != 2) {
                      clearTimeout(tuto2)
                  }
              }, 11000);
  
              tuto2 = setTimeout(() => {
                  swiperRef.current?.openLeft();
  
                  if (tutorial.step != 2) {
                      clearTimeout(tuto2)
                  }
              }, 13000);
  
              tuto2 = setTimeout(() => {
                  swiperRef.current?.close();
  
                  if (tutorial.step != 2) {
                      clearTimeout(tuto2)
                  }
              }, 15000);
          } else if (tutorial.step == 1) {
              tuto1 = setTimeout(() => {
                  bottomSheetRef.current?.open();
  
  
                  if (tutorial.step != 1) {
                      clearTimeout(tuto1)
                  }
              }, 2000);
  
              tuto1 = setTimeout(() => {
                  bottomSheetRef.current?.close();
  
                  if (tutorial.step != 1) {
                      clearTimeout(tuto1)
                  }
              }, 6500);
  
              tuto1 = setTimeout(() => {
                  bottomSheetRef.current?.open();
  
                  if (tutorial.step != 1) {
                      clearTimeout(tuto1)
                  }
              }, 8500);
  
              tuto1 = setTimeout(() => {
                  bottomSheetRef.current?.close();
  
                  if (tutorial.step != 1) {
                      clearTimeout(tuto1)
                  }
              }, 15000);
          }
      }, [tutorial]); */


    useEffect(() => {
        let animationInterval: NodeJS.Timeout;

        const startAnimation = async () => {
            setTimeout(() => {
                bottomSheetRef.current?.open();
            }, 1000);

            setTimeout(() => {
                bottomSheetRef.current?.close();
            }, 3500);

            animationInterval = setInterval(() => {
                setTimeout(() => {
                    bottomSheetRef.current?.open();
                }, 1000);

                setTimeout(() => {
                    bottomSheetRef.current?.close();
                }, 3500);
            }, 6000);
        };

        const stopAnimation = () => {
            clearInterval(animationInterval);
        };

        if (tutorial?.inCourse && tutorial.step === 1) {
            stopAnimation();
            startAnimation();
        } else {
            stopAnimation();
        }

        return stopAnimation;
    }, [tutorial?.inCourse, tutorial?.step]);

    useEffect(() => {
        let animationInterval: NodeJS.Timeout;

        const startAnimation = async () => {
            setTimeout(() => {
                swiperRef.current?.openRight();
            }, 1000);

            setTimeout(() => {
                swiperRef.current?.openLeft();
            }, 3000);

            setTimeout(() => {
                swiperRef.current?.close();
            }, 5000);

            animationInterval = setInterval(() => {
                setTimeout(() => {
                    swiperRef.current?.openRight();
                }, 1000);

                setTimeout(() => {
                    swiperRef.current?.openLeft();
                }, 3000);

                setTimeout(() => {
                    swiperRef.current?.close();
                }, 5000);
            }, 10000);
        };

        const stopAnimation = () => {
            clearInterval(animationInterval);
        };

        if (tutorial?.inCourse && tutorial.step === 2) {
            stopAnimation();
            startAnimation();
        } else {
            stopAnimation();
        }

        return stopAnimation;
    }, [tutorial?.inCourse, tutorial?.step]);

    const content = (
        <SwiperV2
            ref={swiperRef}
            friction={3}
            renderLeftActions={renderLeftActions}
            renderRightActions={renderRightActions}

        //enabled={(tutorial?.inCourse)}
        >
            <View className="relative">
                <MateriaState
                    estado={materia.estado}
                    nombre={materia.nombre}
                    nota={materia.nota}
                />

                <Tutorial />
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
                            <CustomSkeleton width={160} height={15} />
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
                            <CustomSkeleton width={50} height={15} />
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
                            <CustomSkeleton width={200} height={15} />
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
                            <CustomSkeleton width={100} height={15} />
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
                            <CustomSkeleton width={140} height={15} />
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
                            <CustomSkeleton width={50} height={15} />
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
            ref={bottomSheetRef}
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
});
export default MateriaHistoricoItem;
