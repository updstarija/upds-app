import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import {
  useAuthContext,
  useCarreraContext,
  useCarreras,
  useThemeColor,
} from "@/hooks";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "~/constants";
import { Texto } from "@/ui";
import CustomDropdown from "@/ui/CustomDropDown";

export const SelectCarrera = () => {
  const { valueCarrera, setValueCarrera, carreras } = useCarreraContext();

  const newCarreras = carreras.map((carr) => {
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
      value={valueCarrera}
      onChange={(e) => setValueCarrera(e.id)}
    />
  );
};
