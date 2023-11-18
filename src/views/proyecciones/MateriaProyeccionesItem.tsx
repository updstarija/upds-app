import { useState, useRef, memo } from "react";
import { View, Alert } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { MateriaStateProyecciones, SwiperV2 } from "@/components";
import { CustomBottomSheetModal, Texto } from "@/ui";
import { ISemestre, MateriaProyeccion } from "@/types";
import { useCarreraContext, useMateriasProyeccion, useProyeccionesContext, useThemeColor } from "@/hooks";
import { SwiperV2Ref } from "@/components/SwiperV2";
import { CustomBottomSheetRef } from "@/ui/CustomBottomSheetModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RequisitoMateria } from "./RequisitoMateria";


interface Props {
    materia: MateriaProyeccion;
    customContent?: JSX.Element | JSX.Element[]
    showMessage?: boolean;
    withModulo?: boolean;
    tutorial?: {
        inCourse: boolean;
        step: number
    },
}

const MateriaProyeccionesItem: React.FC<Props> = memo(({ materia, tutorial, customContent, showMessage = true, withModulo = false }) => {
    const [enabled, setEnabled] = useState(false);
    const swiperRef = useRef<SwiperV2Ref>(null);
    const bottomSheetRef = useRef<CustomBottomSheetRef>(null);
    const isDark = useThemeColor() === "dark";

    const { valueCarrera } = useCarreraContext();
    const { boleta, scrollToTop } = useProyeccionesContext()

    const handleClose = () => {
        swiperRef.current?.close();
    };
    const { materiaProyeccionCreateMutation } =
        useMateriasProyeccion({ enabled: false } as any);

    const handleAddMateria = async () => {
        handleClose()

        const data = {
            materiaId: materia.id,
            boletaId: boleta,
        }

        await materiaProyeccionCreateMutation.mutateAsync(data);

        scrollToTop()
    };


    const Tutorial = () => {
        if (!tutorial || !tutorial.inCourse) return null
        const handImages = [require("~/assets/images/icons/hand-light.png"), require("~/assets/images/icons/hand-dark.png")]

        /*   if (tutorial.step == 1) return <Animatable.View
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
                      height: 30
                  }}
                  contentFit="contain"
                  source={isDark ? handImages[1] : handImages[0]}
              />
          </Animatable.View>
  
          if (tutorial.step == 2) return <Animatable.View
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
                  userSelect: "none"
              }}
          >
              <MaterialCommunityIcons
                  name="gesture-swipe-horizontal"
                  size={40}
                  color={isDark ? "#FFF" : "#000"}
  
              />
          </Animatable.View> */
    }

    const isElectiva = materia.materia.startsWith("Electiva - ")
    const isPendiente = materia.estado.id == 0
    const isAprobado = materia.estado.id == 1
    const isReprobado = materia.estado.id == 2

    const isValid = isPendiente ||
        isAprobado ||
        isReprobado

    const isValidForBoleta = () => {
        if (isPendiente || isAprobado) return false
        return true
    }

    const noMostrarMas = async () => {
        await AsyncStorage.setItem(`mostrar-detalle-materia-seleccionada-${materia.estado.id}`, 'false')
    }

    const message = async () => {
        if (!showMessage) return;

        const mostrar = await AsyncStorage.getItem(`mostrar-detalle-materia-seleccionada-${materia.estado.id}`)
        if (mostrar == 'false') {
            return;
        }

        let mensaje = "";
        if (isPendiente) {
            mensaje = "Has seleccionado una materia que esta pendiente.\n\nLa materia seleccionada esta pendiente, Por lo tanto, no es posible agregarla a la boleta de proyección."
        }
        else if (isAprobado) {
            mensaje = "Has seleccionado una materia que esta aprobada.\n\nEsta materia ya ha sido aprobada. Por lo tanto, no es elegible para su selección nuevamente.\n\n¡Sigue adelante y continúa con tu excelente desempeño académico!."
        }
        else if (isElectiva) {
            mensaje = "Has seleccionado una materia electiva.\n\nLas materias electivas son opciones adicionales que puedes tomar para personalizar tu experiencia educativa y ampliar tus conocimientos en áreas específicas de interés.\n\nAprovecha esta oportunidad para explorar y sumergirte en nuevos temas que complementen tu formación principal.\n\nRecuerda que las materias electivas son una excelente manera de enriquecer tu aprendizaje y expandir tus horizontes académicos. \n\n¡No dudes en elegir aquellas que más te apasionen y te motiven!"
        } else {
            return;
        }

        Alert.alert("Informacion",
            mensaje
            ,
            [{ text: 'Ok' }, { text: "No volver a mostrar este mensaje", onPress: noMostrarMas }],
            { cancelable: true }
        )
    }

    const renderRightActions = () => {
        return <View className="bg-green-500 flex-1 items-end justify-center p-2">
            <View className="flex-row items-center">
                <Texto className="text-white">Agregar</Texto>

                <MaterialIcons
                    name="add"
                    size={30}
                    color="#fff"

                />
            </View>
        </View>
    }

    const renderLeftActions = () => {
        return (
            <>
                <MaterialCommunityIcons.Button
                    onPress={() => { }}
                    name="chart-arc"
                    size={30}
                    color="#fff"
                    disabled={!isValid}
                    iconStyle={{ alignItems: "center", justifyContent: "center" }}
                    style={{ paddingRight: 0, flex: 1, alignItems: "center", justifyContent: "center" }}
                />
            </>
        );
    };

    const content = (
        <SwiperV2
            ref={swiperRef}
            friction={1}
            onRightOpen={handleAddMateria}
            // renderLeftActions={isValid ? renderLeftActions : undefined}
            renderRightActions={isValidForBoleta() ? renderRightActions : undefined}
        >
            <MateriaStateProyecciones
                materia={materia}
                withModulo={withModulo}
            />
        </SwiperV2>
    );

    return (
        <CustomBottomSheetModal
            ref={bottomSheetRef}
            content={customContent ? customContent : content}

            onPressButton={() => {
                setEnabled(true)
                message()
            }}
        >
            <RequisitoMateria materia={materia} />
        </CustomBottomSheetModal>
    );
});
export default MateriaProyeccionesItem;

