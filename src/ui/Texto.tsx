import { Text as DefaulText, TextProps } from "react-native";

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
    <DefaulText
      {...props}
      className={className}
      style={[props.style, { fontFamily: `Lato${weight}` }]}
    >
      {props.children}
    </DefaulText>
  );
};

export default Texto;
