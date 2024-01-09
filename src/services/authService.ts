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

  const response = await updsApi.post<IResponseLogin>("/auth/login", data);

  clearInterval(timeoutId);
  return response.data;
};

const getProfile = async (): Promise<IResponseLogin> => {
  let timeoutId;

  try {
    console.log("GET PROFILE");

    timeoutId = setInterval(() => {
      Toast.show({
        type: "warning",
        text1: "Alerta",
        text2:
          "Estamos presentando una alta demanda en el servidor. Se paciente",
      });
    }, 15000);

    /*  const { data } = await axios("https://jsonplaceholder.typicode.com/todos");
    console.log(data); */
    const response = await updsApi<IResponseLogin>("/auth/perfil");
    console.log(response);

    return response.data;
  } catch (error) {
    throw new Error("Hubo un error al obtener el perfil");
  } finally {
    clearInterval(timeoutId);
  }
};
export default {
  login,
  getProfile,
};
