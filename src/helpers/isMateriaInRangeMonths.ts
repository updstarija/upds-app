import { differenceInMonths } from "date-fns"

export const isMateriaInRangeMonths = (fecha: string) => {
    const actualFecha = new Date()
    const fechaModulo = new Date(fecha)
    return differenceInMonths(actualFecha, fechaModulo) < 3
}