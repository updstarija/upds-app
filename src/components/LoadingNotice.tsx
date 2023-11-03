import { View, ActivityIndicator } from 'react-native';
import { Texto } from '../ui';

export const LoadingNotice = () => {
  return (
    <View className="items-center justify-center p-4">
      <ActivityIndicator size="large" color="#223B82" />
    </View>
  );
};
