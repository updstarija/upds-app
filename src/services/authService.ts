import { updsApi } from "@/api";
import axios, { CancelToken } from "axios";
import { IFormLogin, IResponseLogin } from "@/types";
import Toast from "react-native-toast-message";

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
    const source = axios.CancelToken.source();

    const timeoutId = setTimeout(() => {
      source.cancel(
        "La solicitud fue cancelada debido a una alta demanda en el servidor"
      );
    }, 30000);

    const response = await updsApi.post<IResponseLogin>("/auth/login", data, {
      cancelToken: source.token,
    });

    clearTimeout(timeoutId);
    return response.data;
  } catch (e: any) {
    console.log(e.response.status, "CATCH ERROR");
    throw new Error(e);
  }
};

const getProfile = async (): Promise<IResponseLogin> => {
  try {
    console.log("GET PROFILE");
    const source = axios.CancelToken.source();

    const timeoutId = setTimeout(() => {
      Toast.show({
        type: "warning",
        text1: "Alerta",
        text2: "Estamos presentando una alta demanda en el servidor. Se paciente"
      })
    }, 15000);

    const response = await updsApi<IResponseLogin>("/auth/perfil");

    clearTimeout(timeoutId);
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      throw new Error(error.message); // Lanzar una excepción con el mensaje de cancelación
    } else {
      console.log(error);
      throw new Error("Hubo un error al obtener el perfil"); // Mensaje de error predeterminado
    }
  }
};
export default {
  login,
  getProfile,
};
