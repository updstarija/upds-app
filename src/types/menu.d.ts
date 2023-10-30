import { MaterialCommunityIcons } from "@expo/vector-icons";

type MaterialComIcon = keyof typeof MaterialCommunityIcons.glyphMap;

export interface IMenu {
    label: string;
    items?: IMenu[];
    link?: string;
    icon: MaterialComIcon;
}
