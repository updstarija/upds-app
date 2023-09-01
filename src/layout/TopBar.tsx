import { Text, View } from 'react-native';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Texto } from '../components';
import { useAuthContext } from '@/hooks';


export const TopBar = () => {
  const { status } = useAuthContext()
  return (
    <View className="bg-white dark:bg-primario-dark">
      <View className="bg-primario dark:bg-secondary-dark  rounded-b-[50px]  ">
        <View className="flex-row justify-between px-1 mt-3">
          <View >
            <DrawerToggleButton tintColor="#fff" />
          </View>

          <View className='flex-row'>
            <Link className='mr-4' href='/notificacion'>
              <MaterialIcons name="notifications" color={'#FFF'} size={20} />
            </Link>

            {status === "autenticado" && <Link className='mr-4' href='/perfil'>
              <FontAwesome name='user-circle-o' size={20} color="#fff" />
            </Link>}

          </View>
        </View>

        <View className="px-5  py-4 mb-4">
          <Texto className="text-xl text-white " weight='Bold'>
            Universidad Privada Domingo Savio
          </Texto>
          <Texto className="text-white">Bienvenido</Texto>
        </View>
      </View>
    </View>
  );
};
