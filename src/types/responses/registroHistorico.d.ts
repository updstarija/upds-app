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
    materiaId: number;
    nota: number
    grupo: number
    grupoMaestro: number | null
    moodle: number | null
    fechaRegistro: string | null
    estado: IEstado
}

export interface IEstado {
    id: number;
    nombre: string
}