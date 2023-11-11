import { useState, useMemo, useCallback, useRef, memo } from 'react';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

import { useThemeColor } from '@/hooks';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView, useBottomSheetDynamicSnapPoints } from '@gorhom/bottom-sheet';


interface Props {
    content: JSX.Element | JSX.Element[]
    children: JSX.Element | JSX.Element[]
    snapPointsProp?: string[]
    touchableProps?: TouchableOpacityProps
    onClickFun?: Function | null
}

export const BottomSheet: React.FC<Props> = memo(({ content, children, snapPointsProp = ['35%', '60%', '90%'], touchableProps, onClickFun }) => {
    const isDarkMode = useThemeColor() === 'dark';

    const bottomSheetModalRef = useRef<any>(null);
    const [visibleModal, setVisibleModal] = useState(false);
    const snapPoints = useMemo(() => snapPointsProp, []);


    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();

        if (onClickFun) {
            //console.log('EXECUTE')
            onClickFun()
        }
    }, []);

    const { animatedContentHeight, animatedHandleHeight, animatedSnapPoints, handleContentLayout } = useBottomSheetDynamicSnapPoints(snapPoints)

    const handleSheetChanges = useCallback((index: number) => {
        if (index >= 0) setVisibleModal(true);
        else setVisibleModal(false);
    }, []);

    const renderBackdrop = useCallback(
        (props: any) => (
            <>

                <BottomSheetBackdrop
                    {...props}
                    disappearsOnIndex={-1}
                    appearsOnIndex={2}
                />

            </>
        ),
        [],
    );

    return (
        <View>
            <TouchableOpacity
                onPress={handlePresentModalPress}
                {...touchableProps}
            >
                {content}
            </TouchableOpacity>


            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={0}
                snapPoints={snapPoints}

                //   handleHeight={animatedHandleHeight}
                // contentHeight={animatedContentHeight}
                onChange={handleSheetChanges}
                backdropComponent={renderBackdrop}
                handleIndicatorStyle={{ backgroundColor: '#0D1F46' }}
                backgroundStyle={{ backgroundColor: isDarkMode ? '#040e22' : '#fff' }}>
                <BottomSheetScrollView
                    showsVerticalScrollIndicator={false}
                //onLayout={handleContentLayout}
                >
                    {children}
                </BottomSheetScrollView>

            </BottomSheetModal>

        </View>
    );
});
