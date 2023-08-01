import {ScrollView, StyleSheet, View} from 'react-native';
import {CardNavigation} from '@/components';
import {menuHomeStudent} from '@/data';

export default function TabTwoScreen() {
  return (
    <View className=" flex-1 bg-white dark:bg-primario-dark">
      {/* <Texto className='text-red-400'>HOLA MUNDO</Texto>
    <Text style={styles.title}>Tab One1</Text> */}
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
      <ScrollView showsVerticalScrollIndicator={false} className="">
        <View className="mt-5 flex flex-row  flex-wrap items-center justify-evenly">
          {menuHomeStudent.map(menu => (
            <View className="mb-5 mr-2" key={menu.text}>
              <CardNavigation {...menu} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
