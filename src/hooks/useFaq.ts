import { useState } from "react";
import faqService from "@/services/ServiceFaq";
import { IFaq } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useFaq = () => {
  const [data, setData] = useState<IFaq[]>([]);
  const [isLoading, setisLoading] = useState(false);
  const [lastDocument, setLastDocument] = useState<any>(undefined);

  const getFaqs = async (categoria: string = "") => {
    setisLoading(true);
    //const data = await faqService.getFaqs()
    const responseData = await faqService.getPaginatedFaqs(
      data.length,
      categoria
    );

    setData(responseData);
    setisLoading(false);

    return responseData;
  };

  const getFaqsV2 = async (categoria: string = "") => {
    setisLoading(true);
    const responseData = await faqService.getFaqsV2({
      lastDoc: lastDocument,
      limit: 5,
      filters: {
        categoria: {
          value: categoria,
          matchMode: "==",
        },
      },
    });

    const { data: newData, snapshot } = responseData;

    if (snapshot.size > 0) {
      setData([...data, ...newData]);
      setLastDocument(snapshot.docs[snapshot.docs.length - 1]);
    }
    setisLoading(false);

    return responseData;
  };

  const getFaqsV3 = async (categoria: string = "") => {
    console.log("LOADING");
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve(true);
      }, 3000)
    );
    console.log("FIN LOADING");

    const responseData = await faqService.getFaqsV2({
      lastDoc: lastDocument,
      limit: 5,
      filters: {
        categoria: {
          value: categoria,
          matchMode: "==",
        },
      },
    });

    const { data: newData, snapshot } = responseData;

    return newData;
  };

  /*  useEffect(() => {
         getFaqs()
     }, []) */
  const detalleGrupoMateriaQuery = useQuery(["xd-test"], () => getFaqsV3(), {});

  return {
    data,
    setData,
    setLastDocument,
    isLoading,
    getFaqs,
    getFaqsV2,
    lastDocument,
    detalleGrupoMateriaQuery,
  };
};
