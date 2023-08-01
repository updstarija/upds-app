import { useContext } from "react"
import { CarreraContext } from "@/context/CarreraContext"

export const useCarreraContext = () => {
    return useContext(CarreraContext)
}