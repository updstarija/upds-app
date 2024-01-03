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
        {/*   <MapView provider={PROVIDER_GOOGLE}
                    style={{ width: "100%", height: 500 }} /> */}
        {/* <MapUpds /> */}

        {/* TODO: MEJORAR MAPA */}
        <View className="h-96" renderToHardwareTextureAndroid>
          <WebView
            containerStyle={{ height: 1000 }}
            sharedCookiesEnabled
            style={{ height: 1000 }}
            geolocationEnabled
            scrollEnabled={false}
            source={{
              //uri: "https://www.bing.com/maps?osid=d5de3719-c97b-4576-a73a-f4cda7bd2180&cp=-21.536898~-64.742634&lvl=18.66&pi=0&v=2&sV=2&form=S00027",
              //uri: "https://www.bing.com/maps?osid=fb4bcd15-432f-40ad-93f7-2d4b6585d7bf&cp=-21.535326~-64.741745&lvl=15&pi=0&v=2&sV=2&form=S00027",
              uri: "https://www.openstreetmap.org/#map=19/-21.53687/-64.74195",
            }}
            //source={{ uri: "https://portal.upds.edu.bo/ev-docente/#/ev-est/evaluacion/32255" }}
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
