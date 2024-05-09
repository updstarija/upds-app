import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, TextField } from "@/components";
import Checkbox from "expo-checkbox";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/hooks";
import { useForm } from "react-hook-form";
import { IFormLogin } from "@/types";
import { router } from "expo-router";
import { COLORS } from "~/constants";
import { Texto } from "@/ui";

const FormAuth = () => {
  const { control, handleSubmit, setValue } = useForm<IFormLogin>({
    mode: "onChange",
  });
  const [recordar, setRecordar] = useState(false);

  const onSubmit = async (data: IFormLogin) => {
    if (recordar) {
      await AsyncStorage.setItem("email-user", data.usuario);
      await AsyncStorage.setItem("contrasena-user", data.contraseña);
    }

    //   const user = await login(data);
    /*    if (user) {
    //  loginContext(user);
      navigateToHome();
    } */
  };

  const navigateToHome = () => {
    router.replace("/");
    //@ts-ignore
    //navigation.navigate("(drawer)");
  };

  const omitir = async () => {
    // setMostrarBtnBackLogin(false);
    await AsyncStorage.setItem("bienvenida", "true");
    navigateToHome();
  };

  const omitirLogin = () => {
    Alert.alert(
      "Aviso",
      "Al omitir la autenticación no tendras acceso a varias funcionalidades. Si eres estudiante de la UPDS inicia sesion por favor.",
      [
        { text: "Ok", onPress: omitir, style: "destructive" },
        { text: "Cancelar" },
      ],
      { cancelable: false }
    );
  };

  const forgetPasswordMessage = () => {
    Alert.alert(
      "Informacion",
      "Para acceder, utiliza tu correo académico como nombre de usuario y tu documento de identidad como contraseña",
      [],
      { cancelable: true }
    );
  };

  useEffect(() => {
    (async () => {
      const email = await AsyncStorage.getItem("email-user");
      const contrasena = await AsyncStorage.getItem("contrasena-user");
      if (email) {
        setValue("usuario", email);
        setRecordar(true);
      }

      if (contrasena) {
        setValue("contraseña", contrasena);
        setRecordar(true);
      }
    })();
  }, []);

  return (
    <View>
      <TextField
        control={control}
        label="Correo académico"
        name="usuario"
        placeholder="email@upds.net.bo"
        placeholderTextColor={"#ccc"}
        rules={{ required: "El usuario es requerido" }}
      />
      <TextField
        control={control}
        label="Documento de Identidad"
        name="contraseña"
        placeholder="********"
        placeholderTextColor={"#ccc"}
        rules={{ required: "La contraseña es requerida" }}
        secureTextEntry
      />

      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Checkbox
            value={recordar}
            className="mr-1"
            onValueChange={() => setRecordar(!recordar)}
            color={COLORS.light.background}
          />

          <Texto className="text-black dark:text-white">Recordarme</Texto>
        </View>

        <TouchableOpacity
          className="p-2"
          onPress={() => forgetPasswordMessage()}
        >
          <Texto className="text-black dark:text-white">
            Olvidaste tus credenciales?
          </Texto>
        </TouchableOpacity>
      </View>

      <Button
        classNameBtn="mt-5 rounded-xl bg-primario py-3  h-13"
        onPress={handleSubmit(onSubmit)}
        //  disabled={isLoading}
        showLoader
      >
        <Texto className="text-center text-xl text-white ">
          INICIAR SESION
        </Texto>
      </Button>
    </View>
  );
};

export default FormAuth;
