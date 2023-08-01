export interface IResponsePlanEstudio {
    status: number
    data: IPlanEstudio[]
}

export interface IPlanEstudio {
    id: number,
    grupo: number | null
    nombre: string
    nota: string
}