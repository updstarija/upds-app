import { useMemo, useState } from 'react';
import { Alert, View, TouchableOpacity } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import { Agenda, AgendaEntry } from 'react-native-calendars';
import ReservationList from 'react-native-calendars/src/agenda/reservation-list';
import { isSameDay } from 'date-fns'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '~/constants';
import { useCalendario, useThemeColor } from '@/hooks';
import { Button, Option } from '@/components';
import { CustomModal, Modal, Texto } from '@/ui';

const dayNames = ['Dom.', 'Lun.', 'Mar.', 'Mie.', 'Jue.', 'Vie.', 'Sab.']

const actions = [
    {
        text: "Filtrar",
        name: "filter",
        icon: <MaterialCommunityIcons name="filter" color="#fff" size={20} />,
        position: 3
    },
];

const CalendarioAgenda = () => {
    const isDarkMode = useThemeColor() === "dark"
    const { data, isLoading } = useCalendario({ gestion: "" })


    const [filtro, setFiltro] = useState(0)
    const [modalFiltro, setModalFiltro] = useState(false)

    const fechas: { [key: string]: any } = useMemo(() => {
        const fechas: { [key: string]: any } = {}

        data.forEach(event => {
            const startDate = new Date(event.start);
            const endDate = new Date(event.end);
            const dayDiff = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

            for (let i = 0; i <= dayDiff; i++) {
                const currentDate = new Date(startDate);
                currentDate.setDate(startDate.getDate() + i);
                const formattedDate = currentDate.toISOString().split('T')[0];

                if (filtro === 0 || (event.tipoCalendario.includes(filtro) && filtro != 0)) {

                    if (!fechas[formattedDate]) {
                        fechas[formattedDate] = [];
                    }
                    fechas[formattedDate].push({
                        name: event.title,
                        height: 50,
                        day: formattedDate,
                        color: event.color,
                        description: event.description,
                        tipoCalendario: event.tipoCalendario
                    });
                }
            }
        });

        return fechas;
    }, [data, filtro]);

    const markedDates: { [key: string]: any } = useMemo(() => {
        const newMarkedDates: { [key: string]: any } = {}

        data.forEach(event => {
            const startDate = new Date(event.start);
            const endDate = new Date(event.end);
            const dayDiff = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

            for (let i = 0; i <= dayDiff; i++) {
                const currentDate = new Date(startDate);
                currentDate.setDate(startDate.getDate() + i);
                const formattedDate = currentDate.toISOString().split('T')[0];

                if (filtro === 0 || (event.tipoCalendario.includes(filtro) && filtro != 0)) {
                    if (!newMarkedDates[formattedDate]) {
                        newMarkedDates[formattedDate] = {
                            dots: []
                        };
                    }

                    newMarkedDates[formattedDate].dots.push({
                        color: event.color
                    });
                }

            }
        });

        return newMarkedDates;
    }, [data, filtro]);

    const renderDay = (day: any) => {
        const date = new Date(day)

        if (day) {
            return <View className='w-16 items-center justify-center'>
                <Texto className={`text-black dark:text-gray-300 ${isSameDay(new Date(), date) ? "dark:text-[#6288f5]" : ""} text-3xl`} weight='Light'>{date.toLocaleDateString("es-Es", { day: "2-digit" })}</Texto>
                <Texto className={`text-black dark:text-gray-300 ${isSameDay(new Date(), date) ? "dark:text-[#6288f5]" : ""}`} weight='Light'>{dayNames[date.getDay()]}</Texto>
            </View>;
        }
        return <View className='w-16' />;
    };

    const renderItem = (reservation: any, isFirst: boolean) => {
        return (
            <TouchableOpacity
                className={` p-4 mb-2 ${isFirst ? "mt-5" : ""}`}
                style={{ backgroundColor: reservation.color }}
                onPress={() => Alert.alert(reservation.description)}
            >
                <Texto className='text-white'>{reservation.name}</Texto>
            </TouchableOpacity>
        );
    };

    const renderEmptyDate = () => {
        return (
            <View>
                <Texto>This is empty date!</Texto>
            </View>
        );
    };

    const rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
        return r1.name !== r2.name;
    };

    const toggleModalFiltro = () => {
        setModalFiltro(!modalFiltro)
    }

    const onChangeFiltro = (flt: number) => {
        if (flt == filtro) setFiltro(0)
        else setFiltro(flt)

        toggleModalFiltro()
    }

    return (
        <>
            <CustomModal isVisible={modalFiltro} >
                <View>
                    <View>
                        <Option active={filtro == 1} onPress={() => onChangeFiltro(1)} icon='calendar' text='PRESENCIAL' justifyBetween />
                        <View className='mb-2' />
                        <Option active={filtro == 2} onPress={() => onChangeFiltro(2)} icon='calendar-multiselect' text='SEMIPRESENCIAL' justifyBetween />
                        <View className='mb-2' />
                        <Option active={filtro == 3} onPress={() => onChangeFiltro(3)} icon='calendar-star' text='EVENTOS' justifyBetween />
                    </View>

                    <View className="flex-row justify-between mt-4">
                        <Button onPress={() => toggleModalFiltro()} classNameBtn="bg-gray-400 dark:bg-primario-dark w-full p-4 rounded-lg">
                            <Texto className="text-white text-center">CERRAR</Texto>
                        </Button>
                        <View />
                    </View>
                </View>
            </CustomModal>

            <Agenda
                ListEmptyComponent={() => <Texto>GOLA</Texto>}
                items={fechas}
                //loadItemsForMonth={(x) => console.log(x)}
                //loadItemsForMonth={this.loadItems}
                //selected={'2023-08-10'}
                renderList={(p) => <ReservationList {...p} style={isDarkMode ? { backgroundColor: COLORS.dark.background } : {}} />}
                //renderList={(props) => <View {...props} className='flex-1  bg-red-300'><Texto>{JSON.stringify(props.items)}</Texto></View>}
                renderItem={renderItem}
                renderDay={renderDay}
                renderEmptyDate={renderEmptyDate}
                rowHasChanged={rowHasChanged}
                showClosingKnob={true}
                pastScrollRange={12 - (12 - new Date().getMonth())}
                futureScrollRange={12 - new Date().getMonth() - 1}
                renderEmptyData={() => <View className='bg-white dark:bg-primario-dark flex-1'><Texto className='text-center p-5 text-black dark:text-white'>{isLoading ? "CARGANDO EVENTOS" : "NO HAY NIGUN EVENTO DISPONIBLE"}</Texto></View>}
                markingType={'multi-dot'}
                calendarStyle={{ backgroundColor: isDarkMode ? COLORS.dark.secondary : "transparent" }}
                theme={isDarkMode ? {
                    calendarBackground: COLORS.dark.secondary,
                    dayTextColor: "#fff",
                    monthTextColor: "#fff",
                } : {}}
                markedDates={markedDates}

            // monthFormat={'yyyy'}
            // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
            // renderDay={this.renderDay}

            // showOnlySelectedDayItems
            // reservationsKeyExtractor={this.reservationsKeyExtractor}
            />

            <FloatingAction
                overlayColor="#0000006a"
                actions={actions}
                distanceToEdge={{ horizontal: 20, vertical: 30 }}
                onPressItem={name => {
                    if (name === "filter") {
                        toggleModalFiltro()
                    } else if (name === 'imprimir') {

                    } else if (name === "nueva_boleta") {

                    }
                }}
            />
        </>
    );
}

export default CalendarioAgenda

