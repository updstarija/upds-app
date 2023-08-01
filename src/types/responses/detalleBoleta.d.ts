export interface IResponseDetalleBoleta {
    data: DetalleBoleta[];
    info: InfoBoleta;
    status: number;
}

export interface DetalleBoleta {
    id: number;
    materia: string;
    modulo: string;
    turno: string;
    materiaAdmId: number
}

export interface Materia {
    id: number;
    materia: string;
    modulo: string;
    turno: string;
}

export interface Info {
    maxMaterias: number;
}

export interface InfoBoleta {
    boleta: number;
}
