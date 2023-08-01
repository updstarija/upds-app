import { View, Text, Image } from 'react-native';
import React from 'react';
import { Button, Texto } from '../../components';
import { Link, useRouter } from 'expo-router';
import { useAuthContext } from '@/hooks';

const Perfil = () => {
  const router = useRouter();

  const { status, userAuth, logout } = useAuthContext();

  const eliminarData = async () => {
    router.push('/auth/login');
    logout();
  };

  return (
    <View className=" flex-1 bg-white dark:bg-primario-dark">
      {status === 'autenticado' ? (
        <>
          <Texto className="text-center text-2xl" weight="Bold">
            MI PERFIL
          </Texto>

          <Button
            onPress={eliminarData}
            classNameBtn="bg-red-400 p-4  rounded ">
            <Texto>VACIAR STORAGE</Texto>
          </Button>

          <Texto>{JSON.stringify(userAuth)}</Texto>
        </>
      ) : (
        <View className="flex-1 items-center justify-center">
          <Texto className="text-2xl uppercase" weight="Bold">
            Necesitas estar autenticado
          </Texto>

          <Image
            source={require('~/assets/images/pages/no-auth.png')}
            style={{ width: 250, height: 500 }}
            resizeMode="contain"
          />

          <Link href="/auth/login">
            <View className="rounded-lg bg-primario p-4">
              <Texto className="text-center text-xl text-white">
                IR AL LOGIN
              </Texto>
            </View>
          </Link>
        </View>
      )}
    </View>
  );
};

export default Perfil;
