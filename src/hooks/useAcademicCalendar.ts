import academicCalendarService from "@/services/academicCalendarService";
import { TTypeCalendar } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type Props = {
  id?: string;
  params?: {
    typeCalendar?: TTypeCalendar;
    selectedDate?: Date;
  };
};

const defaultProps: Props = {
  params: {
    selectedDate: new Date(),
    typeCalendar: "Presencial",
  },
};

export const useAcademicCalendar = ({
  id = undefined,
  params,
}: Props = defaultProps) => {
  const client = useQueryClient();

  const academicCalendarsQuery = useQuery({
    queryKey: [
      "academic-calendars",
      params?.typeCalendar,
      params?.selectedDate?.getFullYear(),
      //    params?.selectedDate?.getMonth(),
    ],
    queryFn: () => academicCalendarService.getAllDataQuery(params),
  });

  return {
    academicCalendarsQuery,
  };
};
