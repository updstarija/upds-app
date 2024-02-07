import CustomDropdown from "@/ui/CustomDropDown";
import { useCareerStore } from "@/store/useCareers";

export const SelectCarrera = () => {
  const { selectedCareer, setSelectedCareer, careers } = useCareerStore();

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
      onChange={(e) => setSelectedCareer(e.id)}
    />
  );
};
