import {
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useNavigation } from 'expo-router';
import { useForm } from 'react-hook-form';
import { StatusBar } from 'expo-status-bar';
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth, useAuthContext, useThemeColor } from '@/hooks';
import { IFormLogin } from '@/types';
import { COLORS } from '~/constants';
import { Button, TextField } from '@/components';
import { Texto } from '../../components/ui';
import { useState } from 'react';
const Login = () => {
  const navigation = useNavigation();
  const isDarkMode = useThemeColor() === 'dark';

  const { login, isLoading } = useAuth();
  const {
    mostrarBtnBackLogin,
    login: loginContext,
    setMostrarBtnBackLogin,
  } = useAuthContext();

  const { control, handleSubmit } = useForm<IFormLogin>({ mode: 'onChange' });
  const [recordar, setRecordar] = useState(false)

  const onSubmit = async (data: IFormLogin) => {
    const user = await login(data);
    if (user) {
      loginContext(user);

      if (router.canGoBack()) {
        router.back()
      } else {
        navigateToHome()
      }
    }
  };

  const navigateToHome = () => {
    router.replace('(drawer)');
    //@ts-ignore
    navigation.navigate('(drawer)');
  };

  const omitir = async () => {
    setMostrarBtnBackLogin(false);
    await AsyncStorage.setItem('bienvenida', 'true');
    navigateToHome();
  };

  const omitirLogin = () => {
    Alert.alert(
      'Aviso',
      'Al omitir la autenticación no tendras acceso a varias funcionalidades. Si eres estudiante de la UPDS inicia sesion por favor.',
      [{ text: 'Ok', onPress: omitir, style: 'destructive' }, { text: 'Cancelar' }],
      { cancelable: false },
    );
  };

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <StatusBar
        backgroundColor={
          isDarkMode ? COLORS.dark.background : COLORS.light.background
        }
        style="light"
      />

      <SafeAreaView className="flex flex-1 bg-primario dark:bg-primario-dark">
        <View className="flex-end m-3 flex-row items-center justify-between">
          {mostrarBtnBackLogin ? (
            <TouchableOpacity onPress={() => router.push('/bienvenida')}>
              <MaterialCommunityIcons
                name="arrow-left"
                size={25}
                color="#fff"
              />
            </TouchableOpacity>
          ) : (
            <View></View>
          )}

          <TouchableOpacity onPress={omitirLogin}>
            <Texto className="text-white opacity-80">Omitir por ahora</Texto>
          </TouchableOpacity>
        </View>

        <View className="flex-column items-center">
          {isDarkMode ? (
            <Image
              source={require(`~/assets/images/app/logo-dark.png`)}
              style={{ width: 80, height: 80 }}
            />
          ) : (
            <Image
              source={require(`~/assets/images/app/logo-light.png`)}
              style={{ width: 80, height: 80 }}
            />
          )}

          <Texto className="text-xl text-white" weight="Bold">
            Inicia sesion con tu cuenta
          </Texto>
        </View>

        <View
          className="bg-white dark:bg-secondary-dark mt-5 flex-1 px-8 pt-8"
          style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}>
          <TextField
            control={control}
            label="Usuario"
            name="usuario"
            rules={{ required: 'El usuario es requerido' }}
          />
          <TextField
            control={control}
            label="Contraseña"
            name="contraseña"
            rules={{ required: 'La contraseña es requerida' }}
            secureTextEntry
          />

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center" >
              {/*
              <CheckBox
                style={isIos && {marginRight: 10, width: 20, height: 20}}
                tintColors={{
                  true: '#223B82',
                  false: isDarkMode ? '#fff' : '#0D1F46',
                }}
                value={recordar}
                onChange={() => setRecordar(!recordar)}
              />
             */}
              <Checkbox

                value={recordar}
                className='mr-1'
                onValueChange={() => setRecordar(!recordar)}
                color={'#4630EB'}
              />

              <Texto className="text-black dark:text-white">Recordarme</Texto>
            </View>

            <TouchableOpacity>
              <Texto className="text-black dark:text-white">
                Olvidaste tu contraseña?
              </Texto>
            </TouchableOpacity>
          </View>

          <Button
            classNameBtn="mt-5 rounded-xl bg-primario py-3  h-13"
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading} showLoader>
            <Texto className="text-center text-xl text-white ">
              INICIAR SESION
            </Texto>
          </Button>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Login;
