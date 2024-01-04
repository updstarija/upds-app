/* import {
    PropsWithChildren,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import {
    Platform,
    BackHandler,
    TouchableOpacityProps,
    TouchableOpacity
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useThemeColor } from "@/hooks";
import { View } from "react-native-animatable";

interface Props {
    content: JSX.Element | JSX.Element[];
    onPressButton?: Function;
    snapPointsProp?: string[];
    touchableProps?: TouchableOpacityProps;
}

export interface CustomBottomSheetRef {
    close: () => void;
    openRight: () => void;
    openLeft: () => void;
  }

const CustomBottomSheetModal: React.FC<PropsWithChildren<Props>> = ({
    content,
    children,
    onPressButton,
    snapPointsProp = [],
}) => {
    const isDark = useThemeColor() === "dark"
    const [isOpen, setIsOpen] = useState(false);

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const snapPoints = useMemo(() => snapPointsProp, []);
    const { top } = useSafeAreaInsets();

    const handleOpenModal = useCallback(() => {
        if (onPressButton) {
            //(onPressButton)
            onPressButton()
        }
        bottomSheetModalRef.current?.present();
    }, []);

    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={2}
            />
        ),
        []
    );

    const handleChange = (index: number) => {
        if (index < 0) setIsOpen(false);
        else setIsOpen(true);
    };

    const handleBackPress = () => {
        if (isOpen) bottomSheetModalRef?.current?.close();
        return isOpen;
    };

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackPress);

        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
        };
    }, [isOpen]);

    return (
        <>
            <TouchableOpacity onPress={handleOpenModal} activeOpacity={1}>
                {content}
            </TouchableOpacity>

            <BottomSheetModal
                ref={bottomSheetModalRef}
                snapPoints={snapPoints}
                index={snapPoints?.length == 0 ? 0 : 1}
                topInset={top}
                enableDynamicSizing={snapPoints?.length == 0}
                enablePanDownToClose
                backdropComponent={renderBackdrop}
                onDismiss={() => setIsOpen(false)}
                onChange={handleChange}
                keyboardBehavior={Platform.OS === "android" ? "fillParent" : "interactive"}
                keyboardBlurBehavior="restore"
                handleIndicatorStyle={{ backgroundColor: '#0D1F46' }}
                backgroundStyle={{ backgroundColor: isDark ? '#040e22' : '#fff' }}>
                <BottomSheetScrollView style={{ padding: 0 }}>
                    <View className="mb-2 mx-4">
                        {children}
                    </View>
                </BottomSheetScrollView>
            </BottomSheetModal>
        </>
    );
};


export default CustomBottomSheetModal;
 */

import {
  Ref,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  BackHandler,
  TouchableOpacityProps,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useThemeColor } from "@/hooks";
import { View } from "react-native-animatable";

export interface CustomBottomSheetRef {
  close: () => void;
  open: () => void;
}

interface Props extends BottomSheetModalProps {
  content: JSX.Element | JSX.Element[];
  onPressButton?: Function;
  onCloseModal?: Function;
  snapPointsProp?: string[];
  touchableProps?: TouchableOpacityProps;
  withoutScrollView?: boolean;
  ref?: Ref<CustomBottomSheetRef>;
  spacing?: number;
}

const CustomBottomSheetModal: React.FC<React.PropsWithChildren<Props>> =
  forwardRef(
    (
      {
        content,
        children,
        onPressButton,
        withoutScrollView = false,
        snapPointsProp = [],
        onCloseModal,
        spacing,
        ...props
      },
      ref
    ) => {
      const isDark = useThemeColor() === "dark";
      const [isOpen, setIsOpen] = useState(false);

      const bottomSheetModalRef = useRef<BottomSheetModal>(null);

      const snapPoints = useMemo(() => snapPointsProp, [snapPointsProp]);
      const { top } = useSafeAreaInsets();

      const handleOpenModal = useCallback(() => {
        if (onPressButton) {
          onPressButton();
        }

        bottomSheetModalRef.current?.present();
      }, []);

      const renderBackdrop = useCallback(
        (props: any) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={2}
            opacity={2}
          />
        ),
        []
      );

      const handleChange = (index: number) => {
        if (index < 0) setIsOpen(false);
        else setIsOpen(true);
      };

      const handleBackPress = () => {
        if (isOpen) bottomSheetModalRef?.current?.close();
        return isOpen;
      };

      const onDismiss = () => {
        setIsOpen(false);
        if (onCloseModal) onCloseModal();
      };

      useImperativeHandle(ref, () => ({
        close: () => {
          bottomSheetModalRef.current?.dismiss();
        },
        open: () => {
          bottomSheetModalRef.current?.present();
        },
      }));

      useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackPress);

        return () => {
          BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
        };
      }, [isOpen]);

      return (
        <>
          {/*             <View>
                {content}
            </View> */}
          <TouchableOpacity onPress={handleOpenModal} activeOpacity={1}>
            {content}
          </TouchableOpacity>

          <BottomSheetModal
            snapPoints={snapPoints}
            topInset={top}
            enableDynamicSizing={snapPointsProp?.length == 0}
            backdropComponent={renderBackdrop}
            onDismiss={onDismiss}
            onChange={handleChange}
            keyboardBehavior={
              Platform.OS === "android" ? "fillParent" : "interactive"
            }
            keyboardBlurBehavior="restore"
            android_keyboardInputMode="adjustResize"
            handleIndicatorStyle={{ backgroundColor: "#0D1F46" }}
            backgroundStyle={{ backgroundColor: isDark ? "#040e22" : "#fff" }}
            {...props}
            ref={bottomSheetModalRef}
          >
            {!withoutScrollView ? (
              <BottomSheetScrollView style={{ padding: 0 }}>
                <View
                  className="mb-2"
                  style={{
                    marginHorizontal: spacing || spacing === 0 ? spacing : 15,
                  }}
                >
                  {children}
                </View>
              </BottomSheetScrollView>
            ) : (
              <>{children}</>
            )}
          </BottomSheetModal>
        </>
      );
    }
  );

export default CustomBottomSheetModal;
