import { View } from "react-native";
import { useThemeContext } from "@/hooks";
import { Option } from "@/components";

const Tema = () => {
  const { themeSelected, changeTheme } = useThemeContext();

  return (
    <View className="bg-white dark:bg-primario-dark flex-1">
      <View className="mx-1 mt-3">
        <Option
          icon="moon"
          text="Oscuro"
          active={themeSelected == "dark"}
          onPress={() => changeTheme("dark")}
        />
        <View className="mb-2" />
        <Option
          icon="sun"
          text="Claro"
          active={themeSelected == "light"}
          onPress={() => changeTheme("light")}
        />
        <View className="mb-2" />
        <Option
          icon="smartphone"
          text="Sistema"
          active={themeSelected == "system"}
          onPress={() => changeTheme("system")}
        />
      </View>
    </View>
  );
};

export default Tema;
