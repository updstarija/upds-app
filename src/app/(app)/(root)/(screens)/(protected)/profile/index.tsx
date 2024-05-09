import { ScrollView, View } from "react-native";
import { useAuth, useThemeColor } from "@/hooks";
import { Texto } from "@/ui";
import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { formatCumpleanios, nombreCompleto } from "@/helpers";

const Perfil = () => {
  const isDarkMode = useThemeColor() === "dark";

  const { user } = useAuth();

  return (
    <View className=" flex-1 bg-primario dark:bg-secondary-dark">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="justify-center items-center">
          <View className="flex-row items-center mt-10">
            <View className="p-0.5 border-[2px] border-white rounded-full">
              <FontAwesome name="user-circle" size={50} color={"#fff"} />
            </View>

            <View className="ml-4">
              <Texto className="text-white">{nombreCompleto(user)}</Texto>
              <Texto className="text-white">{user.email}</Texto>
            </View>
          </View>
        </View>

        <View className="mt-10 bg-white dark:bg-primario-dark flex-1 rounded-3xl p-4 max-w-2xl mx-auto w-full">
          <View className="mt-5">
            <View>
              <Texto
                className="text-center text-black dark:text-white text-xl"
                weight="Bold"
              >
                INFORMACIÓN PERSONAL
              </Texto>
              <View className="border-[.5px] border-gray-300 dark:border-gray-100 mt-1" />
            </View>

            <View className="mt-4 flex-row justify-between items-center">
              <View className="flex-row items-center">
                <FontAwesome
                  name="user"
                  color={isDarkMode ? "#FFF" : "#000"}
                  size={20}
                  style={{ width: 30 }}
                />
                <Texto
                  className="ml-1 text-black dark:text-white "
                  weight="Bold"
                >
                  Nombre
                </Texto>
              </View>

              <Texto>{nombreCompleto(user)}</Texto>
            </View>

            <View className="mt-4 flex-row justify-between items-center">
              <View className="flex-row items-center">
                <FontAwesome
                  name="vcard"
                  color={isDarkMode ? "#FFF" : "#000"}
                  size={20}
                  style={{ width: 30 }}
                />
                <Texto
                  className="ml-1 text-black dark:text-white "
                  weight="Bold"
                >
                  Documento de Identidad
                </Texto>
              </View>

              <Texto>{user.documentoIdentidad}</Texto>
            </View>

            <View className="mt-4 flex-row justify-between items-center">
              <View className="flex-row items-center">
                <FontAwesome
                  name="calendar"
                  color={isDarkMode ? "#FFF" : "#000"}
                  size={20}
                  style={{ width: 30 }}
                />
                <Texto
                  className="ml-1 text-black dark:text-white "
                  weight="Bold"
                >
                  Fecha de Nacimiento
                </Texto>
              </View>

              <Texto>{formatCumpleanios(user.fechaNacimiento)}</Texto>
            </View>

            <View className="mt-4 flex-row justify-between items-center">
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="earth"
                  color={isDarkMode ? "#FFF" : "#000"}
                  size={20}
                  style={{ width: 30 }}
                />
                <Texto
                  className="ml-1 text-black dark:text-white "
                  weight="Bold"
                >
                  Nacionalidad
                </Texto>
              </View>

              <Texto>{user.nacionalidad || "N/D"}</Texto>
            </View>

            <View className="mt-4 flex-row justify-between items-center">
              <View className="flex-row items-center">
                <FontAwesome
                  name="transgender"
                  color={isDarkMode ? "#FFF" : "#000"}
                  size={20}
                  style={{ width: 30 }}
                />
                <Texto
                  className="ml-1 text-black dark:text-white "
                  weight="Bold"
                >
                  Genero
                </Texto>
              </View>

              <Texto>{user.sexo}</Texto>
            </View>

            <View className="mt-4 flex-row justify-between items-center">
              <View className="flex-row items-center">
                <FontAwesome
                  name="home"
                  color={isDarkMode ? "#FFF" : "#000"}
                  size={20}
                  style={{ width: 30 }}
                />
                <Texto
                  className="ml-1 text-black dark:text-white "
                  weight="Bold"
                >
                  Domicilio
                </Texto>
              </View>

              <Texto>{user.direccion}</Texto>
            </View>

            <View className="mt-4 flex-row justify-between items-center">
              <View className="flex-row items-center">
                <FontAwesome
                  name="heartbeat"
                  color={isDarkMode ? "#FFF" : "#000"}
                  size={20}
                  style={{ width: 30 }}
                />
                <Texto
                  className="ml-1 text-black dark:text-white "
                  weight="Bold"
                >
                  Tipo de Sangre
                </Texto>
              </View>

              <Texto>{user.tipoSangre}</Texto>
            </View>

            <View className="mt-4 flex-row justify-between items-center">
              <View className="flex-row items-center">
                <FontAwesome
                  name="puzzle-piece"
                  color={isDarkMode ? "#FFF" : "#000"}
                  size={20}
                  style={{ width: 30 }}
                />
                <Texto
                  className="ml-1 text-black dark:text-white "
                  weight="Bold"
                >
                  Estado Civil
                </Texto>
              </View>

              <Texto>{user.estadoCivil}</Texto>
            </View>
          </View>

          {/* CONTACO */}
          <View className="mt-10">
            <View>
              <Texto
                className="text-center text-black dark:text-white text-xl"
                weight="Bold"
              >
                INFORMACIÓN DE CONTACTO
              </Texto>
              <View className="border-[.5px] border-gray-300 dark:border-gray-100 mt-1" />
            </View>

            <View className="mt-4 flex-row justify-between items-center">
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="microsoft-office"
                  color={isDarkMode ? "#FFF" : "#000"}
                  size={20}
                  style={{ width: 30 }}
                />
                <Texto
                  className="ml-1 text-black dark:text-white "
                  weight="Bold"
                >
                  Office 365
                </Texto>
              </View>

              <Texto>{user.emailOffice365}</Texto>
            </View>

            <View className="mt-4 flex-row justify-between items-center">
              <View className="flex-row items-center">
                <MaterialIcons
                  name="mail-outline"
                  color={isDarkMode ? "#FFF" : "#000"}
                  size={20}
                  style={{ width: 30 }}
                />
                <Texto
                  className="ml-1 text-black dark:text-white "
                  weight="Bold"
                >
                  E-Mail
                </Texto>
              </View>

              <Texto>{user.email}</Texto>
            </View>

            <View className="mt-4 flex-row justify-between items-center">
              <View className="flex-row items-center">
                <FontAwesome
                  name="phone"
                  color={isDarkMode ? "#FFF" : "#000"}
                  size={20}
                  style={{ width: 30 }}
                />
                <Texto
                  className="ml-1 text-black dark:text-white "
                  weight="Bold"
                >
                  Celular
                </Texto>
              </View>

              <Texto>{user.celular}</Texto>
            </View>

            <View className="mt-4 flex-row justify-between items-center">
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="phone-message"
                  color={isDarkMode ? "#FFF" : "#000"}
                  size={20}
                  style={{ width: 30 }}
                />
                <Texto
                  className="ml-1 text-black dark:text-white "
                  weight="Bold"
                >
                  Telefono de Referencia
                </Texto>
              </View>

              <Texto>{user.telefonoReferencia}</Texto>
            </View>
          </View>

          {/* ACADEMICA */}
          <View className="mt-10">
            <View>
              <Texto
                className="text-center text-black dark:text-white text-xl"
                weight="Bold"
              >
                INFORMACIÓN ACADEMICA
              </Texto>
              <View className="border-[.5px] border-gray-300 dark:border-gray-100 mt-1" />
            </View>

            <View className="mt-4 flex-row justify-between items-center">
              <View className="flex-row items-center">
                <FontAwesome
                  name="institution"
                  color={isDarkMode ? "#FFF" : "#000"}
                  size={20}
                  style={{ width: 30 }}
                />
                <Texto
                  className="ml-1 text-black dark:text-white "
                  weight="Bold"
                >
                  Sede
                </Texto>
              </View>

              <Texto>{user.sede}</Texto>
            </View>

            <View className="mt-4 flex-row justify-between items-center">
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="calendar-today"
                  color={isDarkMode ? "#FFF" : "#000"}
                  size={20}
                  style={{ width: 30 }}
                />
                <Texto
                  className="ml-1 text-black dark:text-white "
                  weight="Bold"
                >
                  Fecha de Registro
                </Texto>
              </View>

              <Texto>{formatCumpleanios(user.fechaRegistro)}</Texto>
            </View>

            <View className="mt-4 flex-row justify-between items-center">
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="school-outline"
                  color={isDarkMode ? "#FFF" : "#000"}
                  size={20}
                  style={{ width: 30 }}
                />
                <Texto
                  className="ml-1 text-black dark:text-white "
                  weight="Bold"
                >
                  Colegio
                </Texto>
              </View>

              <Texto>{user.colegio}</Texto>
            </View>

            <View className="mt-4 flex-row justify-between items-center">
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="calendar-clock"
                  color={isDarkMode ? "#FFF" : "#000"}
                  size={20}
                  style={{ width: 30 }}
                />
                <Texto
                  className="ml-1 text-black dark:text-white "
                  weight="Bold"
                >
                  Año de Egreso
                </Texto>
              </View>

              <Texto>{user.anioEgresoBachiller}</Texto>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Perfil;
