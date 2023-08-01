import {format, formatDistanceToNow,parse} from 'date-fns'
import {es} from 'date-fns/locale'

export const formatFecha = (fecha:string) => {
    const fechaParsed = parse(fecha, "yyyy/MM/dd", new Date())
    return formatDistanceToNow(fechaParsed, {locale: es})
}


export const formatCumpleanios = (fecha:string) => {
    if(fecha.length < 5) return "N/D"
  
    return format(new Date(fecha), "dd \'de\' MMMM \'de\' yyyy", {locale: es})
}