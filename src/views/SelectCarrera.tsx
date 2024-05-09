import CustomDropdown from "@/ui/CustomDropDown";
import { useCareerStore } from "@/store/useCareers";
import { ICarrera } from "@/types";

export const SelectCarrera = () => {
  const {
    selectedCareer,
    setSelectedCareer,
    careers,
    setSelectedInscriptionCareer,
  } = useCareerStore();

  const newCarreras = careers.map((carr) => {
    return {
      ...carr,
      // disabled: carr.estado.id != 0,
      containerStyle: {
        backgroundColor: carr.estado.id != 0 ? "#e74c3c" : "",
      },
    };
  });

  return (
    <CustomDropdown
      data={newCarreras}
      labelField={"nombre"}
      valueField={"id"}
      search
      value={selectedCareer}
      onChange={(e: ICarrera) => {
        setSelectedCareer(e.id);
        setSelectedInscriptionCareer(e.inscripcionCarreraId);
      }}
    />
  );
};
