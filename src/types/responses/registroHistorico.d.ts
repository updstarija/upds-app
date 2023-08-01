export interface IResponseRegistroHistorico {
    status: number
    data: IPlanEstudio[]
}

export interface IRegistroHistorico {
    id: number
    nombre: string
    grupo: number
    nota: number
    estado: IEstado
}

export interface IEstado{
    id:number;
    nombre:string
}