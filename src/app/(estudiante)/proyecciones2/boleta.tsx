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
    useSemestres,
    useThemeColor,
} from "@/hooks";
import {
    Busqueda,
    DetalleBoleta,
    DetalleMateriasSemestre,
    SemestreProyeccionItem,
} from "@/views/proyecciones";
import { Button } from "../../../components";
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
import { verTutorial } from "@/helpers";
import { SelectCarrera } from "@/views/SelectCarrera";
import { CustomModal, Texto } from "@/ui";
import { BackHandler } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { ScrollView } from "react-native-gesture-handler";

interface Props {
    tutorialEnCurso: boolean;
    setTutorialEnCurso: React.Dispatch<React.SetStateAction<boolean>>;
}

const Boleta: React.FC<Props> = ({ tutorialEnCurso, setTutorialEnCurso }) => {
    const isDarkMode = useThemeColor() === "dark";
    const flatListRef = useRef<FlatList | null>(null);
    const boletaRef = useRef<View | null>(null);

    const [modalBoleta, setModalBoleta] = useState(false);
    const { userAuth } = useAuthContext();

    const [empezarTutorial, setEmpezarTutorial] = useState({
        carreras: false,
        boleta: false,
        semestres: false,
        modulos: false,
    });

    const { tourKey } = useTourGuideController("t-boleta");

    const {
        carrerasQuery: carreras,
        valueCarrera,
    } = useCarreraContext();

    const [semestreOpen, setSemestreOpen] = useState(-1);


    const [openModulo, setOpenModulo] = useState(false);
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
        if (!empezarTutorial.carreras) {
            setEmpezarTutorial({ ...empezarTutorial, carreras: true });
        }
    }, [empezarTutorial.carreras]);



    /*   useEffect(() => {
          (async () => {
              if (!Object.values(empezarTutorial).includes(false)) {
                  if (canStart && (await verTutorial("t-boleta"))) {
                      start();
                      setTutorialEnCurso(true);
  
                      setTimeout(() => {
                          setBlockScroll(false);
                      }, 1000);
                  } else {
                      setTutorialEnCurso(false);
                      setBlockScroll(false);
                  }
              }
          })();
      }, [canStart, empezarTutorial]); */


    const renderModulos = () => {
        if (modulosQuery.isLoading) return <Texto>CARGANDO MODULOS..</Texto>;
        if (modulosQuery.isError) return <Texto>HUBO UN ERROR MODYLO..</Texto>;

        if (!valueModulo) {
            setvalueModulo(modulosQuery.data.data[0].id);
        }

        if (!empezarTutorial.modulos) {
            setEmpezarTutorial({ ...empezarTutorial, modulos: true });
        }

        return (
            <>
                <DropDownPicker
                    open={openModulo}
                    value={valueModulo}
                    maxHeight={400}
                    // @ts-ignore
                    items={modulosQuery.data.data}
                    setOpen={setOpenModulo}
                    setValue={setvalueModulo}
                    placeholder="Selecciona el modulo"
                    zIndex={1}
                    schema={{
                        label: "nombre",
                        value: "id",
                    }}
                    ArrowDownIconComponent={() => (
                        <Icon
                            size={18}
                            color={isDarkMode ? "#fff" : "#000"}
                            style={{ paddingHorizontal: 5 }}
                            name="angle-down"
                        />
                    )}
                    textStyle={{ color: isDarkMode ? "#fff" : "#000" }}
                    ArrowUpIconComponent={() => (
                        <Icon
                            size={18}
                            color={isDarkMode ? "#fff" : "#000"}
                            style={{ paddingHorizontal: 5 }}
                            name="angle-up"
                        />
                    )}
                    TickIconComponent={() => (
                        <Icon
                            size={18}
                            color={isDarkMode ? "#fff" : "#000"}
                            style={{ paddingHorizontal: 5 }}
                            name="check"
                        />
                    )}
                    style={
                        isDarkMode
                            ? { backgroundColor: COLORS.dark.secondary }
                            : { backgroundColor: "#fff" }
                    }
                    dropDownContainerStyle={
                        isDarkMode && { backgroundColor: COLORS.dark.secondary }
                    }
                />
            </>
        );
    };

    const renderCarreras = () => <SelectCarrera />;

    const renderBoleta = () => (
        <>
            {valueCarrera ? (
                <View ref={boletaRef}>
                    <DetalleBoleta
                        carrera={valueCarrera}
                        empezarTutorial={empezarTutorial}
                        setEmpezarTutorial={setEmpezarTutorial}
                        tutorialEnCurso={tutorialEnCurso}
                    />
                </View>
            ) : (
                <Texto className="mt-5 text-black">
                    POR FAVOR SELECCIONE UNA CARRERA
                </Texto>
            )}
        </>
    );

    const renderHeaderBody = () => (
        <View className="bg-white  dark:bg-primario-dark">
            <Texto
                className="my-4 text-center text-xl font-weight='Bold' uppercase text-black dark:text-white"
                weight="Bold"
            >
                Boleta de proyeccion semestral
            </Texto>

            <TourGuideZone
                tourKey={tourKey}
                style={{ zIndex: 2 }}
                zone={1}
                text="Listado de carreras"
                borderRadius={10}
            >
                <View style={{ zIndex: 1 }}>{renderCarreras()}</View>
            </TourGuideZone>

            <TourGuideZone
                tourKey={tourKey}
                zone={2}
                text="Boleta de proyección de materias"
                borderRadius={10}
            >
                <View style={{ zIndex: -1 }}>{renderBoleta()}</View>
            </TourGuideZone>

            {/*   <TourGuideZone
                tourKey={tourKey}
                zone={3}
                text="Buscador de materias para proyectar"
                borderRadius={10}
            >
                <View style={{ zIndex: 1, paddingVertical: 20 }}>
                    <Busqueda scrollToTop={scrollToTop} />
                </View>
            </TourGuideZone> */}

            <TourGuideZone
                tourKey={tourKey}
                style={{ zIndex: 999 }}
                zone={4}
                text="Listado de los módulos de la oferta semestral"
                borderRadius={10}
            >
                <View style={{ zIndex: 9999 }} className="pb-4">
                    {renderModulos()}
                </View>
            </TourGuideZone>
        </View>
    );

    const renderPlan = () => {
        if (semestresQuery.isLoading) return <Spinner />;
        if (semestresQuery.isError) return <Texto>HUBO UN ERROR..</Texto>;

        /*         if (!empezarTutorial.semestres) {
                    setEmpezarTutorial({ ...empezarTutorial, semestres: true });
                } */
        return (
            <>
                <View style={{ zIndex: 1 }}>{renderHeaderBody()}</View>
                {/*   <FlatList
                    data={semestresQuery.data}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    extraData={valueModulo}
                    renderItem={({ item }) => (
                        <SemestreProyeccionItem semestre={item} modulo={valueModulo} />
                    )}
                /> */}

                {semestresQuery.data.map(item => (
                    <SemestreProyeccionItem semestre={item} modulo={valueModulo} key={item.id} />

                ))}
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

    return (
        <>
            <View className="flex-1 dark:bg-primario-dark">
                {/*   <FlatList
                    data={null}
                    ListHeaderComponent={
                        <View className="bg-white dark:bg-primario-dark flex-1">
                            {renderPlan()}
                        </View>
                    }
                    renderItem={null}
                /> */}

                <ScrollView className="bg-white dark:bg-primario-dark flex-1">
                    {renderPlan()}
                </ScrollView>

                {/*    <View style={{ zIndex: 2, marginTop: -100 }} >
                <TourGuideZone zone={4} text="Aqui puedes seleccionar los distintos modulos de las materias ofertadas" borderRadius={10} shape='circle' >
                    <Texto>HOLA</Texto>
                </TourGuideZone>
            </View> */}

                <TourGuideZoneByPosition
                    tourKey={tourKey}
                    text="Empieza generando tu boleta aqui si aun no la creaste"
                    zone={7}
                    shape={"circle"}
                    isTourGuide
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

            <CustomModal isVisible={modalBoleta}>
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
            </CustomModal>
        </>
    );
};

//-145
function App() {
    const [tutorialEnCurso, setTutorialEnCurso] = useState(false);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => tutorialEnCurso
        );

        return () => backHandler.remove();
    }, [tutorialEnCurso]);

    return (
        <Boleta
            tutorialEnCurso={tutorialEnCurso}
            setTutorialEnCurso={setTutorialEnCurso}
        />
    );
}

export default App;
