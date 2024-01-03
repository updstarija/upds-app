import announcementeService from "@/services/announcementeService";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

type QueryType =
  | "announcementsQuery"
  | "announcementsPriorityQuery"
  | "announcementQuery";

type HookProps = {
  id?: string;
  params: {
    category?: string;
    limitResults?: number;
    q?: string;
    type?: "superpriority" | "priority";
  };
  query?: QueryType[];
};

export const useAnnouncements = ({ id, params, query }: HookProps) => {
  const client = useQueryClient();

  if (!id && !params) {
    throw new Error("Id or params is missing");
  }

  const announcementsQuery = useInfiniteQuery(
    ["announcements", "infinite", params],
    announcementeService.getAllData,
    {
      getNextPageParam: (lastPage, pages) => {
        if (!lastPage?.lastDoc?.id) return;

        return lastPage.lastDoc;
      },
      enabled: query?.includes("announcementsQuery"),
    }
  );

  const announcementsPriorityQuery = useQuery(
    ["announcements", "priority", params.type],
    () =>
      announcementeService.getTopPriority({
        type: params.type,
        limitResults: params.limitResults,
      }),
    {
      enabled: query?.includes("announcementsPriorityQuery"),
    }
  );

  const announcementQuery = useQuery(
    ["announcements", id || ""],
    () => announcementeService.getData(id || ""),
    {
      enabled: !!id,
    }
  );

  /* const announcementQuery = useQuery({
    queryKey: ["announcement", id || "disabled"],
    queryFn: () => announcementService.getData(id || ""),
    enabled: !!id,
  }); */

  return {
    announcementsQuery,
    announcementQuery,
    announcementsPriorityQuery,
    //  announcementQuery,
  };
};
