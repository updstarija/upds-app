import { useQuery } from "@tanstack/react-query";
import statsService, { ParamsGetPerformance } from "../services/stats-service";

export const usePerformance = (params: ParamsGetPerformance) => {
  return useQuery({
    queryKey: ["performance"],
    queryFn: () => statsService.getPerformance(params),
  });
};
