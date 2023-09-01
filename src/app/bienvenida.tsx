import { useState, useRef } from 'react'
import { CommonActions, useNavigation } from '@react-navigation/native';
import { Image, TouchableOpacity, View, FlatList, Dimensions, StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useThemeColor } from '@/hooks';
import { COLORS } from '~/constants';


const sliders = [
  {
    title: true,
    image: require("~/assets/images/pages/bienvenida.png"),
    text: "Descubre, aprende y conecta con nosotros."
  },
  {
    title: false,
    image: require("~/assets/images/pages/bienvenida.png"),
    text: "Realiza tu proyeccion de materias."
  },
  {
    title: false,
    image: require("~/assets/images/pages/bienvenida.png"),
    text: " Consulta tu registro academico."
  },
  {
    title: false,
    image: require("~/assets/images/pages/bienvenida.png"),
    text: "Chatea con Nosotros.\nRecibe notificaciones sobre nuestros eventos o comunicados"
  },
]

const BienvenidaScreen = () => {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window")

  const [sliderActual, setCurrentSlideIndex] = useState(0);
  const isDarkMode = useThemeColor() === "dark"

  const ref = useRef<any>();

  const updateCurrentSlideIndex = (e: any) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const IrSiguienteSlide = () => {
    const nextSlideIndex = sliderActual + 1;
    if (nextSlideIndex != sliders.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(sliderActual + 1);
    }
  };

  const saltarSlider = () => {
    const lastSlideIndex = sliders.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({ offset });
    setCurrentSlideIndex(lastSlideIndex);
  };

  const navigateToLogin = async () => {
    router.replace("auth/login")

    await AsyncStorage.setItem('bienvenida', 'true')
  }

  const Footer = () => {
    return (
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View
          style={{
            height: height * 0.25,
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}>
          <View className='flex-row justify-center mt-5'>
            {sliders.map((_, index) => (
              <View
                key={index}
                className={`h-[5] bg-[#0D1F46] w-3 rounded mx-[1.5] ${sliderActual === index ? 'w-5 bg-white dark:bg-[#223B82]' : ""}`}
              />
            ))}
          </View>

          <View style={{ marginBottom: 20 }}>
            {sliderActual == sliders.length - 1 ? (
              <View style={{ height: 50 }}>
                <TouchableOpacity
                  onPress={navigateToLogin}
                  className="py-3 bg-white dark:bg-[#0D1F46]  rounded">
                  <Text className="text-xl font-bold text-center text-[#223B82] dark:text-white">Comenzar</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View className='flex-row gap-5'>
                <TouchableOpacity
                  activeOpacity={0.8}
                  className='flex-1 h-[50] items-center justify-center rounded border border-white  dark:border-[#0D1F46]'
                  onPress={saltarSlider}>
                  <Text className='font-bold text-white'>
                    SALTAR
                  </Text>
                </TouchableOpacity>


                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={IrSiguienteSlide}
                  className='flex-1 h-[50] items-center justify-center bg-white dark:bg-[#0D1F46]  rounded'>
                  <Text className='font-bold text-[#223B82] dark:text-white '>
                    SIGUIENTE
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    );
  };

  return (

    <>
      <StatusBar
        backgroundColor={
          isDarkMode ? COLORS.dark.secondary : COLORS.light.background
        }
        style="light"
      />

      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View className="flex-1  bg-[#223B82] dark:bg-[#040e22] " >
          <FlatList
            ref={ref}
            data={sliders}
            horizontal
            onMomentumScrollEnd={updateCurrentSlideIndex}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Slide {...item} key={item.text} />
            )} />

          <Footer />
        </View>
      </ScrollView>
    </>
  )
}


interface Props {
  title: boolean
  image: any
  text: string
}
const Slide: React.FC<Props> = ({ title, image, text }) => {
  const { width } = Dimensions.get("window")

  return (
    <View className=' flex-1 items-center justify-center px-4' style={{ width }}>
      {title && (
        <View>
          <Text
            className="text-white font-bold text-xl text-center uppercase">
            Bienvenido a la app de la
          </Text>
          <Text className=' text-white font-bold text-3xl text-center uppercase'>¡UPDS Sede Tarija!</Text>
        </View>
      )}

      <View className="flex-column items-center mt-10">
        <Image source={image}
          style={{ height: 300, resizeMode: "contain" }} />
        <Text className='text-lg text-white dark:text-white text-center'>{text}</Text>
      </View>
    </View>
  )
}

export default BienvenidaScreen