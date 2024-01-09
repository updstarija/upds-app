import { View, Image, ScrollView, Pressable } from "react-native";
import { useThemeColor } from "@/hooks";
import { openBrowserAsync } from "expo-web-browser";
import { Texto } from "@/ui";
import MapUpds from "@/views/MapUpds";
import WebView from "react-native-webview";

const Ubicacion = () => {
  const isDark = useThemeColor() === "dark";
  return (
    <ScrollView className="bg-white dark:bg-primario-dark flex-1">
      <View className="max-w-2xl mx-auto w-full">
        <View className="items-center">
          {isDark ? (
            <Image
              source={require(`~/assets/images/app/logo-dark.png`)}
              style={{ width: 200, height: 300 }}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={require(`~/assets/images/app/logo-light.png`)}
              style={{ width: 200, height: 300 }}
              resizeMode="contain"
            />
          )}
        </View>

        <Texto
          className="text-center p-4 text-2xl dark:text-white"
          weight="Bold"
        >
          NUESTRA UBICACIÓN
        </Texto>

        <View className="h-96" renderToHardwareTextureAndroid>
          <WebView
            containerStyle={{ height: 1000 }}
            sharedCookiesEnabled
            style={{ height: 1000 }}
            nestedScrollEnabled
            source={{
              uri: "https://wonderful-conkies-235880.netlify.app/",
            }}
            javaScriptEnabled
          />
        </View>

        <View className="flex-1 px-2">
          <View className="mb-5 mt-10">
            <CardUbicacion
              title="VISIÓN"
              content="Generar cambios en las personas para desarrollar emprendedores socialmente responsables capaces de responder a desafíos emergentes."
            />
          </View>

          <CardUbicacion
            title="MISIÓN"
            content="Ser la red de educación universitaria referente a nivel nacional por su formación académica de excelencia basada en la investigación científica y su compromiso con la Internacionalización."
          />

          <View className="items-center">
            <Pressable
              onPress={async () =>
                await openBrowserAsync(
                  "https://www.360virtualbo.com/tour/educacion/updstarija"
                )
              }
            >
              <Image
                source={require(`~/assets/images/pages/tour.png`)}
                style={{ width: 200, height: 300 }}
                resizeMode="contain"
              />
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Ubicacion;

interface PropCard {
  title: string;
  content: string;
  classNameCard?: string;
}
const CardUbicacion: React.FC<PropCard> = ({
  content,
  title,
  classNameCard,
}) => {
  return (
    <View
      className={`p-4 bg-primario dark:bg-secondary-dark rounded-2xl ${classNameCard}`}
    >
      <Texto className="text-center mb-2 text-2xl text-white" weight="Bold">
        {title}
      </Texto>
      <Texto className="text-lg text-white">{content}</Texto>
    </View>
  );
};
