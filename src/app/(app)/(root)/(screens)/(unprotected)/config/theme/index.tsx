import { View } from "react-native";
import { Option } from "@/components";
import { useTheme } from "@/hooks/useTheme";

const Tema = () => {
  const { theme, changeTheme } = useTheme();

  return (
    <View className="bg-white dark:bg-primario-dark flex-1">
      <View className="mx-1 mt-3">
        <Option
          icon="moon"
          text="Oscuro"
          active={theme == "dark"}
          onPress={() => changeTheme("dark")}
        />
        <View className="mb-2" />
        <Option
          icon="sun"
          text="Claro"
          active={theme == "light"}
          onPress={() => changeTheme("light")}
        />
        <View className="mb-2" />
        <Option
          icon="smartphone"
          text="Sistema"
          active={theme == "system"}
          onPress={() => changeTheme("system")}
        />
      </View>
    </View>
  );
};

export default Tema;
