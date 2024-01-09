import { TouchableOpacity, ActivityIndicator, View } from "react-native";

interface Props {
  classNameBtn?: string;
  onPress: Function;
  disabled?: boolean;
  children: JSX.Element | JSX.Element[];
  showLoader?: boolean;
}
export const Button: React.FC<Props> = ({
  classNameBtn,
  onPress,
  disabled,
  showLoader,
  children,
}) => {
  return (
    <TouchableOpacity
      className={classNameBtn + ` ${disabled ? "opacity-70" : ""}`}
      onPress={() => onPress()}
      disabled={disabled}
      activeOpacity={0.6}
    >
      {/*  <Texto className={`${classNameLabel} text-center text-xl`}>
        {children}
      </Texto> */}
      {disabled && showLoader ? (
        <View className="items-center justify-center">
          <ActivityIndicator color={"#fff"} size={20} />
        </View>
      ) : (
        <>{children}</>
      )}
    </TouchableOpacity>
  );
};
