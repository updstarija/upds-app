import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Agenda, DateData, AgendaEntry, AgendaSchedule, AgendaListProps } from 'react-native-calendars';
import testIDs from '@/data/testIds';
import { Texto } from '../components';


interface State {
    items?: AgendaSchedule;
}

export default class CalendarioAgenda extends Component<State> {
    state: State = {
        items: undefined
    };

    // reservationsKeyExtractor = (item, index) => {
    //   return `${item?.reservation?.day}${index}`;
    // };

    agendaItems = [
        {
            title: "'2023-08-10",
            data: [{ hour: '12am', duration: '1h', title: 'First Yoga' }]
        },
        {
            title: "'2023-08-11",
            data: [
                { hour: '4pm', duration: '1h', title: 'Pilates ABC' },
                { hour: '5pm', duration: '1h', title: 'Vinyasa Yoga' }
            ]
        },
        {
            title: "'2023-08-12",
            data: [
                { hour: '1pm', duration: '1h', title: 'Ashtanga Yoga' },
                { hour: '2pm', duration: '1h', title: 'Deep Stretches' },
                { hour: '3pm', duration: '1h', title: 'Private Yoga' }
            ]
        },
        {
            title: "'2023-08-13",
            data: [{ hour: '12am', duration: '1h', title: 'Ashtanga Yoga' }]
        },
        {
            title: "'2023-08-14",
            data: [{}]
        },

        {
            title: "'2023-08-15",
            data: [
                { hour: '12am', duration: '1h', title: 'Ashtanga Yoga' }
            ]
        },
        {
            title: "'2023-08-16",
            data: [{}]
        },
        {
            title: "'2023-08-17",
            data: [
                { hour: '9pm', duration: '1h', title: 'Pilates Reformer' },
                { hour: '10pm', duration: '1h', title: 'Ashtanga' },
                { hour: '11pm', duration: '1h', title: 'TRX' },
                { hour: '12pm', duration: '1h', title: 'Running Group' }
            ]
        },
        {
            title: "'2023-08-18",
            data: [
                { hour: '1pm', duration: '1h', title: 'Ashtanga Yoga' },
                { hour: '2pm', duration: '1h', title: 'Deep Stretches' },
                { hour: '3pm', duration: '1h', title: 'Private Yoga' }
            ]
        },
        {
            title: "'2023-08-19",
            data: [
                { hour: '12am', duration: '1h', title: 'Last Yoga' }
            ]
        },
        {
            title: "'2023-08-20",
            data: [
                { hour: '1pm', duration: '1h', title: 'Ashtanga Yoga' },
                { hour: '2pm', duration: '1h', title: 'Deep Stretches' },
                { hour: '3pm', duration: '1h', title: 'Private Yoga' }
            ]
        },
        {
            title: "'2023-08-21",
            data: [
                { hour: '12am', duration: '1h', title: 'Last Yoga' }
            ]
        },
        {
            title: "'2023-08-22",
            data: [
                { hour: '12am', duration: '1h', title: 'Last Yoga' }
            ]
        }
    ];

    agendaItems2 = {
        "2023-01-01": [
            {
                "name": "Item for 2023-01-01 #0",
                "height": 50,
                "day": "2023-01-01"
            },
            {
                "name": "Item for 2023-01-01 #1",
                "height": 50,
                "day": "2023-01-01"
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
        "2023-08-16": [
            {
                "name": "Item for 2023-08-01 #0",
                "height": 50,
                "day": "2023-08-01"
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

    render() {
        return (
            <Agenda
                ListEmptyComponent={() => <Texto>GOLA</Texto>}
                items={this.agendaItems2}
                loadItemsForMonth={this.loadItems}
                //selected={'2023-08-10'}
                renderItem={this.renderItem}
                renderEmptyDate={this.renderEmptyDate}
                rowHasChanged={this.rowHasChanged}
                showClosingKnob={true}
                pastScrollRange={12 - (12 - new Date().getMonth())}
                futureScrollRange={12 - new Date().getMonth() - 1}
                renderEmptyData={() => <Texto className='text-center'>NO HAY EVENTOS</Texto>}
            /*  markingType={'period'}
             markedDates={{
                 '2023-08-08': { textColor: '#43515c' },
                 '2023-08-09': { textColor: '#43515c' },
                 '2023-08-14': { startingDay: true, endingDay: true, color: 'blue' },
                 '2023-08-21': { startingDay: true, color: 'blue' },
                 '2023-08-22': { endingDay: true, color: 'gray' },
                 '2023-08-24': { startingDay: true, color: 'gray' },
                 '2023-08-25': { color: 'gray' },
                 '2023-08-26': { endingDay: true, color: 'gray' }
             }} */
            // monthFormat={'yyyy'}
            // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
            // renderDay={this.renderDay}
            // hideExtraDays={false}
            // showOnlySelectedDayItems
            // reservationsKeyExtractor={this.reservationsKeyExtractor}
            />
        );
    }

    loadItems = (day: DateData) => {
        const items = this.state.items || {};
        const currentYear = new Date().getFullYear();
        setTimeout(() => {
            for (let i = 0; i < 12; i++) {
                const time = new Date(currentYear, i, 1).getTime();
                const strTime = this.timeToString(time);

                if (!items[strTime]) {
                    items[strTime] = [];

                    const numItems = Math.floor(Math.random() * 3 + 1);
                    for (let j = 0; j < numItems; j++) {
                        items[strTime].push({
                            name: 'Item for ' + strTime + ' #' + j,
                            height: Math.max(50, Math.floor(Math.random() * 150)),
                            day: strTime
                        });
                    }
                }
            }

            const newItems: AgendaSchedule = {};
            Object.keys(items).forEach(key => {
                newItems[key] = items[key];
            });

            console.log(newItems)
            this.setState({
                items: newItems
            });
        }, 1000);
    };

    renderDay = (day: any) => {
        if (day) {
            return <Text style={styles.customDay}>{day.getDay()}</Text>;
        }
        return <View style={styles.dayItem} />;
    };

    renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
        const fontSize = isFirst ? 16 : 14;
        const color = isFirst ? 'black' : '#43515c';

        return (
            <TouchableOpacity
                testID={testIDs.agenda.ITEM}
                style={[styles.item, { height: reservation.height }]}
                onPress={() => Alert.alert(reservation.name)}
            >
                <Text style={{ fontSize, color }}>{reservation.name}</Text>
            </TouchableOpacity>
        );
    };

    renderEmptyDate = () => {
        return (
            <View style={styles.emptyDate}>
                <Text>This is empty date!</Text>
            </View>
        );
    };

    rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
        return r1.name !== r2.name;
    };

    timeToString(time: number) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }
}

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