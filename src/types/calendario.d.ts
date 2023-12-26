export interface ICalendarioAcademico {
  id: string;
  color: string;
  start: Date;
  end: Date;
  title: string;
  description?: string;
  typeCalendar: TTypeCalendar[];
  fullDay: boolean;
}

export type TTypeCalendar =
  | "Presencial"
  | "Semipresencial"
  | "Eventos"
  | "Todos";
