export interface IResponseMateriaProyecion {
    status: number;
    data: MateriaProyeccion[];
}

export interface MateriaProyeccion {
    carrera: string;
    id: number;
    materia: string;
    materiaAdmId: number,
    modulo: string;
    semestre: string;
    turno: Turno;
    estado: {
        id: number;
        nombre: string;
    }
}


export enum Turno {
    Mañana = "Mañana",
    MedioDía = "Medio Día",
    Noche = "Noche",
    Tarde = "Tarde",
}
