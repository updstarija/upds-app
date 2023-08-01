import { useState, useRef, useEffect } from "react";
import { View, FlatList, Dimensions, TouchableOpacity, Platform, Alert } from "react-native";
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
import { Busqueda, DetalleBoleta, DetalleMateriasSemestre } from "@/views/proyecciones";
import { Texto, Button } from "../../../components";
import Modal from "react-native-modal";
import Icon from "@expo/vector-icons/FontAwesome";
import { COLORS } from "~/constants";
import { FloatingAction } from "react-native-floating-action";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { printAsync, printToFileAsync } from "expo-print";
import { shareAsync } from 'expo-sharing';
import { templateBoleta, templateBoletaV3 } from '@/data/';
import CONSTANS from 'expo-constants'
/////////
import {
    TourGuideProvider, // Main provider
    TourGuideZone, // Main wrapper of highlight component
    TourGuideZoneByPosition, // Component to use mask on overlay (ie, position absolute)
    useTourGuideController, // hook to start, etc.
} from 'rn-tourguide'
import Spinner from "@/components/ui/Spinner";
import { useAuth } from '../../../hooks/useAuth';

const Boleta = () => {
    const isDarkMode = useThemeColor() === "dark";
    const flatListRef = useRef<FlatList | null>(null);
    const boletaRef = useRef<View | null>(null);


    const [modalBoleta, setModalBoleta] = useState(false)
    const { userAuth } = useAuthContext()

    const [empezarTutorial, setEmpezarTutorial] = useState({
        carreras: false,
        boleta: false,
        semestres: false,
        modulos: false,
    })

    const {
        canStart, // a boolean indicate if you can start tour guide
        start, // a function to start the tourguide
        stop, // a function  to stopping it
        eventEmitter, // an object for listening some events
    } = useTourGuideController()


    const {
        carrerasQuery: carreras,
        valueCarrera,
        setValueCarrera,
    } = useCarreraContext();

    const [semestreOpen, setSemestreOpen] = useState(-1);

    const onChangeSemestre = (val: number) => {
        if (val === semestreOpen) {
            setSemestreOpen(-1);
            return;
        }
        setSemestreOpen(val);
    };

    const [openCarrera, setOpenCarrera] = useState(false);
    const [openModulo, setOpenModulo] = useState(false);
    const [valueModulo, setvalueModulo] = useState<number | null>(null);

    const { carrerasQuery } = useCarreras();
    const { semestresQuery } = useSemestres({ carrera: valueCarrera || -1, proyeccion: true });
    const { modulosQuery } = useModulos();
    const { boletaCreateMutation, boletaQuery } = useBoleta({ carrera: valueCarrera || -1 });


    if (carrerasQuery.isLoading) return <Spinner />
    if (carrerasQuery.isError) return <Texto>Hubo un error....</Texto>;


    useEffect(() => {
        if (!empezarTutorial.carreras) {
            setEmpezarTutorial({ ...empezarTutorial, carreras: true })
        }
    }, [empezarTutorial.carreras])


    useEffect(() => {
        if (canStart && !Object.values(empezarTutorial).includes(false)) {
            start()
            // console.log(Object.values(empezarTutorial), 'INICAR GOOO')
        } else {
            // console.log('faltan cargar componetnes', empezarTutorial)
        }
    }, [canStart, empezarTutorial]) // 👈 don't miss it!



    const scrollToTop = () => {
        flatListRef?.current?.scrollToOffset({ animated: true, offset: 0 });
    };

    const renderModulos = () => {
        if (modulosQuery.isLoading) return <Texto>CARGANDO MODULOS..</Texto>;
        if (modulosQuery.isError) return <Texto>HUBO UN ERROR MODYLO..</Texto>;

        if (!valueModulo) {
            setvalueModulo(modulosQuery.data.data[0].id);
        }

        if (!empezarTutorial.modulos) {
            setEmpezarTutorial({ ...empezarTutorial, modulos: true })
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

    const renderCarreras = () => (
        <DropDownPicker
            open={openCarrera}
            value={valueCarrera}
            // @ts-ignore
            items={carreras.data}
            setOpen={setOpenCarrera}
            setValue={setValueCarrera}
            placeholder="Selecciona la carrera"
            zIndex={1}
            ArrowDownIconComponent={() => (
                <Icon
                    size={18}
                    color={isDarkMode ? "#fff" : "#000"}
                    style={{ paddingHorizontal: 5 }}
                    name="angle-down"
                />
            )}
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
            schema={{
                label: "nombre",
                value: "id",
            }}
            textStyle={{ color: isDarkMode ? "#fff" : "#000" }}
            style={
                isDarkMode
                    ? { backgroundColor: COLORS.dark.secondary }
                    : { backgroundColor: "#fff" }
            }
            dropDownContainerStyle={
                isDarkMode && { backgroundColor: COLORS.dark.secondary }
            }
        />
    );

    const renderBoleta = () => (
        <>
            {valueCarrera ? (
                <View ref={boletaRef}>
                    <DetalleBoleta carrera={valueCarrera} empezarTutorial={empezarTutorial} setEmpezarTutorial={setEmpezarTutorial} />
                </View>
            ) : (
                <Texto className="mt-5 text-black">
                    POR FAVOR SELECCIONE UNA CARRERA
                </Texto>
            )}
        </>
    );

    const renderHeaderBody = () => (
        <View className="bg-white p-2 dark:bg-primario-dark">
            <Texto className="my-4 text-center text-xl font-weight='Bold' uppercase text-black dark:text-white" weight="Bold">
                Boleta de proyeccion semestral
            </Texto>

            <TourGuideZone style={{ zIndex: 2 }} zone={1} text="Aqui se listaran las  tu carrera" borderRadius={10} >
                <View style={{ zIndex: 1 }}>{renderCarreras()}</View>
            </TourGuideZone>

            <TourGuideZone zone={2} text="Aqui encontraras tu boleta de proyeccion" borderRadius={10} >
                <View style={{ zIndex: -1 }}>{renderBoleta()}</View>
            </TourGuideZone>

            <View style={{ zIndex: 1, marginBottom: 15 }}>
                <Busqueda scrollToTop={scrollToTop} />
            </View>


            <TourGuideZone style={{ zIndex: 999 }} zone={3} text="Aqui puedes seleccionar los distintos modulos de las materias ofertadas" borderRadius={10} >
                <View style={{ zIndex: 9999 }}>
                    {/* <View style={{zIndex: 1, position: 'absolute'}}>{renderModulos()}</View> */}
                    {renderModulos()}
                </View>
            </TourGuideZone>

        </View>
    );

    const renderPlan = () => {
        if (semestresQuery.isLoading) return <Texto>CARGANDO PLAN..</Texto>;
        if (semestresQuery.isError) return <Texto>HUBO UN ERROR..</Texto>;

        if (!empezarTutorial.semestres) {
            setEmpezarTutorial({ ...empezarTutorial, semestres: true })
        }
        return (
            <>
                <FlatList
                    data={null}
                    ref={flatListRef}
                    ListHeaderComponent={
                        <>
                            <View style={{ zIndex: 1 }}>{renderHeaderBody()}</View>
                            <FlatList
                                data={semestresQuery.data}
                                showsVerticalScrollIndicator={false}
                                renderItem={(item) => (
                                    <DetalleMateriasSemestre
                                        semestre={item.item}
                                        modulo={valueModulo || 0}
                                        active={item.item.id === semestreOpen}
                                        onChangeSemestre={onChangeSemestre}
                                        scrollToTop={scrollToTop}
                                    />
                                )}
                            />
                        </>
                    }
                    renderItem={null}
                />
            </>
        );
    };

    const actions = [
        {
            text: "Enviar como PDF",
            name: "pdf",
            icon: <FontAwesome name="file-pdf-o" color="#fff" size={20} />,
            position: 2
        },
        {
            text: "Imprimir Boleta",
            name: "imprimir",
            icon: <MaterialCommunityIcons name="printer" color="#fff" size={20} />,
            position: 3
        },
        {
            text: "Nueva Boleta",
            name: "nueva_boleta",
            icon: <MaterialCommunityIcons name="plus" color="#fff" size={20} />,
            position: 4
        }
    ];

    const boletaValida = () => {
        if (boletaQuery.data && boletaQuery.data.data.length > 0) {

            console.log(boletaQuery.data.data)
            return true
        }

        Alert.alert("Error", "Agrega al menos una materia a la boleta.")
        return false
    }

    const print = async () => {
        if (!boletaValida()) return

        try {
            await printAsync({
                html: `
            ${templateBoletaV3.generateHeader()}
            ${templateBoletaV3.generateDatosHeader(userAuth.usuario.nombre + " " + userAuth.usuario.apellidoPaterno + " " + userAuth.usuario.apellidoMaterno, userAuth.usuario.documentoIdentidad, carrerasQuery.data.find((x) => x.id === valueCarrera)?.nombre || "")}
            ${templateBoletaV3.generateBody(modulosQuery.data?.data || [], boletaQuery.data?.data || [])}
            ${templateBoletaV3.generateFooter()}
            `,
                orientation: "landscape"
            });
        } catch (error) {
            console.log("IMPRESION CANCELADA")
        }
    };

    const printToFile = async () => {
        if (!boletaValida()) return
        const { uri } = await printToFileAsync({
            html: `
        ${templateBoletaV3.generateHeader()}
        ${templateBoletaV3.generateDatosHeader(userAuth.usuario.nombre + " " + userAuth.usuario.apellidoPaterno + " " + userAuth.usuario.apellidoMaterno, userAuth.usuario.documentoIdentidad, carrerasQuery.data.find((x) => x.id === valueCarrera)?.nombre || "")}
        ${templateBoletaV3.generateBody(modulosQuery.data?.data || [], boletaQuery.data?.data || [])}
        ${templateBoletaV3.generateFooter()}
        ` });
        await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    };

    const generateBoleta = () => {


    }


    const onNewBoleta = async () => {
        Alert.alert("ALERTA", "Estas seguro de generar una nueva boleta de proyeccion?.\nSe eliminara la boleta actual.",
            [
                {
                    text: "No",
                    style: "destructive",

                },
                {
                    text: "si",
                    onPress: async () => {
                        await boletaCreateMutation.mutateAsync(valueCarrera || -1);
                        setModalBoleta(!modalBoleta)
                    },

                }
                ,
            ], { cancelable: false })



        //await boletaCreateMutation.mutateAsync(valueCarrera || -1);
    };

    return (
        <>
            <View className="flex-1 bg-red-400">
                <View className="bg-white dark:bg-primario-dark flex-1">
                    {renderPlan()}
                </View>

                {/*    <View style={{ zIndex: 2, marginTop: -100 }} >
                <TourGuideZone zone={4} text="Aqui puedes seleccionar los distintos modulos de las materias ofertadas" borderRadius={10} shape='circle' >
                    <Texto>HOLA</Texto>
                </TourGuideZone>
            </View> */}

                <TourGuideZoneByPosition
                    text="Empieza generando tu boleta aqui si aun no la creaste"
                    zone={7}
                    shape={'circle'}
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
                    onPressItem={name => {
                        if (name === "pdf") {
                            printToFile()
                        } else if (name === 'imprimir') {
                            print()
                        } else if (name === "nueva_boleta") {
                            setModalBoleta(!modalBoleta)
                        }
                    }}
                />

                {/* <View style={{ position: "absolute", bottom: 40, right: 40 }}>
                <Texto>H</Texto>
            </View> */}
            </View>

            <Modal isVisible={modalBoleta}>
                <View className="bg-white dark:bg-secondary-dark p-4 rounded-2xl">
                    <Texto className="text-lg text-center text-black dark:text-white" weight="Bold">NUEVA BOLETA</Texto>
                    <View className="border border-gray-100 my-2" />
                    <Texto weight="Bold">Nombres:</Texto>
                    <Texto>{userAuth.usuario.nombre} {userAuth.usuario.apellidoPaterno} {userAuth.usuario.apellidoMaterno}</Texto>

                    <Texto className="mt-2  text-black dark:text-white" weight="Bold">Carrera: </Texto>
                    <View className="mt-1 z-10">
                        {renderCarreras()}
                    </View>

                    <View className="flex-row justify-between mt-4">
                        <Button onPress={() => setModalBoleta(!modalBoleta)} classNameBtn="bg-gray-400 dark:bg-primario-dark p-2 rounded-lg">
                            <Texto className="text-white">CERRAR</Texto>
                        </Button>
                        <Button onPress={() => onNewBoleta()} classNameBtn="bg-primario p-2 rounded-lg">
                            <Texto className="text-white">CREAR BOLETA</Texto>
                        </Button>
                    </View>
                </View>
            </Modal>
        </>
    );
};

const ProtectedScreen = () => {
    const [visibleModal, setVisibleModal] = useState(false);
    const { height } = Dimensions.get("window");

    const { valueCarrera } = useCarreraContext();
    const { boletaCreateMutation } = useBoleta({ carrera: valueCarrera || -1 });

    const toggleModal = () => setVisibleModal(!visibleModal);

    const onNewBoleta = async () => {
        await boletaCreateMutation.mutateAsync(valueCarrera || -1);
    };

    return (
        <>
            {/* @ts-ignore */}

            <Boleta />

            <Modal isVisible={visibleModal} deviceHeight={height + 50}>
                <View className="rounded-lg bg-white p-4 dark:bg-primario-dark">
                    <Texto weight="Bold" className="mb-3 text-center text-xl text-black">
                        DETALLES PARA CREACION DE BOLETA
                    </Texto>

                    <View className="mb-3 flex-row justify-between">
                        <Texto weight="Bold" className="text-black dark:text-white">
                            Estudiante:
                        </Texto>
                        <Texto className="text-black dark:text-white">xxxxxxxxxxxx</Texto>
                    </View>

                    <View className="mb-3 flex-row justify-between">
                        <Texto weight="Bold" className="text-black dark:text-white">
                            Carrera:
                        </Texto>
                        <Texto className="text-black dark:text-white">xxxxxxxxxxxx</Texto>
                    </View>

                    <View>
                        <Button
                            onPress={toggleModal}
                            classNameBtn="bg-primario p-2 rounded"
                        >
                            <Texto className="text-center">Generar Boleta</Texto>
                        </Button>
                    </View>
                </View>
            </Modal>

            <View className="absolute bottom-0 right-0">
                {/* <FloatingButton onNew={onNewBoleta} onPrint={() => { }} /> */}
            </View>
        </>
    );
};

//-145
function App() {
    const isIos = Platform.OS === "ios";



    return (
        <TourGuideProvider {...{ borderRadius: 16 }} backdropColor="#000000b3" verticalOffset={isIos ? -100 - CONSTANS.statusBarHeight + 10 : -100} preventOutsideInteraction tooltipComponent={(x) => (
            <View className="bg-primario dark:bg-secondary-dark p-2 rounded-xl w-72">
                <Texto className="text-white mb-4 text-center mt-2"> {x.currentStep.text}</Texto>

                <View className="flex-row gap-4 justify-evenly">
                    {!x.isLastStep && <TouchableOpacity onPress={x.handleStop}>
                        <Texto className="text-white">Saltar</Texto>
                    </TouchableOpacity>}

                    {!x.isFirstStep && <TouchableOpacity onPress={x.handlePrev}>
                        <Texto className="text-white">Anterior</Texto>
                    </TouchableOpacity>}

                    {!x.isLastStep ? <TouchableOpacity onPress={x.handleNext}>
                        <Texto className="text-white">Siguiente</Texto>
                    </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={x.handleStop}>
                            <Texto className="text-white">Terminar</Texto>
                        </TouchableOpacity>}
                </View>

            </View>)}>
            <Boleta />


        </TourGuideProvider>
    )
}

export default App;
