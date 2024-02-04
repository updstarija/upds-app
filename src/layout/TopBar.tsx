import { TouchableOpacity, View } from "react-native";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useAuthContext } from "@/hooks";
import * as Animatable from "react-native-animatable";
import { Texto } from "@/ui";
import { usePopupWindowStore } from "@/store/usePopupWindow.store";

export const TopBar = () => {
  const { status } = useAuthContext();
  const { openAlerts } = usePopupWindowStore();

  return (
    <View className="bg-white dark:bg-primario-dark ">
      <View className="bg-primario dark:bg-secondary-dark  rounded-b-[50px]  ">
        <View className="flex-row justify-between px-1 mt-3 items-center">
          <View>
            <DrawerToggleButton tintColor="#fff" />
          </View>

          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => openAlerts()}>
              <MaterialIcons name="announcement" color={"#FFF"} size={23} />
            </TouchableOpacity>

            <Link className="p-2" href="/notifications">
              <MaterialIcons name="notifications" color={"#FFF"} size={23} />

              <Animatable.View
                animation={{
                  from: {
                    transform: [{ scale: 1 }],
                  },
                  to: {
                    transform: [{ scale: 1.25 }],
                  },
                }}
                easing="ease-out-quad"
                iterationCount="infinite"
                style={{
                  position: "absolute",
                  top: -10,
                  right: 100,
                  width: 9,
                  height: 9,
                  backgroundColor: "#4f90f7",
                  borderRadius: 50,
                }}
              ></Animatable.View>
            </Link>

            {status === "authenticated" && (
              <Link className="mr-4 p-2 " href="/profile">
                <FontAwesome name="user-circle-o" size={20} color="#fff" />
              </Link>
            )}
          </View>
        </View>

        <View className="px-5  py-4 mb-4">
          <Texto className="text-xl  text-white" weight="Bold">
            Universidad Privada Domingo Savio
          </Texto>
          <Texto className="text-lg text-white " weight="Bold">
            Sede Tarija
          </Texto>
          {/*  <Texto className="text-white">Bienvenido</Texto> */}
        </View>
      </View>
    </View>
  );
};
