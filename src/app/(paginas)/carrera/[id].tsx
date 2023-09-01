import { View, Text, BackHandler, useColorScheme, Dimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { WebView, WebViewNavigation } from "react-native-webview";
import Spinner from "@/components/ui/Spinner";
import { Texto } from "../../../components";
import { Redirect, useLocalSearchParams } from "expo-router";

const EvaluacionDocente = () => {
    const params = useLocalSearchParams<any>()

    if (!params.id) return <Redirect href={"/moodle"} />
    const { id } = params

    return (
        <View className="bg-white dark:bg-primario-dark flex-1 items-center justify-center">
            <Texto className="text-black dark:text-white text-4xl text-center" weight="Bold">MI CARRERA: {id}</Texto>
        </View>
    );
};

export default EvaluacionDocente;
