export interface IResponseRegistroHistorico {
    status: number
    data: IRegistroHistoricoGroup[]
}

export interface IRegistroHistoricoGroup {
    carrera: string
    materias: IRegistroHistorico[]
}
export interface IRegistroHistorico {
    id: number
    nombre: string
    grupo: number
    nota: number
    estado: IEstado
}

export interface IEstado {
    id: number;
    nombre: string
}