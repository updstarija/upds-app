import { useContext } from "react"
import { ProyeccionesContext } from "@/context/ProyeccionesContext"

export const useProyeccionesContext = () => {
    return useContext(ProyeccionesContext)
}