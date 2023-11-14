import { useState, useRef, useEffect } from "react";
import {
    View,
    FlatList,
    Alert,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import {
    useAuthContext,
    useBoleta,
    useCarreraContext,
    useCarreras,
    useModulos,
    useProyeccionesContext,
    useSemestres,
    useThemeColor,
} from "@/hooks";
import {
    Busqueda,
    DetalleBoleta,
    SelectModulos,
    SemestreProyeccionItem,
} from "@/views/proyecciones";
import Icon from "@expo/vector-icons/FontAwesome";
import { COLORS } from "~/constants";
import { FloatingAction } from "react-native-floating-action";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { printAsync, printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import { templateBoletaV3 } from "@/data/";

import {
    TourGuideZone,
    TourGuideZoneByPosition,
    useTourGuideController,
} from "rn-tourguide";
import Spinner from "@/components/Spinner";
import { SelectCarrera } from "@/views/SelectCarrera";
import { Texto } from "@/ui";
import { BackHandler } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Spacer } from "@/components";
import { verTutorial } from "@/helpers";


interface Props {
    tutorialEnCurso: boolean;
    setTutorialEnCurso: React.Dispatch<React.SetStateAction<boolean>>;
}

const Boleta: React.FC<Props> = () => {
    const listref = useRef<FlatList | null>(null);
    const boletaRef = useRef<View | null>(null);

    const isDark = useThemeColor() === "dark";

    const { userAuth } = useAuthContext();
    const { tutorialBoletaReady, setTutorialBoletaReady, tutorialEnCurso, setTutorialEnCurso } = useProyeccionesContext();
    const { canStart, start, tourKey, eventEmitter } = useTourGuideController("t-boleta");

    const {
        valueCarrera,
    } = useCarreraContext();

    const [modalBoleta, setModalBoleta] = useState(false);

    const [valueModulo, setvalueModulo] = useState<number>(0);

    const { carrerasQuery } = useCarreras();
    const { semestresQuery } = useSemestres({
        carrera: valueCarrera || -1,
        proyeccion: true,
    });
    const { modulosQuery } = useModulos();
    const { boletaCreateMutation, boletaQuery } = useBoleta({
        carrera: valueCarrera || -1,
    });

    if (carrerasQuery.isLoading) return <Spinner />;
    if (carrerasQuery.isError) return <Texto>Hubo un error....</Texto>;


    useEffect(() => {
        if (!tutorialBoletaReady.carreras && carrerasQuery.data) {
            setTutorialBoletaReady({ ...tutorialBoletaReady, carreras: true });
        }
    }, [carrerasQuery]);

    useEffect(() => {
        if (!tutorialBoletaReady.modulos && modulosQuery.data?.data) {
            setTutorialBoletaReady({ ...tutorialBoletaReady, modulos: true });
        }
    }, [modulosQuery]);

    useEffect(() => {
        if (!tutorialBoletaReady.semestres && semestresQuery.data) {
            setTutorialBoletaReady({ ...tutorialBoletaReady, semestres: true });
        }
    }, [semestresQuery]);
    useEffect(() => {
        if (!tutorialBoletaReady.boleta && boletaQuery.data?.data) {
            setTutorialBoletaReady({ ...tutorialBoletaReady, boleta: true });
        }
    }, [boletaQuery]);

    useEffect(() => {
        (async () => {
            if (!Object.values(tutorialBoletaReady).includes(false)) {
                const activarTutorial = await verTutorial(tourKey)

                if (!activarTutorial) {
                    setTutorialEnCurso({ ...tutorialEnCurso, inCourse: false })
                    return;
                }
                if (canStart && activarTutorial) {
                    setTutorialEnCurso({ ...tutorialEnCurso, inCourse: true })
                    // listref.current?.scrollToOffset({ animated: true, offset: 0 })

                    setTimeout(() => {
                        start();
                    }, 1500);
                }
            }
        })();
    }, [canStart, tutorialBoletaReady]);


    const handleBackButtonPress = () => {
        return tutorialEnCurso.inCourse
    };

    const handleOnStop = () => setTutorialEnCurso({ ...tutorialEnCurso, inCourse: false })

    const handleOnStepChange = (step: any) => {
        setTutorialEnCurso({ ...tutorialEnCurso, step: step?.order || -1 })
    }

    const renderBoleta = () => (
        <>
            {valueCarrera ? (
                <DetalleBoleta
                    carrera={valueCarrera}
                    tutorial={tutorialEnCurso}
                />
            ) : (
                <Texto className="mt-5 text-black">
                    POR FAVOR SELECCIONE UNA CARRERA
                </Texto>
            )}
        </>
    );

    const renderHeaderBody = () => (
        <View className="bg-white  dark:bg-primario-dark">
            <Spacer />

            <TourGuideZone
                tourKey={tourKey}
                style={{ zIndex: 2 }}
                zone={1}
                text="Listado de carreras"
            >
                <SelectCarrera />
            </TourGuideZone>

            <Spacer />

            <TourGuideZone
                tourKey={tourKey}
                zone={2}
                text="Boleta de proyección de materias"
            >
                {renderBoleta()}
            </TourGuideZone>

            <Spacer />

            <TourGuideZone
                tourKey={tourKey}
                zone={4}
                text="Buscador de materias para proyectar"
            >
                <Busqueda />
            </TourGuideZone>

            <Spacer />

            <TourGuideZone
                tourKey={tourKey}
                style={{ zIndex: 999 }}
                zone={5}
                text="Listado de los módulos de la oferta semestral"
            >
                <SelectModulos valueModulo={valueModulo} setvalueModulo={setvalueModulo} />
            </TourGuideZone>

            <Spacer />


        </View>
    );

    const renderPlan = () => {
        if (semestresQuery.isLoading) return <Spinner />;
        if (semestresQuery.isError) return <Texto>HUBO UN ERROR..</Texto>;

        return (
            <>
                <FlashList
                    estimatedItemSize={100}
                    data={semestresQuery.data}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={<View className="z-50">
                        {renderHeaderBody()}
                    </View>}
                    extraData={valueModulo}
                    renderItem={({ item }) => (
                        <SemestreProyeccionItem semestre={item} modulo={valueModulo} />
                    )}
                />



            </>

        );
    };


    const actions = [
        {
            text: "Enviar como PDF",
            name: "pdf",
            icon: <FontAwesome name="file-pdf-o" color="#fff" size={20} />,
            position: 2,
        },
        {
            text: "Imprimir Boleta",
            name: "imprimir",
            icon: <MaterialCommunityIcons name="printer" color="#fff" size={20} />,
            position: 3,
        },
        {
            text: "Nueva Boleta",
            name: "nueva_boleta",
            icon: <MaterialCommunityIcons name="plus" color="#fff" size={20} />,
            position: 4,
        },
    ];

    const boletaValida = () => {
        if (boletaQuery.data && boletaQuery.data.data.length > 0) {
            return true;
        }

        Alert.alert("Error", "Agrega al menos una materia a la boleta.");
        return false;
    };

    const print = async () => {
        if (!boletaValida()) return;

        try {
            await printAsync({
                html: `
            ${templateBoletaV3.generateHeader()}
            ${templateBoletaV3.generateDatosHeader(
                    userAuth.usuario.nombre +
                    " " +
                    userAuth.usuario.apellidoPaterno +
                    " " +
                    userAuth.usuario.apellidoMaterno,
                    userAuth.usuario.documentoIdentidad,
                    carrerasQuery.data.find((x) => x.id === valueCarrera)?.nombre ||
                    ""
                )}
            ${templateBoletaV3.generateBody(
                    modulosQuery.data?.data || [],
                    boletaQuery.data?.data || []
                )}
            ${templateBoletaV3.generateFooter()}
            `,
                orientation: "landscape",
            });
        } catch (error) {
            // console.log("IMPRESION CANCELADA")
        }
    };

    const printToFile = async () => {
        if (!boletaValida()) return;
        const { uri } = await printToFileAsync({
            html: `
        ${templateBoletaV3.generateHeader()}
        ${templateBoletaV3.generateDatosHeader(
                userAuth.usuario.nombre +
                " " +
                userAuth.usuario.apellidoPaterno +
                " " +
                userAuth.usuario.apellidoMaterno,
                userAuth.usuario.documentoIdentidad,
                carrerasQuery.data.find((x) => x.id === valueCarrera)?.nombre || ""
            )}
        ${templateBoletaV3.generateBody(
                modulosQuery.data?.data || [],
                boletaQuery.data?.data || []
            )}
        ${templateBoletaV3.generateFooter()}
        `,
        });
        await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
    };

    const onNewBoleta = async () => {
        Alert.alert(
            "ALERTA",
            "Estas seguro de generar una nueva boleta de proyeccion?.\nSe eliminara la boleta actual.",
            [
                {
                    text: "No",
                    style: "destructive",
                },
                {
                    text: "si",
                    onPress: async () => {
                        await boletaCreateMutation.mutateAsync(valueCarrera || -1);
                        setModalBoleta(!modalBoleta);
                    },
                },
            ],
            { cancelable: false }
        );

        //await boletaCreateMutation.mutateAsync(valueCarrera || -1);
    };


    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            handleBackButtonPress
        );

        return () => backHandler.remove();
    }, [tutorialEnCurso]);

    useEffect(() => {
        eventEmitter?.on('stop', handleOnStop)
        eventEmitter?.on('stepChange', handleOnStepChange)

        return () => {
            eventEmitter?.off('stop', handleOnStop)
            eventEmitter?.off('stepChange', handleOnStepChange)
        }
    }, [tutorialEnCurso.inCourse])




    return (
        <View className="flex-1">
            <View className="flex-1 dark:bg-primario-dark">
                {renderPlan()}

                <TourGuideZoneByPosition
                    tourKey={tourKey}
                    text="Empieza generando tu boleta aqui si aun no la creaste"
                    zone={10}
                    shape={"circle"}
                    isTourGuide={tutorialEnCurso.step > 3}
                    bottom={43}
                    right={43}
                    width={50}
                    height={50}
                />


                <FloatingAction
                    overlayColor="#0000006a"
                    actions={actions}
                    distanceToEdge={{ horizontal: 40, vertical: 40 }}
                    onPressItem={(name) => {
                        if (name === "pdf") {
                            printToFile();
                        } else if (name === "imprimir") {
                            print();
                        } else if (name === "nueva_boleta") {
                            setModalBoleta(!modalBoleta);
                        }
                    }}
                />

                {/* <View style={{ position: "absolute", bottom: 40, right: 40 }}>
                <Texto>H</Texto>
            </View> */}
            </View>

            {/*    <CustomModal isVisible={modalBoleta}>
                <View className="bg-white dark:bg-secondary-dark p-4 rounded-2xl">
                    <Texto
                        className="text-lg text-center text-black dark:text-white"
                        weight="Bold"
                    >
                        NUEVA BOLETA
                    </Texto>
                    <View className="border border-gray-100 my-2" />
                    <Texto weight="Bold">Nombres:</Texto>
                    <Texto>
                        {userAuth.usuario.nombre} {userAuth.usuario.apellidoPaterno}{" "}
                        {userAuth.usuario.apellidoMaterno}
                    </Texto>

                    <Texto className="mt-2  text-black dark:text-white" weight="Bold">
                        Carrera:{" "}
                    </Texto>
                    <View className="mt-1 z-10">{renderCarreras()}</View>

                    <View className="flex-row justify-between mt-4">
                        <Button
                            onPress={() => setModalBoleta(!modalBoleta)}
                            classNameBtn="bg-gray-400 dark:bg-primario-dark p-2 rounded-lg"
                        >
                            <Texto className="text-white">CERRAR</Texto>
                        </Button>
                        <Button
                            onPress={() => onNewBoleta()}
                            classNameBtn="bg-primario p-2 rounded-lg"
                        >
                            <Texto className="text-white">CREAR BOLETA</Texto>
                        </Button>
                    </View>
                </View>
            </CustomModal> */}
        </View>
    );
};


export default Boleta;
