import { FlatList, View } from "react-native";
import { menuHomeScreen } from "@/data";
import { CardNavigation } from "@/components";
import { CarouselPriorityNotices } from "@/views";
import { Texto } from "@/ui";
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInUp,
} from "react-native-reanimated";

export default function IndexTab() {
  return (
    <View className="bg-white dark:bg-primario-dark  flex-1 ">
      <FlatList
        data={null}
        ListHeaderComponent={
          <>
            <View className="flex flex-row  flex-wrap items-center justify-evenly mt-5 max-w-2xl mx-auto w-full z-50">
              {menuHomeScreen.map((menu, i) => (
                <View
                  style={{ marginBottom: 20, marginRight: 1 }}
                  // entering={FadeInDown.duration(100).delay(500 * i)}
                  key={menu.text}
                >
                  <CardNavigation {...menu} />
                </View>

                /*         <View className="mb-5 mr-2" key={menu.text}>
                
                </View> */
              ))}
            </View>

            <CarouselPriorityNotices />
            {/*             <CarouselCards /> */}
          </>
        }
        renderItem={null}
        showsVerticalScrollIndicator={false}
      />
      {/* 
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex flex-row  flex-wrap items-center justify-evenly mt-5 max-w-2xl mx-auto w-full">
          {menuHomeScreen.map(menu => (
            <View className="mb-5 mr-2" key={menu.text}>
              <CardNavigation {...menu} />
            </View>
          ))}
        </View>

        <CarouselCards />
      </ScrollView> */}
    </View>
  );
}
