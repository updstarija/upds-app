export interface IResponseMateriaRequisito {
    status: number;
    data: {
        prerequisito: MateriaProyeccion[]
        corequisito: MateriaProyeccion[]
    };
}

export interface MateriaRequisito{
    id: number;
    nombre: string
}

export interface IResponseMateriaBase {
    status: number;
    data: IMateriaBase[]
}

export interface IMateriaBase{
    id: number;
    nombre: string
}
