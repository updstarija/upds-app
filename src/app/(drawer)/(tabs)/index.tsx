import { ScrollView, StyleSheet, View } from 'react-native';
import { menuHomeScreen } from '@/data';
import { CardNavigation, CarouselCards, Texto } from '../../../components/';
import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';


export default function TabOneScreen() {
  return (
    <View className=" flex-1 bg-white dark:bg-primario-dark">
      {/* <Texto className='text-red-400'>HOLA MUNDO</Texto>
      <Text style={styles.title}>Tab One1</Text> */}
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
      <ScrollView showsVerticalScrollIndicator={false} className="">

        <View className="flex flex-row  flex-wrap items-center justify-evenly">
          {menuHomeScreen.map(menu => (
            <View className="mb-5 mr-2" key={menu.text}>
              {/* @ts-ignore */}
              <CardNavigation {...menu} />
            </View>
          ))}


        </View>
        <View className='flex-row justify-between'>
          <Texto className='text ml-5 pt-2 dark:text-white' weight='Bold'>Mas Relevante</Texto>

          <Link href='/comunicados/' className='pt-2 mr-5 flex-row'>
            <View className='flex-row items-center justify-between'>
              <Texto className='dark:text-white '>Ver Mas</Texto>
              <View style={{ marginLeft: 10 }}>
                <FontAwesome name='chevron-right' size={15} color={"#000"} />
              </View>
            </View>
          </Link>

        </View>
        <CarouselCards />
      </ScrollView>
    </View>
  );
}
