import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Texto } from '../../../components'
import { Picker } from '@react-native-picker/picker';
import { PieChart } from 'react-native-gifted-charts'
import { useThemeColor } from '@/hooks'
import { SelectCarrera } from '@/views/SelectCarrera'
import DropDownPicker from 'react-native-dropdown-picker'
import { COLORS } from '~/constants';

const Stats = () => {
    const isDarkMode = useThemeColor() === "dark"
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

    const [selectedLanguage, setSelectedLanguage] = useState();

    return (
        <View className='bg-white dark:bg-primario-dark flex-1 p-2'>
            <View className='bg-white dark:bg-secondary-dark flex-1 rounded-xl p-4 border-gray-50  border-[.5px] dark:border-[0px] ' style={{ elevation: 5 }}>
                <Texto className='text-black dark:text-white'>Stats</Texto>

                <SelectCarrera />



                <View className='flex-row items-center justify-between'>
                    <View />

                    <View className='border-[.5px] h-8 items-center justify-center rounded-full bg-white dark:bg-secondary-dark ' style={{ elevation: 5 }}>
                        <Picker
                            mode='dropdown'
                            style={{ width: 140, borderWidth: 1, color: isDarkMode ? "white" : "#000" }}
                            dropdownIconColor={isDarkMode ? "white" : "#000"}
                            selectedValue={selectedLanguage}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedLanguage(itemValue)
                            }>
                            <Picker.Item label="Todo" value={0} />
                            <Picker.Item label="Anual" value="java" />
                            <Picker.Item label="Semestral" value="semestral" />
                        </Picker>
                    </View>

                </View>

                <View>

                    <PieChart
                        donut
                        innerRadius={80}
                        data={pieData}
                        gradientCenterColor='#000'
                        innerCircleColor={isDarkMode ? '#0D1F46' : '#223B82'}
                        centerLabelComponent={() => {
                            return <View className='bg-red-400'><Text style={{ fontSize: 30 }}>70%</Text></View>;
                        }}
                    />
                </View>
            </View>
        </View>
    )
}

export default Stats