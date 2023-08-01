import { Text, TextProps } from "react-native";

interface Props extends TextProps {
  weight?: "Bold" | "Light" | "Regular";
  className?: string;
}
export const Texto: React.FC<Props> = ({
  weight = "Regular",
  className = "text-black dark:text-white",
  ...props
}) => {
  return (
    <Text
      className={className}
      {...props}
      style={{ fontFamily: `Lato${weight}` }}
    >
      {props.children}
    </Text>
  );
};
