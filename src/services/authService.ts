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
  const timeoutId = setInterval(() => {
    Toast.show({
      type: "warning",
      text1: "Alerta",
      text2: "Estamos presentando una alta demanda en el servidor. Se paciente",
    });
  }, 15000);

  try {
    const response = await updsApi.post<IResponseLogin>("/auth/login", data);
    return response.data;
  } catch (e) {
    throw e
  }
  finally {
    clearInterval(timeoutId);
  }
};

const getProfile = async (): Promise<IResponseLogin> => {
  const timeoutId = setInterval(() => {
    Toast.show({
      type: "warning",
      text1: "Alerta",
      text2:
        "Estamos presentando una alta demanda en el servidor. Se paciente",
    });
  }, 15000);

  try {
    console.log("GET PROFILE");
    /*  const { data } = await axios("https://jsonplaceholder.typicode.com/todos");
    console.log(data); */
    const response = await updsApi<IResponseLogin>("/auth/perfil");
    return response.data;
  } catch (e) {
    throw e
  } finally {
    clearInterval(timeoutId);
  }
};

export default {
  login,
  getProfile,
};
