
import { IEstado } from "./registroHistorico";

export interface IResponseCarreras {

}

export interface ICarrera {
    id: number;
    nombre: string
    estado: IEstado
}