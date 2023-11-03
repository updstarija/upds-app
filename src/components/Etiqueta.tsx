import { View } from 'react-native';
import { Texto } from '../ui';

interface Props {
  color: string;
  label: string;
  classNameContainer?: string;
}

export const Etiqueta: React.FC<Props> = ({
  color,
  label,
  classNameContainer,
}) => {
  return (
    <View
      className={`${classNameContainer} flex-row items-center justify-center`}>
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
      <Texto className="text-xs text-white">{label}</Texto>
    </View>
  );
};
