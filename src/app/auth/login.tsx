import {
  View,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  Button as Btn
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
import { Texto } from '../../ui';
import { useEffect, useState } from 'react';


/* const KeyboardAvoidingComponent = () => {
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


      navigateToHome()

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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {/*  <View
          className="flex-1"
          style={styles.inner}>

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
        <View className='flex-1 bg-white ' style={styles.inner}>
          <View>
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

          <View />
          <View />
          <View />
          <View />
          <View />
          <View />
          <View />
          <View />
        </View>

      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}; */

const Login = () => {
  const navigation = useNavigation();
  const isDarkMode = useThemeColor() === 'dark';

  const { login, isLoading } = useAuth();
  const {
    mostrarBtnBackLogin,
    login: loginContext,
    setMostrarBtnBackLogin,
  } = useAuthContext();

  const { control, handleSubmit, setValue } = useForm<IFormLogin>({ mode: 'onChange' });
  const [recordar, setRecordar] = useState(false)

  const onSubmit = async (data: IFormLogin) => {
    if (recordar) {
      await AsyncStorage.setItem("email-user", data.usuario)
      await AsyncStorage.setItem("contrasena-user", data.contraseña)
    }

    const user = await login(data);
    if (user) {
      loginContext(user);
      navigateToHome()
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

  const forgetPasswordMessage = () => {
    Alert.alert("Informacion", "Para acceder, utiliza tu correo académico como nombre de usuario y tu documento de identidad como contraseña", [], { cancelable: true })
  }

  useEffect(() => {
    (async () => {
      const email = await AsyncStorage.getItem("email-user")
      const contrasena = await AsyncStorage.getItem("contrasena-user")
      if (email) {
        setValue("usuario", email)
        setRecordar(true)
      }

      if (contrasena) {
        setValue("contraseña", contrasena)
        setRecordar(true)
      }
    })()
  }, [])
  return (
    <>
      <StatusBar
        backgroundColor={
          isDarkMode ? COLORS.dark.background : COLORS.light.background
        }
        style="light"
      />
      <SafeAreaView className='flex-1 bg-primario dark:bg-primario-dark'>
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

          <TouchableOpacity onPress={omitirLogin} className='p-4 pr-0'>
            <Texto className="text-white opacity-80">Omitir por ahora</Texto>
          </TouchableOpacity>
        </View>

        <View className="flex-column items-center">

          <Image
            source={require(`~/assets/images/app/logo-dark.png`)}
            style={{ width: 80, height: 80 }}
          />


          <Texto className="text-xl text-white lg:text-3xl" weight="Bold">
            Inicia sesion con tu cuenta
          </Texto>
        </View>

        <View
          className="bg-white dark:bg-secondary-dark mt-5 flex-1 px-8 pt-8 max-w-2xl mx-auto w-full"
          style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}>

          <TextField
            control={control}
            label="Correo académico"
            name="usuario"
            placeholder='email@upds.net.bo'
            placeholderTextColor={"#ccc"}
            rules={{ required: 'El usuario es requerido' }}
          />
          <TextField
            control={control}
            label="Documento de Identidad"
            name="contraseña"
            placeholder='********'
            placeholderTextColor={"#ccc"}
            rules={{ required: 'La contraseña es requerida' }}
            secureTextEntry
          />

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center" >
              <Checkbox

                value={recordar}
                className='mr-1'
                onValueChange={() => setRecordar(!recordar)}
                color={COLORS.light.background}
              />

              <Texto className="text-black dark:text-white">Recordarme</Texto>
            </View>

            <TouchableOpacity className='p-2' onPress={() => forgetPasswordMessage()}>
              <Texto className="text-black dark:text-white">
                Olvidaste tus credenciales?
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
    </>
  );
};

export default Login;
