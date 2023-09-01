import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useThemeColor } from '@/hooks';
import { COLORS } from '~/constants';
import { ExpandableCalendarScreen } from '@/views/Calendario';
import CalendarioAgenda from '@/views/CalendarioAgenda';


LocaleConfig.locales['es'] = {
    monthNames: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre'
    ],
    monthNamesShort: ['Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.', 'Ago.', 'Sep.', 'Oct.', 'Nov.', 'Dic.'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
    dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mie.', 'Jue.', 'Vie.', 'Sab.'],
    today: "Hoy"
};

LocaleConfig.defaultLocale = 'es';


const CalendarioAcademico = () => {
    const [selected, setSelected] = useState('');
    const isDarkMode = useThemeColor() === "dark"
    return (
        <View className='bg-white dark:bg-primario-dark flex-1'>
            {/* <ExpandableCalendarScreen /> */}
            <CalendarioAgenda />
        </View>
    )
}

export default CalendarioAcademico