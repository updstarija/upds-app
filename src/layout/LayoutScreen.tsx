import React from "react";
import { SafeAreaView, View, Text, ScrollView } from "react-native";

interface Props {
  title: string;
  children: JSX.Element | JSX.Element[];
}
export const LayoutScreen: React.FC<Props> = ({ children, title }) => {
  return (
    <SafeAreaView className="bg-white dark:bg-primario-dark flex-1">
      {/* <View className="items-center mb-5">
                <Text className="text-2xl text-primario dark:text-white font-bold uppercase">{title}</Text>
            </View> */}

      <View className="flex-1 max-w-3xl mx-auto w-full">{children}</View>
    </SafeAreaView>
  );
};
