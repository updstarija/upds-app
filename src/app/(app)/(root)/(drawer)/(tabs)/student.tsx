import { ScrollView, View } from "react-native";
import { CardNavigation } from "@/components";
import { menuHomeStudent } from "@/data";
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInUp,
} from "react-native-reanimated";
export default function StudentTab() {
  return (
    <View className=" flex-1 bg-white dark:bg-primario-dark">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="lg:items-center lg:justify-center">
          <View className="mt-5 flex flex-row  flex-wrap items-center justify-evenly max-w-2xl mx-auto w-full pb-10">
            {menuHomeStudent.map((menu, i) => (
              <View
                style={{ marginBottom: 20, marginRight: 1 }}
                // entering={FadeInDown.duration(100).delay(200 * i)}
                key={menu.text}
              >
                <CardNavigation {...menu} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
