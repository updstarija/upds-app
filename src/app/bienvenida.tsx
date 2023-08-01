import {View, Text, Button} from 'react-native';
import React from 'react';
import {Link, router} from 'expo-router';

const Bienvenida = () => {
  const onNext = () => {
    router.replace('/auth/login');
  };
  return (
    <View>
      <Text>Bienvenida</Text>

      <Button title="LOGIN" onPress={onNext} />
    </View>
  );
};

export default Bienvenida;
