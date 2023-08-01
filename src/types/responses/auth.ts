export interface IResponseLogin {
    status: number
    data: {
        usuario: IUser,
        token: string
    }
}

export interface IUser {
    id: number
    nombre: string
    apellidoPaterno: string
    apellidoMaterno: string
    documentoIdentidad: string
    fechaNacimiento: string
    celular: string
    direccion: string
    sexo: string
    tipoSangre: string
    estadoCivil: string
    nacionalidad: string
    emailOffice365: string
    email: string
    telefonoReferencia: string
    sede: string
    fechaRegistro: string
    colegio: string
    anioEgresoBachiller: number
}