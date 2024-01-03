import { View, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { openBrowserAsync } from "expo-web-browser";
import { useThemeColor } from "@/hooks";
import { CardCircle } from "@/components";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Texto } from "@/ui";

const data = [
  {
    id: "1",
    title: "UPDS NET",
    description: "Registra tu materia.",
    icon: "language",
    to: "/web/upds-net",
    link: false,
  },
  {
    id: "2",
    title: "MULTIPAGOS",
    description: "Realiza tus pagos de manera rápida y sencilla",
    icon: "dollar",
    to: "https://multipago.com/service/UPDS/first",
    // to: '/multipagos',
    link: true,
  },
];

const Servicios = () => {
  const isDark = useThemeColor() === "dark";
  return (
    <View className="items-center justify-center flex gap-20 flex-1">
      {/* <View style={styles.boxStyle}>
          <Text>Horario de atencion</Text>
        </View> */}

      <Link href="/web/upds-net" asChild>
        <Pressable>
          <View style={styles.touchableStyle}>
            <View
              className="bg-primario dark:bg-secondary-dark"
              style={styles.buttonStyle}
            >
              <MaterialIcons name="language" size={100} color={"#fff"} />
            </View>

            <Texto
              className="text-xl  text-primario dark:text-white text-center"
              weight="Bold"
            >
              Registra tu materia
            </Texto>
          </View>
        </Pressable>
      </Link>

      <View style={styles.touchableStyle}>
        <TouchableOpacity
          className="bg-primario dark:bg-secondary-dark"
          style={styles.buttonStyle}
          onPress={async () => {
            await openBrowserAsync("https://multipago.com/service/UPDS/first");
          }}
          activeOpacity={1}
        >
          <FontAwesome name="dollar" size={100} color="#FFF" />
        </TouchableOpacity>
        <Texto
          className="text-xl text-primario dark:text-white text-center"
          weight="Bold"
        >
          Realiza tus pagos de manera rápida y sencilla
        </Texto>
      </View>
    </View>
    /*  <View className="items-center justify-center flex gap-5 flex-1 dark:bg-primario-dark">
 

      {data.map((item) => (
        <Link
          key={item.id}
          onPress={async (e) => {
            if (item.link) {
              e.preventDefault();
              await openBrowserAsync(item.to);
              return;
            }
          }}
          //@ts-ignore
          href={item.to}
          asChild
        >
          <Pressable>
            <CardCircle icon={item.icon} title={item.description} />
          </Pressable>
        </Link>
      ))}

      {/*  <>

                <Link
                    onPress={async (e) => {
                        if (item.link) {
                            e.preventDefault();
                            await openBrowserAsync(item.to)
                            return;
                        }
                    }}

                    //@ts-ignore
                    href={item.to} asChild>
                    <Pressable >
                        <CardCircle icon={"user"} title='TEST' />
                    </Pressable>
                </Link>
            </> *
    </View> */
  );
};

const styles = StyleSheet.create({
  touchableStyle: {
    alignItems: "center",
  },
  buttonStyle: {
    padding: 40,
    borderRadius: 150,
    marginBottom: 10,
    shadowColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
    width: 180,
    height: 180,
  },
});

export default Servicios;
