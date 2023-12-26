import {
  FontAwesome,
  Ionicons,
  MaterialIcons,
  AntDesign,
  MaterialCommunityIcons,
  EvilIcons,
  Fontisto,
  Feather,
} from "@expo/vector-icons";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import { useColorScheme } from "nativewind";

export enum IconType {
  MatetrialIcon,
  FontAweomseIcon,
  Ionicon,
  AntDesign,
  MaterialCommunityIcons,
  EvilIcons,
  Fontisto,
  Feather,
}

export const Colors = {
  primario: {
    "50": "#eeeeff",
    "100": "#e0e1ff",
    "200": "#c7c8fe",
    "300": "#a5a7fc",
    "400": "#8184f8",
    "500": "#6366f1",
    "600": "#4649e5",
    "700": "#383bca",
    "800": "#3032a3",
    "900": "#2e3081",
    "950": "#1b1c4b",
    dark: "#1b1c4b",
  },
};

export type TIcon = {
  icon:
    | {
        type: IconType.MatetrialIcon;
        name: keyof typeof MaterialIcons.glyphMap;
      }
    | {
        type: IconType.FontAweomseIcon;
        name: keyof typeof FontAwesome.glyphMap;
      }
    | { type: IconType.Ionicon; name: keyof typeof Ionicons.glyphMap }
    | { type: IconType.AntDesign; name: keyof typeof AntDesign.glyphMap }
    | {
        type: IconType.MaterialCommunityIcons;
        name: keyof typeof MaterialCommunityIcons.glyphMap;
      }
    | { type: IconType.EvilIcons; name: keyof typeof EvilIcons.glyphMap }
    | { type: IconType.Fontisto; name: keyof typeof Fontisto.glyphMap }
    | { type: IconType.Feather; name: keyof typeof Feather.glyphMap };
} & Omit<IconProps<keyof typeof FontAwesome.glyphMap>, "name">;

export const Icon = ({ icon, color, ...props }: TIcon) => {
  const isDark = useColorScheme().colorScheme === "dark";

  const DEFAULT_SIZE = 15;
  const DEFAULT_COLOR = isDark ? "#FFF" : "#000";
  const DEFAULT_STYLE = {
    marginRight: 10,
  };

  return (
    <>
      {icon.type === IconType.FontAweomseIcon && (
        <FontAwesome
          {...props}
          name={icon.name}
          size={props.size ? props.size : DEFAULT_SIZE}
          color={color ? color : DEFAULT_COLOR}
          style={[DEFAULT_STYLE, props.style]}
        />
      )}
      {icon.type === IconType.MatetrialIcon && (
        <MaterialIcons
          {...props}
          name={icon.name}
          size={props.size ? props.size : DEFAULT_SIZE}
          color={color ? color : DEFAULT_COLOR}
          style={[DEFAULT_STYLE, props.style]}
        />
      )}

      {icon.type === IconType.Ionicon && (
        <Ionicons
          {...props}
          name={icon.name}
          size={props.size ? props.size : DEFAULT_SIZE}
          color={color ? color : DEFAULT_COLOR}
          style={[DEFAULT_STYLE, props.style]}
        />
      )}

      {icon.type === IconType.AntDesign && (
        <AntDesign
          {...props}
          name={icon.name}
          size={props.size ? props.size : DEFAULT_SIZE}
          color={color ? color : DEFAULT_COLOR}
          style={[DEFAULT_STYLE, props.style]}
        />
      )}

      {icon.type === IconType.MaterialCommunityIcons && (
        <MaterialCommunityIcons
          {...props}
          name={icon.name}
          size={props.size ? props.size : DEFAULT_SIZE}
          color={color ? color : DEFAULT_COLOR}
          style={[DEFAULT_STYLE, props.style]}
        />
      )}

      {icon.type === IconType.EvilIcons && (
        <EvilIcons
          {...props}
          name={icon.name}
          size={props.size ? props.size : DEFAULT_SIZE}
          color={color ? color : DEFAULT_COLOR}
          style={[DEFAULT_STYLE, props.style]}
        />
      )}

      {icon.type === IconType.Fontisto && (
        <Fontisto
          {...props}
          name={icon.name}
          size={props.size ? props.size : DEFAULT_SIZE}
          color={color ? color : DEFAULT_COLOR}
          style={[DEFAULT_STYLE, props.style]}
        />
      )}

      {icon.type === IconType.Feather && (
        <Feather
          {...props}
          name={icon.name}
          size={props.size ? props.size : DEFAULT_SIZE}
          color={color ? color : DEFAULT_COLOR}
          style={[DEFAULT_STYLE, props.style]}
        />
      )}
    </>
  );
};
