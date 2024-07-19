import { useState, useEffect } from "react";
import { View, Alert, TouchableOpacity } from "react-native";
import {
	useAuth,
	useBoleta,
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
import { FloatingAction, IActionProps } from "react-native-floating-action";
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
import { CustomModal, Texto } from "@/ui";
import { BackHandler } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { AlertCard, Button, Spacer } from "@/components";
import { verTutorial } from "@/helpers";
import AlertsProyecciones from "@/views/proyecciones/AlertsProyecciones";
import { useCareerStore } from "@/store/useCareers";

const actionsFloatButton: IActionProps[] = [
	{
		text: "Enviar como PDF",
		name: "pdf",
		icon: <FontAwesome name="file-pdf-o" color="#fff" size={20} />,
	},
	{
		text: "Imprimir Boleta",
		name: "imprimir",
		icon: <MaterialCommunityIcons name="printer" color="#fff" size={20} />,
	},
	{
		text: "Nueva Boleta",
		name: "nueva_boleta",
		icon: <MaterialCommunityIcons name="plus" color="#fff" size={20} />,
	},
];

const Boleta = () => {
	const { user } = useAuth();
	const {
		tutorialBoletaReady,
		setTutorialBoletaReady,
		tutorialEnCurso,
		setTutorialEnCurso,
		listref,
	} = useProyeccionesContext();
	const { canStart, start, tourKey, eventEmitter } =
		useTourGuideController("t-boleta");
	const isDark = useThemeColor() === "dark";

	const [showAlerts, setShowAlerts] = useState(true);

	const { selectedCareer, careers } = useCareerStore();

	const [modalBoleta, setModalBoleta] = useState(false);

	const [valueModulo, setvalueModulo] = useState<number>(0);

	const { carrerasQuery } = useCarreras();
	const { semestresQuery } = useSemestres({
		carrera: selectedCareer,
		proyeccion: true,
	});
	const { modulosQuery } = useModulos();
	const { onNewBoleta, boletaQuery } = useBoleta({
		carrera: selectedCareer,
	});

	const toggleShowAlert = () => {
		setShowAlerts(!showAlerts);
	};
	const handleBackButtonPress = () => {
		return tutorialEnCurso.inCourse;
	};

	const handleOnStop = () => {
		console.log("STOP");
		setTutorialEnCurso((prev) => ({ ...prev, inCourse: false }));
		return;
	};

	const handleOnStepChange = (step: any) => {
		console.log("STEP CHANGE");
		if (step?.order) {
			setTutorialEnCurso((prev) => ({ ...prev, step: step.order }));
		}
		return;
	};

	const renderHeaderBody = () => (
		<View className="bg-white  dark:bg-primario-dark">
			<View className="flex-row justify-between">
				<TouchableOpacity
					onPress={toggleShowAlert}
					className="flex-row items-center gap-1 pt-2 pr-2"
				>
					<MaterialCommunityIcons
						name="comment-eye-outline"
						color={isDark ? "#FFF" : "#000"}
					/>
					<Texto weight="Bold">
						{!showAlerts ? "Ocultar Alertas" : "Mostrar Alertas"}
					</Texto>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={iniciarTutotial}
					className="flex-row items-center gap-1 pt-2 pr-2"
				>
					<FontAwesome name="book" color={isDark ? "#FFF" : "#000"} />
					<Texto weight="Bold">Guia</Texto>
				</TouchableOpacity>
			</View>
			<Spacer />
			{!showAlerts && <AlertsProyecciones />}

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
				{selectedCareer ? (
					<DetalleBoleta
						carrera={selectedCareer}
						tutorial={tutorialEnCurso.inCourse ? tutorialEnCurso : undefined}
					/>
				) : (
					<Texto className="mt-5 text-black">
						POR FAVOR SELECCIONE UNA CARRERA
					</Texto>
				)}
			</TourGuideZone>
			<Spacer />
			<Busqueda tutorial={tutorialEnCurso} />
			<Spacer />
			<TourGuideZone
				tourKey={tourKey}
				style={{ zIndex: 999999 }}
				zone={8}
				text="Listado de los módulos de la oferta semestral"
			>
				<SelectModulos
					valueModulo={valueModulo}
					setvalueModulo={setvalueModulo}
					tutorial={tutorialEnCurso}
				/>
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
					ref={listref}
					scrollEnabled={!tutorialEnCurso.inCourse}
					estimatedItemSize={100}
					data={semestresQuery.data}
					keyExtractor={(item) => item.id.toString()}
					showsVerticalScrollIndicator={false}
					// contentContainerStyle={{ zIndex: -1 }}
					ListHeaderComponentStyle={{ zIndex: 999 }}
					ListHeaderComponent={
						<>
							{renderHeaderBody()}

							<SemestreProyeccionItem
								semestre={{
									id: -1,
									nombre: "ELECTIVAS",
								}}
								modulo={valueModulo}
							/>
						</>
					}
					ItemSeparatorComponent={() => (
						<View className="border-[.5px] border-primario-dark " />
					)}
					extraData={[valueModulo, tutorialEnCurso]}
					renderItem={({ item, index }) => {
						if (index === 0) {
							return (
								<TourGuideZone
									tourKey={tourKey}
									style={{ zIndex: 999999 }}
									zone={11}
									tooltipBottomOffset={250}
									text="Comienza explorando las materias de un semestre específico."
								>
									<SemestreProyeccionItem
										semestre={item}
										modulo={valueModulo}
										tutorial={tutorialEnCurso}
									/>
								</TourGuideZone>
							);
						}

						return (
							<SemestreProyeccionItem semestre={item} modulo={valueModulo} />
						);
					}}
				/>
			</>
		);
	};

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
							user.nombre +
								" " +
								user.apellidoPaterno +
								" " +
								user.apellidoMaterno,
							user.documentoIdentidad,
							careers.find((x) => x.id === selectedCareer)?.nombre || "",
						)}
            ${templateBoletaV3.generateBody(
							modulosQuery.data?.data || [],
							boletaQuery.data?.data || [],
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
					user.nombre + " " + user.apellidoPaterno + " " + user.apellidoMaterno,
					user.documentoIdentidad,
					careers.find((x) => x.id === selectedCareer)?.nombre || "",
				)}
        ${templateBoletaV3.generateBody(
					modulosQuery.data?.data || [],
					boletaQuery.data?.data || [],
				)}
        ${templateBoletaV3.generateFooter()}
        `,
		});
		await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
	};

	const handleNewBoleta = async () => {
		await onNewBoleta(() => {
			toggleModalBoleta(false);
		});
	};

	const toggleModalBoleta = (open?: boolean) => {
		if (open === undefined) {
			setModalBoleta(!modalBoleta);
			return;
		}

		setModalBoleta(open);
	};

	const actionsEvents: { [key: string]: Function } = {
		pdf: printToFile,
		imprimir: print,
		nueva_boleta: toggleModalBoleta,
	};

	const iniciarTutotial = () => {
		if (canStart) {
			setTutorialEnCurso({ ...tutorialEnCurso, inCourse: true });
			listref.current?.scrollToOffset({ animated: true, offset: 0 });
			setShowAlerts(true);
			setTimeout(() => {
				start();
			}, 1000);
		}
		console.log(canStart);
	};

	useEffect(() => {
		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			handleBackButtonPress,
		);

		return () => backHandler.remove();
	}, [tutorialEnCurso.inCourse]);

	useEffect(() => {
		if (eventEmitter) {
			eventEmitter.on("stop", handleOnStop);
			eventEmitter.on("stepChange", handleOnStepChange);

			return () => {
				eventEmitter.off("stop", handleOnStop);
				eventEmitter.off("stepChange", handleOnStepChange);
			};
		}
	}, [canStart]);

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
				const activarTutorial = await verTutorial(tourKey);

				if (!activarTutorial) {
					setTutorialEnCurso({ ...tutorialEnCurso, inCourse: false });
					return;
				}
				if (canStart && activarTutorial) {
					setTutorialEnCurso({ ...tutorialEnCurso, inCourse: true });
					listref.current?.scrollToOffset({ animated: true, offset: 0 });
					setShowAlerts(true);

					setTimeout(() => {
						start();
					}, 1500);
				}
			}
		})();
	}, [canStart, tutorialBoletaReady]);

	if (carrerasQuery.isLoading) return <Spinner />;
	if (carrerasQuery.isError) return <Texto>Hubo un error....</Texto>;

	return (
		<View className="flex-1">
			<View className="flex-1 dark:bg-primario-dark">
				{renderPlan()}

				<TourGuideZoneByPosition
					tourKey={tourKey}
					text="Crea, imprime o exporta tu boleta de proyección aquí."
					zone={10}
					shape={"circle"}
					isTourGuide={tutorialEnCurso.step > 3}
					bottom={43}
					right={43}
					width={50}
					height={50}
				/>

				<FloatingAction
					visible={
						!tutorialEnCurso.inCourse ||
						[2, 3, 4, 5, 6, 7, 8, 9, 10].includes(tutorialEnCurso?.step)
					}
					overlayColor="#0000006a"
					actions={actionsFloatButton}
					distanceToEdge={{ horizontal: 40, vertical: 40 }}
					onPressItem={(name) => {
						if (!name) return;

						if (Object.keys(actionsEvents).includes(name)) {
							actionsEvents[name]();
						}
					}}
				/>
			</View>

			<CustomModal
				isVisible={modalBoleta}
				onBackdropPress={() => toggleModalBoleta(false)}
			>
				<View className="bg-white dark:bg-secondary-dark p-4 rounded-2xl">
					<Texto
						className="text-lg text-center text-black dark:text-white"
						weight="Bold"
					>
						NUEVA BOLETA
					</Texto>
					<View className="border border-gray-100 mt-2 mb-3" />
					<Texto weight="Bold" className="mb-1">
						Nombres:
					</Texto>
					<Texto>
						{user.nombre} {user.apellidoPaterno} {user.apellidoMaterno}
					</Texto>

					<Texto className="mt-2  text-black dark:text-white" weight="Bold">
						Carrera:{" "}
					</Texto>
					<View className="mt-1 z-10">
						<SelectCarrera />
					</View>

					<View className="flex-row justify-between mt-4">
						<Button
							onPress={toggleModalBoleta}
							classNameBtn="bg-gray-400 dark:bg-primario-dark p-2 rounded-lg"
						>
							<Texto className="text-white">CERRAR</Texto>
						</Button>
						<Button
							onPress={handleNewBoleta}
							classNameBtn="bg-primario p-2 rounded-lg"
						>
							<Texto className="text-white">CREAR BOLETA</Texto>
						</Button>
					</View>
				</View>
			</CustomModal>
		</View>
	);
};

export default Boleta;
