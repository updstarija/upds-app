import { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  UIManager,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import RenderHTML from "react-native-render-html";
import { LayoutScreen } from "@/layout/LayoutScreen";
import { COLORS } from "~/constants";
import { Spinner } from "@/components";
import { useFaq, useThemeColor } from "@/hooks";
import { FlashList } from "@shopify/flash-list";
import DropDownPicker from "react-native-dropdown-picker";
import { IFaq } from "@/types";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { categorias, categoriasFaq } from "@/data";
import { Texto } from "@/ui";
import FaqItem from "@/components/faq/FaqItem";
import { useFaqs } from "@/hooks/useFaqs";
import CustomDropdown from "@/ui/CustomDropDown";
import { Image } from "expo-image";
import FaqSkeleton from "@/components/faq/FaqSkeleton";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const Faq = () => {
  const flatListRef = useRef<FlashList<IFaq>>(null);
  const { height } = useWindowDimensions();
  const [category, setCategory] = useState("");

  const { faqsQuery } = useFaqs({
    params: {
      limitResults: 4,
      category,
    },
    query: ["faqsQuery"],
  });

  const faqs = faqsQuery.data?.pages.flatMap((x) => x.data) ?? [];
  const isLoading = faqsQuery.isLoading;

  const scroll = useSharedValue(0);

  const stylesAnimated = useAnimatedStyle(() => {
    return {
      opacity: 1,
      right: 30,
      bottom: withSpring(
        interpolate(scroll.value, [100, 500], [-100, 30], Extrapolation.CLAMP)
      ),
    };
  });

  return (
    <LayoutScreen title="Preguntas Frecuentes">
      <View className="flex-1">
        <Animated.View
          style={[
            stylesAnimated,
            {
              position: "absolute",
              zIndex: 30,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() =>
              flatListRef.current?.scrollToOffset({
                offset: 0,
                animated: true,
              })
            }
            className="bg-primario w-16 h-16 rounded-full items-center justify-center"
          >
            <AntDesign name="up" size={20} color={"#FFF"} />
          </TouchableOpacity>
        </Animated.View>

        <FlashList
          ref={flatListRef}
          onScroll={(x) => {
            scroll.value = x.nativeEvent.contentOffset.y;
          }}
          contentContainerStyle={{
            paddingHorizontal: 5,
          }}
          ListHeaderComponentStyle={{ marginTop: 5 }}
          ListEmptyComponent={
            <>
              {!isLoading && (
                <View
                  className=" items-center justify-center flex-1"
                  style={{ height: height - 150 }}
                >
                  <Image
                    style={{
                      width: 200,
                      height: 200,
                    }}
                    source={require("~/assets/images/icons/empty-data.png")}
                  />
                  <Texto className="text-center">
                    No se han encontrado resultados
                  </Texto>
                </View>
              )}
            </>
          }
          ListHeaderComponent={
            <>
              <CustomDropdown
                data={categoriasFaq}
                labelField={"label"}
                valueField={"value"}
                search
                value={category}
                onChange={(e) => setCategory(e.value)}
              />
            </>
          }
          ListFooterComponent={
            faqsQuery.isFetchingNextPage || faqsQuery.isLoading ? (
              <View className="flex-col gap-2">
                {Array(faqs.length > 3 ? 1 : 4)
                  .fill(0)
                  .map((x, i) => (
                    <View className="" key={`skeleton-faq-${i}`}>
                      <FaqSkeleton />
                    </View>
                  ))}
              </View>
            ) : (
              <View />
            )
          }
          data={faqs}
          keyExtractor={(item) => item.id}
          onEndReachedThreshold={0.1}
          onEndReached={faqsQuery.fetchNextPage}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={200}
          renderItem={({ item }) => <FaqItem faq={item} />}
        />
      </View>
    </LayoutScreen>
  );
};

export default Faq;
const styles = StyleSheet.create({
  titleFaq: {
    color: COLORS.light.background,
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
  },
  cardContainer: {
    marginVertical: 10,
  },
  windowContainer: {
    borderRadius: 10,
    overflow: "hidden",
    elevation: 5,
  },
  titleBar: {
    flexDirection: "row",
    height: 30,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  titleBarButton: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "white",
    marginLeft: 5,
  },
  content: {
    padding: 20,
  },
  cardTitle: {
    marginBottom: 10,
  },
  cardTextContainer: {
    maxHeight: 80,
  },
  cardText: {
    fontSize: 12,
  },
});

// import React, { useState,Component } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import Collapsible from 'react-native-collapsible';
// import Accordion from 'react-native-collapsible/Accordion';
// import { StyleSheet } from 'react-native/Libraries/StyleSheet/StyleSheet';

// export const FaqScreen = () => {
//     const [isExpanded, setIsExpanded] = useState(false);

//     const [open, setopen] = useState(false);

//     const SECTIONS = [
//         {
//           title: 'First',
//           content: 'Lorem ipsum...',
//         },
//         {
//           title: 'Second',
//           content: 'Lorem ipsum...',
//         },
//       ];

//     return (
//         <View>
//             <View style={{ backgroundColor: '#F0F0F0', borderColor: '#0000FF', borderWidth: 1, marginBottom: 10 }}>
//                 <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)} style={{ backgroundColor: '#0000FF' }}>
//                     <Text style={{ color: '#FFFFFF', padding: 10 }}>{"TITULO 0"}</Text>
//                 </TouchableOpacity>
//                 {isExpanded && (
//                     <View style={{ backgroundColor: '#FFFFFF' }}>
//                         <Text style={{ padding: 10 }}>{"Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic ut optio corporis tempore eos, qui numquam omnis laborum exercitationem praesentium veniam iure error, deserunt inventore eaque, soluta cum nesciunt eius."}</Text>
//                     </View>
//                 )}
//             </View>

//             <View style={{ backgroundColor: '#F0F0F0', borderColor: '#0000FF', borderWidth: 1, marginBottom: 10 }}>
//                 <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)} style={{ backgroundColor: '#0000FF' }}>
//                     <Text style={{ color: '#FFFFFF', padding: 10 }}>{"TITULO 1"}</Text>
//                 </TouchableOpacity>
//                 {isExpanded && (
//                     <View style={{ backgroundColor: '#FFFFFF' }}>
//                         <Text style={{ padding: 10 }}>{"Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic ut optio corporis tempore eos, qui numquam omnis laborum exercitationem praesentium veniam iure error, deserunt inventore eaque, soluta cum nesciunt eius."}</Text>
//                     </View>
//                 )}
//             </View>

//             <View style={{ backgroundColor: '#F0F0F0', borderColor: '#0000FF', borderWidth: 1, marginBottom: 10 }}>
//                 <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)} style={{ backgroundColor: '#0000FF' }}>
//                     <Text style={{ color: '#FFFFFF', padding: 10 }}>{"TITULO 2"}</Text>
//                 </TouchableOpacity>
//                 {isExpanded && (
//                     <View style={{ backgroundColor: '#FFFFFF' }}>
//                         <Text style={{ padding: 10 }}>{"Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic ut optio corporis tempore eos, qui numquam omnis laborum exercitationem praesentium veniam iure error, deserunt inventore eaque, soluta cum nesciunt eius."}</Text>
//                     </View>
//                 )}
//             </View>
//         </View>
//     );
// };
