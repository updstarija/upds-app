import { IRegistroHistorico } from "./registroHistorico"

export interface IResponsePlanEstudio {
    status: number
    data: IPlanEstudio[]
}
x
export interface IPlanEstudio extends IRegistroHistorico{
    
}