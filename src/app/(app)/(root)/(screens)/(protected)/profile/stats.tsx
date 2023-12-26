import { View, Text, Platform, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Texto } from '@/ui';
import { Picker } from '@react-native-picker/picker';
import { LineChart, PieChart } from 'react-native-gifted-charts'
import { useCarreraContext, useProgreso, usePromedio, useThemeColor } from '@/hooks'
import { SelectCarrera } from '@/views/SelectCarrera'
import DropDownPicker from 'react-native-dropdown-picker'
import { COLORS } from '~/constants';
import { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Counter from '@/components/Counter';
import CircularProgress from 'react-native-circular-progress-indicator'
import Spinner from '@/components/Spinner';

const Stats = () => {
    const isIos = Platform.OS === "ios"
    const isDarkMode = useThemeColor() === "dark"

    const { valueCarrera } = useCarreraContext()



    const pieData = [
        { value: 70, color: '#177AD5' },
        { value: 30, color: 'lightgray' }
    ];


    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('italy');
    const [items, setItems] = useState([
        { label: 'Spain', value: 'spain' },
        { label: 'Madrid', value: 'madrid', parent: 'spain' },
        { label: 'Barcelona', value: 'barcelona', parent: 'spain' },

        { label: 'Italy', value: 'italy' },
        { label: 'Rome', value: 'rome', parent: 'italy' },

        { label: 'Finland', value: 'finland' }
    ]);

    const [selectedPromedioType, setSelectedPromedioType] = useState(1);

    const { promedioQuery } = usePromedio({
        carrera: valueCarrera || -1,
        tiempo: 1
    })

    const { progresoQuery } = useProgreso({
        carrera: valueCarrera || -1,
    })

    const dPoint = () => {
        return (
            <View
                style={{
                    width: 14,
                    height: 14,
                    backgroundColor: 'white',
                    borderWidth: 3,
                    borderRadius: 7,
                    borderColor: '#07BAD1',
                }}
            />
        );
    };

    const lcomp = (x: string) => {
        return (
            <Texto>{x}</Texto>
        );
    };

    const latestData = [
        {
            value: 100,
            labelComponent: () => lcomp('22 Nov'),
            customDataPoint: dPoint,
        },
        {
            value: 120,
            hideDataPoint: true,
        },
        {
            value: 210,
            customDataPoint: dPoint,
        },
        {
            value: 250,
            hideDataPoint: true,
        },
        {
            value: 320,
            labelComponent: () => lcomp('24 Nov'),
            customDataPoint: dPoint,
        },
        {
            value: 310,
            hideDataPoint: true,
        },
        {
            value: 270,
            customDataPoint: dPoint,
        },
        {
            value: 240,
            hideDataPoint: true,
        },
        {
            value: 130,
            labelComponent: () => lcomp('26 Nov'),
            customDataPoint: dPoint,
        },
        {
            value: 120,
            hideDataPoint: true,
        },
        {
            value: 100,
            customDataPoint: dPoint,
        },
        {
            value: 210,
            hideDataPoint: true,
        },
        {
            value: 270,
            labelComponent: () => lcomp('28 Nov'),
            customDataPoint: dPoint,
        },
        {
            value: 240,
            hideDataPoint: true,
        },
        {
            value: 120,
            hideDataPoint: true,
        },
        {
            value: 100,
            customDataPoint: dPoint,
        },
        {
            value: 210,
            labelComponent: () => lcomp('28 Nov'),
            customDataPoint: dPoint,
        },
        {
            value: 20,
            hideDataPoint: true,
        },
        {
            value: 100,
            customDataPoint: dPoint,
        },
    ];

    const afterData = [
        {
            value: 65,
            labelComponent: () => lcomp('22 Nov'),
            customDataPoint: dPoint,
        },
        {
            value: 565,
            hideDataPoint: true,
        },
        {
            value: 234,
            customDataPoint: dPoint,
        },
        {
            value: 54,
            hideDataPoint: true,
        },
        {
            value: 65,
            labelComponent: () => lcomp('24 Nov'),
            customDataPoint: dPoint,
        },
        {
            value: 310,
            hideDataPoint: true,
        },
        {
            value: 270,
            customDataPoint: dPoint,
        },
        {
            value: 240,
            hideDataPoint: true,
        },
        {
            value: 130,
            labelComponent: () => lcomp('26 Nov'),
            customDataPoint: dPoint,
        },
        {
            value: 24,
            hideDataPoint: true,
        },
        {
            value: 100,
            customDataPoint: dPoint,
        },
        {
            value: 210,
            hideDataPoint: true,
        },
        {
            value: 270,
            labelComponent: () => lcomp('28 Nov'),
            customDataPoint: dPoint,
        },
        {
            value: 45,
            hideDataPoint: true,
        },
        {
            value: 23,
            hideDataPoint: true,
        },
        {
            value: 1,
            customDataPoint: dPoint,
        },
        {
            value: 3,
            labelComponent: () => lcomp('28 Nov'),
            customDataPoint: dPoint,
        },
        {
            value: 4,
            hideDataPoint: true,
        },
        {
            value: 2,
            customDataPoint: dPoint,
        },
    ];

    const [currentData, setCurrentData] = useState<number>(1);


    const renderPromedio = () => {
        if (promedioQuery.isLoading) return <Spinner style={{ height: 150 }} classNameContainer='bg-transparent' />
        if (promedioQuery.isError) return null

        return <>


            <View className='items-center justify-center'>
                <Counter max={promedioQuery.data.data.promedio} />


            </View>
        </>
    }

    const renderProgreso = () => {
        if (progresoQuery.isLoading) return <Spinner style={{ height: 150 }} classNameContainer='bg-transparent' />
        if (progresoQuery.isError) return null

        return <>
            <View className='items-center justify-center'>

                <CircularProgress
                    value={progresoQuery.data.data.progreso}
                    duration={1000}
                    maxValue={100}
                    activeStrokeColor={COLORS.light.background}
                    progressValueStyle={{ fontFamily: "LatoBold" }}
                    activeStrokeWidth={20} radius={90}
                    valueSuffix="%"
                    titleColor='black'
                    progressValueColor={isDarkMode ? "#FFF" : "#000"}
                    subtitleColor='red' />
                {/* <PieChart
    donut
    innerRadius={80}

    data={pieData}
    gradientCenterColor='#000'
    innerCircleColor={isDarkMode ? '#0D1F46' : '#fff'}
    centerLabelComponent={() => {
        return <View ><Texto className='text-black dark:text-white text-4xl' weight='Bold'>70%</Texto></View>;
    }}
/> */}
            </View>
        </>
    }

    return (
        <View className='bg-white dark:bg-primario-dark flex-1'>
            <View className='p-2 z-10'>
                <SelectCarrera />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View className='flex-1 border px-2 gap-2'>
                    <>

                        <View className='bg-white dark:bg-primario-dark rounded-xl' style={{ elevation: 10 }}>
                            <View className='bg-yellow-200  rounded-xl p-4 border-gray-50  border-[.5px] dark:border-[0px] '>
                                <Texto className=' dark:text-black text-xs ' weight='Light'>El promedio mostrado es una estimación o aproximación. Los cálculos finales pueden variar ligeramente debido a actualizaciones que puedan surgir.</Texto>
                            </View>
                        </View>
                        <View className='bg-white dark:bg-primario-dark rounded-xl' style={{ elevation: 10 }}>
                            <View className='bg-white dark:bg-secondary-dark  rounded-xl p-4 border-gray-300  border-[.5px] dark:border-[0px] '>
                                <Texto className='text-black dark:text-white text-center text-xl my-3' weight='Bold'>PROMEDIO</Texto>
                                {renderPromedio()}
                            </View>
                        </View>

                        <View className='bg-white dark:bg-primario-dark rounded-xl' style={{ elevation: 10 }}>
                            <View className='bg-white dark:bg-secondary-dark  rounded-xl p-4 border-gray-300  border-[.5px] dark:border-[0px] '>
                                <Texto className='text-black dark:text-white text-center text-xl my-3' weight='Bold'>PROGRESO</Texto>

                                {/* <SelectCarrera /> */}

                                {renderProgreso()}
                            </View>
                        </View>


                        {/*    <View className='bg-white dark:bg-primario-dark rounded-xl' style={{ elevation: 10 }}>
                            <View className='bg-white dark:bg-secondary-dark  rounded-xl p-6 border-gray-300  border-[.5px] dark:border-[0px] '>
                                <Texto className='text-black dark:text-white text-center text-xl my-3' weight='Bold'>RENDIMIENTO</Texto>

                               

                                <View className='items-center justify-center mt-10'>

                                    <LineChart
                                        width={Dimensions.get("window").width - 100}
                                        isAnimated
                                        thickness={3}
                                        color="#07BAD1"
                                        maxValue={600}
                                        noOfSections={3}
                                        animateOnDataChange
                                        animationDuration={10}
                                        onDataChangeAnimationDuration={10}
                                        areaChart
                                        yAxisTextStyle={{ color: 'lightgray' }}
                                        data={currentData == 1 ? latestData : afterData}
                                        hideDataPoints
                                        startFillColor={'rgb(84,219,234)'}
                                        endFillColor={'rgb(84,219,234)'}
                                        startOpacity={0.4}
                                        endOpacity={0.1}
                                        spacing={22}

                                        rulesColor="gray"
                                        rulesType="solid"
                                        initialSpacing={10}
                                        yAxisColor="lightgray"
                                        xAxisColor="lightgray"
                                    />
                                </View>
                            </View>
                        </View> */}
                    </>
                </View>
            </ScrollView>
        </View>
    )
}

export default Stats