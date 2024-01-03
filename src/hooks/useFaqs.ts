import announcementeService from "@/services/announcementeService";
import faqService from "@/services/faqService";
import { useInfiniteQuery } from "@tanstack/react-query";

type QueryType = "faqsQuery";

type HookProps = {
  id?: string;
  params: {
    category?: string;
    limitResults?: number;
    q?: string;
  };
  query?: QueryType[];
};

export const useFaqs = ({ id, params, query }: HookProps) => {
  if (!id && !params) {
    throw new Error("Id or params is missing");
  }

  const faqsQuery = useInfiniteQuery(
    ["faqs", "infinite", params],
    faqService.getAllData,
    {
      getNextPageParam: (lastPage, pages) => {
        if (!lastPage?.lastDoc?.id) return;

        return lastPage.lastDoc;
      },
      enabled: query?.includes("faqsQuery"),
    }
  );

  return {
    faqsQuery,
  };
};
