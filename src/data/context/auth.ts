import { IResponseLogin } from "@/types";

export const initialStateAuthContext: IResponseLogin["data"] = {
  usuario: {
    id: -1,
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    documentoIdentidad: "",
    fechaNacimiento: "",
    celular: "",
    direccion: "",
    sexo: "",
    tipoSangre: "",
    estadoCivil: "",
    nacionalidad: "",
    emailOffice365: "",
    email: "",
    telefonoReferencia: "",
    sede: "",
    fechaRegistro: "",
    colegio: "",
    anioEgresoBachiller: -1,
    boletaId: -1,
    carreras: [],
    irregular: false,
  },
  token: "",
};
