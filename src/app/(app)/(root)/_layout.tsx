import { Redirect, Stack } from "expo-router";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { TourGuideProvider } from "rn-tourguide";
import { ProyeccionesProvider } from "@/context/ProyeccionesContext";
import ModalAuthCaution from "@/views/ModalAuthCaution";
import { StatusBar } from "expo-status-bar";
import { useOnboardingStore } from "@/store/useOnboarding.store";
import DevMenuEnviroment from "@/modules/dev/dev-menu-enviroment";
import { useEffect } from "react";
import { rateApp } from "@/modules/store-review/lib/rate-app";
import CONSTANTS from "@/constants/CONSTANTS";
import SpInAppUpdates, {
	NeedsUpdateResponse,
	IAUUpdateKind,
	StartUpdateOptions,
} from "sp-react-native-in-app-updates";
import { Platform } from "react-native";
import { useAppStore } from "@/store/use-app-store";
import { updsApi } from "@/api";

const inAppUpdates = new SpInAppUpdates(
	false, // isDebug
);

const RootLayout = () => {
	const { isViewed } = useOnboardingStore();
	const { setEnabledProjections } = useAppStore();

	if (!isViewed) {
		return <Redirect href={"/welcome"} />;
	}

	const getStatusProjections = async () => {
		const { data } = await updsApi.get<{ status: number; data: boolean }>(
			"/service/proyecciones/status",
		);
		console.log("🚀 ~ getStatusProjections ~ data:", data);

		setEnabledProjections(data?.data ?? false);
	};

	useEffect(() => {
		rateApp();
	}, []);

	useEffect(() => {
		!__DEV__ &&
			inAppUpdates.checkNeedsUpdate().then((result) => {
				if (result.shouldUpdate) {
					let updateOptions: StartUpdateOptions = {};
					if (Platform.OS === "android") {
						updateOptions = {
							updateType: IAUUpdateKind.FLEXIBLE,
						};
					}
					inAppUpdates.startUpdate(updateOptions); // https://github.com/SudoPlz/sp-react-native-in-app-updates/blob/master/src/types.ts#L78
				}
			});
	}, []);

	useEffect(() => {
		getStatusProjections();
	}, []);

	return (
		<>
			<StatusBar style="light" />

			<ProyeccionesProvider>
				<BottomSheetModalProvider>
					<TourGuideProvider>
						<Stack>
							<Stack.Screen
								name="(drawer)"
								options={{
									headerShown: false,
								}}
							/>

							<Stack.Screen
								name="(screens)"
								options={{
									headerShown: false,
								}}
							/>
						</Stack>

						{!CONSTANTS.PROD && <DevMenuEnviroment />}

						<ModalAuthCaution />
					</TourGuideProvider>
				</BottomSheetModalProvider>
			</ProyeccionesProvider>
		</>
	);
};

export default RootLayout;
