import { TopBar } from "../layout/TopBar";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <SafeAreaView className="bg-primario dark:bg-secondary-dark flex-1">
      <TopBar />

      {children}
    </SafeAreaView>
  );
};
