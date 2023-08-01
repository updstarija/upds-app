export interface IResponseDetalleGrupo {
    status: number
    data: Data
}

export interface Data {
    informacion: IInformacion
    distribucionNotas: IDistribucionNota[]
    detalleNotas: IDetalleNotas
}

export interface IInformacion {
    grupo: string
    materia: string
    horario: string
    modulo: string
    nota: number
    docente: string
}

export interface IDistribucionNota {
    tipo: "Estratégico" | "Autónomo" | "Resolutivo" | "Receptivo" | "Preformal"
    cantidad: number
    porcentaje: number
}

export interface IDetalleNotas {
    promedio: number
    notaMaxima: number
    notaMinima: number
}
