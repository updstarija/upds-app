import { useThemeColor } from "@/hooks"
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons"
import { TouchableOpacity, TouchableOpacityProps } from "react-native"
import Texto from "../ui/Texto"

interface Props extends TouchableOpacityProps {
    icon: string,
    text: string,
    active: boolean,
    justifyBetween?: boolean
}

export const Option: React.FC<Props> = ({ icon, text, justifyBetween = false, active, ...props }) => {
    const isDark = useThemeColor() == "dark"

    return <>
        <TouchableOpacity className={`${justifyBetween ? "flex-row-reverse justify-between" : "flex-row"} bg-gray-50  ${active ? "border-[#6288f5] border-[1.5px]" : "border-[.5px] dark:border-[0px] border-gray-300"} dark:bg-secondary-dark  p-5 items-center rounded-lg`}
            style={[
                { elevation: 5 },
                active && {
                    borderWidth: 1,
                    borderColor: "#6288f5"
                }]} {...props}>

            {icon.startsWith("calendar") ?

                <MaterialCommunityIcons
                    //@ts-ignore
                    name={icon} size={20} color={isDark ? "#fff" : "#000"} />
                : <Feather
                    //@ts-ignore
                    name={icon} size={20} color={isDark ? "#fff" : "#000"} />}


            <Texto className={`${justifyBetween ? "" : "ml-4"} text-black dark:text-white`} weight='Bold'>{text}</Texto>

        </TouchableOpacity>
    </>
}