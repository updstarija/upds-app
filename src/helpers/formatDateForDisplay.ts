import {
  differenceInDays,
  differenceInSeconds,
  format,
  isToday,
} from "date-fns";

export const formatDateForDisplay = (date: Date) => {
  if (!date) return "Invalid Date";
  const nowDate = new Date();

  if (isToday(date)) {
    const differenceSeconds = differenceInSeconds(nowDate, date);

    if (differenceSeconds < 60) {
      return "Ahora Mismo";
    } else if (differenceSeconds < 120) {
      return "Hace 1 minuto";
    } else if (differenceSeconds < 3600) {
      const minutos = Math.floor(differenceSeconds / 60);
      return `Hace ${minutos} minutos`;
    } else if (differenceSeconds < 7200) {
      return "Hace 1 hora";
    } else if (differenceSeconds < 86400) {
      const horas = Math.floor(differenceSeconds / 3600);
      return `Hace ${horas} horas`;
    } else {
      return format(date, "HH:mm a");
    }
  } else {
    const differenceDays = differenceInDays(nowDate, date);

    if (differenceDays <= 1) {
      return "Ayer " + format(date, "HH:mm a");
    } else if (differenceDays === 2) {
      return "Anteayer " + format(date, "HH:mm a");
    } else {
      return format(date, "dd/MM/yy HH:mm a");
    }
  }
};
