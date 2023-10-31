import { ScrollView, View } from 'react-native';
import { menuHomeScreen } from '@/data';
import { CardNavigation, CarouselCards } from '../../../components/';



export default function TabOneScreen() {
  return (
    <View className=" flex-1 bg-white dark:bg-primario-dark">
      {/* <Texto className='text-red-400'>HOLA MUNDO</Texto>
      <Text style={styles.title}>Tab One1</Text> */}
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
      <ScrollView showsVerticalScrollIndicator={false} className="">

        <View className="flex flex-row  flex-wrap items-center justify-evenly mt-5">
          {menuHomeScreen.map(menu => (
            <View className="mb-5 mr-2" key={menu.text}>
              {/* @ts-ignore */}
              <CardNavigation {...menu} />
            </View>
          ))}
        </View>

        <CarouselCards />
      </ScrollView>
    </View>
  );
}
