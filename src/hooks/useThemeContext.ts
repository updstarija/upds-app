import { useContext } from "react"
import { ThemeContext } from "@/context/ThemeContext"

export const useThemeContext = () => {
    return useContext(ThemeContext)
}