import { FontAwesome } from "@expo/vector-icons";

type IconProp = keyof typeof FontAwesome.glyphMap;

export const etiquetas: { [key: number]: { color: string, icon: IconProp } } = {
    "-1": {
        color: "transparent",
        icon: "unlock",
    },
    0: {
        color: "gray",
        icon: "clock-o"
    },
    1: {
        color: "#07bc0c",
        icon: "check"
    },
    2: {
        color: "#e74c3c",
        icon: "close"
    },
    3: {
        color: "#f1c40f",
        icon: "star"
    }
}