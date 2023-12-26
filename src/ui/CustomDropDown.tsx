import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown as RNDropdown } from "react-native-element-dropdown";
import { useColorScheme } from "nativewind";
import {
  DropdownProps,
  IDropdownRef,
} from "react-native-element-dropdown/lib/typescript/components/Dropdown/model";
import { Icon, TIcon } from "@/components/Icon";
import { PALLETE_COLORS } from "~/constants";

type Props = {
  label?: string;
  icon?: TIcon["icon"];
  error?: string;
  withAsterisk?: boolean;
  dropdownRef?: React.RefObject<IDropdownRef>;
  disabled?: boolean;
} & DropdownProps<any>;

const CustomDropdown: React.FC<Props> = ({
  label,
  icon,
  error,
  withAsterisk,
  dropdownRef,
  disabled,
  ...props
}) => {
  const [isFocus, setIsFocus] = useState(false);

  const isDark = useColorScheme().colorScheme === "dark";

  const isError = !!error;

  return (
    <View style={styles.container}>
      {label && (
        <Text className="mb-1 text-md  font-bold">
          {label} {withAsterisk && <Text className="text-red-400">*</Text>}
        </Text>
      )}

      <View>
        <RNDropdown
          ref={dropdownRef}
          placeholder="Selecciona un item"
          {...props}
          onChange={(item) => {
            props.onChange && props.onChange(item);
            setIsFocus(false);
          }}
          style={[
            styles.dropdown,
            isError && { borderColor: "red" },
            isFocus && { borderColor: PALLETE_COLORS.primary[700] },
            isDark
              ? { backgroundColor: "#0D1F46" }
              : {
                  backgroundColor: "#FFF",
                  borderColor: PALLETE_COLORS.primary[700],
                  borderWidth: 0.5,
                },
          ]}
          placeholderStyle={[
            styles.placeholderStyle,
            isDark
              ? { color: PALLETE_COLORS.primary[100] }
              : { color: PALLETE_COLORS.primary[600] },
          ]}
          selectedTextStyle={[
            styles.selectedTextStyle,
            isDark ? { color: "#FFF" } : { color: PALLETE_COLORS.primary[600] },
          ]}
          /*           itemContainerStyle={{
            backgroundColor: "#0D1F46",
          }}
          itemTextStyle={[
            styles.selectedTextStyle,
            isDark ? { color: "#FFF" } : { color: PALLETE_COLORS.primary[600] },
          ]} */
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          maxHeight={300}
          searchPlaceholder="Buscar..."
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          renderLeftIcon={() => (
            <>
              {icon && (
                <Icon
                  icon={icon}
                  style={{
                    color: isDark
                      ? PALLETE_COLORS.primary[100]
                      : PALLETE_COLORS.primary[600],
                    fontSize: 22,
                    marginRight: 10,
                  }}
                />
              )}

              {/* <AntDesign
            style={styles.icon}
            color={isDark ? PALLETE_COLORS.primary[100] : PALLETE_COLORS.primary[600]}
            name="Safety"
            size={20}
          /> */}
            </>
          )}
        />
        {disabled && (
          <View className="absolute top-0 right-0 bottom-0 left-0 bg-white/40"></View>
        )}
      </View>

      {error && <Text className="text-red-400">{error}</Text>}
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    position: "relative",
  },
  dropdown: {
    padding: 8,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },

  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
