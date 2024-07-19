import { updsApi } from "@/api";
import { useAuth } from "@/hooks";
import { Texto } from "@/ui";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const OAuthScreen = () => {
	const params = useLocalSearchParams<{ token: string }>();
	const { signInOffice365 } = useAuth();

	const { token = "" } = params;

	const getSession = async () => {
		try {
			await signInOffice365.mutateAsync(token);
		} catch (error) {
			router.replace("/auth/login");
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		getSession();
	}, []);

	if (!params.token) return <Redirect href={"/auth/login"} />;

	return (
		<>
			<StatusBar style="light" />
			<View className="bg-primario flex-1 items-center justify-center">
				<ActivityIndicator color="#fff" size={80} />
			</View>
		</>
	);
};

export default OAuthScreen;
