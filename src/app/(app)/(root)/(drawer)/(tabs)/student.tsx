import { ScrollView, View } from "react-native";
import { CardNavigation } from "@/components";
import { menuHomeStudent } from "@/data";

export default function StudentTab() {
  return (
    <View className=" flex-1 bg-white dark:bg-primario-dark">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="lg:items-center lg:justify-center">
          <View className="mt-5 flex flex-row  flex-wrap items-center justify-evenly max-w-2xl mx-auto w-full">
            {menuHomeStudent.map((menu) => (
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
