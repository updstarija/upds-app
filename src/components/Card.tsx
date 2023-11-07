import { View } from "react-native";

interface Props {
  title?: string;
  classNameCard?: string;
  children: JSX.Element | JSX.Element[];
}
const Card: React.FC<Props> = ({ title, children, classNameCard }) => {
  return (
    <View
      className={`rounded-2xl bg-primario p-5 dark:bg-secondary-dark ${classNameCard}`}
    >
      {children}
    </View>
  );
};

export default Card;
