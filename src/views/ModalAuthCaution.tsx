import { View, Pressable } from "react-native";
import { Link, router } from "expo-router";
import { useAuthContext } from "@/hooks";
import { Spacer } from "@/components";
import { CustomBottomSheetModal, Texto } from "@/ui";
import { Image } from "expo-image";

const ModalAuthCaution = () => {
  const { modalAuthRef } = useAuthContext();

  return (
    <CustomBottomSheetModal
      content={<></>}
      ref={modalAuthRef}
      detached
      bottomInset={50}
      keyboardBehavior="fillParent"
      keyboardBlurBehavior="restore"
      style={{
        marginHorizontal: 24,
      }}
    >
      <View className="px-3 pt-2 pb-5">
        <Spacer />
        <View className="mx-auto">
          <Image
            source={require("~/assets/images/icons/no-auth.png")}
            contentFit="contain"
            style={{
              width: 200,
              height: 200,
            }}
          />
        </View>

        <Texto weight="Bold" className="text-2xl text-center">
          Inicia sesion para continuar
        </Texto>

        <Spacer />

        <Texto className="text-md ">
          Es necesario autenticarse para entrar a esta sección. Si eres
          estudiante, puedes iniciar sesión{" "}
          <Texto
            className="text-primario  "
            style={{
              lineHeight: 25,
            }}
            weight="Bold"
            onPress={() => router.push("/auth/login")}
          >
            aquí
          </Texto>
        </Texto>
      </View>
    </CustomBottomSheetModal>
  );
};
export default ModalAuthCaution;
