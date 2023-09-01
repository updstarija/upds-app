import {format, formatDistanceToNow,parse} from 'date-fns'
import {es} from 'date-fns/locale'

export const formatFecha = (fecha:string) => {
    if(!fecha) return "N/D"

    return formatDistanceToNow(new Date(Number(fecha)), {locale: es})
}


export const formatCumpleanios = (fecha:string) => {
    if(!fecha || fecha.length < 5) return "N/D"
  
    return format(new Date(fecha), "dd \'de\' MMMM \'de\' yyyy", {locale: es})
}

export const formatFechaDMY = (fecha:string | null) => {
    if(!fecha) return "S/F"
    const fechaParsed = new Date(fecha)
    return fechaParsed.toLocaleDateString("es-ES", {
        day:"2-digit",
        month:"2-digit",
        year: "numeric",
        minute: "2-digit",
        hour:"2-digit",
        hour12: false
    })
}