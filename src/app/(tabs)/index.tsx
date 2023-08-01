import { ScrollView, StyleSheet, View } from "react-native";
import { menuHomeScreen } from "../../data";
import { CardNavigation } from "../../components/CardNavigation";

export default function TabOneScreen() {
  return (
    <View className=" bg-white dark:bg-primario-dark flex-1">
      {/* <Texto className='text-red-400'>HOLA MUNDO</Texto>
      <Text style={styles.title}>Tab One1</Text> */}
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
      <ScrollView showsVerticalScrollIndicator={false} className="">
        <View className="flex flex-row flex-wrap  justify-evenly items-center mt-5">
          {menuHomeScreen.map((menu) => (
            <View className="mb-5 mr-2" key={menu.text}>
              <CardNavigation {...menu} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
