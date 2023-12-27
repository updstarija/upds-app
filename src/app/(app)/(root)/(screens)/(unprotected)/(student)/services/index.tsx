import { View, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import { openBrowserAsync } from "expo-web-browser";
import { useThemeColor } from "@/hooks";
import { CardCircle } from "@/components";

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
    <View className="items-center justify-center flex gap-5 flex-1 dark:bg-primario-dark">
      {/* <View style={styles.boxStyle}>
              <Text>Horario de atencion</Text>
            </View> */}

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
            </> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  list: {
    paddingHorizontal: 10,
  },
  listContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card: {
    marginVertical: 8,
    flexBasis: "45%",
    marginHorizontal: 10,
    elevation: 10,
  },
  cardContent: {
    paddingVertical: 17,
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  cardImage: {
    // height: 150,
    // width: 0,
    width: 150,
    height: 150,
    resizeMode: "cover",
  },
  imageContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    alignItems: "center",
  },
});

export default Servicios;
