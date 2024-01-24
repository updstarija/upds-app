import { View } from "react-native";
import * as Animatable from "react-native-animatable";

const LoaderSplash = () => {
  return (
    <View className="flex-1  items-center justify-center bg-white dark:bg-primario-dark">
      <View>
        <Animatable.Image
          animation="pulse"
          easing="ease-out"
          duration={5000}
          iterationCount="infinite"
          source={require("~/assets/images/app/logo-light.png")}
          resizeMode="contain"
          style={{
            width: 80,
            height: 80,
          }}
        />
      </View>
    </View>
  );
};
export default LoaderSplash;
