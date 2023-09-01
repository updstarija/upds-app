import React, { Component, useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Agenda, DateData, AgendaEntry, AgendaSchedule, } from 'react-native-calendars';
import testIDs from '@/data/testIds';
import { Texto } from '../components';
import ReservationList from 'react-native-calendars/src/agenda/reservation-list';
import { useThemeColor } from '@/hooks';
import { COLORS } from '~/constants';

const fechas = {
    "2023-08-01": [
        {
            "name": "Conclusion del Modulo",
            "height": 50,
            "day": "2023-08-01"
        },
        {
            "name": "EVENTO UPDS",
            "height": 50,
            "day": "2023-08-01"
        }
    ],
    "2023-02-04": [
        {
            "name": "Item for 2023-02-01 #0",
            "height": 50,
            "day": "2023-02-01"
        }
    ],
    "2023-03-06": [
        {
            "name": "Item for 2023-03-01 #0",
            "height": 139,
            "day": "2023-03-01"
        }
    ],
    "2023-04-07": [
        {
            "name": "Item for 2023-04-01 #0",
            "height": 78,
            "day": "2023-04-01"
        },
        {
            "name": "Item for 2023-04-01 #1",
            "height": 50,
            "day": "2023-04-01"
        }
    ],
    "2023-05-09": [
        {
            "name": "Item for 2023-05-01 #0",
            "height": 50,
            "day": "2023-05-01"
        },
        {
            "name": "Item for 2023-05-01 #1",
            "height": 141,
            "day": "2023-05-01"
        },
        {
            "name": "Item for 2023-05-01 #2",
            "height": 141,
            "day": "2023-05-01"
        }
    ],
    "2023-06-11": [
        {
            "name": "Item for 2023-06-01 #0",
            "height": 140,
            "day": "2023-06-01"
        },
        {
            "name": "Item for 2023-06-01 #1",
            "height": 91,
            "day": "2023-06-01"
        },
        {
            "name": "Item for 2023-06-01 #2",
            "height": 50,
            "day": "2023-06-01"
        }
    ],
    "2023-07-12": [
        {
            "name": "Item for 2023-07-01 #0",
            "height": 123,
            "day": "2023-07-01"
        },
        {
            "name": "Item for 2023-07-01 #1",
            "height": 50,
            "day": "2023-07-01"
        },
        {
            "name": "Item for 2023-07-01 #2",
            "height": 64,
            "day": "2023-07-01"
        }
    ],
    "2023-08-18": [
        {
            "name": "Fecha limite de pago",
            "height": 50,
            "day": "2023-08-16"
        }
    ],
    "2023-09-02": [
        {
            "name": "Item for 2023-09-01 #0",
            "height": 134,
            "day": "2023-09-01"
        }
    ],
    "2023-10-05": [
        {
            "name": "Item for 2023-10-01 #0",
            "height": 125,
            "day": "2023-10-01"
        },
        {
            "name": "Item for 2023-10-01 #1",
            "height": 50,
            "day": "2023-10-01"
        }
    ],
    "2023-11-30": [
        {
            "name": "Item for 2023-11-01 #0",
            "height": 50,
            "day": "2023-11-01"
        }
    ],
    "2023-12-22": [
        {
            "name": "Item for 2023-12-01 #0",
            "height": 50,
            "day": "2023-12-01"
        },
        {
            "name": "Item for 2023-12-01 #1",
            "height": 50,
            "day": "2023-12-01"
        },
        {
            "name": "Item for 2023-12-01 #2",
            "height": 125,
            "day": "2023-12-01"
        }
    ]
}

const CalendarioAgenda = () => {
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

        return (
            <TouchableOpacity

                className='bg-white dark:bg-secondary-dark p-4 mt-4'
                onPress={() => Alert.alert(reservation.name)}

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
    useEffect(() => {


        console.log(Object.values(fechas).forEach(x => {
            console.log(x)

        }))
    }, [])

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
            items={dataItem}
            //loadItemsForMonth={this.loadItems}
            //selected={'2023-08-10'}
            renderList={(p) => <ReservationList {...p} style={isDarkMode ? { backgroundColor: COLORS.dark.background } : {}} />}
            onCalendarToggled={(s) => console.log(s)}
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
            markedDates={markedDates}
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