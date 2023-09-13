import React, { Component, useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Agenda, DateData, AgendaEntry, AgendaSchedule, } from 'react-native-calendars';
import testIDs from '@/data/testIds';
import { Texto } from '../components';
import ReservationList from 'react-native-calendars/src/agenda/reservation-list';
import { useThemeColor } from '@/hooks';
import { COLORS } from '~/constants';


const CalendarioAgenda = () => {

    const DATA = {
        events: [
            {
                title: 'Conclusion del modulo',
                start: '2023-09-01',
                end: '2023-09-01',
                color: 'purple',
            },
            {
                title: 'Inicio de modulo',
                start: '2023-09-04',
                end: '2023-09-04',
                color: 'blue'
            },
            {
                title: 'Evento Upds a nuevos estudiantes',
                start: '2023-09-04',
                end: '2023-09-04',
                color: 'gray'
            },
            {
                title: 'Fecha Limite de Pago',
                start: '2023-09-15',
                end: '2023-09-15',
                color: 'green'
            },
            {
                title: 'Conferencia Rector Upds',
                start: '2023-09-15',
                end: '2023-09-15',
                color: 'gray'
            },
            {
                title: 'Farándula Upds',
                start: '2023-09-15',
                end: '2023-09-15',
                color: 'gray'
            },
            {
                title: 'Descanso Pedagogico',
                start: '2023-09-18',
                end: '2023-09-20',
                color: 'orange'
            },
            {
                title: 'Conclusion del modulo',
                start: '2023-09-29',
                end: '2023-09-29',
                color: 'purple'
            }
        ]
    };

    const fechas: { [key: string]: any } = {};

    DATA.events.forEach(event => {
        const startDate = new Date(event.start);
        const endDate = new Date(event.end);
        const dayDiff = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

        for (let i = 0; i <= dayDiff; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);
            const formattedDate = currentDate.toISOString().split('T')[0];

            if (!fechas[formattedDate]) {
                fechas[formattedDate] = [];
            }

            fechas[formattedDate].push({
                name: event.title,
                height: 50,
                day: formattedDate,
                color: event.color,
            });
        }
    });

    const newMarkedDates: { [key: string]: any } = {};

    DATA.events.forEach(event => {
        const startDate = new Date(event.start);
        const endDate = new Date(event.end);
        const dayDiff = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

        for (let i = 0; i <= dayDiff; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);
            const formattedDate = currentDate.toISOString().split('T')[0];

            if (!newMarkedDates[formattedDate]) {
                newMarkedDates[formattedDate] = {
                    dots: []
                };
            }

            newMarkedDates[formattedDate].dots.push({
                color: event.color
            });
        }
    });

    const isDarkMode = useThemeColor() === "dark"
    const renderDay = (day: any) => {
        if (day) {
            return <Text style={styles.customDay}>{day.getDay()}</Text>;
        }
        return <View style={styles.dayItem} />;
    };

    const renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
        const fontSize = isFirst ? 16 : 14;
        const color = isFirst ? 'black' : '#43515c';
        console.log(reservation.color)
        return (
            <TouchableOpacity

                className={` p-4 mt-2`}
                style={{ backgroundColor: reservation.color }}
                onPress={() => Alert.alert(reservation.color)}

            >

                <Texto className='text-black dark:text-white'>{reservation.name}</Texto>

            </TouchableOpacity>
        );
    };

    const renderEmptyDate = () => {
        return (
            <View style={styles.emptyDate}>
                <Text>This is empty date!</Text>
            </View>
        );
    };

    const rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
        return r1.name !== r2.name;
    };

    const calendarRef = useRef()

    const [markedDates, setmarkedDates] = useState({
        '2023-01-05': {
            'dots': [
                { 'color': 'red' },
                { 'color': 'green' }
            ]
        },
        '2023-02-10': {
            'dots': [
                { 'color': 'blue' },
                { 'color': 'yellow' },
                { 'color': 'purple' }
            ]
        },
        '2023-03-15': {
            'dots': [
                { 'color': 'orange' }
            ]
        },
        '2023-04-20': {
            'dots': [
                { 'color': 'red' },
                { 'color': 'green' },
                { 'color': 'blue' },
                { 'color': 'yellow' }
            ]
        },
        '2023-05-25': {
            'dots': [
                { 'color': 'purple' },
                { 'color': 'orange' }
            ]
        },
        '2023-06-30': {
            'dots': [
                { 'color': 'green' }
            ]
        },
        '2023-07-10': {
            'dots': [
                { 'color': 'red' },
                { 'color': 'blue' },
                { 'color': 'purple' }
            ]
        },
        '2023-08-15': {
            'dots': [
                { 'color': 'orange' }
            ]
        },
        '2023-09-20': {
            'dots': [
                { 'color': 'green' },
                { 'color': 'blue' },
                { 'color': 'yellow' }
            ]
        },
        '2023-10-25': {
            'dots': [
                { 'color': 'purple' },
                { 'color': 'orange' }
            ]
        },
        '2023-11-30': {
            'dots': [
                { 'color': 'red' }
            ]
        },
        '2023-12-05': {
            'dots': [
                { 'color': 'green' },
                { 'color': 'yellow' }
            ]
        }
    })


    const dotColors = [
        'red',
        'green',
        'blue',
        'yellow',
        'purple',
        'orange'
    ];

    const dataItem = {
        '2023-01-05': generateItems(2),
        '2023-02-10': generateItems(3),
        '2023-03-15': generateItems(1),
        '2023-04-20': generateItems(4),
        '2023-05-25': generateItems(2),
        '2023-06-30': generateItems(1),
        '2023-07-10': generateItems(3),
        '2023-08-15': generateItems(1),
        '2023-09-20': generateItems(3),
        '2023-10-25': generateItems(2),
        '2023-11-30': generateItems(1),
        '2023-12-05': generateItems(2)
    };

    function generateItems(numItems: number) {
        const items = [];
        for (let i = 0; i < numItems; i++) {
            items.push({
                name: `EVENTO #${i}`,
                height: 50,
                day: "2023-08-" + i
            });
        }
        return items;
    }


    return (
        <Agenda

            ListEmptyComponent={() => <Texto>GOLA</Texto>}
            items={fechas}
            //loadItemsForMonth={this.loadItems}
            //selected={'2023-08-10'}
            renderList={(p) => <ReservationList {...p} style={isDarkMode ? { backgroundColor: COLORS.dark.background, paddingTop: 10 } : {}} />}

            //renderList={(props) => <View {...props} className='flex-1  bg-red-300'><Texto>{JSON.stringify(props.items)}</Texto></View>}
            renderItem={renderItem}

            renderEmptyDate={renderEmptyDate}
            rowHasChanged={rowHasChanged}
            showClosingKnob={true}
            pastScrollRange={12 - (12 - new Date().getMonth())}
            futureScrollRange={12 - new Date().getMonth() - 1}
            renderEmptyData={() => <View className='bg-white dark:bg-primario-dark flex-1'><Texto className='text-center p-5 text-black dark:text-white'>NO HAY NIGUN EVENTO DISPONIBLE</Texto></View>}
            markingType={'multi-dot'}
            calendarStyle={{ backgroundColor: isDarkMode ? COLORS.dark.secondary : "transparent" }}
            theme={isDarkMode ? {
                calendarBackground: COLORS.dark.secondary,
                dayTextColor: "#fff",
                monthTextColor: "#fff",


            } : {}}
            /*   markedDates={{
                  '2023-08-01': {
                      dots: [
                          { color: "red" },
                          { color: "green" }
                      ]
                  },
                  '2023-08-02': { startingDay: true, color: "orange" },
                  '2023-08-03': { color: "orange" },
                  '2023-08-04': { endingDay: true, color: 'orange' },
                  '2023-08-06': { startingDay: true, endingDay: true, color: 'orange' },
                  '2023-08-22': { endingDay: true, color: 'orange' },
                  '2023-08-24': { startingDay: true, color: 'gray' },
                  '2023-08-25': { color: 'gray' },
                  '2023-08-26': { endingDay: true, color: 'gray' }
              }} */
            markedDates={newMarkedDates}
        // monthFormat={'yyyy'}
        // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
        // renderDay={this.renderDay}
        // hideExtraDays={false}
        // showOnlySelectedDayItems
        // reservationsKeyExtractor={this.reservationsKeyExtractor}
        />
    );
}

export default CalendarioAgenda


const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
    },
    customDay: {
        margin: 10,
        fontSize: 24,
        color: 'green'
    },
    dayItem: {
        marginLeft: 34
    }
});