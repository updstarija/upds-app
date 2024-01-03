import { ICarrera } from "./carreras";

export interface IResponseLogin {
  status: number;
  data: {
    usuario: IUser;
    token: string;
  };
}

export interface IUser {
  id: number;
  anioEgresoBachiller: number;
  apellidoMaterno: string;
  apellidoPaterno: string;
  boletaId: number;
  carreras: ICarrera[];
  celular: string;
  colegio: string;
  direccion: string;
  documentoIdentidad: string;
  email: string;
  emailOffice365: string;
  estadoCivil: string;
  fechaNacimiento: string;
  fechaRegistro: string;
  nacionalidad: string;
  nombre: string;
  sede: string;
  sexo: string;
  telefonoReferencia: string;
  tipoSangre: string;
  irregular: boolean;
}
