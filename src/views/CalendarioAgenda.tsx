import { useMemo, useState } from "react";
import { Alert, View, TouchableOpacity } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import { Agenda, AgendaEntry } from "react-native-calendars";
import ReservationList from "react-native-calendars/src/agenda/reservation-list";
import { isSameDay } from "date-fns";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "~/constants";
import { useCalendario, useThemeColor } from "@/hooks";
import { Button, Option } from "@/components";
import { CustomModal, Modal, Texto } from "@/ui";
import { useAcademicCalendar } from "@/hooks/useAcademicCalendar";
import { TTypeCalendar } from "@/types";

const dayNames = ["Dom.", "Lun.", "Mar.", "Mie.", "Jue.", "Vie.", "Sab."];

const actions = [
  {
    text: "Filtrar",
    name: "filter",
    icon: <MaterialCommunityIcons name="filter" color="#fff" size={20} />,
    position: 3,
  },
];

const CalendarioAgenda = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [typeCalendar, setTypeCalendar] = useState<TTypeCalendar>("Todos");
  const { academicCalendarsQuery } = useAcademicCalendar({
    params: {
      selectedDate,
      typeCalendar,
    },
  });

  const data = academicCalendarsQuery.data;

  const isDarkMode = useThemeColor() === "dark";
  //  const { data, isLoading } = useCalendario({ gestion: "" });

  const [filtro, setFiltro] = useState(0);
  const [modalFiltro, setModalFiltro] = useState(false);

  const fechas: { [key: string]: any } = useMemo(() => {
    if (
      academicCalendarsQuery.isLoading ||
      academicCalendarsQuery.isError ||
      !data
    )
      return {};
    const fechas: { [key: string]: any } = {};

    data.forEach((event) => {
      const { start: startDate, end: endDate } = event;

      const dayDiff =
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

      for (let i = 0; i <= dayDiff; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        const formattedDate = currentDate.toISOString().split("T")[0];

        if (!fechas[formattedDate]) {
          fechas[formattedDate] = [];
        }
        fechas[formattedDate].push({
          name: event.title,
          height: 50,
          day: formattedDate,
          color: event.color,
          description: event.description,
          typeCalendar: event.typeCalendar,
        });
      }
    });

    return fechas;
  }, [academicCalendarsQuery.data, filtro]);

  const markedDates: { [key: string]: any } = useMemo(() => {
    if (
      academicCalendarsQuery.isLoading ||
      academicCalendarsQuery.isError ||
      !data
    )
      return {};

    const newMarkedDates: { [key: string]: any } = {};

    data.forEach((event) => {
      const { start: startDate, end: endDate } = event;

      const dayDiff =
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

      for (let i = 0; i <= dayDiff; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        const formattedDate = currentDate.toISOString().split("T")[0];

        if (!newMarkedDates[formattedDate]) {
          newMarkedDates[formattedDate] = {
            dots: [],
          };
        }

        newMarkedDates[formattedDate].dots.push({
          color: event.color,
        });
      }
    });

    return newMarkedDates;
  }, [academicCalendarsQuery.data, filtro]);

  const renderDay = (day: any) => {
    const date = new Date(day);

    if (day) {
      return (
        <View className="w-16 items-center justify-center">
          <Texto
            className={`text-black dark:text-gray-300 ${
              isSameDay(new Date(), date) ? "dark:text-[#6288f5]" : ""
            } text-3xl`}
            weight="Light"
          >
            {date.toLocaleDateString("es-Es", { day: "2-digit" })}
          </Texto>
          <Texto
            className={`text-black dark:text-gray-300 ${
              isSameDay(new Date(), date) ? "dark:text-[#6288f5]" : ""
            }`}
            weight="Light"
          >
            {dayNames[date.getDay()]}
          </Texto>
        </View>
      );
    }
    return <View className="w-16" />;
  };

  const renderItem = (reservation: any, isFirst: boolean) => {
    return (
      <TouchableOpacity
        className={` p-4 mb-2 ${isFirst ? "mt-5" : ""}`}
        style={{ backgroundColor: reservation.color }}
        onPress={() => Alert.alert(reservation.description)}
      >
        <Texto className="text-white">{reservation.name}</Texto>
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
    setModalFiltro(!modalFiltro);
  };

  const onChangeFiltro = (flt: number) => {
    if (flt == filtro) setFiltro(0);
    else setFiltro(flt);

    toggleModalFiltro();
  };

  function formatDateToYYYYMMDD(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Se suma 1 porque los meses son indexados desde 0
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  return (
    <>
      <CustomModal isVisible={modalFiltro}>
        <View>
          <View>
            <Option
              active={typeCalendar == "Presencial"}
              onPress={() => setTypeCalendar("Presencial")}
              icon="calendar"
              text="PRESENCIAL"
              justifyBetween
            />
            <View className="mb-2" />
            <Option
              active={typeCalendar == "Semipresencial"}
              onPress={() => setTypeCalendar("Semipresencial")}
              icon="calendar-multiselect"
              text="SEMIPRESENCIAL"
              justifyBetween
            />
            <View className="mb-2" />
            <Option
              active={typeCalendar == "Eventos"}
              onPress={() => setTypeCalendar("Eventos")}
              icon="calendar-star"
              text="EVENTOS"
              justifyBetween
            />
          </View>

          <View className="flex-row justify-between mt-4">
            <Button
              onPress={() => toggleModalFiltro()}
              classNameBtn="bg-gray-400 dark:bg-primario-dark w-full p-4 rounded-lg"
            >
              <Texto className="text-white text-center">CERRAR</Texto>
            </Button>
            <View />
          </View>
        </View>
      </CustomModal>

      <Agenda
        ListEmptyComponent={() => <Texto>GOLA</Texto>}
        items={fechas}
        /*  onMonthChange={(x) => {
          if (x.year !== selectedDate.getFullYear()) {
            setSelectedDate(new Date(x.dateString));
          }
        }} */
        displayLoadingIndicator={academicCalendarsQuery.isLoading}
        renderList={(p) => (
          <ReservationList
            {...p}
            style={
              isDarkMode ? { backgroundColor: COLORS.dark.background } : {}
            }
          />
        )}
        //renderList={(props) => <View {...props} className='flex-1  bg-red-300'><Texto>{JSON.stringify(props.items)}</Texto></View>}
        renderItem={renderItem}
        renderDay={renderDay}
        renderEmptyDate={renderEmptyDate}
        rowHasChanged={rowHasChanged}
        showClosingKnob
        horizontal
        //  selected={"2024-01-01"}
        /*  pastScrollRange={12 - (12 - new Date().getMonth())}
        futureScrollRange={12 - new Date().getMonth() - 1} */
        renderHeader={(x: Date) => {
          const formattedDate = formatDateToYYYYMMDD(x);

          return (
            <>
              <View className="mr-5">
                <Texto>
                  {new Date(x.toDateString())
                    .toLocaleDateString("es-ES", {
                      month: "long",
                    })
                    .toUpperCase()}
                </Texto>
              </View>

              {!academicCalendarsQuery.isFetching &&
                !Object.keys(fechas).some((y) => {
                  console.log({
                    y,
                    formattedDate,
                  });
                  return y == formattedDate;
                }) && <Texto>SIN EVENTOS</Texto>}
            </>
          );
        }}
        renderEmptyData={() => (
          <View className="bg-white dark:bg-primario-dark flex-1">
            <Texto className="text-center p-5 text-black dark:text-white">
              {academicCalendarsQuery.isLoading
                ? "CARGANDO EVENTOS"
                : "NO HAY NIGUN EVENTO DISPONIBLE"}
            </Texto>
          </View>
        )}
        markingType={"multi-dot"}
        calendarStyle={{
          backgroundColor: isDarkMode ? COLORS.dark.secondary : "transparent",
        }}
        theme={
          isDarkMode
            ? {
                calendarBackground: COLORS.dark.secondary,
                dayTextColor: "#fff",
                monthTextColor: "#fff",
              }
            : {}
        }
        markedDates={markedDates}
        /*   onMonthChange={(e) => {
        console.log(e);
      }} */

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
        onPressItem={(name) => {
          if (name === "filter") {
            toggleModalFiltro();
          } else if (name === "imprimir") {
          } else if (name === "nueva_boleta") {
          }
        }}
      />
    </>
  );
};

export default CalendarioAgenda;
