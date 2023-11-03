import {
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
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetScrollView,
    BottomSheetTextInput,
    BottomSheetView,
    TouchableOpacity,
} from "@gorhom/bottom-sheet";
import Texto from "./Texto";
import { useThemeColor } from "@/hooks";
import { View } from "react-native-animatable";

interface Props {
    content: JSX.Element | JSX.Element[];
    onPressButton?: Function;
    snapPointsProp?: string[];
    touchableProps?: TouchableOpacityProps;
}

const CustomBottomSheetModal: React.FC<PropsWithChildren<Props>> = ({
    content,
    children,
    onPressButton,
    snapPointsProp,
    touchableProps,
}) => {
    const isDark = useThemeColor() === "dark"
    const [isOpen, setIsOpen] = useState(false);

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const snapPoints = useMemo(() => snapPointsProp, []);
    const { top } = useSafeAreaInsets();

    const handleOpenModal = useCallback(() => {
        if (onPressButton) onPressButton()
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
