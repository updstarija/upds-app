import { FlatList, View } from "react-native";
import { menuHomeScreen } from "@/data";
import { CardNavigation } from "@/components";
import { CarouselPriorityNotices } from "@/views";

export default function IndexTab() {
  return (
    <View className="bg-white dark:bg-primario-dark  flex-1 ">
      <FlatList
        data={null}
        ListHeaderComponent={
          <>
            <View className="flex flex-row  flex-wrap items-center justify-evenly mt-5 max-w-2xl mx-auto w-full">
              {menuHomeScreen.map((menu) => (
                <View className="mb-5 mr-2" key={menu.text}>
                  <CardNavigation {...menu} />
                </View>
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
