import { updsApi } from "@/api";
import { IFormLogin, IResponseLogin } from "@/types";

const fakeResponse: any = {
  data: {
    usuario: {
      id: 123,
      nombre: "Dante",
      apellidoPaterno: "Arias",
      apellidoMaterno: "Tarigfa",
      documentoIdentidad: "12755611",
      fechaNacimiento: new Date(),
      celular: "126345",
      direccion: "Mi casa",
      sexo: "Masculino",
      tipoSangre: "NOSE",
      estadoCivil: "Soltero",
      nacionalidad: "Peruano",
      emailOffice365: "tj.dante.arias.t@upds.net.bo",
      email: "dantearaistarifa@gmail.com",
      telefonoReferencia: "75512323",
      sede: "Tarija",
      fechaRegistro: new Date(),
      colegio: "San Luiz",
      anioEgresoBachiller: -1,
      boletaId: -1,
      carreras: [
        {
          id: 12,
          inscripcionCarreraId: 123,
          estado: {
            id: 2,
            nombre: "Enabled",
          },
          nombre: "Sistemas",
        },
      ],
      irregular: false,
    },
    token: "test-token",
  },
  status: 200,
};

const login = async (data: IFormLogin): Promise<IResponseLogin> => {
  try {
    /*  //TODO: FIX LOGIN
     await sleep(4000);
 
     return fakeResponse; */

    const response = await updsApi.post<IResponseLogin>("/auth/login", data);
    return response.data;
  } catch (e: any) {
    console.log(e);
    throw new Error(e);
  }
};
const getProfile = async (): Promise<IResponseLogin> => {
  try {
    console.log("GETTING PROFILE");
    /*  await sleep(4000);
     throw new Error();
     return fakeResponse; */

    const response = await updsApi<IResponseLogin>("/auth/perfil");
    return response.data;
  } catch (e: any) {
    console.log(e);
    throw new Error(e);
  }
};

export default {
  login,
  getProfile,
};
