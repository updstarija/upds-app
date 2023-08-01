import { View, Image } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useAuthContext } from '@/hooks';
import { Button } from '@/components';
import { Texto } from '../../../components';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { formatCumpleanios, nombreCompleto } from '@/helpers';
import { ScrollView } from 'react-native-gesture-handler';


const Perfil = () => {
    const router = useRouter();

    const { status, userAuth, logout } = useAuthContext();
    const { usuario } = userAuth

    const eliminarData = async () => {
        router.push('/auth/login');
        logout();
    };

    return (
        <View className=" flex-1 bg-primario dark:bg-secondary-dark">
            <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
                <View className='justify-center items-center'>
                    <View className='flex-row items-center mt-10'>
                        <View className='p-0.5 border-[2px] border-white rounded-full'>
                            <FontAwesome name="user-circle" size={50} color={"#fff"} />
                        </View>

                        <View className='ml-4'>
                            <Texto className='text-white'>{nombreCompleto(usuario)}</Texto>
                            <Texto className='text-white'>{usuario.email}</Texto>
                        </View>
                    </View>
                </View>


                <View className='mt-10 bg-white dark:bg-primario-dark flex-1 rounded-3xl p-4'>
                    <View className='mt-5'>
                        <View>
                            <Texto className='text-center text-white text-xl' weight='Bold'>INFORMACION PERSONAL</Texto>
                            <View className='border-[.5px] border-gray-100 mt-1' />
                        </View>

                        <View className='mt-4 flex-row justify-between items-center'>
                            <View className='flex-row items-center'>
                                <FontAwesome name='user' color={"#FFF"} size={20} style={{ width: 30 }} />
                                <Texto className='ml-1 text-white ' weight='Bold'>Nombre</Texto>
                            </View>

                            <Texto weight='Light'>{nombreCompleto(usuario)}</Texto>
                        </View>

                        <View className='mt-4 flex-row justify-between items-center'>
                            <View className='flex-row items-center'>
                                <FontAwesome name='vcard' color={"#FFF"} size={20} style={{ width: 30 }} />
                                <Texto className='ml-1 text-white ' weight='Bold'>Documento de Identidad</Texto>
                            </View>

                            <Texto weight='Light'>{usuario.documentoIdentidad}</Texto>
                        </View>

                        <View className='mt-4 flex-row justify-between items-center'>
                            <View className='flex-row items-center'>
                                <FontAwesome name='calendar' color={"#FFF"} size={20} style={{ width: 30 }} />
                                <Texto className='ml-1 text-white ' weight='Bold'>Fecha de Nacimiento</Texto>
                            </View>

                            <Texto weight='Light'>{formatCumpleanios(usuario.fechaNacimiento)}</Texto>
                        </View>

                        <View className='mt-4 flex-row justify-between items-center'>
                            <View className='flex-row items-center'>
                                <MaterialCommunityIcons name='earth' color={"#FFF"} size={20} style={{ width: 30 }} />
                                <Texto className='ml-1 text-white ' weight='Bold'>Nacionalidad</Texto>
                            </View>

                            <Texto weight='Light'>{usuario.nacionalidad || "N/D"}</Texto>
                        </View>

                        <View className='mt-4 flex-row justify-between items-center'>
                            <View className='flex-row items-center'>
                                <FontAwesome name='transgender' color={"#FFF"} size={20} style={{ width: 30 }} />
                                <Texto className='ml-1 text-white ' weight='Bold'>Genero</Texto>
                            </View>

                            <Texto weight='Light'>{usuario.sexo}</Texto>
                        </View>

                        <View className='mt-4 flex-row justify-between items-center'>
                            <View className='flex-row items-center'>
                                <FontAwesome name='home' color={"#FFF"} size={20} style={{ width: 30 }} />
                                <Texto className='ml-1 text-white ' weight='Bold'>Domicilio</Texto>
                            </View>

                            <Texto weight='Light'>{usuario.direccion}</Texto>
                        </View>

                        <View className='mt-4 flex-row justify-between items-center'>
                            <View className='flex-row items-center'>
                                <FontAwesome name='heartbeat' color={"#FFF"} size={20} style={{ width: 30 }} />
                                <Texto className='ml-1 text-white ' weight='Bold'>Tipo de Sangre</Texto>
                            </View>

                            <Texto weight='Light'>{usuario.tipoSangre}</Texto>
                        </View>

                        <View className='mt-4 flex-row justify-between items-center'>
                            <View className='flex-row items-center'>
                                <FontAwesome name='puzzle-piece' color={"#FFF"} size={20} style={{ width: 30 }} />
                                <Texto className='ml-1 text-white ' weight='Bold'>Estado Civil</Texto>
                            </View>

                            <Texto weight='Light'>{usuario.estadoCivil}</Texto>
                        </View>
                    </View>

                    {/* CONTACO */}
                    <View className='mt-10'>
                        <View>
                            <Texto className='text-center text-white text-xl' weight='Bold'>INFORMACION DE CONTACTO</Texto>
                            <View className='border-[.5px] border-gray-100 mt-1' />
                        </View>

                        <View className='mt-4 flex-row justify-between items-center'>
                            <View className='flex-row items-center'>
                                <MaterialCommunityIcons name='microsoft-office' color={"#FFF"} size={20} style={{ width: 30 }} />
                                <Texto className='ml-1 text-white ' weight='Bold'>Office 365</Texto>
                            </View>

                            <Texto weight='Light'>{usuario.emailOffice365}</Texto>
                        </View>

                        <View className='mt-4 flex-row justify-between items-center'>
                            <View className='flex-row items-center'>
                                <MaterialIcons name='mail-outline' color={"#FFF"} size={20} style={{ width: 30 }} />
                                <Texto className='ml-1 text-white ' weight='Bold'>E-Mail</Texto>
                            </View>

                            <Texto weight='Light'>{usuario.email}</Texto>
                        </View>

                        <View className='mt-4 flex-row justify-between items-center'>
                            <View className='flex-row items-center'>
                                <FontAwesome name='phone' color={"#FFF"} size={20} style={{ width: 30 }} />
                                <Texto className='ml-1 text-white ' weight='Bold'>Celular</Texto>
                            </View>

                            <Texto weight='Light'>{usuario.celular}</Texto>
                        </View>

                        <View className='mt-4 flex-row justify-between items-center'>
                            <View className='flex-row items-center'>
                                <MaterialCommunityIcons name='phone-message' color={"#FFF"} size={20} style={{ width: 30 }} />
                                <Texto className='ml-1 text-white ' weight='Bold'>Telefono de Referencia</Texto>
                            </View>

                            <Texto weight='Light'>{usuario.telefonoReferencia}</Texto>
                        </View>
                    </View>

                    {/* ACADEMICA */}
                    <View className='mt-10'>
                        <View>
                            <Texto className='text-center text-white text-xl' weight='Bold'>INFORMACION ACADEMICA</Texto>
                            <View className='border-[.5px] border-gray-100 mt-1' />
                        </View>

                        <View className='mt-4 flex-row justify-between items-center'>
                            <View className='flex-row items-center'>
                                <FontAwesome name='archive' color={"#FFF"} size={20} style={{ width: 30 }} />
                                <Texto className='ml-1 text-white ' weight='Bold'>Sede</Texto>
                            </View>

                            <Texto weight='Light'>{usuario.sede}</Texto>
                        </View>

                        <View className='mt-4 flex-row justify-between items-center'>
                            <View className='flex-row items-center'>
                                <MaterialCommunityIcons name='calendar-today' color={"#FFF"} size={20} style={{ width: 30 }} />
                                <Texto className='ml-1 text-white ' weight='Bold'>Fecha Registro</Texto>
                            </View>

                            <Texto weight='Light'>{formatCumpleanios(usuario.fechaRegistro)}</Texto>
                        </View>

                        <View className='mt-4 flex-row justify-between items-center'>
                            <View className='flex-row items-center'>
                                <MaterialCommunityIcons name='school-outline' color={"#FFF"} size={20} style={{ width: 30 }} />
                                <Texto className='ml-1 text-white ' weight='Bold'>Colegio</Texto>
                            </View>

                            <Texto weight='Light'>{usuario.colegio}</Texto>
                        </View>

                        <View className='mt-4 flex-row justify-between items-center'>
                            <View className='flex-row items-center'>
                                <MaterialCommunityIcons name='calendar-clock' color={"#FFF"} size={20} style={{ width: 30 }} />
                                <Texto className='ml-1 text-white ' weight='Bold'>Año de Egreso</Texto>
                            </View>

                            <Texto weight='Light'>{usuario.anioEgresoBachiller}</Texto>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default Perfil;
