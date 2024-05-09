import { updsApi } from "@/api";
import { ResponseApi } from "../../../types/response";

export type PerformanceStudent = {
  description: string;
  nota: number;
  materia: string;
};

export type ParamsGetPerformance = {
  idInscriptionCareer: number;
};

const getPerformance = async (params: ParamsGetPerformance) => {
  const { data } = await updsApi<ResponseApi<PerformanceStudent[]>>(
    "/estudiante/rendimiento",
    {
      params,
    }
  );
  return data;
};

export default {
  getPerformance,
};
