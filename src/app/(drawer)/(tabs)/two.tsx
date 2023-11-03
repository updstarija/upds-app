import { ScrollView, StyleSheet, View } from 'react-native';
import { CardNavigation } from '@/components';
import { menuHomeStudent } from '@/data';

export default function TabTwoScreen() {
  return (
    <View className=" flex-1 bg-white dark:bg-primario-dark">
      <ScrollView showsVerticalScrollIndicator={false} >
        <View className='lg:items-center lg:justify-center'>
          <View className="mt-5 flex flex-row  flex-wrap items-center justify-evenly max-w-2xl mx-auto w-full">
            {menuHomeStudent.map(menu => (
              <View className="mb-5 mr-2" key={menu.text}>
                <CardNavigation {...menu} />
              </View>
            ))}
          </View>
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
