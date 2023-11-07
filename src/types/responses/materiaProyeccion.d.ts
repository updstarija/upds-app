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
    turno: "Mañana" | "Medio Día" | "Noche" | "Tarde";
    estado: {
        id: number;
        nombre: string;
    }
}


